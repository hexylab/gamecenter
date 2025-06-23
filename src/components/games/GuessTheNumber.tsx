"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui';
import { 
  GuessTheNumberState, 
  GuessResult, 
  GuessTheNumberStats,
  DEFAULT_SETTINGS 
} from '@/types/games/guessTheNumber';

interface GuessTheNumberProps {
  onStatsUpdate?: (stats: GuessTheNumberStats) => void;
}

export const GuessTheNumber: React.FC<GuessTheNumberProps> = ({ onStatsUpdate }) => {
  const [gameState, setGameState] = useState<GuessTheNumberState>({
    targetNumber: 0,
    currentGuess: '',
    attempts: 0,
    guessHistory: [],
    gameStatus: 'waiting',
    startTime: 0,
    bestScore: undefined,
  });

  const [stats, setStats] = useState<GuessTheNumberStats>({
    totalGames: 0,
    gamesWon: 0,
    totalAttempts: 0,
    bestScore: Infinity,
    averageAttempts: 0,
    fastestTime: Infinity,
    winRate: 0,
  });

  const [inputError, setInputError] = useState<string>('');

  // ゲーム統計をローカルストレージから読み込み
  useEffect(() => {
    const savedStats = localStorage.getItem('guessTheNumberStats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
        setGameState(prev => ({ ...prev, bestScore: parsedStats.bestScore }));
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, []);

  // 統計をローカルストレージに保存
  const saveStats = useCallback((newStats: GuessTheNumberStats) => {
    localStorage.setItem('guessTheNumberStats', JSON.stringify(newStats));
    onStatsUpdate?.(newStats);
  }, [onStatsUpdate]);

  // 新しいゲームを開始
  const startNewGame = useCallback(() => {
    const targetNumber = Math.floor(Math.random() * (DEFAULT_SETTINGS.maxNumber - DEFAULT_SETTINGS.minNumber + 1)) + DEFAULT_SETTINGS.minNumber;
    
    setGameState({
      targetNumber,
      currentGuess: '',
      attempts: 0,
      guessHistory: [],
      gameStatus: 'playing',
      startTime: Date.now(),
      endTime: undefined,
      bestScore: gameState.bestScore,
    });
    
    setInputError('');
  }, [gameState.bestScore]);

  // 推測を送信
  const submitGuess = useCallback(() => {
    const guess = parseInt(gameState.currentGuess);
    
    // 入力検証
    if (isNaN(guess)) {
      setInputError('有効な数字を入力してください');
      return;
    }
    
    if (guess < DEFAULT_SETTINGS.minNumber || guess > DEFAULT_SETTINGS.maxNumber) {
      setInputError(`${DEFAULT_SETTINGS.minNumber}から${DEFAULT_SETTINGS.maxNumber}の間の数字を入力してください`);
      return;
    }
    
    setInputError('');
    
    const newAttempts = gameState.attempts + 1;
    let result: GuessResult['result'];
    
    if (guess === gameState.targetNumber) {
      result = 'correct';
    } else if (guess > gameState.targetNumber) {
      result = 'too-high';
    } else {
      result = 'too-low';
    }
    
    const guessResult: GuessResult = {
      guess,
      result,
      attemptNumber: newAttempts,
      timestamp: Date.now(),
    };
    
    const newGuessHistory = [...gameState.guessHistory, guessResult];
    
    // ゲーム状態を更新
    setGameState(prev => ({
      ...prev,
      currentGuess: '',
      attempts: newAttempts,
      guessHistory: newGuessHistory,
      gameStatus: result === 'correct' ? 'won' : 'playing',
      endTime: result === 'correct' ? Date.now() : undefined,
    }));
    
    // 正解の場合、統計を更新
    if (result === 'correct') {
      const gameTime = (Date.now() - gameState.startTime) / 1000;
      
      const newStats: GuessTheNumberStats = {
        totalGames: stats.totalGames + 1,
        gamesWon: stats.gamesWon + 1,
        totalAttempts: stats.totalAttempts + newAttempts,
        bestScore: Math.min(stats.bestScore === Infinity ? newAttempts : stats.bestScore, newAttempts),
        averageAttempts: (stats.totalAttempts + newAttempts) / (stats.totalGames + 1),
        fastestTime: Math.min(stats.fastestTime === Infinity ? gameTime : stats.fastestTime, gameTime),
        winRate: ((stats.gamesWon + 1) / (stats.totalGames + 1)) * 100,
      };
      
      setStats(newStats);
      saveStats(newStats);
    }
  }, [gameState, stats, saveStats]);

  // Enter キーでの送信
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && gameState.gameStatus === 'playing') {
      submitGuess();
    }
  }, [gameState.gameStatus, submitGuess]);

  // 結果メッセージを取得
  const getResultMessage = (result: GuessResult) => {
    switch (result.result) {
      case 'too-high':
        return `${result.guess} は大きすぎます`;
      case 'too-low':
        return `${result.guess} は小さすぎます`;
      case 'correct':
        return `🎉 正解！ ${result.guess} が答えでした！`;
    }
  };

  // ヒントメッセージを取得
  const getHintMessage = () => {
    if (gameState.guessHistory.length === 0) return '';
    
    const lastGuess = gameState.guessHistory[gameState.guessHistory.length - 1];
    const diff = Math.abs(lastGuess.guess - gameState.targetNumber);
    
    if (diff <= 5) return '🔥 とても近いです！';
    if (diff <= 10) return '🌡️ 近いです';
    if (diff <= 20) return '❄️ 少し遠いです';
    return '🥶 まだ遠いです';
  };

  return (
    <div className="min-h-[600px] bg-white dark:bg-gray-800 rounded-xl p-6">
      {/* ゲームヘッダー */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 数当てゲーム
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {DEFAULT_SETTINGS.minNumber}から{DEFAULT_SETTINGS.maxNumber}の間の数字を当ててください！
        </p>
      </div>

      {/* ゲーム状態 */}
      {gameState.gameStatus === 'waiting' && (
        <div className="text-center">
          <div className="text-6xl mb-6">🎲</div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            ゲームを開始する準備はできましたか？
          </p>
          <Button 
            onClick={startNewGame}
            size="lg"
            className="px-8 py-3"
          >
            ゲームスタート
          </Button>
        </div>
      )}

      {/* ゲームプレイ中 */}
      {gameState.gameStatus === 'playing' && (
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              試行回数: {gameState.attempts}
            </div>
            {DEFAULT_SETTINGS.enableHints && (
              <div className="text-lg text-blue-600 dark:text-blue-400">
                {getHintMessage()}
              </div>
            )}
          </div>

          {/* 入力フィールド */}
          <div className="mb-6">
            <div className="flex gap-3">
              <input
                type="number"
                value={gameState.currentGuess}
                onChange={(e) => setGameState(prev => ({ ...prev, currentGuess: e.target.value }))}
                onKeyPress={handleKeyPress}
                placeholder={`${DEFAULT_SETTINGS.minNumber}〜${DEFAULT_SETTINGS.maxNumber}`}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         text-center text-xl font-semibold"
                min={DEFAULT_SETTINGS.minNumber}
                max={DEFAULT_SETTINGS.maxNumber}
              />
              <Button 
                onClick={submitGuess}
                disabled={!gameState.currentGuess.trim()}
                size="lg"
                className="px-6"
              >
                推測
              </Button>
            </div>
            {inputError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {inputError}
              </p>
            )}
          </div>

          {/* 推測履歴 */}
          {gameState.guessHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                推測履歴
              </h3>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {gameState.guessHistory.slice(-5).map((guess, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center font-medium ${
                      guess.result === 'correct'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : guess.result === 'too-high'
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}
                  >
                    {getResultMessage(guess)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ゲーム勝利 */}
      {gameState.gameStatus === 'won' && (
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            おめでとうございます！
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {gameState.attempts}回で正解しました！
          </p>
          
          {/* ゲーム結果 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400">試行回数</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {gameState.attempts}回
                </div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">時間</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {gameState.endTime ? Math.round((gameState.endTime - gameState.startTime) / 1000) : 0}秒
                </div>
              </div>
              {gameState.bestScore && gameState.bestScore !== Infinity && (
                <>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">最少記録</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {gameState.bestScore}回
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">今回の評価</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {gameState.attempts <= gameState.bestScore ? '🏆新記録！' : '👍良い結果！'}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button 
            onClick={startNewGame}
            size="lg"
            className="px-8 py-3"
          >
            もう一度プレイ
          </Button>
        </div>
      )}

      {/* 統計情報 */}
      {stats.totalGames > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            📊 統計情報
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.totalGames}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                プレイ回数
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.bestScore === Infinity ? '---' : stats.bestScore}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                最少試行回数
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(stats.averageAttempts * 10) / 10}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                平均試行回数
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {Math.round(stats.winRate)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                勝率
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
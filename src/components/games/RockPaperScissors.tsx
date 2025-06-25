"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui';
import { 
  RockPaperScissorsState,
  RockPaperScissorsStats,
  RoundResult,
  Hand,
  GameResult,
  HAND_DISPLAY,
  RESULT_MESSAGES
} from '@/types/games/rockPaperScissors';

interface RockPaperScissorsProps {
  onStatsUpdate?: (stats: RockPaperScissorsStats) => void;
}

export const RockPaperScissors: React.FC<RockPaperScissorsProps> = ({ onStatsUpdate }) => {
  const [gameState, setGameState] = useState<RockPaperScissorsState>({
    playerHand: null,
    cpuHand: null,
    gamePhase: 'waiting',
    gameResult: null,
    currentWinStreak: 0,
    gameStartTime: 0,
    roundCount: 0,
  });

  const [stats, setStats] = useState<RockPaperScissorsStats>({
    totalGames: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    winRate: 0,
    maxWinStreak: 0,
    totalRounds: 0,
    handFrequency: {
      rock: 0,
      paper: 0,
      scissors: 0,
    },
    averageWinStreak: 0,
  });

  const [roundHistory, setRoundHistory] = useState<RoundResult[]>([]);

  // 統計をローカルストレージから読み込み
  useEffect(() => {
    const savedStats = localStorage.getItem('rockPaperScissorsStats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, []);

  // 統計をローカルストレージに保存
  const saveStats = useCallback((newStats: RockPaperScissorsStats) => {
    localStorage.setItem('rockPaperScissorsStats', JSON.stringify(newStats));
    onStatsUpdate?.(newStats);
  }, [onStatsUpdate]);

  // じゃんけんの勝敗判定
  const determineWinner = useCallback((playerHand: Hand, cpuHand: Hand): GameResult => {
    if (playerHand === cpuHand) return 'draw';
    
    const winConditions: Record<Hand, Hand> = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };
    
    return winConditions[playerHand] === cpuHand ? 'win' : 'lose';
  }, []);

  // CPUの手を選択（ランダム戦略）
  const getCpuHand = useCallback((): Hand => {
    const hands: Hand[] = ['rock', 'paper', 'scissors'];
    return hands[Math.floor(Math.random() * hands.length)];
  }, []);

  // 新しいゲームを開始
  const startNewGame = useCallback(() => {
    setGameState({
      playerHand: null,
      cpuHand: null,
      gamePhase: 'selecting',
      gameResult: null,
      currentWinStreak: 0,
      gameStartTime: Date.now(),
      roundCount: 0,
    });
    setRoundHistory([]);
  }, []);

  // プレイヤーの手を選択
  const selectHand = useCallback((hand: Hand) => {
    if (gameState.gamePhase !== 'selecting') return;

    const cpuHand = getCpuHand();
    const result = determineWinner(hand, cpuHand);
    
    const newRoundCount = gameState.roundCount + 1;
    const newWinStreak = result === 'win' ? gameState.currentWinStreak + 1 : 0;
    
    // まず手の選択のみを設定（統計はまだ更新しない）
    setGameState(prev => ({
      ...prev,
      playerHand: hand,
      cpuHand,
      gameResult: result,
      gamePhase: 'revealing',
      roundCount: newRoundCount,
    }));

    // 1.5秒後にCPUの手を表示し、結果フェーズに移行
    setTimeout(() => {
      setGameState(prev => ({ ...prev, gamePhase: 'result' }));
      
      // この時点で統計を更新
      const roundResult: RoundResult = {
        playerHand: hand,
        cpuHand,
        result,
        roundNumber: newRoundCount,
        timestamp: Date.now(),
      };

      setRoundHistory(prev => [...prev, roundResult]);

      // 連勝数も結果表示時に更新
      setGameState(prev => ({ ...prev, currentWinStreak: newWinStreak }));

      // 統計を更新
      const newStats: RockPaperScissorsStats = {
        totalGames: result === 'lose' ? stats.totalGames + 1 : stats.totalGames,
        wins: result === 'win' ? stats.wins + 1 : stats.wins,
        losses: result === 'lose' ? stats.losses + 1 : stats.losses,
        draws: result === 'draw' ? stats.draws + 1 : stats.draws,
        winRate: 0, // 後で計算
        maxWinStreak: Math.max(stats.maxWinStreak, newWinStreak),
        totalRounds: stats.totalRounds + 1,
        handFrequency: {
          ...stats.handFrequency,
          [hand]: stats.handFrequency[hand] + 1,
        },
        averageWinStreak: 0, // 後で計算
      };

      // 勝率と平均連勝を計算
      const totalRounds = newStats.totalRounds;
      if (totalRounds > 0) {
        newStats.winRate = (newStats.wins / totalRounds) * 100;
        newStats.averageWinStreak = newStats.totalGames > 0 ? newStats.wins / newStats.totalGames : 0;
      }

      setStats(newStats);
      saveStats(newStats);
    }, 1500);
  }, [gameState, stats, getCpuHand, determineWinner, saveStats]);

  // 次のラウンドを開始
  const nextRound = useCallback(() => {
    if (gameState.gameResult === 'lose') {
      // 敗北時はゲーム終了、新しいゲームへ
      setGameState(prev => ({ ...prev, gamePhase: 'waiting' }));
      return;
    }
    
    // 勝利または引き分けの場合は継続
    setGameState(prev => ({
      ...prev,
      playerHand: null,
      cpuHand: null,
      gameResult: null,
      gamePhase: 'selecting',
    }));
  }, [gameState.gameResult]);

  // 手のボタンレンダリング
  const renderHandButton = (hand: Hand) => (
    <Button
      key={hand}
      onClick={() => selectHand(hand)}
      disabled={gameState.gamePhase !== 'selecting'}
      size="lg"
      className="flex-1 h-24 text-4xl flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
    >
      <span className="text-5xl">{HAND_DISPLAY[hand].emoji}</span>
      <span className="text-lg font-semibold">{HAND_DISPLAY[hand].name}</span>
    </Button>
  );

  // 結果メッセージの取得
  const getResultMessage = () => {
    if (!gameState.gameResult) return '';
    
    const baseMessage = RESULT_MESSAGES[gameState.gameResult];
    
    if (gameState.gameResult === 'win' && gameState.currentWinStreak > 1) {
      return `${baseMessage} ${gameState.currentWinStreak}連勝中！`;
    }
    
    return baseMessage;
  };

  return (
    <div className="min-h-[600px] bg-white dark:bg-gray-800 rounded-xl p-6">
      {/* ゲームヘッダー */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ✂️ じゃんけんゲーム
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          コンピューターとじゃんけん勝負！連勝記録に挑戦しよう！
        </p>
        {gameState.currentWinStreak > 0 && (
          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <span className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
              🔥 現在 {gameState.currentWinStreak} 連勝中！
            </span>
          </div>
        )}
      </div>

      {/* ゲーム状態: 待機中 */}
      {gameState.gamePhase === 'waiting' && (
        <div className="text-center">
          <div className="text-6xl mb-6">🥊</div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            コンピューターとじゃんけん勝負を始めますか？
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

      {/* ゲーム状態: 手を選択中 */}
      {gameState.gamePhase === 'selecting' && (
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              あなたの手を選んでください
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              ラウンド {gameState.roundCount + 1}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {(['rock', 'paper', 'scissors'] as Hand[]).map(renderHandButton)}
          </div>
        </div>
      )}

      {/* ゲーム状態: 結果表示中 */}
      {(gameState.gamePhase === 'revealing' || gameState.gamePhase === 'result') && (
        <div className="max-w-2xl mx-auto">
          {/* プレイヤー vs CPU */}
          <div className="grid grid-cols-3 gap-8 items-center mb-8">
            {/* プレイヤー */}
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">あなた</div>
              <div className="text-8xl mb-2">
                {gameState.playerHand ? HAND_DISPLAY[gameState.playerHand].emoji : '❓'}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {gameState.playerHand ? HAND_DISPLAY[gameState.playerHand].name : ''}
              </div>
            </div>

            {/* VS */}
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500">VS</div>
            </div>

            {/* CPU */}
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">CPU</div>
              <div className="text-8xl mb-2">
                {gameState.gamePhase === 'revealing' ? '❓' : 
                 gameState.cpuHand ? HAND_DISPLAY[gameState.cpuHand].emoji : '❓'}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {gameState.gamePhase === 'result' && gameState.cpuHand ? 
                 HAND_DISPLAY[gameState.cpuHand].name : ''}
              </div>
            </div>
          </div>

          {/* 結果表示 */}
          {gameState.gamePhase === 'result' && gameState.gameResult && (
            <div className="text-center mb-8">
              <div className={`text-4xl font-bold mb-4 ${
                gameState.gameResult === 'win' ? 'text-green-600 dark:text-green-400' :
                gameState.gameResult === 'lose' ? 'text-red-600 dark:text-red-400' :
                'text-yellow-600 dark:text-yellow-400'
              }`}>
                {getResultMessage()}
              </div>
              
              {gameState.gameResult === 'win' && gameState.currentWinStreak === stats.maxWinStreak && gameState.currentWinStreak > 1 && (
                <div className="text-lg text-purple-600 dark:text-purple-400 mb-4">
                  🏆 新記録達成！
                </div>
              )}

              <div className="flex gap-4 justify-center">
                {gameState.gameResult === 'lose' ? (
                  <Button 
                    onClick={startNewGame}
                    size="lg"
                    className="px-6"
                  >
                    新しいゲームを開始
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={nextRound}
                      size="lg"
                      className="px-6"
                    >
                      次のラウンド
                    </Button>
                    <Button 
                      onClick={startNewGame}
                      variant="outline"
                      size="lg"
                      className="px-6"
                    >
                      新しいゲームを開始
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ラウンド履歴 */}
      {roundHistory.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📜 最近のラウンド
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
            {roundHistory.slice(-6).reverse().map((round) => (
              <div
                key={round.timestamp}
                className={`p-3 rounded-lg text-sm ${
                  round.result === 'win'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : round.result === 'lose'
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">R{round.roundNumber}</span>
                  <span className="text-xs">{RESULT_MESSAGES[round.result]}</span>
                </div>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <span>{HAND_DISPLAY[round.playerHand].emoji}</span>
                  <span>vs</span>
                  <span>{HAND_DISPLAY[round.cpuHand].emoji}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 統計情報 */}
      {stats.totalRounds > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            📊 統計情報
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.totalRounds}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                総ラウンド数
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round(stats.winRate)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                勝率 ({stats.wins}/{stats.totalRounds})
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.maxWinStreak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                最高連勝
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.totalGames}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ゲーム数
              </div>
            </div>
          </div>

          {/* 勝敗詳細 */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3 text-center">
              勝敗詳細
            </h4>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {stats.wins}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">勝利</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600 dark:text-red-400">
                  {stats.losses}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">敗北</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.draws}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">引き分け</div>
              </div>
            </div>
          </div>

          {/* 手の使用頻度 */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3 text-center">
              使用した手の頻度
            </h4>
            <div className="flex justify-center gap-6">
              {(['rock', 'paper', 'scissors'] as Hand[]).map(hand => (
                <div key={hand} className="text-center">
                  <div className="text-3xl mb-1">{HAND_DISPLAY[hand].emoji}</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stats.handFrequency[hand]}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {HAND_DISPLAY[hand].name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
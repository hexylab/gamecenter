import Link from "next/link";
import { Game } from "@/types/game";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";
import { GuessTheNumber, RockPaperScissors } from "@/components/games";

interface GameDetailProps {
  game: Game;
}

export function GameDetail({ game }: GameDetailProps) {
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: game.title },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Game Header */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-6xl">{game.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {game.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {game.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="category">{game.category}</Badge>
                <Badge variant="difficulty">{game.difficulty}</Badge>
                <Badge variant="status">{game.status}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Game Tags */}
        {game.tags && game.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              タグ
            </h2>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Game Area */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ゲームエリア
          </h2>
          
          {game.status === "Available" && game.id === "guess-the-number" ? (
            <GuessTheNumber />
          ) : game.status === "Available" && game.id === "rock-paper-scissors" ? (
            <RockPaperScissors />
          ) : game.status === "Available" ? (
            <div className="min-h-[400px] bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  このゲームは現在開発中です。<br />
                  近日中にプレイできるようになります！
                </p>
              </div>
            </div>
          ) : (
            <div className="min-h-[400px] bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">⏳</div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {game.status}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  このゲームはまだ利用できません。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Game Info */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ゲーム情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                カテゴリ
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{game.category}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                難易度
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{game.difficulty}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                作成日
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{game.createdAt}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                更新日
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{game.updatedAt}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              ← ホームに戻る
            </Button>
          </Link>
          {game.status === "Available" && (
            <Button size="lg" className="w-full sm:w-auto" disabled>
              ゲームを開始 (開発中)
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

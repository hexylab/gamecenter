import Link from "next/link";
import { Button } from "@/components/ui";
import { Breadcrumb } from "@/components/Breadcrumb";

export function GameNotFound() {
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "ゲームが見つかりません" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Not Found Content */}
        <div className="text-center py-16">
          <div className="text-8xl mb-8">🎮</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ゲームが見つかりません
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            お探しのゲームは存在しないか、削除された可能性があります。
          </p>
          
          <div className="space-y-4">
            <div>
              <Link href="/">
                <Button size="lg">
                  ← ホームに戻る
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              他のゲームをお探しの場合は、ホームページからご確認ください。
            </p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            こんなゲームはいかがですか？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                数当てゲーム
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                1-100の数字を当てるシンプルゲーム
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✂️</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                じゃんけんゲーム
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                コンピューターと勝負！
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🧩</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                記憶ゲーム
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                カードの記憶力を試そう
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
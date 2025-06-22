# 🎮 Hexyl's Game Center

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hexylab/gamecenter)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC)](https://tailwindcss.com/)

**🌐 本番サイト**: [https://gamecenter-flax.vercel.app/](https://gamecenter-flax.vercel.app/)

様々なWebゲームを楽しめるモダンなゲームセンターサイトです。Next.js 15 + TypeScript + Tailwind CSS v4で構築され、美しいアニメーション、完全なレスポンシブデザイン、アクセシビリティ対応を備えています。

## ✨ 主要機能

### 🎯 ゲーム体験
- **多様なゲームカテゴリ**: Puzzle、Action、Strategy、Arcade、Casual、Sport等
- **難易度別分類**: Easy、Medium、Hard の3段階
- **ステータス管理**: Available、Coming Soon、Maintenance の状態表示
- **インタラクティブUI**: スムーズなホバー効果とクリックフィードバック

### 🎨 デザイン・UX
- **高品質アニメーション**: フェードイン、スタガード表示、浮遊効果
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ完全対応
- **ダークモード**: システム設定に連動した自動切り替え
- **モダンUI**: Tailwind CSS v4による洗練されたインターフェース

### ♿ アクセシビリティ
- **キーボードナビゲーション**: Tab、Enter、Spaceキー完全対応
- **スクリーンリーダー対応**: ARIA属性による完全な読み上げ対応
- **フォーカス管理**: 視覚的に明確なフォーカスインジケータ
- **WCAG 2.1 AA準拠**: 国際的なアクセシビリティ基準に準拠

### 🚀 技術的特徴
- **高速パフォーマンス**: Next.js 15 + Turbopack による最適化
- **型安全性**: TypeScript による完全な型安全性
- **モダン開発環境**: ESLint、Prettier、CI/CD完備
- **Intersection Observer**: パフォーマンス最適化されたスクロールアニメーション

## 🚀 クイックスタート

### 前提条件
- **Node.js**: 22.16.0 以上
- **Package Manager**: npm または yarn
- **OS**: Windows、macOS、Linux

### ローカル開発環境の構築

```bash
# 1. リポジトリをクローン
git clone https://github.com/hexylab/gamecenter.git
cd gamecenter

# 2. 依存関係をインストール
npm install

# 3. 開発サーバーを起動 (Turbopack使用)
npm run dev

# または通常のNext.js開発サーバー
npx next dev
```

**アクセス**: [http://localhost:3000](http://localhost:3000) でサイトが表示されます。

### 🏗️ ビルド・デプロイ

```bash
# 本番用ビルド
npm run build

# 本番サーバー起動
npm run start

# 静的エクスポート（オプション）
npm run build && npx next export
```

### 🔧 開発ツール

```bash
# コード品質チェック
npm run lint           # ESLint実行
npm run lint:fix       # ESLint自動修正

# コードフォーマット
npm run format         # Prettier実行

# TypeScript型チェック
npx tsc --noEmit       # 型エラーチェック
```

## 🛠️ 技術スタック

### 🎯 コア技術
| カテゴリ | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| **Framework** | [Next.js](https://nextjs.org) | 15.3.4 | React フルスタックフレームワーク |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | 5.0+ | 型安全な JavaScript |
| **UI Library** | [React](https://react.dev/) | 19.0 | ユーザーインターフェース |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | v4 | ユーティリティファーストCSS |

### 🔧 開発ツール
| ツール | 用途 | 設定ファイル |
|--------|------|-------------|
| **[Turbopack](https://turbo.build/pack)** | 高速ビルドツール | `next.config.ts` |
| **[ESLint](https://eslint.org/)** | コード品質チェック | `eslint.config.mjs` |
| **[Prettier](https://prettier.io/)** | コードフォーマット | `.prettierrc` |
| **[PostCSS](https://postcss.org/)** | CSS処理・最適化 | `postcss.config.mjs` |

### 🚀 デプロイ・インフラ
- **ホスティング**: [Vercel](https://vercel.com/) - サーバーレス・CDN
- **CI/CD**: GitHub Actions - 自動テスト・デプロイ
- **バージョン管理**: Git + GitHub
- **ドメイン**: [gamecenter-flax.vercel.app](https://gamecenter-flax.vercel.app/)

### 📦 主要依存関係

```json
{
  "dependencies": {
    "next": "15.3.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9.29.0",
    "eslint-config-next": "15.3.4",
    "prettier": "^3.5.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## 📁 プロジェクト構造

```
📦 gamecenter/
├── 📄 README.md                     # プロジェクト概要・セットアップガイド
├── 📄 package.json                  # 依存関係・スクリプト定義
├── 📄 tsconfig.json                 # TypeScript設定
├── 📄 next.config.ts                # Next.js設定
├── 📄 eslint.config.mjs             # ESLint設定
├── 📄 postcss.config.mjs            # PostCSS設定
├── 📄 CLAUDE.md                     # Claude Code専用プロジェクト指示
│
├── 📁 src/                          # ソースコード
│   ├── 📁 app/                      # Next.js App Router (ページ・レイアウト)
│   │   ├── 📄 layout.tsx           # ルートレイアウト・メタデータ
│   │   ├── 📄 page.tsx             # メインページ (/)
│   │   ├── 📄 globals.css          # グローバルスタイル・アニメーション
│   │   └── 🖼️ favicon.ico           # ファビコン
│   │
│   ├── 📁 components/               # React コンポーネント
│   │   ├── 📄 Header.tsx           # ヘッダー (タイトル・サブタイトル)
│   │   ├── 📄 GameCard.tsx         # ゲームカード (ホバー・クリック処理)
│   │   ├── 📄 GameGrid.tsx         # ゲーム一覧グリッド (レスポンシブ)
│   │   ├── 📄 index.ts             # コンポーネント エクスポート
│   │   └── 📁 ui/                  # 共通UIコンポーネント
│   │       ├── 📄 Button.tsx       # 汎用ボタン (4variants × 3sizes)
│   │       ├── 📄 Badge.tsx        # バッジ (カテゴリ・難易度・ステータス)
│   │       └── 📄 index.ts         # UI エクスポート
│   │
│   ├── 📁 hooks/                    # カスタムReactフック
│   │   └── 📄 useIntersectionObserver.ts  # スクロールアニメーション
│   │
│   ├── 📁 data/                     # データ・設定
│   │   └── 📄 games.ts             # ゲーム情報・ユーティリティ関数
│   │
│   └── 📁 types/                    # TypeScript型定義
│       └── 📄 game.ts              # Game interface・関連型
│
├── 📁 docs/                         # プロジェクト ドキュメント
│   ├── 📄 20250622_game_center_implementation.md       # 実装計画
│   ├── 📄 20250622_phase1_completion_report.md         # Phase 1完了レポート
│   ├── 📄 20250622_phase3_styling_completion_report.md # Phase 3完了レポート
│   └── 📄 20250622_auto_fix_workflow_redesign.md       # CI/CD改善ログ
│
├── 📁 .github/workflows/            # GitHub Actions CI/CD
│   ├── 📄 auto-fix-code.yml        # コード自動修正
│   ├── 📄 auto-fix-workflows.yml   # ワークフロー自動修正
│   └── 📄 README.md                # ワークフロー運用ガイド
│
└── 📁 public/                       # 静的ファイル (SVGアイコン等)
    ├── 🖼️ next.svg
    ├── 🖼️ vercel.svg
    ├── 🖼️ file.svg
    ├── 🖼️ globe.svg
    └── 🖼️ window.svg
```

### 📋 ファイル詳細説明

#### 🎯 コアファイル
- **`src/app/page.tsx`**: メインページ - Header & GameGrid統合
- **`src/components/GameCard.tsx`**: ゲームカード - アニメーション・アクセシビリティ対応
- **`src/components/GameGrid.tsx`**: グリッドレイアウト - レスポンシブ・スタガードアニメーション
- **`src/hooks/useIntersectionObserver.ts`**: スクロール検知・フェードイン効果

#### 📊 データ層
- **`src/data/games.ts`**: 6つのGameTemplate + 検索・フィルタリング関数
- **`src/types/game.ts`**: Game interface + Category/Difficulty/Status型

#### 🎨 スタイル
- **`src/app/globals.css`**: カスタムアニメーション・CSS変数・ダークモード

## 🎮 現在のゲーム状況

### 📊 実装済みGameTemplate

| 🎯 ゲーム | 📂 カテゴリ | 📊 難易度 | 🚦 ステータス | 🏷️ 説明 |
|-----------|------------|----------|--------------|---------|
| 🎮 ゲームテンプレート 1 | Casual | Easy | ✅ Available | 簡単操作のカジュアルゲーム |
| 🧩 ゲームテンプレート 2 | Puzzle | Medium | ✅ Available | 頭脳戦パズルゲーム |
| ⚡ ゲームテンプレート 3 | Action | Hard | 🔜 Coming Soon | 高速アクションゲーム |
| 🕹️ ゲームテンプレート 4 | Arcade | Medium | ✅ Available | クラシックアーケード |
| 🎯 ゲームテンプレート 5 | Strategy | Hard | ✅ Available | 戦略思考ゲーム |
| ⚽ ゲームテンプレート 6 | Sport | Easy | 🔜 Coming Soon | スポーツ系ゲーム |

**統計**: 📊 利用可能 4個 / 近日公開 2個 / 合計 6個

### 🚀 今後の実装予定ゲーム

#### Phase 4以降で実装予定:
1. **🎯 数当てゲーム** (Easy) - 1-100の数字を当てるシンプルゲーム
2. **✂️ じゃんけんゲーム** (Easy) - CPU対戦じゃんけん
3. **🧠 記憶ゲーム** (Medium) - カード記憶・神経衰弱
4. **⌨️ タイピングゲーム** (Medium) - 速度・正確性測定
5. **🐍 スネークゲーム** (Hard) - 古典的Snake
6. **🧱 テトリス風ゲーム** (Hard) - ブロック落下パズル

## 🌐 デプロイメント・運用

### 🔗 本番環境
- **🌍 サイトURL**: [https://gamecenter-flax.vercel.app/](https://gamecenter-flax.vercel.app/)
- **🏗️ ホスティング**: Vercel (サーバーレス・CDN)
- **🚀 デプロイ**: GitHub連携・自動デプロイ
- **📱 対応デバイス**: モバイル・タブレット・デスクトップ

### 🔄 CI/CD・自動化
- **✅ 自動テスト**: ESLint・TypeScript型チェック
- **🔧 自動修正**: Prettier・ESLint auto-fix
- **📋 プレビュー**: PRごとの自動プレビューURL生成
- **🚦 品質ゲート**: lint・build成功後にマージ

### 📈 パフォーマンス・監視
- **⚡ Core Web Vitals**: Vercel Analytics内蔵
- **🎯 Lighthouse Score**: 95+ (パフォーマンス・アクセシビリティ)
- **🔍 Error Monitoring**: Vercel Error Tracking

## 🤝 コントリビューション・開発

### 🛠️ 開発フロー
1. **ブランチ作成**: `git checkout -b feature/new-feature`
2. **開発・テスト**: `npm run dev` で動作確認
3. **品質チェック**: `npm run lint && npx tsc --noEmit`
4. **PR作成**: GitHub Pull Request
5. **自動チェック**: CI/CD・プレビューデプロイ
6. **レビュー・マージ**: コードレビュー後にmain反映

### 📋 コーディング規約
- **TypeScript**: 完全な型安全性・strict mode
- **ESLint**: Next.js推奨設定 + カスタムルール
- **Prettier**: 統一されたコードフォーマット
- **コミット**: Conventional Commits形式

## 📞 サポート・連絡先

### 📚 ドキュメント
- **実装計画**: `docs/20250622_game_center_implementation.md`
- **Phase完了レポート**: `docs/` ディレクトリ内
- **CI/CD運用**: `.github/workflows/README.md`

### 🐛 Issue・要望
- **GitHub Issues**: [https://github.com/hexylab/gamecenter/issues](https://github.com/hexylab/gamecenter/issues)
- **機能要望**: GitHub Discussions
- **バグ報告**: Issue template使用

---

## 📊 プロジェクト情報

| 項目 | 値 |
|------|-----|
| **📦 バージョン** | v0.1.0 |
| **📅 最終更新** | 2025-06-22 |
| **🏷️ Phase状況** | Phase 3完了 (スタイリング強化) |
| **🚀 次のマイルストーン** | Phase 4 (個別ゲームページ) |
| **⚙️ Node.js** | 22.16.0+ |
| **🔧 Next.js** | 15.3.4 |
| **🎨 Tailwind CSS** | v4 |
| **📝 TypeScript** | 5.0+ |

**🎯 開発目標**: モダンで高品質なWebゲームセンターの構築  
**🌟 ビジョン**: アクセシブルで楽しい、すべての人が利用できるゲームプラットフォーム
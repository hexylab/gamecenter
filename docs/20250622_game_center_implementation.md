# Hexyl's Game Center 実装計画

## プロジェクト概要
- **プロジェクト名**: Hexyl's Game Center
- **目的**: 複数のWebゲームを統合したゲームセンターサイトの構築
- **技術スタック**: Next.js 15.3.4, React 19, TypeScript, Tailwind CSS v4
- **デプロイ**: Vercel

## ページ構成

### メインページ（/）
```
┌─────────────────────────────────────┐
│          Header                      │
│    🎮 Hexyl's Game Center           │
│    様々なゲームを楽しもう！            │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│          Game Grid                   │
│  ┌───────┐ ┌───────┐ ┌───────┐     │
│  │Game 1 │ │Game 2 │ │Game 3 │     │
│  │ 🎯   │ │ 🎲   │ │ 🧩   │     │
│  │Title  │ │Title  │ │Title  │     │
│  └───────┘ └───────┘ └───────┘     │
│  ┌───────┐ ┌───────┐ ┌───────┐     │
│  │Game 4 │ │Game 5 │ │Game 6 │     │
│  │ 🚀   │ │ ⚡   │ │ 🎪   │     │
│  │Title  │ │Title  │ │Title  │     │
│  └───────┘ └───────┘ └───────┘     │
└─────────────────────────────────────┘
```

### 個別ゲームページ（/games/[gameId]）
- ゲームタイトル
- ゲーム説明
- プレイエリア
- ホームに戻るボタン

## データ構造

### Game Interface
```typescript
interface Game {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  category: 'Action' | 'Puzzle' | 'Strategy' | 'Arcade' | 'Casual';
  route: string; // /games/[gameId]
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Available' | 'Coming Soon';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### 初期ゲームリスト（モックデータ）
1. **数当てゲーム** (guess-the-number)
   - カテゴリ: Casual
   - 難易度: Easy
   - アイコン: 🎯

2. **じゃんけんゲーム** (rock-paper-scissors)
   - カテゴリ: Casual
   - 難易度: Easy
   - アイコン: ✂️

3. **記憶ゲーム** (memory-game)
   - カテゴリ: Puzzle
   - 難易度: Medium
   - アイコン: 🧩

4. **タイピングゲーム** (typing-game)
   - カテゴリ: Arcade
   - 難易度: Medium
   - アイコン: ⌨️

5. **スネークゲーム** (snake-game)
   - カテゴリ: Arcade
   - 難易度: Hard
   - アイコン: 🐍

6. **テトリス風ゲーム** (tetris-like)
   - カテゴリ: Puzzle
   - 難易度: Hard
   - アイコン: 🧱

## ファイル構成

```
src/
├── app/
│   ├── page.tsx                    # メインページ
│   ├── layout.tsx                  # レイアウト（メタデータ更新）
│   ├── globals.css                 # グローバルスタイル
│   └── games/
│       └── [gameId]/
│           └── page.tsx            # 個別ゲームページ
├── components/
│   ├── GameCard.tsx               # ゲームカードコンポーネント
│   ├── GameGrid.tsx               # ゲーム一覧グリッド
│   ├── Header.tsx                 # ヘッダーコンポーネント
│   └── ui/
│       ├── Button.tsx             # 共通ボタン
│       └── Badge.tsx              # バッジ（難易度・カテゴリ表示）
├── data/
│   └── games.ts                   # ゲーム一覧データ
├── types/
│   └── game.ts                    # ゲーム関連型定義
├── utils/
│   └── constants.ts               # 定数定義
└── hooks/
    └── useGame.ts                 # ゲーム関連フック
```

## 実装ステップ

### Phase 1: 基盤構築
1. **型定義作成** (`src/types/game.ts`)
2. **モックデータ作成** (`src/data/games.ts`)
3. **共通コンポーネント作成** (`src/components/ui/`)

### Phase 2: メインページ実装
1. **Headerコンポーネント** - タイトルとサブタイトル
2. **GameCardコンポーネント** - ホバー効果、クリック処理
3. **GameGridコンポーネント** - レスポンシブグリッド
4. **メインページ統合** - page.tsxの完全置き換え

### Phase 3: スタイリング
1. **カスタムCSS追加** - アニメーション、ホバー効果
2. **ダークモード対応** - 既存CSS変数活用
3. **レスポンシブデザイン** - モバイル/タブレット/デスクトップ

### Phase 4: ルーティング
1. **動的ルーティング** - `/games/[gameId]`ページ作成
2. **ナビゲーション** - Link component使用
3. **エラーハンドリング** - 404ページ

### Phase 5: 最適化
1. **SEO対応** - メタデータ設定
2. **パフォーマンス** - 画像最適化、lazy loading
3. **アクセシビリティ** - ARIA属性、キーボードナビゲーション

## デザインガイドライン

### カラーパレット
- **ライトモード**: 
  - Background: #ffffff
  - Foreground: #171717
  - Primary: #0070f3
  - Secondary: #666666
- **ダークモード**:
  - Background: #0a0a0a
  - Foreground: #ededed
  - Primary: #0070f3
  - Secondary: #888888

### タイポグラフィ
- **メインタイトル**: Geist Sans, 32px, bold
- **サブタイトル**: Geist Sans, 18px, medium
- **カードタイトル**: Geist Sans, 20px, semibold
- **説明文**: Geist Sans, 14px, regular

### スペーシング
- **グリッドギャップ**: 24px
- **カードパディング**: 24px
- **セクション間**: 48px

### アニメーション
- **カードホバー**: transform scale(1.02), 0.2s ease
- **カードクリック**: transform scale(0.98), 0.1s ease
- **フェードイン**: opacity 0 → 1, 0.3s ease

## 今後の拡張予定

### 機能追加
- [ ] ゲームスコア記録
- [ ] ランキング機能
- [ ] お気に入り機能
- [ ] 検索・フィルタリング
- [ ] ゲームレビュー
- [ ] ソーシャル機能

### 技術改善
- [ ] PWA対応
- [ ] オフライン機能
- [ ] 状態管理（Zustand/Redux）
- [ ] テスト実装
- [ ] CI/CD強化

## 注意事項

1. **レスポンシブデザイン必須**
2. **ダークモード完全対応**
3. **アクセシビリティ準拠**
4. **SEO最適化**
5. **パフォーマンス重視**
6. **型安全性確保**

---

## 進捗ログ

### Phase 1: 基盤構築 ✅ (2025-06-22 完了)
- [x] 型定義作成 (`src/types/game.ts`)
- [x] GameTemplateモックデータ作成 (`src/data/games.ts`)  
- [x] 共通コンポーネント作成 (`src/components/ui/`)
- **詳細**: `20250622_phase1_completion_report.md` 参照

### Phase 2: メインページ実装 ✅ (2025-06-22 完了)
- [x] Headerコンポーネント - タイトルとサブタイトル
- [x] GameCardコンポーネント - ホバー効果、クリック処理
- [x] GameGridコンポーネント - レスポンシブグリッド
- [x] メインページ統合 - page.tsxの完全置き換え
- **PR**: #4 (マージ済み)、Vercelデプロイ完了

### CI/CD改善: auto-fixワークフロー再設計 🔄 (進行中)
- [x] 問題分析 - 無限ループエラーの根本原因特定
- [x] 解決策検討 - 責任分離アプローチ採用
- [x] 新ワークフロー実装 - auto-fix-code.yml + auto-fix-workflows.yml
- [x] 運用ガイド作成 - README.md + 詳細ログ
- [ ] PR #5 マージ待ち
- **詳細**: `20250622_auto_fix_workflow_redesign.md` 参照

### Phase 3: スタイリング強化 ✅ (2025-06-22 完了)
- [x] GameCardアニメーション強化 - ホバー・クリック・浮遊効果
- [x] フェードイン効果実装 - useIntersectionObserver + スタガードアニメーション
- [x] モバイル・タブレット最適化 - レスポンシブ調整
- [x] アクセシビリティ向上 - ARIA属性・キーボードナビゲーション
- [x] 品質保証 - ESLint・TypeScript完全対応
- **詳細**: `20250622_phase3_styling_completion_report.md` 参照

### Phase 4: 個別ゲームページ実装 📋 (次の候補)
- [ ] 動的ルーティング `/games/[gameId]` ページ作成
- [ ] ゲーム詳細ページレイアウト
- [ ] パンくずナビゲーション実装
- [ ] エラーハンドリング (404ページ)

### 実際のゲーム実装 🎮 (Phase 4以降)
- [ ] 数当てゲーム (Easy) - 1-100の数字当て
- [ ] じゃんけんゲーム (Easy) - CPU対戦
- [ ] 記憶ゲーム (Medium) - カード記憶
- [ ] タイピングゲーム (Medium) - 速度測定
- [ ] スネークゲーム (Hard) - 古典的Snake
- [ ] テトリス風ゲーム (Hard) - ブロック落下

---

**最終更新**: 2025-06-22  
**Phase 3 完了**: スタイリング強化・アニメーション・アクセシビリティ  
**次回作業**: Phase 4 (個別ゲームページ) または 実際のゲーム実装
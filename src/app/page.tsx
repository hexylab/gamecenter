import { Header, GameGrid } from '@/components';
import { gameTemplates } from '@/data/games';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <GameGrid games={gameTemplates} />
      </main>
    </div>
  );
}
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getGameById } from "@/data/games";
import { GameDetail } from "@/components/GameDetail";

interface GamePageProps {
  params: Promise<{
    gameId: string;
  }>;
}

export async function generateMetadata({
  params,
}: GamePageProps): Promise<Metadata> {
  const { gameId } = await params;
  const game = getGameById(gameId);

  if (!game) {
    return {
      title: "ゲームが見つかりません - Hexyl's Game Center",
      description: "指定されたゲームが見つかりませんでした。",
    };
  }

  return {
    title: `${game.title} - Hexyl's Game Center`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Hexyl's Game Center`,
      description: game.description,
      type: "website",
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;
  const game = getGameById(gameId);

  if (!game) {
    notFound();
  }

  return <GameDetail game={game} />;
}


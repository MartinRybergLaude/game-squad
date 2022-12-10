import { Game } from "~/types";

import GameCardPresenter from "../gameCard/gameCardPresenter";

interface GameCollectionViewProps {
  games: Game[];
}

export default function GameCollectionView({ games }: GameCollectionViewProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 900 }}>
      {games.map(game => (
        <GameCardPresenter key={game.id} game={game} />
      ))}
    </div>
  );
}

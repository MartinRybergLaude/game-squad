import { AnimatePresence, motion } from "framer-motion";

import { Game } from "~/utils/types";

import GameCardPresenter from "../gameCard/gameCardPresenter";

interface GameCollectionViewProps {
  games?: Game[];
}

export default function GameCollectionView({ games }: GameCollectionViewProps) {
  const gameCards = games?.map(game => <GameCardPresenter key={game.id} game={game} />);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 900, marginTop: 16 }}>
      {gameCards}
    </div>
  );
}

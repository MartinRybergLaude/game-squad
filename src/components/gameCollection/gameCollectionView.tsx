import { motion } from "framer-motion";

import { Game } from "~/types";

import GameCardPresenter from "../gameCard/gameCardPresenter";

interface GameCollectionViewProps {
  games?: Game[];
}

export default function GameCollectionView({ games }: GameCollectionViewProps) {
  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 900 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {games?.map(game => (
        <GameCardPresenter key={game.id} game={game} />
      ))}
    </motion.div>
  );
}

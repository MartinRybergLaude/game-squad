import { Game } from "~/utils/types";

import GameCardView from "./gameCardView";

interface GameCardPresenterProps {
  game: Game;
}
export default function GameCardPresenter({ game }: GameCardPresenterProps) {
  return <GameCardView title={game.name} description={game.summary} image={game.cover.url} />;
}

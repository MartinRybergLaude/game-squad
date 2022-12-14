import { Game, GenreObject, Genres } from "~/utils/types";

import GameCardView from "./gameCardView";

interface GameCardPresenterProps {
  game: Game;
}
export default function GameCardPresenter({ game }: GameCardPresenterProps) {
  return (
    <GameCardView
      title={game.name}
      genres={game.genres && game.genres.map(genre => Genres[genre as keyof GenreObject])}
      image={game?.cover?.url}
    />
  );
}

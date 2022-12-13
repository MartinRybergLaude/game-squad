import { Game, GenreObject, Genres } from "~/utils/types";

import SearchCardView from "./searchCardView";

// Yes this is bad
interface SearchCardViewProps {
  game: Game;
}

export default function SearchCardPresenter({ game }: SearchCardViewProps) {
  return (
    <SearchCardView
      image={
        //Sometimes games lack image urls
        game.cover
          ? game.cover.url
            ? game.cover.url
            : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" // This is a lack-of-image-image
          : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" // We should probably replace it with something better!
      }
      title={game.name}
      description={game.summary}
      key={game.id}
      genres={game.genres && game.genres.map(genre => Genres[genre as keyof GenreObject])}
      price={"$0.00"}
    />
  );
}

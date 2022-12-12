import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getGenresByIds } from "~/api";
import { Game } from "~/types";

// Yes this is bad
interface GameGame {
  game: Game;
}

import SearchCard from "./searchCard";

export default function SearchCardPresenter(game: GameGame) {
  if (game) {
    const g = game.game.genres;
    const { data } = useQuery(["genres"], () => getGenresByIds(g));

    return (
      <SearchCard
        image={
          //Sometimes games lack image urls
          game.game.cover
            ? game.game.cover.url
              ? game.game.cover.url
              : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" // This is a lack-of-image-image
            : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" // We should probably replace it with something better!
        }
        title={game.game.name}
        description={game.game.summary}
        key={game.game.id}
        genres={data}
        // This doesn't exist in the api fetch at the moment
        price={"$0.00"}
        // price={game.price} />;
      />
    );
  } else {
    return "Waiting...";
  }
}

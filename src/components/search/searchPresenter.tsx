import { useQuery } from "react-query";

import { getSelectedGames } from "~/api";
import { Game } from "~/types";

import SearchView from "./searchView";

interface GameCardPresenterProps {
  game: Game;
}

export default function SearchPresenter() {
  // return <SearchView title={game.name} description={game.summary} image={game.cover.url} />;

  const { data } = useQuery(["games"], () => getSelectedGames(["135400", "2", "3", "4"]));

  return data ? <SearchView games={data} /> : null;
}

import { useQuery } from "react-query";

import { getSelectedGames } from "~/api";
import { Game } from "~/types";

// import searchGame from "./searchFunction";
import SearchView from "./searchView";

interface GameCardPresenterProps {
  game: Game;
}

function searchGame(param: string) {
  if (param.length > 2) {
    return getSelectedGames([param], "search");
  }
}

export default function SearchPresenter() {
  function searchFunctionACB(input: string) {
    const { data } = useQuery(["games"], () => searchGame(input));
  }

  const { data } = useQuery(["games"], () => getSelectedGames(["Thief"], "search"));

  return data ? <SearchView games={data} searchFunction={searchFunctionACB} /> : null;
}

import React, { ChangeEvent, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import debouce from "lodash.debounce";

import { getGamesBySearch, multiplayerIds } from "~/utils/api";

import SearchView from "./searchView";

// Why was this necessary
interface SearchPresenterProp {
  players: number;
}

export default function SearchPresenter({ players }: SearchPresenterProp) {
  const [searchText, setSearchText] = React.useState("");
  const playerIds = multiplayerIds(players);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e ? setSearchText(e.target.value) : setSearchText("");
  };

  const { data: games, isLoading } = useQuery(["searchText", searchText], () =>
    getGamesBySearch(searchText, 20),
  );
  // const { data: games, isLoading } = playerIds
  //   ? useQuery(["searchText", searchText], () => getGamesBySearch(searchText, 20, playerIds))
  //   : { data: undefined, isLoading: true };
  // console.log(games);
  // console.log(isLoading);

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 1000); // Wait one second after user has stopped typing to begin searching
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return <SearchView games={games} loading={isLoading} searchGame={debouncedResults} />;
}

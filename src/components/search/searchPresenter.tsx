import React, { ChangeEvent, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import debouce from "lodash.debounce";

import { getGamesBySearch, getMultiplayerIds } from "~/utils/api";

import SearchView from "./searchView";

// Why was this necessary
interface SearchPresenterProp {
  players: number;
}

export default function SearchPresenter({ players }: SearchPresenterProp) {
  const [searchText, setSearchText] = React.useState("");
  const [playerIds, playerUpdate] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      const data = await getMultiplayerIds(players);
      const playerDict = Object.assign({}, ...data.map(x => ({ [x.id]: x.onlinecoopmax })));

      // UPDATE (not)
      playerUpdate(playerDict);
    };

    // call the function
    fetchData().catch(console.error);

    return () => {
      debouncedResults.cancel();
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e ? setSearchText(e.target.value) : setSearchText("");
  };

  let { data: games, isLoading } = useQuery(["searchText", searchText], () =>
    getGamesBySearch(searchText, 20, playerIds),
  );

  if (games == null) {
    isLoading = true;
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 1000); // Wait one second after user has stopped typing to begin searching
  }, []);

  return (
    <SearchView
      games={games}
      loading={isLoading}
      searchGame={debouncedResults}
      players={playerIds}
    />
  );
}

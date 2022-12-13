import React, { ChangeEvent, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import debouce from "lodash.debounce";

import { getGamesBySearch } from "~/utils/api";

import SearchView from "./searchView";

export default function SearchPresenter() {
  const [searchText, setSearchText] = React.useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e ? setSearchText(e.target.value) : setSearchText("");
  };

  const { data: games, isLoading } = useQuery(["searchText", searchText], () =>
    getGamesBySearch(searchText),
  );

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

import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import debouce from "lodash.debounce";

import { getGamesBySearch } from "~/api";

import SearchView from "./searchView";

// This number is arbitrary, it just has to be larger than current time at start
// const lastChecked = 99999999999;

export default function SearchPresenter() {
  const [searchText, setSearchText] = React.useState("");

  const handleChange = e => {
    e ? setSearchText(e.target.value) : setSearchText("");
  };

  const { data } = useQuery(["searchText", searchText], () => getGamesBySearch(searchText));

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 1000); // Wait one second after user has stopped typing to begin searching
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return <SearchView games={data} searchGame={debouncedResults} />;
}

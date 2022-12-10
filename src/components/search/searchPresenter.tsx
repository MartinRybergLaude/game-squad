import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getGamesBySearch } from "~/api";

import SearchView from "./searchView";

export default function SearchPresenter() {
  const [searchText, setSearchText] = React.useState("");

  const { data } = useQuery(["searchText", searchText], () => getGamesBySearch(searchText));

  return <SearchView games={data} searchGame={value => setSearchText(value)} />;
}

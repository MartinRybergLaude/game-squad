import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getGamesBySearch } from "~/utils/api";
import { useDebounce } from "~/utils/utils";

import SearchView from "./searchView";

export default function SearchPresenter() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const [loading, setLoading] = useState(false);

  const searchTextLongEnough = searchText.length > 0;

  const { data: games, isLoading } = useQuery(
    ["searchText", debouncedSearchText],
    () => getGamesBySearch(debouncedSearchText, 20),
    {
      enabled: Boolean(searchTextLongEnough),
    },
  );

  function handleSearchTextChanged(e: ChangeEvent<HTMLInputElement>) {
    if (e && e.target.value) {
      setSearchText(e.target.value);
      e.target.value.length > 0 ? setLoading(true) : setLoading(false);
    } else {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (isLoading && searchTextLongEnough) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <SearchView games={games} loading={loading} onSearchTextChanged={handleSearchTextChanged} />
  );
}

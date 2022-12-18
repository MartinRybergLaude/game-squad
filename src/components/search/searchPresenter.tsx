import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getGamesBySearch, getMultiplayerIds } from "~/utils/api";
import { MultiplayerModeObject } from "~/utils/types";
import { useDebounce } from "~/utils/utils";

import SearchView from "./searchView";

export default function SearchPresenter() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [multiplayerModes, setMultiplayerModes] = useState<MultiplayerModeObject | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  const searchTextLongEnough = searchText.length > 0;

  const players = 4;

  const { data: games, isLoading } = useQuery(
    ["searchText", debouncedSearchText, multiplayerModes],
    () => getGamesBySearch(debouncedSearchText, 20, multiplayerModes),
    {
      enabled: Boolean(searchTextLongEnough && multiplayerModes),
    },
  );

  console.log("games", games);

  const { data: multiplayerIdsData } = useQuery(["players", players], () =>
    getMultiplayerIds(players),
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

  useEffect(() => {
    if (multiplayerIdsData) {
      console.log("before", multiplayerIdsData);
      const transformedData = Object.assign(
        {},
        ...multiplayerIdsData.map(x => ({
          [x.id]: { coop: x.onlinecoopmax, online: x.onlinemax },
        })),
      ) as MultiplayerModeObject;
      console.log("transformed", transformedData);
      setMultiplayerModes(transformedData);
    }
  }, [multiplayerIdsData]);

  return (
    <SearchView
      games={games}
      loading={loading}
      onSearchTextChanged={handleSearchTextChanged}
      multiplayerModes={multiplayerModes}
    />
  );
}

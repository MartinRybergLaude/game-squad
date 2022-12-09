import React from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { getSelectedGames } from "~/api";

// import { Game } from "~/types";
// import searchGame from "./searchFunction";
// import searchProps from "./searchPropsStandIn";
import SearchView from "./searchView";

export default function SearchPresenter() {
  const [searchParams, setSearchParams] = React.useState("");
  // const [, reRender] = React.useState();

  // function notifyACB() {
  //   console.log("Refetch!");
  //   reRender(new Object());
  // }

  const searchGame = value => {
    // if (value.length > 2) {
    setSearchParams(value);
    // notifyACB();
    // }
  };
  const param = searchParams;
  const { data } = param
    ? useQuery(["games"], () => getSelectedGames([param], "search"))
    : useQuery(["games"], () => getSelectedGames(["thief"], "search"));

  return <SearchView games={data} searchGame={searchGame} />;
}

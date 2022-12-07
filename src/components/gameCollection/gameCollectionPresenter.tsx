import { useQuery } from "@tanstack/react-query";

import { getSelectedGames } from "~/api";

import GameCollectionView from "./gameCollectionView";

export default function GameCollectionPresenter() {
  const { data } = useQuery(["games"], () => getSelectedGames(["135400", "2", "3"]));

  return data ? <GameCollectionView games={data} /> : null;
}

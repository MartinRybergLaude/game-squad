import { useAtom } from "jotai";

import { selectedSquadGamesAtom } from "~/utils/store";

import GameCollectionView from "./gameCollectionView";

export default function GameCollectionPresenter() {
  const [games] = useAtom(selectedSquadGamesAtom);

  return <GameCollectionView games={games} />;
}

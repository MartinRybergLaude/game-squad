import { useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useQuery } from "@tanstack/react-query";
import { doc } from "firebase/firestore";
import { useAtom } from "jotai";

import { getSelectedGames } from "~/utils/api";
import { db } from "~/utils/firebaseConfig";
import {
  selectedSquadAtom,
  selectedSquadErrorAtom,
  selectedSquadGamesAtom,
  selectedSquadIdAtom,
  selectedSquadLoadingAtom,
  sidebarOpenAtom,
} from "~/utils/store";
import { Squad } from "~/utils/types";

import SquadScreenView from "./squadScreenView";

export default function SquadScreenPresenter() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const [selectedSquadId] = useAtom(selectedSquadIdAtom);
  const [squadData, loading, error] = useDocument(
    selectedSquadId ? doc(db, "squads", selectedSquadId) : null,
  );

  const [, setSelectedSquadGames] = useAtom(selectedSquadGamesAtom);
  const [selectedSquad, setSelectedSquad] = useAtom(selectedSquadAtom);
  const [, setSelectedSquadLoading] = useAtom(selectedSquadLoadingAtom);
  const [, setSelectedSquadError] = useAtom(selectedSquadErrorAtom);

  const {
    data: gameData,
    isLoading,
    error: gameError,
  } = useQuery({
    queryKey: ["games", selectedSquad?.games],
    queryFn: () =>
      getSelectedGames(
        selectedSquad && selectedSquad.games ? selectedSquad.games.map(game => game.id) : [],
      ),
  });

  useEffect(() => {
    if (squadData && gameData) {
      setSelectedSquad(squadData.data() as Squad);
      setSelectedSquadGames(gameData);
    } else {
      setSelectedSquad(undefined);
      setSelectedSquadGames([]);
    }
  }, [squadData, gameData]);

  useEffect(() => {
    setSelectedSquadLoading(loading || isLoading);
  }, [loading]);

  useEffect(() => {
    setSelectedSquadError(error || (gameError instanceof Error ? gameError : undefined));
  }, [error, gameError]);

  // Fetches the games belonging to the selected squad

  return (
    <SquadScreenView
      setSidebarOpen={setSidebarOpen}
      sidebarOpen={sidebarOpen}
      squad={squadData?.data() as Squad}
    />
  );
}

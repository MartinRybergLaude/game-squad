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
} from "~/utils/store";
import { BaseGame, Game, Squad } from "~/utils/types";

import SquadScreenView from "./squadScreenView";

export default function SquadScreenPresenter() {
  const [selectedSquadId] = useAtom(selectedSquadIdAtom);
  const [squadData, loading, error] = useDocument(
    selectedSquadId ? doc(db, "squads", selectedSquadId) : null,
  );

  const [, setSelectedSquadGames] = useAtom(selectedSquadGamesAtom);
  const [selectedSquad, setSelectedSquad] = useAtom(selectedSquadAtom);
  const [selectedSquadLoading, setSelectedSquadLoading] = useAtom(selectedSquadLoadingAtom);
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
    keepPreviousData: true,
  });

  function mergeGameData(apiGameData?: Game[] | null, squadGameData?: BaseGame[] | null): Game[] {
    try {
      if (!apiGameData || !squadGameData) return [];
      return squadGameData.map(game => {
        const apiGame = apiGameData.find(apiGame => apiGame.id === game.id);
        if (!apiGame) throw new Error("No game match!");
        return {
          ...game,
          ...apiGame,
        };
      });
    } catch (e) {
      return [];
    }
  }

  useEffect(() => {
    if (squadData) {
      const squad = squadData.data() as Squad;
      setSelectedSquad(squad);
      setSelectedSquadGames(mergeGameData(gameData, squad ? squad.games : null));
    } else {
      setSelectedSquad(undefined);
      setSelectedSquadGames([]);
    }
  }, [squadData, gameData]);

  useEffect(() => {
    setSelectedSquadLoading(loading || isLoading);
  }, [loading, isLoading]);

  useEffect(() => {
    setSelectedSquadError(error || (gameError instanceof Error ? gameError : undefined));
  }, [error, gameError]);

  return <SquadScreenView squad={selectedSquad} loading={selectedSquadLoading} />;
}

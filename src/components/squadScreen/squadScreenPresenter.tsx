import { useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useAtom } from "jotai";

import { db } from "~/firebaseConfig";
import {
  selectedSquadAtom,
  selectedSquadErrorAtom,
  selectedSquadIdAtom,
  selectedSquadLoadingAtom,
  sidebarOpenAtom,
} from "~/store";
import { Squad } from "~/types";

import SquadScreenView from "./squadScreenView";

export default function SquadScreenPresenter() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const [selectedSquadId] = useAtom(selectedSquadIdAtom);
  const [squadData, loading, error] = useDocument(
    selectedSquadId ? doc(db, "squads", selectedSquadId) : null,
  );

  const [, setSelectedSquad] = useAtom(selectedSquadAtom);
  const [, setSelectedSquadLoading] = useAtom(selectedSquadLoadingAtom);
  const [, setSelectedSquadError] = useAtom(selectedSquadErrorAtom);

  useEffect(() => {
    if (squadData) {
      setSelectedSquad(squadData.data() as Squad);
    } else {
      setSelectedSquad(undefined);
    }
  }, [squadData]);

  useEffect(() => {
    setSelectedSquadLoading(loading);
  }, [loading]);

  useEffect(() => {
    setSelectedSquadError(error);
  }, [error]);

  return (
    <SquadScreenView
      setSidebarOpen={setSidebarOpen}
      sidebarOpen={sidebarOpen}
      squad={squadData?.data() as Squad}
    />
  );
}

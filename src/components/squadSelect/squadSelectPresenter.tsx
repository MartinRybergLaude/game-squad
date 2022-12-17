import { useAuthState } from "react-firebase-hooks/auth";
import { useAtom } from "jotai";

import { auth } from "~/utils/firebaseConfig";
import {
  selectedSquadIdAtom,
  sidebarOpenAtom,
  squadsAtom,
  squadsErrorAtom,
  squadsLoadingAtom,
} from "~/utils/store";

import SquadSelectView from "./squadSelectView";

export default function SquadSelectPresenter() {
  const [user] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const [squads] = useAtom(squadsAtom);
  const [squadsLoading] = useAtom(squadsLoadingAtom);
  const [squadsError] = useAtom(squadsErrorAtom);
  const [selectedSquadId, setSelectedSquadId] = useAtom(selectedSquadIdAtom);

  function handleSelectSquadId(squadId: string) {
    setSelectedSquadId(squadId);
    setSidebarOpen(false);
  }
  return (
    <SquadSelectView
      sidebarOpen={sidebarOpen}
      squads={squads}
      squadsLoading={squadsLoading}
      squadsError={squadsError}
      onSelectSquadId={handleSelectSquadId}
      selectedSquadId={selectedSquadId}
      onCloseSidebar={() => setSidebarOpen(false)}
      user={user}
    />
  );
}

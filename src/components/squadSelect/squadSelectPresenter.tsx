import { useAtom } from "jotai";

import {
  selectedSquadIdAtom,
  sidebarOpenAtom,
  squadsAtom,
  squadsErrorAtom,
  squadsLoadingAtom,
} from "~/store";

import SquadSelectView from "./squadSelectView";

export default function SquadSelectPresenter() {
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
    />
  );
}

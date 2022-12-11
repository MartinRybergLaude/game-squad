import { useAtom } from "jotai";

import {
  selectedSquadIdAtom,
  sidebarOpenAtom,
  squadsAtom,
  squadsErrorAtom,
  squadsLoadingAtom,
} from "~/store";

import GroupSelectView from "./squadSelectView";

export default function GroupSelectPresenter() {
  const [, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const [squads] = useAtom(squadsAtom);
  const [squadsLoading] = useAtom(squadsLoadingAtom);
  const [squadsError] = useAtom(squadsErrorAtom);
  const [selectedSquadId, setSelectedSquadId] = useAtom(selectedSquadIdAtom);

  function handleSelectSquadId(squadId: string) {
    setSelectedSquadId(squadId);
    setSidebarOpen(false);
  }
  return (
    <GroupSelectView
      squads={squads}
      squadsLoading={squadsLoading}
      squadsError={squadsError}
      onSelectSquadId={handleSelectSquadId}
      selectedSquadId={selectedSquadId}
      onCloseSidebar={() => setSidebarOpen(false)}
    />
  );
}

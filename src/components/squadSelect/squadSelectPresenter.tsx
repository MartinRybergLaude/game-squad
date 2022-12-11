import { useAtom } from "jotai";

import { selectedSquadIdAtom, sidebarOpenAtom, squadsAtom } from "~/store";

import GroupSelectView from "./squadSelectView";

export default function GroupSelectPresenter() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const [squads] = useAtom(squadsAtom);
  const [selectedSquadId, setSelectedSquadId] = useAtom(selectedSquadIdAtom);

  function handleSelectSquadId(squadId: string) {
    setSelectedSquadId(squadId);
    setSidebarOpen(false);
  }
  return (
    <GroupSelectView
      squads={squads}
      onSelectSquadId={handleSelectSquadId}
      selectedSquadId={selectedSquadId}
      onCloseSidebar={() => setSidebarOpen(false)}
    />
  );
}

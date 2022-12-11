import { useAtom } from "jotai";

import { sidebarOpenAtom } from "~/store";

import SquadScreenView from "./squadScreenView";

export default function SquadScreenPresenter() {
  const [_, setSidebarOpen] = useAtom(sidebarOpenAtom);

  return <SquadScreenView setSidebarOpen={setSidebarOpen} />;
}

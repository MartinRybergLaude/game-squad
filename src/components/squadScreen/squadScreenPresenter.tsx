import { useAtom } from "jotai";

import { sidebarOpenAtom } from "~/store";

import SquadScreenView from "./squadScreenView";

export default function SquadScreenPresenter() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSidebarOpen] = useAtom(sidebarOpenAtom);

  return <SquadScreenView setSidebarOpen={setSidebarOpen} />;
}

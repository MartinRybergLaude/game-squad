import { useAtom } from "jotai";

import { settingsModalOpenAtom } from "~/dashboardStore";

import { SidebarView } from "./sidebarView";

export default function SidebarPresenter() {
  const [settingsModalOpen, setSettingsModalOpen] = useAtom(settingsModalOpenAtom);

  return <SidebarView openSettingsModal={() => setSettingsModalOpen(true)} />;
}

import { useAtom } from "jotai";

import { settingsModalOpenAtom } from "~/dashboardStore";

import { SidebarView } from "./sidebarView";

export default function SidebarPresenter() {
  return <SidebarView />;
}

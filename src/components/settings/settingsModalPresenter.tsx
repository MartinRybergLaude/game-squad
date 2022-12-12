import { useAtom } from "jotai";

import { settingsModalOpenAtom } from "~/dashboardStore";

import SettingsModalView from "./settingsModalView";

export default function SettingsModalPresenter() {
  return <SettingsModalView />;
}

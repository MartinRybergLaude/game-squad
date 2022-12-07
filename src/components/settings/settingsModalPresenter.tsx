import { useAtom } from "jotai";
import { settingsModalOpenAtom } from "~/dashboardStore";
import SettingsModalView from "./settingsModalView";


export default function SettingsModalPresenter() {
  const [settingsModalOpen, setSettingsModalOpen] = useAtom(settingsModalOpenAtom)
  
  return <SettingsModalView opened={settingsModalOpen} onClose={() => setSettingsModalOpen(false)}/>;
}
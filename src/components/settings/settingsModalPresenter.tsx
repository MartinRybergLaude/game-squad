import { useAuthState } from "react-firebase-hooks/auth";
import { useMantineColorScheme } from "@mantine/core";

import { auth } from "~/utils/firebaseConfig";

import SettingsModalView from "./settingsModalView";

export default function SettingsModalPresenter() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [user] = useAuthState(auth);

  return (
    <SettingsModalView
      user={user}
      colorScheme={colorScheme}
      toggleCOlorScheme={toggleColorScheme}
    />
  );
}

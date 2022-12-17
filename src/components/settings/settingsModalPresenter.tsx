import { useAuthState } from "react-firebase-hooks/auth";
import { NavigateFunction } from "react-router";
import { useMantineColorScheme } from "@mantine/core";

import { auth } from "~/utils/firebaseConfig";

import SettingsModalView from "./settingsModalView";

export interface UpdateFormValues {
  password: string;
  passwordConfirm: string;
}

export interface routeLoginPageFuncs {
  navigate: NavigateFunction;
  signOut: () => Promise<boolean>;
}

export default function SettingsModalPresenter() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [user] = useAuthState(auth);

  return (
    <SettingsModalView
      user={user}
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    />
  );
}

import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";

import { sidebarOpenAtom } from "~/store";

import SquadScreenView from "./squadScreenView";

export default function SquadScreenPresenter() {
  const [, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const theme = useMantineTheme();

  const hideBurger = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);

  return <SquadScreenView setSidebarOpen={setSidebarOpen} showBurger={!hideBurger} />;
}

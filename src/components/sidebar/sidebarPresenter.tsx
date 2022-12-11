import { useEffect } from "react";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";

import { sidebarOpenAtom } from "~/store";

import SidebarView from "./sidebarView";

export default function SidebarPresenter() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const theme = useMantineTheme();

  const hideSidebarOnViewportChange = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);

  useEffect(() => {
    if (hideSidebarOnViewportChange) {
      setSidebarOpen(false);
    }
  }, [hideSidebarOnViewportChange]);

  return <SidebarView sidebarOpen={sidebarOpen} />;
}

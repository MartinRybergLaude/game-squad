import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";

import { sidebarOpenAtom } from "~/store";

import SidebarView from "./sidebarView";

export default function SidebarPresenter() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const hideSidebarOnViewportChange = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (hideSidebarOnViewportChange) {
      setSidebarOpen(false);
    }
  }, [hideSidebarOnViewportChange]);

  return <SidebarView sidebarOpen={sidebarOpen} />;
}

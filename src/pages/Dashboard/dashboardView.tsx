import { AppShell } from "@mantine/core";

import NoSquadsPresenter from "~/components/noSquads/noSquadsPresenter";
import SidebarPresenter from "~/components/sidebar/sidebarPresenter";
import SquadScreenPresenter from "~/components/squadScreen/squadScreenPresenter";

interface DashboardViewProps {
  hasSquads: boolean;
}
export default function DashboardView({ hasSquads }: DashboardViewProps) {
  return (
    <AppShell navbarOffsetBreakpoint="sm" navbar={<SidebarPresenter />}>
      {hasSquads ? <SquadScreenPresenter /> : <NoSquadsPresenter />}
    </AppShell>
  );
}

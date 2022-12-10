import { AppShell, Title } from "@mantine/core";

import GameCollectionPresenter from "~/components/gameCollection/gameCollectionPresenter";
import NoSquadsPresenter from "~/components/noSquads/noSquadsPresenter";
import SidebarPresenter from "~/components/sidebar/sidebarPresenter";

export default function DashboardView() {
  return (
    <AppShell navbar={<SidebarPresenter />}>
      <Title order={1}>Dashboard</Title>
      <NoSquadsPresenter />
      {/* <GameCollectionPresenter /> */}
    </AppShell>
  );
}

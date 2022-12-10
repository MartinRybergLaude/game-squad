import { AppShell, Title } from "@mantine/core";

import GameCollectionPresenter from "~/components/gameCollection/gameCollectionPresenter";
import NoSquadsPresenter from "~/components/noSquads/noSquadsPresenter";
import SidebarPresenter from "~/components/sidebar/sidebarPresenter";

interface DashboardViewProps {
  hasSquads: boolean;
}
export default function DashboardView({ hasSquads }: DashboardViewProps) {
  return (
    <AppShell navbar={<SidebarPresenter />}>
      <Title order={1}>{}</Title>
      {hasSquads ? <GameCollectionPresenter /> : <NoSquadsPresenter />}
    </AppShell>
  );
}

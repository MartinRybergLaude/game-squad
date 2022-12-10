import { AppShell, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import SidebarPresenter from "~/components/sidebar/sidebarPresenter";

import GameCollectionPresenter from "../../components/gameCollection/gameCollectionView";

export default function DashboardView() {
  return (
    <AppShell navbar={<SidebarPresenter />}>
      <Title order={1}>Dashboard</Title>
    </AppShell>
  );
}

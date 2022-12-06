import { AppShell, Center, createStyles, Grid, Title } from "@mantine/core";

import SidebarPresenter from "~/components/sidebar/sidebarPresenter";

import { GameCollectionView } from "../../components/gameCollection/gameCollectionView";

const useStyles = createStyles(theme => ({
  formCenter: {
    height: "100vh",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: "auto",
    },
  },
}));

export default function DashboardView() {
  const { classes } = useStyles();

  return (
    <AppShell navbar={<SidebarPresenter />}>
      <Title order={1}>Dashboard</Title>
    </AppShell>
  );
}

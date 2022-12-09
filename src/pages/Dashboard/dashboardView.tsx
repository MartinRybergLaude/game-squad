import { useState } from "react";
import { AppShell, Button, Center, createStyles, Grid, Modal, Title } from "@mantine/core";
import { Provider } from "jotai";

import SettingsModalPresenter from "~/components/settings/settingsModalPresenter";
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
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  function openSettingsModal() {
    setShowSettingsModal(prev => !prev);
  }

  return (
    <Provider>
      <AppShell navbar={<SidebarPresenter />}>
        <Title order={1}>Dashboard</Title>
        <Button onClick={openSettingsModal}>Open Settings</Button>
        <SettingsModalPresenter />
        <GameCollectionView />
      </AppShell>
    </Provider>
  );
}

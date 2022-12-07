import { AppShell, Center, createStyles, Grid, Modal, Title, Button } from "@mantine/core";
import { useState } from "react";

import SidebarPresenter from "~/components/sidebar/sidebarPresenter";

import { GameCollectionView } from "../../components/gameCollection/gameCollectionView";
import { SettingsModal }from "../../components/settings/settingsView"; // Should actually be the presenter


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
    <AppShell navbar={<SidebarPresenter openSettingsModal={openSettingsModal}/>}>
        <Title order={1}>Dashboard</Title>
        <Button onClick={openSettingsModal}>Open Settings</Button>
        <SettingsModal showSettingsModal={showSettingsModal} setShowSettingsModal={setShowSettingsModal}/>
        <GameCollectionView />
    </AppShell>
  );
}

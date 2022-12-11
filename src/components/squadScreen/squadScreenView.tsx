import { Burger, createStyles, Text, Title } from "@mantine/core";

import { Squad } from "~/types";

import GameCollectionPresenter from "../gameCollection/gameCollectionPresenter";
import LoaderScreenPresenter from "../loaderScreen/loaderScreenPresenter";

const useStyles = createStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    gap: theme.spacing.lg,
    paddingTop: 8,
    paddingInline: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
}));

interface SquadScreenViewProps {
  setSidebarOpen: (sidebarOpen: boolean) => void;
  showBurger: boolean;
  squad?: Squad;
  loading?: boolean;
  error?: Error;
}

export default function SquadScreenView({
  setSidebarOpen,
  showBurger,
  squad,
  loading,
  error,
}: SquadScreenViewProps) {
  const { classes } = useStyles();
  if (loading) return <LoaderScreenPresenter />;
  if (error) return <Text color="red">{error.message}</Text>;
  if (!squad) return null;
  return (
    <>
      <header className={classes.header}>
        {showBurger && <Burger onClick={() => setSidebarOpen(true)} opened={false} />}
        <Title order={3}>{squad.name}</Title>
      </header>
      <GameCollectionPresenter />
    </>
  );
}

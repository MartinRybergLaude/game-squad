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
  headerTitle: {
    marginBottom: -2,
    fontSize: theme.fontSizes.lg,

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.xl,
    },
  },
  burger: {
    display: "block",
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
}));

interface SquadScreenViewProps {
  setSidebarOpen: (sidebarOpen: boolean) => void;
  sidebarOpen: boolean;
  squad?: Squad;
  loading?: boolean;
  error?: Error;
}

export default function SquadScreenView({
  setSidebarOpen,
  sidebarOpen,
  squad,
  loading,
  error,
}: SquadScreenViewProps) {
  const { classes } = useStyles();
  return (
    <>
      <header className={classes.header}>
        <Burger
          size="sm"
          onClick={() => setSidebarOpen(true)}
          opened={sidebarOpen}
          className={classes.burger}
        />

        <Title order={2} className={classes.headerTitle} style={{ opacity: squad ? 1 : 0 }}>
          {squad?.name || "Loading..."}
        </Title>
      </header>
      {loading ? (
        <LoaderScreenPresenter />
      ) : error ? (
        <Text color="red">{error.message}</Text>
      ) : (
        <GameCollectionPresenter />
      )}
    </>
  );
}

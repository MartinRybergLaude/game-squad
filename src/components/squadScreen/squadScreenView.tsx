import { Burger, createStyles, Grid, Title } from "@mantine/core";
import { IconArrowUpLeft } from "@tabler/icons";
import { AnimatePresence } from "framer-motion";

import { Squad } from "~/types";

import GameCollectionPresenter from "../gameCollection/gameCollectionPresenter";

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
  noSquad: boolean;
  squad?: Squad;
  error?: Error;
}

export default function SquadScreenView({
  setSidebarOpen,
  sidebarOpen,
  squad,
  noSquad,
}: SquadScreenViewProps) {
  const { classes } = useStyles();
  if (!noSquad) {
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
        <AnimatePresence>{squad && <GameCollectionPresenter />}</AnimatePresence>
      </>
    );
  } else {
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
            {
              //vet inte vad som ska vara här
            }
          </Title>
        </header>
        <Grid>
          <IconArrowUpLeft size={50} stroke={4} />
          <p>You have no squads! Create or join one over here!</p>
        </Grid>

        <AnimatePresence>{squad && <GameCollectionPresenter />}</AnimatePresence>
      </>
    );
  }
}

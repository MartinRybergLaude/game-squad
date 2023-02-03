import { useEffect, useState } from "react";
import { Burger, Button, createStyles, Group, Text, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconUserCheck } from "@tabler/icons";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";

import { Squad } from "~/utils/types";

import CreateSquadModalPresenter from "../createSquadModal/createSquadModalPresenter";
import JoinSquadModalPresenter from "../joinSquadModal/joinSquadModalPresenter";
import LoaderScreenPresenter from "../loaderScreen/loaderScreenPresenter";

const useStyles = createStyles(theme => ({
  btn: {
    marginTop: theme.spacing.sm,
    paddingLeft: 8,
    "> div": {
      justifyContent: "space-between",
    },
  },
  bottomDivider: {
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  burger: {
    marginLeft: 4,
    display: "block",
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
  headerTitle: {
    marginLeft: 4,
    marginBottom: -2,
    fontSize: theme.fontSizes.lg,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.xl,
    },
  },
}));

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

interface GroupSelectViewProps {
  sidebarOpen: boolean;
  squads: Squad[];
  squadsLoading?: boolean;
  squadsError?: FirebaseError;
  selectedSquadId: string | null;
  onSelectSquadId: (squadId: string) => void;
  onCloseSidebar: () => void;
  user?: User | null;
}

export default function SquadSelectView({
  sidebarOpen,
  squads,
  squadsLoading,
  squadsError,
  selectedSquadId,
  onSelectSquadId,
  onCloseSidebar,
  user,
}: GroupSelectViewProps) {
  const { classes } = useStyles();
  const [openBurger, setOpenBurger] = useState(false);

  // Burger icon animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpenBurger(sidebarOpen);
    }, 10);
    return () => clearTimeout(timeout);
  }, [sidebarOpen]);

  function getButtonVariant(squad: Squad) {
    if (selectedSquadId && selectedSquadId === squad.id) {
      return "light";
    } else {
      return "subtle";
    }
  }

  return (
    <>
      <Group align="center">
        <Burger
          size="sm"
          opened={openBurger}
          onClick={() => onCloseSidebar()}
          className={classes.burger}
        />
        <Title className={classes.headerTitle} order={3}>
          Squads
        </Title>
      </Group>
      <Group grow mt={16} className={classes.bottomDivider}>
        <Button
          compact
          radius="sm"
          onClick={() => {
            openModal({
              title: "Create Squad",
              children: <CreateSquadModalPresenter />,
            });
          }}
        >
          Create
        </Button>
        <Button
          variant="subtle"
          radius="sm"
          compact
          onClick={() => {
            openModal({
              title: "Join Squad",
              children: <JoinSquadModalPresenter />,
            });
          }}
        >
          Join
        </Button>
      </Group>
      <div style={{ width: "100%", height: "auto", minHeight: "128px", position: "relative" }}>
        <AnimatePresence>
          {squadsLoading && <LoaderScreenPresenter spinnerSize="md" />}
        </AnimatePresence>
        {squadsError && <Text color="red">{squadsError.message}</Text>}
        <AnimatePresence>
          {squads.length > 0 && (
            <motion.div variants={containerAnimation} initial="hidden" animate="show">
              {squads.map(squad => {
                const isOwner = squad.owner === user?.uid;
                return (
                  <motion.div key={squad.id} variants={childAnimation}>
                    <Button
                      className={classes.btn}
                      fullWidth
                      variant={getButtonVariant(squad)}
                      onClick={() => onSelectSquadId(squad.id)}
                      rightIcon={isOwner && <IconUserCheck size={18} />}
                    >
                      {squad.name}
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

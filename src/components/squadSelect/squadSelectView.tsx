import { ActionIcon, Button, createStyles, Group, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconArrowLeft } from "@tabler/icons";
import { useAtom } from "jotai";

import { selectedSquadIdAtom, squadsAtom } from "~/store";
import { Squad } from "~/types";

import CreateSquadModalPresenter from "../createSquadModal/createSquadModalPresenter";

const useStyles = createStyles(theme => ({
  btn: {
    marginTop: theme.spacing.sm,
    paddingLeft: 8,
    "> div": {
      justifyContent: "flex-start",
    },
  },
  bottomDivider: {
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  backButton: {
    width: 32,
    height: 32,
    display: "block",
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
}));

interface GroupSelectViewProps {
  squads: Squad[];
  selectedSquadId: string | null;
  onSelectSquadId: (squadId: string) => void;
  onCloseSidebar: () => void;
}

export default function GroupSelectView({
  squads,
  selectedSquadId,
  onSelectSquadId,
  onCloseSidebar,
}: GroupSelectViewProps) {
  const { classes } = useStyles();

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
        <ActionIcon onClick={() => onCloseSidebar()} className={classes.backButton}>
          <IconArrowLeft size={32} />
        </ActionIcon>
        <Title ml={8} order={3} mt={2}>
          Squads
        </Title>
      </Group>
      <Group grow mt={16} className={classes.bottomDivider}>
        <Button
          compact
          onClick={() => {
            openModal({
              title: "Create Squad",
              children: <CreateSquadModalPresenter />,
            });
          }}
        >
          Create
        </Button>
        <Button variant="outline" compact>
          Join
        </Button>
      </Group>
      {squads.map(squad => (
        <Button
          className={classes.btn}
          fullWidth
          key={squad.id}
          variant={getButtonVariant(squad)}
          onClick={() => onSelectSquadId(squad.id)}
        >
          {squad.name}
        </Button>
      ))}
    </>
  );
}

import { Button, createStyles, Group, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
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
}));

export default function GroupSelectView() {
  const [squads] = useAtom(squadsAtom);
  const [selectedSquadId, setSelectedSquadId] = useAtom(selectedSquadIdAtom);

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
      <Title ml={8} order={3}>
        Squads
      </Title>
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
          onClick={() => setSelectedSquadId(squad.id)}
        >
          {squad.name}
        </Button>
      ))}
    </>
  );
}

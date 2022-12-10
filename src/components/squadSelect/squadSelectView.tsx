import { Button, createStyles, Title } from "@mantine/core";
import { useAtom } from "jotai";

import { selectedSquadIdAtom, squadsAtom } from "~/store";
import { Squad } from "~/types";

const useStyles = createStyles(theme => ({
  btn: {
    marginTop: theme.spacing.md,
    "> div": {
      justifyContent: "flex-start",
    },
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
      <Title ml={16} order={3}>
        Squads
      </Title>
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

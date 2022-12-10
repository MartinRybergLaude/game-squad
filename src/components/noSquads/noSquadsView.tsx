import { Button, Group, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";

import CreateSquadModalPresenter from "../createSquadModal/createSquadModalPresenter";

export default function NoSquadsView() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title order={2}>Create or join a squad</Title>
      <Group mt={16}>
        <Button
          variant="filled"
          size="lg"
          onClick={() => {
            openModal({
              title: "Create Squad",
              children: <CreateSquadModalPresenter />,
            });
          }}
        >
          Create
        </Button>
        <Button variant="outline" size="lg">
          Join
        </Button>
      </Group>
    </div>
  );
}

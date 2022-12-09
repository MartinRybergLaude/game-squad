// THIS FILE SHOULD NOT EXIST
// It is only a fill-in for dashboard modal UI

import { useState } from "react";
import { Button, Group, Modal } from "@mantine/core";

// import SearchView from "./searchView";
import SearchPresenter from "./searchPresenter";

export default function ModalView() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} size="xl" title="Add game:">
        {<SearchPresenter />}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}

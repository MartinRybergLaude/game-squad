import { useState } from "react";
import { Form } from "react-router-dom";
import { ClassNames } from "@emotion/react";
import { Button, createStyles, Group, Modal, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconSettings } from "@tabler/icons";

import UpdateUsernameModalPresenter from "../updateUsername/updateUsernameModalPresenter";

const openDeleteModal = () =>
  openConfirmModal({
    title: "Delete your profile",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete your profile? This action is permanent, and there is no
        support that would bother helping you retreive it. We&apos;re busy.
      </Text>
    ),
    labels: { confirm: "Yes, delete everything (within reason)", cancel: "No don't delete it" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => console.log("Confirmed"),
  });

export default function SettingsModalView() {
  return (
    <>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="Theme" icon={<IconSettings size={14} />}>
            Theme
          </Tabs.Tab>
          <Tabs.Tab value="Account" icon={<IconSettings size={14} />}>
            Account
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Theme" pt="xs">
          <Group>
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="Account" pt="xs">
          <div>
            <Group mt={16} position="apart" grow>
              Change name
              <Button
                onClick={() => {
                  openModal({
                    title: "Change username",
                    children: <UpdateUsernameModalPresenter />,
                  });
                }}
              >
                Click here
              </Button>
            </Group>
            <Group mt={16} position="apart" grow>
              Change Email
              <Button variant="outline">1</Button>
            </Group>
            <Group mt={16} position="apart" grow>
              Change password
              <Button variant="outline">1</Button>
            </Group>
            <Group mt={16} position="apart" grow>
              Delete account
              <Button onClick={openDeleteModal} color="red">
                Delete
              </Button>
            </Group>
          </div>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

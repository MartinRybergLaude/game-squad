import { useState } from "react";
import { Button, Group, Modal, Tabs, Text } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconSettings } from "@tabler/icons";

interface SettingsModalViewProps {
  opened: boolean;
  onClose: () => void;
}

const openDeleteModal = () =>
  openConfirmModal({
    title: "Delete your profile",
    centered: true,
    children: (
      <Text size="sm">
        Are you sure you want to delete your profile? This action is destructive and you will have
        to contact support to restore your data.
      </Text>
    ),
    labels: { confirm: "Delete account", cancel: "No don't delete it" },
    confirmProps: { color: "red" },
    onCancel: () => console.log("Cancel"),
    onConfirm: () => console.log("Confirmed"),
  });

export default function SettingsModalView({ opened, onClose }: SettingsModalViewProps) {
  return (
    <>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="Account" icon={<IconSettings size={14} />}>
            Account
          </Tabs.Tab>
          <Tabs.Tab value="Theme" icon={<IconSettings size={14} />}>
            Theme
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Account" pt="xs">
          <Group>
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="Theme" pt="xs">
          <div>
            <Group mt={16} position="apart" grow>
              Change name
              <Button variant="outline">1</Button>
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

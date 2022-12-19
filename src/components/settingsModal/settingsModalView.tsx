import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconEdit } from "@tabler/icons";
import { User } from "firebase/auth";

import DeleteProfileModalPresenter from "../deleteProfile/deleteProfileModalPresenter";
import UpdateEmailModalPresenter from "../updateEmailModal/updateEmailModalPresenter";
import UpdatePasswordModalPresenter from "../updatePasswordModal/updatePasswordModalPresenter";

interface SettingsViewProps {
  user: User | null | undefined;
}

export default function SettingsModalView({ user }: SettingsViewProps) {
  return (
    <>
      <div>
        <Group mt={16} position="apart">
          Change Email
          <Group position="right" spacing="xs">
            <Text fz="sm" fs="italic" fw={700}>
              {user?.email}
            </Text>
            <ActionIcon
              color="dark.3"
              ml={-12}
              mt={4}
              variant="transparent"
              onClick={() => {
                openModal({
                  title: "Change email",
                  children: <UpdateEmailModalPresenter />,
                });
              }}
              title="Change email"
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Group>
        </Group>
        <Group mt={16} position="apart">
          Change password
          <Group position="right" spacing="xs">
            <Text fz="sm" fs="italic" fw={700}>
              **********
            </Text>
            <ActionIcon
              color="dark.3"
              ml={-12}
              mt={4}
              variant="transparent"
              onClick={() => {
                openModal({
                  title: "Change password",
                  children: <UpdatePasswordModalPresenter />,
                });
              }}
              title="Change password"
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Group>
        </Group>
        <Group mt={16} position="center">
          <Button
            size="md"
            color="red"
            onClick={() => {
              openModal({
                title: "Delete your profile",
                centered: true,
                children: <DeleteProfileModalPresenter />,
              });
            }}
          >
            Delete account
          </Button>
        </Group>
      </div>
    </>
  );
}

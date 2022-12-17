import { NavigateFunction } from "react-router";
import { ActionIcon, Button, ColorScheme, Group, Tabs, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconEdit, IconMoonStars, IconSettings, IconSun } from "@tabler/icons";
import { User } from "firebase/auth";

import DeleteProfileModalPresenter from "../deleteProfile/deleteProfileModalPresenter";
import UpdateEmailModalPresenter from "../updateEmail/updateEmailModalPresenter";
import UpdatePasswordModalPresenter from "../updatePassword/updatePasswordModalPresenter";
import UpdateUsernameModalPresenter from "../updateUsername/updateUsernameModalPresenter";

interface SettingsViewProps {
  user: User | null | undefined;
  colorScheme: string;
  toggleColorScheme: (colorScheme?: ColorScheme | undefined) => void;
  navigate: NavigateFunction;
  signOut: () => Promise<boolean>;
}

export default function SettingsModalView({
  user,
  colorScheme,
  toggleColorScheme,
  navigate,
  signOut,
}: SettingsViewProps) {
  const dark = colorScheme === "dark";

  return (
    <>
      <Tabs defaultValue="Account">
        <Tabs.List>
          <Tabs.Tab value="Account" icon={<IconSettings size={14} />}>
            Account
          </Tabs.Tab>
          <Tabs.Tab value="Theme" icon={<IconSettings size={14} />}>
            Theme
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Account" pt="xs">
          <div>
            <Group mt={16} position="apart">
              Current username
              <Group position="right" spacing="xs">
                <Text fz="sm" align="right" fs="italic" fw={700}>
                  {user?.displayName}
                </Text>
                <ActionIcon
                  color="dark.3"
                  ml={-12}
                  mt={4}
                  variant="transparent"
                  onClick={() => {
                    openModal({
                      title: "Username",
                      children: (
                        <UpdateUsernameModalPresenter navigate={navigate} signOut={signOut} />
                      ),
                    });
                  }}
                  title="Change username"
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Group>
            </Group>
            <Group mt={16} position="apart" grow>
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
            <Group mt={16} position="apart" grow>
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
        </Tabs.Panel>
        <Tabs.Panel value="Theme" pt="xs">
          <Group position="center">
            <ActionIcon
              variant="outline"
              color={dark ? "white" : "dark"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={40} /> : <IconMoonStars size={40} />}
            </ActionIcon>
          </Group>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

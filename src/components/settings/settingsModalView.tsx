import { ActionIcon, Button, Group, Tabs, useMantineColorScheme } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconMoonStars, IconSettings, IconSun } from "@tabler/icons";

import DeleteProfileModalPresenter from "../deleteProfile/deleteProfileModalPresenter";
import UpdateEmailModalPresenter from "../updateEmail/updateEmailModalPresenter";
import UpdatePasswordModalPresenter from "../updatePassword/updatePasswordModalPresenter";
import UpdateUsernameModalPresenter from "../updateUsername/updateUsernameModalPresenter";

export default function SettingsModalView() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

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
              <Button
                onClick={() => {
                  openModal({
                    title: "Change email",
                    children: <UpdateEmailModalPresenter />,
                  });
                }}
              >
                Click here
              </Button>
            </Group>
            <Group mt={16} position="apart" grow>
              Change password
              <Button
                onClick={() => {
                  openModal({
                    title: "Change password",
                    children: <UpdatePasswordModalPresenter />,
                  });
                }}
              >
                Click here
              </Button>
            </Group>
            <Group mt={16} position="apart" grow>
              Delete account
              <Button
                color="red"
                onClick={() => {
                  openModal({
                    title: "Delete your profile",
                    centered: true,
                    children: <DeleteProfileModalPresenter />,
                  });
                }}
              >
                Delete
              </Button>
            </Group>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Theme" pt="xs">
          <Group>
            <ActionIcon
              variant="outline"
              color={dark ? "white" : "dark"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={24} /> : <IconMoonStars size={24} />}
            </ActionIcon>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
          </Group>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

import { ActionIcon, Burger, createStyles, Group, Menu, Text, Title } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconDoorExit, IconDotsVertical, IconTrash } from "@tabler/icons";

import { Squad } from "~/utils/types";

const useStyles = createStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.lg,
    paddingTop: 8,
    paddingInline: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  headerTitle: {
    marginBottom: -2,
    fontSize: theme.fontSizes.lg,

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: theme.fontSizes.xl,
    },
  },
  burger: {
    display: "block",
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: "none",
    },
  },
}));

interface SquadScreenHeaderViewProps {
  onSidebarOpen: () => void;
  sidebarOpen: boolean;
  squad?: Squad;
  isOwner: boolean;
  onDeleteOrLeaveSquad: () => void;
}

export function SquadScreenHeaderView({
  squad,
  onSidebarOpen,
  sidebarOpen,
  isOwner,
  onDeleteOrLeaveSquad,
}: SquadScreenHeaderViewProps) {
  const { classes } = useStyles();

  return (
    <header className={classes.header}>
      <Group noWrap>
        <Burger
          size="sm"
          onClick={() => onSidebarOpen()}
          opened={sidebarOpen}
          className={classes.burger}
        />

        <Title order={2} className={classes.headerTitle} style={{ opacity: squad ? 1 : 0 }}>
          {squad?.name || "Loading..."}
        </Title>
      </Group>
      {squad && (
        <Menu shadow="xl" width={156} position="bottom-end" withArrow>
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {isOwner ? (
              <Menu.Item
                color="red"
                icon={<IconTrash />}
                onClick={() =>
                  openConfirmModal({
                    title: `Delete ${squad.name}?`,
                    centered: true,
                    children: (
                      <Text size="sm">
                        {`Are you sure you want to delete ${squad.name}? This action cannot be undone.`}
                      </Text>
                    ),
                    labels: { confirm: "Delete squad", cancel: "Cancel" },
                    confirmProps: { color: "red" },
                    onCancel: () => null,
                    onConfirm: () => onDeleteOrLeaveSquad(),
                  })
                }
              >
                Delete squad
              </Menu.Item>
            ) : (
              <Menu.Item icon={<IconDoorExit />} onClick={() => onDeleteOrLeaveSquad()}>
                Leave squad
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      )}
    </header>
  );
}

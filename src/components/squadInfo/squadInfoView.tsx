import { ActionIcon, Button, Card, Group, Text } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconRefresh } from "@tabler/icons";

import { Squad } from "~/utils/types";

import SearchPresenter from "../search/searchPresenter";

interface SquadInfoViewProps {
  squad: Squad;
  isOwner: boolean;
  onRefreshCode: () => void;
  refreshCodeLoading?: boolean;
  refreshCodeError?: Error;
}
export default function SquadInfoView({
  squad,
  isOwner,
  onRefreshCode,
  refreshCodeLoading,
  refreshCodeError,
}: SquadInfoViewProps) {
  const openConfirmRefreshModal = () =>
    openConfirmModal({
      title: "Are you sure?",
      children: (
        <Text size="sm">
          Refreshing the code prevent people from using the old code. This action cannot be undone.
          Are you sure you want to refresh the code?
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => closeAllModals(),
      onConfirm: () => onRefreshCode(),
    });

  return (
    <Card>
      <Group>
        <Card withBorder>
          <Group>
            <Text weight={500}>
              Invite code: <span style={{ fontWeight: 800 }}>{squad.invite_code}</span>
            </Text>
            {isOwner && (
              <ActionIcon onClick={openConfirmRefreshModal} loading={refreshCodeLoading}>
                <IconRefresh />
              </ActionIcon>
            )}
          </Group>
          {refreshCodeError && (
            <Text size="sm" color="red">
              {refreshCodeError.message}
            </Text>
          )}
        </Card>
      </Group>
      <Button
        mt={16}
        variant="light"
        onClick={() =>
          openModal({
            title: "Add game",
            children: <SearchPresenter />,
          })
        }
      >
        Add game
      </Button>
    </Card>
  );
}

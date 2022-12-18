import { ActionIcon, Button, Card, Group, Text, Tooltip } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconRefresh } from "@tabler/icons";

import { getMultiplayerIds } from "~/utils/api";
import { Squad } from "~/utils/types";

import SearchPresenter from "../search/searchPresenter";

interface SquadInfoViewProps {
  squad: Squad;
  isOwner: boolean;
  onRefreshCode: () => void;
  refreshCodeLoading?: boolean;
  refreshCodeError?: Error;
  hasCopiedCode: boolean;
  onCopyCode: () => void;
}
export default function SquadInfoView({
  squad,
  isOwner,
  onRefreshCode,
  refreshCodeLoading,
  refreshCodeError,
  hasCopiedCode,
  onCopyCode,
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
        <Card withBorder style={{ overflow: "visible" }}>
          <Group>
            <Text weight={500}>
              Invite code:{" "}
              <Tooltip label={hasCopiedCode ? "Copied!" : "Click to copy"}>
                <span
                  style={{ fontWeight: 800, cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(squad.invite_code);
                    onCopyCode();
                  }}
                >
                  {squad.invite_code}
                </span>
              </Tooltip>
            </Text>
            {isOwner && (
              <ActionIcon size="sm" onClick={openConfirmRefreshModal} loading={refreshCodeLoading}>
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
            children: <SearchPresenter playerData={getMultiplayerIds(4)} />,
          })
        }
      >
        Add game
      </Button>
    </Card>
  );
}

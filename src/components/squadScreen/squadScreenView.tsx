import { Text } from "@mantine/core";

import { Squad } from "~/utils/types";

import GameCollectionPresenter from "../gameCollection/gameCollectionPresenter";
import SquadInfoPresenter from "../squadInfo/squadInfoPresenter";
import SquadScreenHeaderPresenter from "../squadScreenHeader/squadScreenHeaderPresenter";

interface SquadScreenViewProps {
  squad?: Squad;
}

export default function SquadScreenView({ squad }: SquadScreenViewProps) {
  return squad ? (
    <>
      <SquadScreenHeaderPresenter />
      <SquadInfoPresenter />
      <GameCollectionPresenter />
    </>
  ) : (
    <>
      <SquadScreenHeaderPresenter />
      <Text color="red.2" size={18} fw={800} align="center">
        You don&apos;t have any Squads!
      </Text>
      <Text color="red.2" size={18} fw={800} align="center">
        Create or Join one!
      </Text>
    </>
  );
}

import { Text } from "@mantine/core";

import { ReactComponent as ArrowSVG } from "~/assets/arrow.svg";
import { Squad } from "~/utils/types";

import GameCollectionPresenter from "../gameCollection/gameCollectionPresenter";
import SquadInfoPresenter from "../squadInfo/squadInfoPresenter";
import SquadScreenHeaderPresenter from "../squadScreenHeader/squadScreenHeaderPresenter";

interface SquadScreenViewProps {
  squad?: Squad;
  loading?: boolean;
}

export default function SquadScreenView({ squad, loading }: SquadScreenViewProps) {
  return squad || loading ? (
    <>
      <SquadScreenHeaderPresenter />
      <SquadInfoPresenter />
      <GameCollectionPresenter />
    </>
  ) : (
    <>
      <SquadScreenHeaderPresenter />
      <ArrowSVG style={{ width: 80, height: 80, transform: "rotate(-30deg)" }} />
      <Text color="red.2" size={18} fw={800} align="center">
        Create or join a squad to get started!
      </Text>
    </>
  );
}

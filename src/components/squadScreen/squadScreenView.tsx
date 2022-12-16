import GameCollectionPresenter from "../gameCollection/gameCollectionPresenter";
import SquadInfoPresenter from "../squadInfo/squadInfoPresenter";
import SquadScreenHeaderPresenter from "../squadScreenHeader/squadScreenHeaderPresenter";

export default function SquadScreenView() {
  return (
    <>
      <SquadScreenHeaderPresenter />
      <SquadInfoPresenter />

      <GameCollectionPresenter />
    </>
  );
}

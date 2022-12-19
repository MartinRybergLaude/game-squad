import GameCollectionPresenter from "../gameCollection/gameCollectionPresenter";
import SquadInfoPresenter from "../squadInfo/squadInfoPresenter";
import SquadScreenHeaderPresenter from "../squadScreenHeader/squadScreenHeaderPresenter";

export default function SquadScreenView(selectedSquad: any) {
  return selectedSquad.selectedSquad ? (
    <>
      <SquadScreenHeaderPresenter />
      <SquadInfoPresenter />
      <GameCollectionPresenter />
    </>
  ) : (
    <>
      <div>Här kommer det att stå saker</div>
    </>
  );
}

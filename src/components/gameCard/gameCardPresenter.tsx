import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  deleteField,
  doc,
  FieldValue,
  getDoc,
  runTransaction,
  Transaction,
  updateDoc,
} from "firebase/firestore";
import { useAtom } from "jotai";

import { db } from "~/utils/firebaseConfig";
import { selectedSquadAtom } from "~/utils/store";
import { Game, GenreObject, Genres } from "~/utils/types";

import GameCardView from "./gameCardView";

interface GameCardPresenterProps {
  game: Game;
}
export default function GameCardPresenter({ game }: GameCardPresenterProps) {
  const [squad] = useAtom(selectedSquadAtom);

  async function handleRemoveGame() {
    if (!squad) throw Error("Squad is undefined");
    if (!game) throw Error("Game is undefined");

    try {
      await runTransaction(db, async transaction => {
        const squadRef = doc(db, "squads", squad.id);
        const docSnap = await transaction.get(squadRef);

        if (docSnap.exists()) {
          const newData = docSnap
            .data()
            .games.filter((isGame: { id: string }) => isGame.id != game.id.toString());
          updateDoc(squadRef, {
            games: deleteField(),
          });
          newData.forEach((element: { id: number; upvotes: number; downvotes: number }) => {
            updateDoc(squadRef, {
              games: arrayUnion({
                id: element.id,
                upvotes: element.upvotes,
                downvotes: element.upvotes,
              }),
            });
          });
        }
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }

  return (
    <GameCardView
      title={game.name}
      genres={game.genres && game.genres.map(genre => Genres[genre as keyof GenreObject])}
      image={game?.cover?.url}
      onRemove={handleRemoveGame}
    />
  );
}

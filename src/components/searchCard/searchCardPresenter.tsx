import { useState } from "react";
import { closeAllModals } from "@mantine/modals";
import { FirebaseError } from "firebase/app";
import { arrayUnion, doc, FirestoreError, updateDoc } from "firebase/firestore";
import { useAtom } from "jotai";

import { db } from "~/utils/firebaseConfig";
import { selectedSquadAtom } from "~/utils/store";
import { Game, GenreObject, Genres } from "~/utils/types";

import SearchCardView from "./searchCardView";

interface SearchCardViewProps {
  game: Game;
}

export default function SearchCardPresenter({ game }: SearchCardViewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FirebaseError | undefined>(undefined);

  const [selectedSquad] = useAtom(selectedSquadAtom);

  async function handleAddGame() {
    if (!selectedSquad) return;
    setLoading(true);
    const squadRef = doc(db, "squads", selectedSquad.id);

    // Atomically add a new region to the "regions" array field.
    try {
      await updateDoc(squadRef, {
        games: arrayUnion({
          id: game.id,
          upvotes: [],
          downvotes: [],
        }),
      });
      setLoading(false);
      closeAllModals();
    } catch (e) {
      if (e instanceof FirestoreError) {
        setError(e);
        setLoading(false);
      }
    }
  }

  return (
    <SearchCardView
      loading={loading}
      error={error}
      onAdd={handleAddGame}
      image={
        game.cover && game.cover.url
          ? game.cover.url
          : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
      }
      title={game.name}
      description={game.summary}
      key={game.id}
      genres={game.genres && game.genres.map(genre => Genres[genre as keyof GenreObject])}
      price={"$0.00"}
    />
  );
}

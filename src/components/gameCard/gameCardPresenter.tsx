import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { doc, runTransaction, updateDoc } from "firebase/firestore";
import { useAtom } from "jotai";

import { auth, db } from "~/utils/firebaseConfig";
import { selectedSquadAtom } from "~/utils/store";
import { BaseGame, Game, GenreObject, Genres } from "~/utils/types";

import GameCardView from "./gameCardView";

interface GameCardPresenterProps {
  game: Game;
}
export type Vote = "up" | "down" | "none";
export default function GameCardPresenter({ game }: GameCardPresenterProps) {
  const [user] = useAuthState(auth);
  const [vote, setVote] = useState<Vote>(getInitialVote());
  const [selectedSquad] = useAtom(selectedSquadAtom);

  function getInitialVote() {
    if (!user) return "none";
    if (game.upvotes && game.upvotes.includes(user.uid)) return "up";
    if (game.downvotes && game.downvotes.includes(user.uid)) return "down";
    return "none";
  }

  async function handleVote(vote: Vote) {
    setVote(vote);
    try {
      await saveVote(vote);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveVote(newVote: Vote) {
    if (!selectedSquad) return;
    if (!user) return;

    await runTransaction(db, async transaction => {
      const squadRef = doc(db, "squads", selectedSquad.id);
      const squadDoc = await transaction.get(squadRef);
      const squad = squadDoc.data();
      if (!squad) throw new Error("Squad not found");
      const squadGames = (squad.games as BaseGame[]) || [];

      // Game object we will be mutating and returning to update the database
      const dbGameIndex = squadGames.findIndex(squadGame => squadGame.id === game.id);
      if (!squadGames[dbGameIndex]) throw new Error("Game not found");

      switch (newVote) {
        case "up":
          squadGames[dbGameIndex] = await saveUpvote(squadGames[dbGameIndex], user);
          break;
        case "down":
          squadGames[dbGameIndex] = await saveDownvote(squadGames[dbGameIndex], user);
          break;
        case "none":
          squadGames[dbGameIndex] = await removeVotes(squadGames[dbGameIndex], user);
          break;
      }

      transaction.update(squadRef, {
        games: squadGames,
      });
    });
  }

  async function saveUpvote(game: BaseGame, user: User) {
    const newGame = JSON.parse(JSON.stringify(game));
    if (newGame.upvotes.includes(user.uid)) throw new Error("Already upvoted");
    if (newGame.downvotes.includes(user.uid)) {
      const downvoteIndex = newGame.downvotes.indexOf(user.uid);
      newGame.downvotes.splice(downvoteIndex, 1);
    }
    newGame.upvotes.push(user.uid);
    return newGame;
  }

  async function saveDownvote(game: BaseGame, user: User) {
    if (game.downvotes.includes(user.uid)) throw new Error("Already downvoted");
    if (game.upvotes.includes(user.uid)) {
      const upvoteIndex = game.upvotes.indexOf(user.uid);
      game.upvotes.splice(upvoteIndex, 1);
    }
    game.downvotes.push(user.uid);
    return game;
  }

  async function removeVotes(game: BaseGame, user: User) {
    if (game.upvotes.includes(user.uid)) {
      const upvoteIndex = game.upvotes.indexOf(user.uid);
      game.upvotes.splice(upvoteIndex, 1);
    }
    if (game.downvotes.includes(user.uid)) {
      const downvoteIndex = game.downvotes.indexOf(user.uid);
      game.downvotes.splice(downvoteIndex, 1);
    }
    return game;
  }

  async function handleRemoveGame() {
    if (!selectedSquad) throw Error("Squad is undefined");
    if (!game) throw Error("Game is undefined");

    try {
      await runTransaction(db, async transaction => {
        const squadRef = doc(db, "squads", selectedSquad.id);
        const docSnap = await transaction.get(squadRef);

        if (docSnap.exists()) {
          const newData = docSnap
            .data()
            .games.filter((isGame: { id: string }) => isGame.id != game.id.toString());
          updateDoc(squadRef, {
            games: newData,
          });
        }
      });
    } catch (e) {
      console.error("Transaction failed!");
    }
  }

  return (
    <GameCardView
      title={game.name}
      summary={game.summary}
      upvotes={game.upvotes?.length}
      downvotes={game.downvotes?.length}
      genres={game.genres && game.genres.map(genre => Genres[genre as keyof GenreObject])}
      image={game?.cover?.url}
      vote={vote}
      onVote={handleVote}
      onRemove={handleRemoveGame}
    />
  );
}

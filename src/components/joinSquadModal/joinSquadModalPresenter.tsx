import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { closeAllModals } from "@mantine/modals";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useAtom } from "jotai";

import { ReloadContext } from "~/pages/Dashboard/dashboardPresenter";
import { auth, db } from "~/utils/firebaseConfig";
import { selectedSquadIdAtom } from "~/utils/store";

import JoinSquadModalView from "./joinSquadModalView";

export interface JoinSquadFormValues {
  code: string;
}

export default function JoinSquadModalPresenter() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [, setSelectedSquadId] = useAtom(selectedSquadIdAtom);
  const reloadSquads = useContext(ReloadContext);

  async function handleJoinSquad(values: JoinSquadFormValues) {
    if (!user) {
      setError("You must be logged in to join a squad.");
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      const squadsRef = collection(db, "squads");
      const q = query(squadsRef, where("invite_code", "==", values.code));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty || querySnapshot.docs.length > 1) {
        throw new Error("Invalid invite code.");
      }
      const squad = querySnapshot.docs[0].data();
      const squadRef = doc(db, "squads", squad.id);

      await updateDoc(squadRef, {
        users: arrayUnion(user.uid),
      });

      setSelectedSquadId(squad.id);
      setLoading(false);
      reloadSquads();
      closeAllModals();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setLoading(false);
    }
  }

  return <JoinSquadModalView onSubmit={handleJoinSquad} loading={loading} error={error} />;
}

import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { closeAllModals } from "@mantine/modals";
import { doc, setDoc } from "firebase/firestore";
import { useAtom } from "jotai";

import { ReloadContext } from "~/pages/Dashboard/dashboardPresenter";
import { auth, db } from "~/utils/firebaseConfig";
import { selectedSquadIdAtom } from "~/utils/store";
import { generateInviteCode, generateSquadHash } from "~/utils/utils";

import CreateSquadModalView from "./createSquadModalView";

export interface CreateSquadFormValues {
  name: string;
}

export default function CreateSquadModalPresenter() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [, setSelectedSquadId] = useAtom(selectedSquadIdAtom);
  const reloadSquads = useContext(ReloadContext);

  async function handleCreateSquad(values: CreateSquadFormValues) {
    if (!user) {
      setError("You must be logged in to create a squad.");
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      const squadHash = generateSquadHash();
      const inviteCode = generateInviteCode();
      await setDoc(doc(db, "squads", squadHash), {
        id: squadHash,
        name: values.name,
        owner: user.uid,
        invite_code: inviteCode,
        users: [user?.uid],
      });
      setSelectedSquadId(squadHash);
      setLoading(false);
      reloadSquads();
      closeAllModals();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setLoading(false);
    }
  }

  return <CreateSquadModalView onSubmit={handleCreateSquad} loading={loading} error={error} />;
}

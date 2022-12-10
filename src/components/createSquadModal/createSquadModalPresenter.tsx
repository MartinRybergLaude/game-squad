import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { closeAllModals } from "@mantine/modals";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "~/firebaseConfig";

import CreateSquadModalView from "./createSquadModalView";

export interface CreateSquadFormValues {
  name: string;
}

export default function CreateSquadModalPresenter() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  async function handleCreateSquad(values: CreateSquadFormValues) {
    if (!user) {
      setError("You must be logged in to create a squad.");
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      await addDoc(collection(db, "groups"), {
        name: values.name,
        owner: user.uid,
        users: [user?.uid],
      });
      setLoading(false);
      closeAllModals();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setLoading(false);
    }
  }

  return <CreateSquadModalView onSubmit={handleCreateSquad} loading={loading} error={error} />;
}

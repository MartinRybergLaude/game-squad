import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";

import { db } from "~/utils/firebaseConfig";
import { Squad } from "~/utils/types";
import { generateInviteCode } from "~/utils/utils";

import SquadInfoView from "./squadInfoView";

interface SquadInfoPresenterProps {
  squad: Squad;
  isOwner: boolean;
}

export default function SquadInfoPresenter({ squad, isOwner }: SquadInfoPresenterProps) {
  const [hasCopiedCode, setHasCopiedCode] = useState(false);
  const [refreshCodeLoading, setRefreshCodeLoading] = useState(false);
  const [refreshCodeError, setRefreshCodeError] = useState<FirebaseError | undefined>(undefined);

  async function handleRefreshCode() {
    setRefreshCodeError(undefined);
    setRefreshCodeLoading(true);
    const newCode = generateInviteCode();
    const squadRef = doc(db, "squads", squad.id);

    try {
      await updateDoc(squadRef, {
        invite_code: newCode,
      });
    } catch (e) {
      if (e instanceof FirestoreError) {
        setRefreshCodeError(e);
      }
    } finally {
      setRefreshCodeLoading(false);
    }
  }

  function handleCopyCode() {
    setHasCopiedCode(true);
    setTimeout(() => setHasCopiedCode(false), 2000);
  }

  return (
    <SquadInfoView
      isOwner={isOwner}
      squad={squad}
      onRefreshCode={handleRefreshCode}
      refreshCodeLoading={refreshCodeLoading}
      refreshCodeError={refreshCodeError}
      hasCopiedCode={hasCopiedCode}
      onCopyCode={handleCopyCode}
    />
  );
}

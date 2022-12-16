import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FirebaseError } from "firebase/app";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";

import { auth, db } from "~/utils/firebaseConfig";
import { selectedSquadAtom } from "~/utils/store";
import { generateInviteCode } from "~/utils/utils";

import SquadInfoView from "./squadInfoView";

export default function SquadInfoPresenter() {
  const [squad] = useAtom(selectedSquadAtom);
  const [user] = useAuthState(auth);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);
  const [refreshCodeLoading, setRefreshCodeLoading] = useState(false);
  const [refreshCodeError, setRefreshCodeError] = useState<FirebaseError | undefined>(undefined);

  async function handleRefreshCode() {
    if (!squad) return;
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
    <AnimatePresence>
      {squad && user && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <SquadInfoView
            isOwner={user.uid === squad.owner}
            squad={squad}
            onRefreshCode={handleRefreshCode}
            refreshCodeLoading={refreshCodeLoading}
            refreshCodeError={refreshCodeError}
            hasCopiedCode={hasCopiedCode}
            onCopyCode={handleCopyCode}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

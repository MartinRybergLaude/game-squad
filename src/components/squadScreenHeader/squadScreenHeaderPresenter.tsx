import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useAtom } from "jotai";

import { ReloadContext } from "~/pages/Dashboard/dashboardPresenter";
import { auth, db } from "~/utils/firebaseConfig";
import { selectedSquadAtom, selectedSquadIdAtom, sidebarOpenAtom } from "~/utils/store";

import { SquadScreenHeaderView } from "./squadScreenHeaderView";

export default function SquadScreenHeaderPresenter() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const [squad] = useAtom(selectedSquadAtom);
  const [user] = useAuthState(auth);
  const isOwner = user?.uid === squad?.owner;
  const reloadSquads = useContext(ReloadContext);
  const [, setSelectedSquadId] = useAtom(selectedSquadIdAtom);

  async function handleDeleteOrLeaveSquad() {
    if (!squad) return;
    try {
      if (isOwner) {
        await deleteSquad();
      } else {
        await leaveSquad();
      }
      setSelectedSquadId(null);
      reloadSquads();
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteSquad() {
    if (!squad) throw Error("Squad is undefined");
    await deleteDoc(doc(db, "squads", squad.id));
  }
  async function leaveSquad() {
    if (!squad) throw Error("Squad is undefined");
    if (!user) throw Error("User is undefined");
    const squadRef = doc(db, "squads", squad.id);
    await updateDoc(squadRef, {
      users: arrayRemove(user.uid),
    });
  }

  return (
    <SquadScreenHeaderView
      sidebarOpen={sidebarOpen}
      onSidebarOpen={() => setSidebarOpen(true)}
      squad={squad}
      isOwner={isOwner}
      onDeleteOrLeaveSquad={handleDeleteOrLeaveSquad}
    />
  );
}

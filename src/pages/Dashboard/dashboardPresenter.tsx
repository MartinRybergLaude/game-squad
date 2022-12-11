import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, query, where } from "firebase/firestore";
import { useAtom } from "jotai";

import { auth, db } from "~/firebaseConfig";
import { sidebarOpenAtom, squadsAtom } from "~/store";
import { Squad } from "~/types";

import DashboardView from "./dashboardView";

export default function DashboardPresenter() {
  const [user] = useAuthState(auth);

  const [userData, userLoading, userError] = useDocument(user && doc(db, "users", user.uid));

  const [squadsData, squadsLoading, squadsError] = useCollection(
    user && query(collection(db, "squads"), where("users", "array-contains", user.uid)),
  );

  const [squads, setSquads] = useAtom(squadsAtom);

  useEffect(() => {
    if (squadsData) {
      setSquads(squadsData.docs.map(doc => doc.data() as Squad));
    }
  }, [squadsData]);

  return <DashboardView hasSquads={Boolean(squads)} />;
}

import { createContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce, useDocument } from "react-firebase-hooks/firestore";
import { ModalsProvider } from "@mantine/modals";
import { collection, doc, query, where } from "firebase/firestore";
import { useAtom } from "jotai";

import { auth, db } from "~/firebaseConfig";
import { squadsAtom } from "~/store";
import { ReloadFunction, Squad } from "~/types";

import DashboardView from "./dashboardView";

export const ReloadContext = createContext<ReloadFunction>(() => null);

export default function DashboardPresenter() {
  const [user] = useAuthState(auth);

  const [userData, userLoading, userError] = useDocument(user && doc(db, "users", user.uid));

  const [squadsData, squadsLoading, squadsError, reload] = useCollectionOnce(
    user && query(collection(db, "squads"), where("users", "array-contains", user.uid)),
  );

  const [squads, setSquads] = useAtom(squadsAtom);

  useEffect(() => {
    if (squadsData) {
      setSquads(squadsData.docs.map(doc => doc.data() as Squad));
    }
  }, [squadsData]);

  return (
    <ReloadContext.Provider value={reload}>
      <ModalsProvider>
        <DashboardView hasSquads={squads.length > 0} />
      </ModalsProvider>
    </ReloadContext.Provider>
  );
}

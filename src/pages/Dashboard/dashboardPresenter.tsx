import { createContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { ModalsProvider } from "@mantine/modals";
import { collection, query, where } from "firebase/firestore";
import { useAtom } from "jotai";

import SEO from "~/components/seo/seo";
import { auth, db } from "~/utils/firebaseConfig";
import {
  selectedSquadErrorAtom,
  selectedSquadLoadingAtom,
  squadsAtom,
  squadsErrorAtom,
  squadsLoadingAtom,
} from "~/utils/store";
import { ReloadFunction, Squad } from "~/utils/types";

import DashboardView from "./dashboardView";

export const ReloadContext = createContext<ReloadFunction>(() => null);

export default function DashboardPresenter() {
  const [user] = useAuthState(auth);

  const [squadsData, squadsLoading, squadsError, reload] = useCollectionOnce(
    user && query(collection(db, "squads"), where("users", "array-contains", user.uid)),
  );

  const [, setSquads] = useAtom(squadsAtom);
  const [, setSquadsLoading] = useAtom(squadsLoadingAtom);
  const [, setSquadsError] = useAtom(squadsErrorAtom);

  useEffect(() => {
    if (squadsData) {
      setSquads(squadsData.docs.map(doc => doc.data() as Squad));
    } else {
      setSquads([]);
    }
  }, [squadsData]);

  useEffect(() => {
    setSquadsLoading(squadsLoading);
  }, [squadsLoading]);

  useEffect(() => {
    setSquadsError(squadsError);
  }, [squadsError]);

  const [selectedSquadLoading] = useAtom(selectedSquadLoadingAtom);
  const [selectedSquadError] = useAtom(selectedSquadErrorAtom);

  return (
    <>
      <SEO title="Dashboard" description="Your squads and their members" />
      <ReloadContext.Provider value={reload}>
        <ModalsProvider>
          <DashboardView
            loading={squadsLoading || selectedSquadLoading}
            error={squadsError || selectedSquadError}
          />
        </ModalsProvider>
      </ReloadContext.Provider>
    </>
  );
}

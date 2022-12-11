import { useDocument } from "react-firebase-hooks/firestore";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { doc } from "firebase/firestore";
import { useAtom } from "jotai";

import { db } from "~/firebaseConfig";
import { selectedSquadIdAtom, sidebarOpenAtom } from "~/store";
import { Squad } from "~/types";

import SquadScreenView from "./squadScreenView";

export default function SquadScreenPresenter() {
  const [, setSidebarOpen] = useAtom(sidebarOpenAtom);

  const theme = useMantineTheme();

  const hideBurger = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);

  const [selectedSquadId] = useAtom(selectedSquadIdAtom);
  const [squad, loading, error] = useDocument(
    selectedSquadId ? doc(db, "squads", selectedSquadId) : null,
  );

  return (
    <SquadScreenView
      setSidebarOpen={setSidebarOpen}
      showBurger={!hideBurger}
      squad={squad?.data() as Squad}
      loading={loading}
      error={error}
    />
  );
}

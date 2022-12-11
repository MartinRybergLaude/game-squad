import { AppShell } from "@mantine/core";
import { Text } from "@mantine/core";
import { FirebaseError } from "firebase/app";
import { FirestoreError } from "firebase/firestore";

import LoaderScreenPresenter from "~/components/loaderScreen/loaderScreenPresenter";
import SidebarPresenter from "~/components/sidebar/sidebarPresenter";
import SquadScreenPresenter from "~/components/squadScreen/squadScreenPresenter";

interface DashboardViewProps {
  loading?: boolean;
  error?: FirestoreError | FirebaseError;
}
export default function DashboardView({ loading, error }: DashboardViewProps) {
  return (
    <AppShell navbarOffsetBreakpoint="sm" navbar={<SidebarPresenter />}>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <SquadScreenPresenter />
        {loading && <LoaderScreenPresenter />}
        {error && <Text color="red">{error.message}</Text>}
      </div>
    </AppShell>
  );
}

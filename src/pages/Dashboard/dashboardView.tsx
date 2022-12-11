import { AppShell } from "@mantine/core";
import { Text } from "@mantine/core";
import { FirestoreError } from "firebase/firestore";

import LoaderScreenPresenter from "~/components/loaderScreen/loaderScreenPresenter";
import NoSquadsPresenter from "~/components/noSquads/noSquadsPresenter";
import SidebarPresenter from "~/components/sidebar/sidebarPresenter";
import SquadScreenPresenter from "~/components/squadScreen/squadScreenPresenter";
import { Squad } from "~/types";

interface DashboardViewProps {
  squads?: Squad[];
  loading?: boolean;
  error?: FirestoreError;
}
export default function DashboardView({ squads, loading, error }: DashboardViewProps) {
  return (
    <AppShell navbarOffsetBreakpoint="sm" navbar={<SidebarPresenter />}>
      {loading ? (
        <LoaderScreenPresenter />
      ) : error ? (
        <Text color="red">{error.message}</Text>
      ) : !squads || squads.length === 0 ? (
        <NoSquadsPresenter />
      ) : (
        <SquadScreenPresenter />
      )}
    </AppShell>
  );
}

import { Burger, createStyles, Title } from "@mantine/core";

const useStyles = createStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    gap: theme.spacing.lg,
    paddingTop: 8,
    paddingInline: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
}));

interface SquadScreenViewProps {
  setSidebarOpen: (sidebarOpen: boolean) => void;
}

export default function SquadScreenView({ setSidebarOpen }: SquadScreenViewProps) {
  const { classes } = useStyles();
  return (
    <header className={classes.header}>
      <Burger onClick={() => setSidebarOpen(true)} opened={false} />
      <Title order={3}>Squad</Title>
    </header>
  );
}

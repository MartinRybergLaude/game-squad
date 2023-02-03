import { Container, createStyles, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import { IconConfetti, IconDeviceGamepad, IconForms, IconUsers } from "@tabler/icons";

const useStyles = createStyles(theme => ({
  wrapper: {
    paddingTop: 80,
    paddingBottom: 50,
  },

  item: {
    display: "flex",
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2,
  },

  supTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    letterSpacing: 0.5,
  },

  title: {
    lineHeight: 1,
    textAlign: "center",
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
    padding: 5,
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

const data = [
  {
    icon: IconForms,
    title: "1. Create or join a squad",
    description:
      "Simply give it a name and you're off — or join an existing squad with an invite code.",
  },
  {
    icon: IconUsers,
    title: "2. Invite your friends",
    description: "Share the invite code with your friends and they can join your squad.",
  },
  {
    icon: IconDeviceGamepad,
    title: "3. Add games to the squad",
    description: "Choose between 200 000 games and add them to shared squad library.",
  },
  {
    icon: IconConfetti,
    title: "3. Vote",
    description:
      "Vote on the games using the up and down arrows. The total votes are visible to everyone.",
  },
];

export function HomePageTutorialView() {
  const { classes } = useStyles();

  const items = data.map(item => (
    <div className={classes.item} key={item.title}>
      <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
        <item.icon />
      </ThemeIcon>

      <div>
        <Text weight={700} size="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text color="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size="md" className={classes.wrapper}>
      <Text className={classes.supTitle}>How it works</Text>

      <Title className={classes.title} order={2}>
        GameSquad is <span className={classes.highlight}>super easy</span> to use
      </Title>

      <Container size={660} p={0}>
        <Text color="dimmed" className={classes.description}>
          GameSquad has a simple layout where you are in control. You can create a squad, join a
          squad, or add and vote on games.
        </Text>
      </Container>

      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}

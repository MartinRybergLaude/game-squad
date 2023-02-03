import {
  AppShell,
  Button,
  Card,
  Container,
  createStyles,
  Overlay,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandAppleArcade, IconFriends, IconLicense } from "@tabler/icons";

import HomePageFaqPresenter from "~/components/homePageFaq/homePageFaqPresenter";
import HomePageFooterPresenter from "~/components/homePageFooter/homePageFooterPresenter";
import HomePageHeaderPresenter from "~/components/homePageHeader/homePageHeaderPresenter";
import HomePageTutorialPresenter from "~/components/homePageTutorial/homePageTutorialPresenter";

const useStyles = createStyles(theme => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1592156668899-2cc871c9ac2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "top",
    backgroundAttachment: "fixed",

    height: "auto",
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    paddingInline: theme.spacing.xl,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl * 8,
    paddingTop: theme.spacing.xl * 8,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: theme.spacing.xl * 3,
      paddingTop: theme.spacing.xl * 2,
    },
  },

  headTitle: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  cta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    flexWrap: "wrap",
    marginTop: theme.spacing.xl * 2,
  },

  featuresTitle: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,
    fontWeight: 500,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  card: {
    backgroundColor: theme.colors.dark[7],
    border: `1px solid ${theme.colors.bittersweet[4]}`,
    boxShadow: "rgba(163, 77, 77, 0.2) 0px 30px 90px;",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    "&::after": {
      content: "''",
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

const data = [
  {
    title: "Create and invite people to your squads",
    description:
      "GameSquad allows you to create however many squads you want and invite your friends so that, together, you can decide upon what to play",
    icon: IconFriends,
  },
  {
    title: "Vote and come to an agreement",
    description:
      "You and your squad mates can throw your vote on the games you want to play and they will be clearly displayed, making it easier to come to an agreement everybody will like",
    icon: IconLicense,
  },
  {
    title: "Over 200 000+ games",
    description:
      "With over 200 000 games available in GameSquad, you don't have to worry about not finding the particular games you're interested in",
    icon: IconBrandAppleArcade,
  },
];

interface HomepageViewProps {
  onSubmit: () => void;
  onLoginClick: () => void;
}

export default function HomepageView({ onSubmit, onLoginClick }: HomepageViewProps) {
  const { classes, theme } = useStyles();

  const features = data.map(feature => (
    <Card key={feature.title} radius="lg" className={classes.card} p="xl">
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md" color="white">
        {feature.title}
      </Text>
      <Text size="md" mt="sm" fw={450} lh={1.8}>
        {feature.description}
      </Text>
    </Card>
  ));

  const form = useForm({});

  return (
    <AppShell
      padding="md"
      header={<HomePageHeaderPresenter />}
      footer={<HomePageFooterPresenter />}
      styles={() => ({
        main: {
          margin: 0,
          padding: 0,
          height: "auto",
          minHeight: 0,
        },
      })}
    >
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, .65) 20%)"
          opacity={1}
          zIndex={0}
        />
        <Overlay
          gradient="linear-gradient(0deg, rgba(95, 59, 53, 0.7) 0%, rgba(62, 44, 40, 0) 30%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.headTitle}>
            A place for making choices that{" "}
            <Text
              style={{ fontWeight: 900, display: "inline-block" }}
              variant="gradient"
              gradient={{ from: "#ff5d73", to: "#fc9369", deg: 45 }}
            >
              stick.
            </Text>
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
            Pick games that you want to play with your mates – and let the voting begin!
          </Text>
          <form
            onSubmit={form.onSubmit(() => {
              onSubmit();
            })}
            className={classes.cta}
          >
            <Button type="submit" variant="filled" size="xl" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="outline"
              color="red"
              size="xl"
              className={classes.control}
              onClick={() => onLoginClick()}
            >
              Log in
            </Button>
          </form>
        </Container>
      </div>
      <Container size="lg" py="xs" mt={-70}>
        <SimpleGrid cols={3} spacing="xl" mt={0} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
      <HomePageTutorialPresenter />
      <HomePageFaqPresenter />
    </AppShell>
  );
}

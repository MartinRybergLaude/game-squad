import { useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Checkbox,
  CheckboxProps,
  createStyles,
  Grid,
  Group,
  Image,
  Radio,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { IconMoneybag, IconQuestionMark, IconThumbDown, IconThumbUp } from "@tabler/icons";

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    Width: "240px",
    Hight: "340px",
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.green[6],
  },

  dislike: {
    color: theme.colors.red[6],
  },

  undecided: {
    color: theme.colors.gray[6],
  },

  money: {
    color: theme.colors.yellow[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  truncateText: {
    width: "20ch",
    whitespace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    radioToolbar: {
      opacity: "0",
      position: "fixed",
      width: "0",
    },
  },
}));

interface BadgeCardProps {
  image: string;
  title: string;
  country: string;
  description: string;
  badges: {
    emoji: string;
    label: string;
  }[];
}

const props = {
  image:
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  title: "Verudela Beach",
  country: "Croatia",
  description:
    "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
  badges: [
    {
      emoji: "☀️",
      label: "Sunny weather",
    },
    {
      emoji: "🦓",
      label: "Onsite zoo",
    },
    {
      emoji: "🌊",
      label: "Sea",
    },
    {
      emoji: "🌲",
      label: "Nature",
    },
    {
      emoji: "🤽",
      label: "Water sports",
    },
  ],
};

function BadgeCard() {
  const { classes, theme } = useStyles();
  const { image, title, description, country, badges } = props;
  const [value, setValue] = useState("undecided");
  const CheckboxIcon: CheckboxProps["icon"] = ({ indeterminate, className }) =>
    indeterminate ? <IconMoneybag className={className} /> : <IconMoneybag className={className} />;

  const features = badges.map(badge => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text className={classes.truncateText} size="lg" weight={500}>
            GAMeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </Text>
        </Group>
        <Group>
          <Badge size="sm">CO-OP</Badge>
        </Group>
      </Card.Section>

      <Group position="center" mt="xs">
        <SegmentedControl
          radius="lg"
          size="lg"
          onChange={setValue}
          data={[
            {
              label: (
                <Center>
                  <IconThumbUp size={18} className={classes.like} stroke={1.5} />
                </Center>
              ),
              value: "like",
            },
            {
              label: (
                <Center>
                  <IconQuestionMark size={18} className={classes.undecided} stroke={1.5} />
                </Center>
              ),
              value: "undecided",
            },
            {
              label: (
                <Center>
                  <IconThumbDown size={18} className={classes.dislike} stroke={1.5} />
                </Center>
              ),
              value: "dislike",
            },
          ]}
        />
      </Group>
      <Group position="center">
        <Checkbox color="yellow" icon={CheckboxIcon} indeterminate mt="sm" size="xl" radius="lg" />
      </Group>
    </Card>
  );
}
export function GameCollectionView() {
  return (
    <Grid columns={12}>
      <Grid.Col xs={10} md={5} lg={3}>
        <BadgeCard />
      </Grid.Col>
      <Grid.Col xs={10} md={5} lg={3}>
        <BadgeCard />
      </Grid.Col>
      <Grid.Col xs={10} md={5} lg={3}>
        <BadgeCard />
      </Grid.Col>
      <Grid.Col xs={10} md={5} lg={3}>
        <BadgeCard />
      </Grid.Col>
      <Grid.Col xs={10} md={5} lg={3}>
        <BadgeCard />
      </Grid.Col>
      <Grid.Col xs={10} md={5} lg={3}>
        <BadgeCard />
      </Grid.Col>
    </Grid>
  );
}

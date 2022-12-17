import {
  Badge,
  Card,
  Center,
  createStyles,
  Group,
  Image,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { IconQuestionMark, IconThumbDown, IconThumbUp } from "@tabler/icons";

import { Vote } from "./gameCardPresenter";

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "240px",
    height: "340px",
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

interface GameCardProps {
  upvotes: number;
  downvotes: number;
  image?: string;
  title: string;
  genres?: string[];
  vote: Vote;
  onVote: (vote: Vote) => void;
}

export default function GameCardView({
  upvotes,
  downvotes,
  image,
  title,
  genres,
  vote,
  onVote,
}: GameCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={
            image
              ? image.replace("t_thumb", "t_cover_big")
              : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
          }
          alt={title}
          height={180}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          {genres?.map(genre => (
            <Badge key={genre} size="sm">
              {genre}
            </Badge>
          ))}
        </Group>
        <Group>
          <Text size="sm">{`Upvotes ${upvotes}`}</Text>
          <Text size="sm">{`Downvotes ${downvotes}`}</Text>
        </Group>
      </Card.Section>

      <Group position="center" mt="xs">
        <SegmentedControl
          radius="lg"
          size="lg"
          value={vote}
          onChange={onVote}
          data={[
            {
              label: (
                <Center>
                  <IconThumbUp size={18} className={classes.like} stroke={1.5} />
                </Center>
              ),
              value: "up",
            },
            {
              label: (
                <Center>
                  <IconQuestionMark size={18} className={classes.undecided} stroke={1.5} />
                </Center>
              ),
              value: "none",
            },
            {
              label: (
                <Center>
                  <IconThumbDown size={18} className={classes.dislike} stroke={1.5} />
                </Center>
              ),
              value: "down",
            },
          ]}
        />
      </Group>
    </Card>
  );
}

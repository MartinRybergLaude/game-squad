import { Badge, Button, Card, createStyles, Group, Text, Title } from "@mantine/core";

import PlayersBadgesPresenter from "../playersBadges/playersBadgesPresenter";

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "100%",
    height: 320,
    backgroundSize: "cover",
    [`@media(min-width: ${theme.breakpoints.sm}px)`]: {
      width: "calc(50% - 8px)",
    },
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

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  truncateText: {
    width: "100%",
    height: "65px",
    whitespace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",

    radioToolbar: {
      opacity: "0",
      position: "fixed",
      width: "0",
    },
  },

  truncateGroup: {
    width: "100%",
    overflow: "auto",
  },

  overlay: {
    position: "absolute",
    opacity: "0.5",
    zIndex: 2,
    right: 0,
    top: 0,
    borderBottomLeftRadius: theme.radius.md,
  },

  segmentControl: {
    height: "100%",
    minWidth: 18,
  },

  summaryText: {
    marginBottom: 60,
  },

  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
    width: "100%",
    backgroundImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    padding: 16,
  },

  scrollY: {
    overflowY: "auto",
    scrollbarWidth: "none",
    ["::-webkit-scrollbar"]: {
      display: "none",
    },
    height: "100%",
  },
}));

interface GameCardProps {
  error?: Error;
  loading?: boolean;
  image?: string;
  title: string;
  summary: string;
  maxPlayers: number[];
  genres?: string[];
  onAdd: () => void;
}

export default function GameCardView({
  error,
  loading,
  image,
  title,
  summary,
  genres,
  onAdd,
  maxPlayers,
}: GameCardProps) {
  const { classes } = useStyles();

  return (
    <Card
      radius="md"
      className={classes.card}
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7 ) 30%, rgba(0,0,0,0.9) 80%), url(${image?.replace(
          "t_thumb",
          "t_cover_big",
        )});`,
        position: "relative",
      }}
    >
      <div className={classes.scrollY}>
        <Group spacing={8} mt={80}>
          {genres?.map(genre => (
            <Badge color="red" variant="filled" key={genre} size="sm">
              {genre}
            </Badge>
          ))}
        </Group>
        <Group spacing={4} mt={4} mb={12}>
          {maxPlayers && <PlayersBadgesPresenter maxPlayers={maxPlayers} />}
        </Group>
        <Title order={4} color="white">
          {title}
        </Title>
        {error && (
          <Text size="xs" color="red">
            {error.message}
          </Text>
        )}
        <Text color="white" size="xs" mt={8} className={classes.summaryText}>
          {summary}
        </Text>
      </div>
      <Group position="center" className={classes.bottomActions}>
        <Button fullWidth loading={loading} onClick={() => onAdd()}>
          Add
        </Button>
      </Group>
    </Card>
  );
}

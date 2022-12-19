import {
  ActionIcon,
  Badge,
  Card,
  Center,
  createStyles,
  Group,
  SegmentedControl,
  Text,
  Title,
} from "@mantine/core";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { IconThumbDown, IconThumbUp, IconX } from "@tabler/icons";

import { Vote } from "./gameCardPresenter";

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "100%",
    height: 320,
    backgroundSize: "cover",
    [`@media(min-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "300px",
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
    borderBottomLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 100,
    width: "100%",
    backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
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
  upvotes: number;
  downvotes: number;
  image?: string;
  title: string;
  summary: string;
  genres?: string[];
  vote: Vote;
  onVote: (vote: Vote) => void;
  onRemove: () => void;
}

export default function GameCardView({
  upvotes,
  downvotes,
  image,
  title,
  summary,
  genres,
  vote,
  onVote,
  onRemove,
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
        paddingBottom: "0 !important",
      }}
    >
      <ActionIcon
        variant="subtle"
        className={classes.overlay}
        onClick={() =>
          openConfirmModal({
            title: `Delete ${title}?`,
            children: (
              <Text size="sm">
                Deleting this game will delete it for everyone in your squad and remove your votes.
                This action cannot be undone.
              </Text>
            ),
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onCancel: () => closeAllModals(),
            onConfirm: () => onRemove(),
          })
        }
      >
        <IconX color="white" />
      </ActionIcon>
      <div className={classes.scrollY}>
        <Group spacing={7} mt={80} mb={12}>
          {genres?.map(genre => (
            <Badge color="red" variant="filled" key={genre} size="sm">
              {genre}
            </Badge>
          ))}
        </Group>
        <Title order={4} color="white">
          {title}
        </Title>
        <Text color="white" size="xs" mt={8} className={classes.summaryText}>
          {summary}
        </Text>
      </div>
      <Group position="center" className={classes.bottomActions}>
        <SegmentedControl
          mt={12}
          radius="sm"
          size="lg"
          value={vote}
          onChange={onVote}
          data={[
            {
              label: (
                <Center className={classes.segmentControl}>
                  <IconThumbUp size={18} className={classes.like} stroke={1.5} />
                </Center>
              ),
              value: "up",
            },
            {
              label: (
                <Center className={classes.segmentControl}>
                  <Text size="xs">{upvotes - downvotes}</Text>
                </Center>
              ),
              value: "none",
            },
            {
              label: (
                <Center className={classes.segmentControl}>
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

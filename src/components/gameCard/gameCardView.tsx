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
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconMoneybag, IconQuestionMark, IconThumbDown, IconThumbUp } from "@tabler/icons";

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
  image: string;
  title: string;
  description: string;
}

export default function GameCard({ image, title }: GameCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image.replace("t_thumb", "t_cover_big")} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Badge size="sm">CO-OP</Badge>
          <Badge size="sm">Horror</Badge>
        </Group>
        <Text className={classes.truncateText} size="lg" weight={500} mt={8}>
          {title}
        </Text>
      </Card.Section>

      <Group position="center" mt="xs">
        <SegmentedControl
          radius="lg"
          size="lg"
          defaultValue="undecided"
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
    </Card>
  );
}

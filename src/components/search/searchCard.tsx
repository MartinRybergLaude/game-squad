import {
  Badge,
  Button,
  Card,
  createStyles,
  Flex,
  Group,
  Image,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { getGenresByIds } from "~/api";

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  flex: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  text: {
    height: 75,
  },
  // Nobody's gonna know
}));

interface SearchCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  genres: number[];
}

interface genreProps {
  id: number;
  name: string;
}

export default function SearchCard({ image, title, description, genres, price }: SearchCardProps) {
  const { classes } = useStyles();
  const categories = genres
    ? genres.map((genre: genreProps) => (
        <Badge color="red" variant="outline" key={genre.id} size="sm">
          {genre.name}
        </Badge>
      ))
    : "";

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <div className={classes.flex}>
        <div>
          <Card.Section>
            <Image src={image.replace("t_thumb", "t_cover_big")} alt={title} height={180} />
          </Card.Section>
          <Card.Section className={classes.section} mt="md">
            <Flex direction="column" gap="5px">
              <Text size="lg" weight={500}>
                {title}
              </Text>
              <Group>
                <Badge color="green" variant="outline" size="sm">
                  {price}
                </Badge>
              </Group>
              <ScrollArea type="auto">
                <Group spacing={7} mb={20} mt={0} noWrap={true}>
                  {categories}
                </Group>
              </ScrollArea>
            </Flex>

            <Text className={classes.text} size="xs" mt={0} lineClamp={4}>
              {description}
            </Text>
          </Card.Section>
        </div>

        <Group mt="xs">
          <Button radius="md" style={{ flex: 1 }}>
            Add to list!
          </Button>
        </Group>
      </div>
    </Card>
  );
}

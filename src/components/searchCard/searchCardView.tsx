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
  genres?: string[];
}

export default function SearchCardView({
  image,
  title,
  description,
  genres,
  price,
}: SearchCardProps) {
  const { classes } = useStyles();

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
                  {genres &&
                    genres.length > 0 &&
                    genres.map(genre => (
                      <Badge color="red" variant="outline" key={genre} size="sm">
                        {genre}
                      </Badge>
                    ))}
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
            Add
          </Button>
        </Group>
      </div>
    </Card>
  );
}
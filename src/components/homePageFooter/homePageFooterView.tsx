import { Anchor, Container, createStyles, Group, Title } from "@mantine/core";

import { ReactComponent as LogoSVG } from "~/assets/gamesquad.svg";

const useStyles = createStyles(theme => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export function HomePageFooterView({ links }: FooterSimpleProps) {
  const { classes } = useStyles();
  const items = links.map(link => (
    <Anchor<"a"> color="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Group spacing="lg">
          <LogoSVG width={42} height={42} />
          <Title order={4}>GameSquad</Title>
        </Group>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </footer>
  );
}

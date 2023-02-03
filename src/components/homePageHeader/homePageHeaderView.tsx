import { Link } from "react-router-dom";
import { Burger, Container, createStyles, Group, Header, Title } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";

import { ReactComponent as LogoSVG } from "~/assets/gamesquad.svg";

const useStyles = createStyles(theme => ({
  noBackground: {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  logoLink: {
    textDecoration: "none",
    color: theme.white,
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.sm,
    fontWeight: 800,

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));

interface HomePageHeaderProps {
  links: { link: string; label: string }[];
}

export function HomePageHeaderView({ links }: HomePageHeaderProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const active = "/register";
  const { classes, cx } = useStyles();
  const [scroll] = useWindowScroll();

  const items = links.map(link => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={60} mb={120} className={cx(scroll.y < 10 && classes.noBackground)}>
      <Container className={classes.header}>
        <Link to="/" className={classes.logoLink}>
          <Group spacing="md">
            <LogoSVG width={28} />
            <Title order={2} style={{ fontSize: 18 }}>
              GameSquad
            </Title>
          </Group>
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
}

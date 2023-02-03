import { Accordion, Container, createStyles, Title } from "@mantine/core";

const useStyles = createStyles(theme => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  control: {
    color: theme.white,
  },
}));

export function HomePageFaqView() {
  const { classes } = useStyles();
  return (
    <Container size="md" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control className={classes.control}>
            Is GameSquad free to use?
          </Accordion.Control>
          <Accordion.Panel>
            Yes! Not only that, it&apos;s open source as well. This means that anyone can contribute
            to GameSquad or make their own version. You can find the source code{" "}
            <a href="https://github.com/MartinRybergLaude/game-squad">here</a>.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control className={classes.control}>
            Does everyone in my squad need an account?
          </Accordion.Control>
          <Accordion.Panel>
            Yes, but don&apos;t worry. Making an account is quick and painless.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control className={classes.control}>
            How do I prevent people from joining my squad?
          </Accordion.Control>
          <Accordion.Panel>
            We recommend regenerating the invite code. If uninvited people join again, someone in
            your squad leaked the code.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control className={classes.control}>
            How do I change my squad&apos;s name?
          </Accordion.Control>
          <Accordion.Panel>
            Squad names are currently final. You&apos;d have to make a new squad if you need a new
            name. Choose carefully!
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control className={classes.control}>
            How do I change my squad&apos;s invite code?
          </Accordion.Control>
          <Accordion.Panel>
            As a squad owner you can press the refresh button next to the invite code to render the
            past one invalid, and receive a new one.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

import { Accordion, Container, createStyles, Group, Tabs, Text, Title } from "@mantine/core";

const useStyles = createStyles(theme => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
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
}));

export default function HelpModalView() {
  const { classes } = useStyles();

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Help
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="info">
          <Accordion.Control>What do I do here?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              GameSquad is an application created for those people that want to play games with
              their friends but never manage to figure out exactly which games they want to play.
            </Text>
            <Text mt={20}>
              GameSquad allows you and your friends to add a roster of the game you are interested
              in and vote on the ones you are interested in playing, so that you can more easily
              come to a decision on the matter.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="squadCreate">
          <Accordion.Control>How do I create a squad?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              You can create a squad by pressing the red button that says &apos;create&apos; to
              create a new squad, which you can then find in the sidebar to the left.
            </Text>
            <Text mt={20}>
              The squad can be removed by pressing the 3 dots in the upper right corner of the
              screen and choosing &apos;Delete squad&apos;.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="squadJoin">
          <Accordion.Control>How do I join a squad?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              You can join a squad by pressing the &apos;join&apos; button in the upper left corner
              of the screen, then typing in the 12-symbol long code that the squad members can see
              inside the squad screen.
            </Text>
            <Text mt={20}>
              You can leave the squad by pressing the 3 dots in the upper right corner of the screen
              and choosing &apos;Leave squad&apos;.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="gameAdd">
          <Accordion.Control>How do I add games to a squad?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              You can add a game to a squad by going into that squad screen through the sidebar menu
              to the left, and then pressing the &apos;Add game&apos; button. A search menu will
              then pop up, through which you can search for the particular game you want to add to
              the squad.
            </Text>
            <Text mt={20}>
              The game can be removed by pressing the cross at the top right of the game&apos;s
              card.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="gameVote">
          <Accordion.Control>How do I vote on games?</Accordion.Control>
          <Accordion.Panel>
            <Text>
              You can vote on games in a squad screen by choosing between the options on the bottom
              of each game card.
            </Text>
            <Text mt={20}>
              This vote will be counted along with the other squad members to show what all of you
              think about the games.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

/*
<Group grow>
      <Tabs variant="outline" defaultValue="info" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="info"></Tabs.Tab>
          <Tabs.Tab value="squadCreate">How do I create a squad?</Tabs.Tab>
          <Tabs.Tab value="squadJoin">How do I join a squad?</Tabs.Tab>
          <Tabs.Tab value="gameAdd">How do I add games to a squad?</Tabs.Tab>
          <Tabs.Tab value="gameVote">How do I vote on games?</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info" ml={10}>
          <Text>
            GameSquad is an application created for those people that want to play games with their
            friends but never manage to figure out exactly which games they want to play.
          </Text>
          <Text mt={20}>
            GameSquad allows you and your friends to add a roster of the game you are interested in
            and vote on the ones you are interested in playing, so that you can more easily come to
            a decision on the matter.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="squadCreate" ml={10}>
          <Text>
            You can create a squad by pressing the red button that says &apos;create&apos; to create
            a new squad, which you can then find in the sidebar to the left.
          </Text>
          <Text mt={20}>
            The squad can be removed by pressing the 3 dots in the upper right corner of the screen
            and choosing &apos;Delete squad&apos;.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="squadJoin" ml={10}>
          <Text>
            You can join a squad by pressing the &apos;join&apos; button in the upper left corner of
            the screen, then typing in the 12-symbol long code that the squad members can see inside
            the squad screen.
          </Text>
          <Text mt={20}>
            You can leave the squad by pressing the 3 dots in the upper right corner of the screen
            and choosing &apos;Leave squad&apos;.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="gameAdd" ml={10}>
          <Text>
            You can add a game to a squad by going into that squad screen through the sidebar menu
            to the left, and then pressing the &apos;Add game&apos; button. A search menu will then
            pop up, through which you can search for the particular game you want to add to the
            squad.
          </Text>
          <Text mt={20}>
            The game can be removed by pressing the cross at the top right of the game&apos;s card.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="gameVote" ml={10}>
          <Text>
            You can vote on games in a squad screen by choosing between the options on the bottom of
            each game card.
          </Text>
          <Text mt={20}>
            This vote will be counted along with the other squad members to show what all of you
            think about the games.
          </Text>
        </Tabs.Panel>
      </Tabs>
    </Group>
*/

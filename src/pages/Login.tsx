import {
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Grid,
  Card,
  Center,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  form: {
    minHeight: "100vh",
    width: "100%",
  },

  formWrapper: {
    marginTop: -120,
    maxWidth: 500,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: 16,
      marginTop: 80,
    },
  },

  formCenter: {
    height: "100vh",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      height: "auto",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  coverImgWrapper: {
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
  coverImg: {
    height: "100vh",
    backgroundImage: "url(src/assets/login.jpg)",
    backgroundSize: "cover",
  },
}));

export default function Login() {
  const { classes } = useStyles();
  return (
    <Grid grow>
      <Grid.Col span={1}>
        <div className={classes.form}>
          <Center className={classes.formCenter}>
            <Card shadow="sm" withBorder className={classes.formWrapper} p={32}>
              <Title
                order={2}
                className={classes.title}
                align="center"
                mt="md"
                mb={50}
              >
                Welcome back to GameSquad!
              </Title>

              <TextInput
                label="Email address"
                placeholder="hello@gmail.com"
                size="md"
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                mt="md"
                size="md"
              />
              <Checkbox label="Keep me logged in" mt="xl" size="md" />
              <Button fullWidth mt="xl" size="md">
                Login
              </Button>

              <Text align="center" mt="md">
                Don&apos;t have an account?{" "}
                <Anchor<"a">
                  href="#"
                  weight={700}
                  onClick={(event) => event.preventDefault()}
                >
                  Register
                </Anchor>
              </Text>
            </Card>
          </Center>
        </div>
      </Grid.Col>
      <Grid.Col span={1} className={classes.coverImgWrapper}>
        <div className={classes.coverImg} />
      </Grid.Col>
    </Grid>
  );
}

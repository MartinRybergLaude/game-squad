import { Link } from "react-router-dom";
import {
  Anchor,
  Button,
  Card,
  Center,
  createStyles,
  Grid,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AuthError } from "firebase/auth";

import { registerRoute, requestResetRoute } from "../../App";
import { LoginFormValues } from "./loginPresenter";

const useStyles = createStyles(theme => ({
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
    padding: 64,
    paddingLeft: 0,
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
  coverImg: {
    height: "100%",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1608403890614-ec62cb35b46e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80)",
    backgroundSize: "cover",
    filter: "hue-rotate(340deg)",
  },
}));

interface LoginViewProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
  error?: AuthError;
  successMsg?: string;
}

export default function LoginView({ onSubmit, loading, error, successMsg }: LoginViewProps) {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Grid grow>
      <Grid.Col span={1}>
        <div className={classes.form}>
          <Center className={classes.formCenter}>
            <Card shadow="sm" withBorder className={classes.formWrapper} p={32}>
              <form
                onSubmit={form.onSubmit(values => {
                  onSubmit(values);
                })}
              >
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                  Welcome back to GameSquad!
                </Title>

                {successMsg && (
                  <Text color="green" align="center" mb={20}>
                    {successMsg}
                  </Text>
                )}

                <TextInput
                  label="Email address"
                  placeholder="hello@gmail.com"
                  size="md"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  mt="md"
                  size="md"
                  {...form.getInputProps("password")}
                />
                <Text align="center" mt="md">
                  Forgotten your password?{" "}
                  <Link to={requestResetRoute.path ?? "/request-reset"}>
                    <Anchor weight={300}>Reset</Anchor>
                  </Link>
                </Text>
                {error && (
                  <Text color="red" size="sm" mt="xs">
                    Invalid email or password
                  </Text>
                )}
                <Button type="submit" fullWidth mt="xl" size="md" loading={loading}>
                  Login
                </Button>

                <Text align="center" mt="md">
                  Don&apos;t have an account?{" "}
                  <Link to={registerRoute.path ?? "/register"}>
                    <Anchor weight={700}>Register</Anchor>
                  </Link>
                </Text>
              </form>
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

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

import { loginRoute } from "../../App";
import { RegisterFormValues } from "./registerPresenter";

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
      "url(https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)",
    backgroundSize: "cover",
    filter: "hue-rotate(150deg)",
  },
}));

interface RegisterViewProps {
  onSubmit: (values: RegisterFormValues) => void;
  loading: boolean | undefined;
  error: string | undefined;
}

export default function RegisterView({ onSubmit, loading, error }: RegisterViewProps) {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: value => (value.length >= 6 ? null : "Password must be at least 6 characters long"),
      passwordConfirm: (value, { password }) =>
        value === password ? null : "Passwords do not match",
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
                  Register a GameSquad account
                </Title>
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
                <PasswordInput
                  label="Confirm password"
                  placeholder="Your password"
                  mt="md"
                  size="md"
                  {...form.getInputProps("passwordConfirm")}
                />
                {error && (
                  <Text color="red" size="sm" mt="xs">
                    {error}
                  </Text>
                )}
                <Button type="submit" fullWidth mt="xl" size="md" loading={loading}>
                  Register
                </Button>

                <Text align="center" mt="md">
                  Already have an account?{" "}
                  <Link to={loginRoute.path ?? "/login"}>
                    <Anchor weight={700}>Log in</Anchor>
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

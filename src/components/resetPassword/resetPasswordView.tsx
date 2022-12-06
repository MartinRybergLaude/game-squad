import { Button, Card, Center, createStyles, Grid, PasswordInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import { ResetPasswordFormValues } from "~/pages/Auth/authPresenter";

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

interface ResetPasswordViewProps {
  onSubmit: (values: ResetPasswordFormValues) => void;
}

export default function ResetPasswordView({ onSubmit }: ResetPasswordViewProps) {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },

    validate: {
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
                  Reset your password
                </Title>
                <PasswordInput
                  label="New password"
                  placeholder="Your new password"
                  mt="md"
                  size="md"
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label="Confirm new password"
                  placeholder="Your new password"
                  mt="md"
                  size="md"
                  {...form.getInputProps("passwordConfirm")}
                />
                <Button type="submit" fullWidth mt="xl" size="md">
                  Reset
                </Button>
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

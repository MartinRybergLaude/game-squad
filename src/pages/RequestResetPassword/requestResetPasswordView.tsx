import { Button, createStyles, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

import { RequestResetFormValues } from "./requestResetPasswordPresenter";

const useStyles = createStyles(theme => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  body: {
    paddingRight: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  fullscreen: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: "block",
      paddingTop: 120,
    },
  },
}));

interface AuthInfoViewProps {
  onSubmit: (values: RequestResetFormValues) => void;
  errorMsg?: string;
  successMsg?: string;
  loading?: boolean;
}

export default function RequestResetPasswordView({
  onSubmit,
  errorMsg,
  successMsg,
  loading,
}: AuthInfoViewProps) {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={classes.fullscreen}>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>Request new password</Title>
          <Text weight={500} size="lg" mb={5}>
            Enter your email address and we will send you a link to reset your password.
          </Text>

          {successMsg && (
            <Text size="sm" color="green">
              {successMsg}
            </Text>
          )}

          {errorMsg && (
            <Text size="sm" color="red">
              {errorMsg}
            </Text>
          )}

          <div className={classes.controls}>
            <form
              onSubmit={form.onSubmit(values => {
                onSubmit(values);
              })}
            >
              <TextInput
                placeholder="Your email"
                classNames={{ input: classes.input, root: classes.inputWrapper }}
                required
                {...form.getInputProps("email")}
              />
              <Button
                mt={16}
                className={classes.control}
                type="submit"
                loading={loading}
                variant="outline"
              >
                Request new password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

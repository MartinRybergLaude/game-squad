import { Button, Center, createStyles, Flex, Image, Text, TextInput, Title } from "@mantine/core";

import image from "./image.svg";

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

  image: {
    maxWidth: "40%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
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
  },
}));

interface VerificationViewProps {
  onResendEmail: () => void;
  loading: boolean | undefined;
  error: string | undefined;
  resendSuccess: boolean;
}

export function VerificationView({
  onResendEmail,
  loading,
  error,
  resendSuccess,
}: VerificationViewProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.fullscreen}>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>Email verification</Title>
          <Text weight={500} size="lg" mb={5}>
            Please check your email for a verification link.
          </Text>
          <Text size="sm" color="dimmed">
            We require email verification to make sure you are not a robot. Do not worry, it is a
            quick process!
          </Text>

          {resendSuccess && (
            <Text size="sm" color="green">
              Email sent!
            </Text>
          )}

          {error && (
            <Text size="sm" color="red">
              {error}
            </Text>
          )}

          <div className={classes.controls}>
            <Text display="block" size="sm">
              Didn&apos;t receive an email?{" "}
            </Text>
            <Button
              mt={16}
              className={classes.control}
              onClick={() => onResendEmail()}
              loading={loading}
            >
              Resend
            </Button>
          </div>
        </div>
        <div className={classes.image} />
      </div>
    </div>
  );
}

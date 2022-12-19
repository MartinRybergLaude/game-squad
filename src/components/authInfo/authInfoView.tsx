import { Button, createStyles, Text, Title } from "@mantine/core";

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
  title: string;
  description: string;
  submitLabel?: string;
  submitText: string;
  onSubmit: () => void;
  errorMsg?: string;
  successMsg?: string;
  loading?: boolean;
}

// This component is used as a view in several places and hence needs no presenter

export default function AuthInfoView({
  title,
  description,
  submitLabel,
  submitText,
  onSubmit,
  errorMsg,
  successMsg,
  loading,
}: AuthInfoViewProps) {
  const { classes } = useStyles();
  return (
    <div className={classes.fullscreen}>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>{title}</Title>
          <Text weight={500} size="lg" mb={5}>
            {description}
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
            <Text display="block" size="sm">
              {submitLabel}
            </Text>
            <Button
              mt={16}
              className={classes.control}
              onClick={() => onSubmit()}
              loading={loading}
              variant="outline"
            >
              {submitText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

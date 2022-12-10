import { Button, createStyles, Group, Modal, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";

import { UpdateFormValues } from "./updateUsernameModalPresenter";

interface AuthInfoViewProps {
  onSubmit: (values: UpdateFormValues) => void;
  errorMsg?: string;
  successMsg?: string;
  loading?: boolean;
}

export default function UpdateUserNameModalView({
  onSubmit,
  errorMsg,
  successMsg,
  loading,
}: AuthInfoViewProps) {
  const form = useForm({
    initialValues: {
      username: "",
    },

    validate: {
      username: value => (value.length >= 6 ? null : "Username must be at least 6 characters long"),
    },
  });

  return (
    <>
      <Text size="sm">Write your new username here</Text>

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

      <form
        onSubmit={form.onSubmit(values => {
          onSubmit(values);
        })}
      >
        <TextInput
          label="Your new username"
          placeholder="XxKurtFredrik1337xX"
          required
          {...form.getInputProps("username")}
        />
        <Button type="submit" fullWidth mt="md" loading={loading}>
          update username
        </Button>
      </form>
    </>
  );
}

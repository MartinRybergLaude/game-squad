import { Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { UpdateFormValues } from "./updateEmailModalPresenter";

interface UpdateViewProps {
  onSubmit: (values: UpdateFormValues) => void;
  errorMsg?: string;
  successMsg?: string;
  loading?: boolean;
}

export default function UpdateEmailModalView({
  onSubmit,
  errorMsg,
  successMsg,
  loading,
}: UpdateViewProps) {
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Text size="sm">Write your new email here</Text>

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
          label="Your new email adress"
          placeholder="hello@gmail.com"
          required
          {...form.getInputProps("email")}
        />
        <Button type="submit" fullWidth mt="md" loading={loading}>
          update email
        </Button>
      </form>
    </>
  );
}

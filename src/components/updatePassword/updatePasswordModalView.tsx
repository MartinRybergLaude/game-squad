import { Button, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { UpdateFormValues } from "./updatePasswordModalPresenter";

interface UpdateViewProps {
  onSubmit: (values: UpdateFormValues) => void;
  errorMsg?: string;
  successMsg?: string;
  loading?: boolean;
}

export default function UpdatePasswordModalView({
  onSubmit,
  errorMsg,
  successMsg,
  loading,
}: UpdateViewProps) {
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
    <>
      <Text size="sm">Write your new Password here</Text>

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
        <PasswordInput
          label="New Password"
          placeholder="Your password"
          required
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm password"
          placeholder="Your password"
          {...form.getInputProps("passwordConfirm")}
        />
        <Button type="submit" fullWidth mt="md" loading={loading}>
          update Password
        </Button>
      </form>
    </>
  );
}

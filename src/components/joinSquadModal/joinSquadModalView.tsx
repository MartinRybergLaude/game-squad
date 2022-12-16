import { useEffect, useRef } from "react";
import { Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { JoinSquadFormValues } from "./joinSquadModalPresenter";

interface CreateGroupModalViewProps {
  onSubmit: (values: JoinSquadFormValues) => void;
  loading: boolean;
  error?: string;
}

export default function JoinSquadModalView({
  onSubmit,
  loading,
  error,
}: CreateGroupModalViewProps) {
  const form = useForm({
    initialValues: {
      code: "",
    },

    validate: {
      code: value => (value.length !== 12 ? "Incorrect format." : null),
    },
  });

  // Hack to focus on the input field, since autoFocus doesn't work in modals
  const inputElement = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <form onSubmit={form.onSubmit(values => onSubmit(values))}>
      <TextInput
        label="Invite code"
        placeholder="12-digit code"
        ref={inputElement}
        {...form.getInputProps("code")}
      />
      {error && (
        <Text color="red" size="sm" mt={8}>
          {error}
        </Text>
      )}
      <Button type="submit" fullWidth mt={24} loading={loading}>
        Join
      </Button>
    </form>
  );
}

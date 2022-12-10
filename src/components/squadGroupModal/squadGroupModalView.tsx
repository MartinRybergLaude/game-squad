import { useEffect, useRef } from "react";
import { Button, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { CreateSquadFormValues } from "./squadGroupModalPresenter";

interface CreateGroupModalViewProps {
  onSubmit: (values: CreateSquadFormValues) => void;
  loading: boolean;
  error?: string;
}

export default function CreateSquadModalView({
  onSubmit,
  loading,
  error,
}: CreateGroupModalViewProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: value => (value.length < 1 ? "Squad name must be at least 1 characters long" : null),
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
        label="Squad Name"
        placeholder="Squad Name"
        ref={inputElement}
        {...form.getInputProps("name")}
      />
      {error && (
        <Text color="red" size="sm" mt={8}>
          {error}
        </Text>
      )}
      <Button type="submit" fullWidth mt={24} loading={loading}>
        Create
      </Button>
    </form>
  );
}

import { useEffect, useRef } from "react";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { CreateSquadFormValues } from "./createSquadModalPresenter";

interface CreateSquadModalViewProps {
  onSubmit: (values: CreateSquadFormValues) => void;
}

export default function CreateSquadModalView({ onSubmit }: CreateSquadModalViewProps) {
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
      <TextInput label="Squad Name" placeholder="Squad Name" autoFocus ref={inputElement} />
      <Button type="submit" fullWidth mt={24}>
        Create
      </Button>
    </form>
  );
}

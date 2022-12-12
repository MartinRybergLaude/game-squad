import { Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";

interface LogOutViewProps {
  onSubmit: () => void;
  errorMsg?: string;
  loading?: boolean;
}

export default function LogoutModalView({ onSubmit, errorMsg, loading }: LogOutViewProps) {
  const form = useForm();

  return (
    <>
      <Text size="sm">Do you want to log out of your account?</Text>

      {errorMsg && (
        <Text size="sm" color="red">
          {errorMsg}
        </Text>
      )}

      <form
        onSubmit={form.onSubmit(() => {
          onSubmit();
        })}
      >
        <Button type="submit" fullWidth mt="md" loading={loading} variant="filled">
          Yes, log me out
        </Button>
      </form>
    </>
  );
}

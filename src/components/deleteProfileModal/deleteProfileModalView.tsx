import { Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";

interface DeleteViewProps {
  onSubmit: () => void;
  errorMsg?: string;
  successMsg?: string;
  loading?: boolean;
}

export default function DeleteProfileModalView({
  onSubmit,
  errorMsg,
  successMsg,
  loading,
}: DeleteViewProps) {
  const form = useForm();

  return (
    <>
      <Text size="sm">
        Are you sure you want to delete your profile? This action is permanent, and there is no
        support that would bother helping you retreive it. We&apos;re busy.
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

      <form
        onSubmit={form.onSubmit(() => {
          onSubmit();
        })}
      >
        <Button fullWidth variant="default" mt="md" onClick={() => closeAllModals()}>
          No, don&apos;t delete it
        </Button>
        <Button type="submit" fullWidth mt="md" loading={loading} variant="filled">
          Yes, delete absolutely everything. Leave nothing!
        </Button>
      </form>
    </>
  );
}

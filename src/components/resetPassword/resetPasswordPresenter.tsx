import { ResetPasswordFormValues } from "~/pages/Auth/authPresenter";

import ResetPasswordView from "./resetPasswordView";

interface ResetPasswordViewProps {
  onSubmit: (values: ResetPasswordFormValues) => void;
}

export default function resetPasswordPresenter({ onSubmit }: ResetPasswordViewProps) {
  return <ResetPasswordView onSubmit={onSubmit} />;
}

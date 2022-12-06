import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import { auth } from "~/firebaseConfig";

import RequestResetPasswordView from "./requestResetPasswordView";

export interface RequestResetFormValues {
  email: string;
}
export default function RequestResetPasswordPresenter() {
  const [sendPasswordResetEmail, sending, emailError] = useSendPasswordResetEmail(auth);
  const [sendSuccessText, setSendSuccessText] = useState<string>();

  async function handleResendEmail(values: RequestResetFormValues) {
    setSendSuccessText(undefined);
    const requestPasswordEmailSent = await sendPasswordResetEmail(values.email);
    if (requestPasswordEmailSent) {
      setSendSuccessText("Password reset request email sent!");
    }
  }

  return (
    <RequestResetPasswordView
      onSubmit={handleResendEmail}
      errorMsg={emailError?.message}
      successMsg={sendSuccessText}
      loading={sending}
    />
  );
}

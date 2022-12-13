import { useState } from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";

import { auth } from "~/utils/firebaseConfig";

import AuthInfoView from "../../components/authInfo/authInfoView";

export default function VerificationPresenter() {
  const [user] = useAuthState(auth);
  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
  const [resendSuccessText, setResendSuccessText] = useState<string>();

  async function handleResendEmail() {
    setResendSuccessText(undefined);
    if (user && !user.emailVerified) {
      const verificationSent = await sendEmailVerification();
      if (verificationSent) {
        setResendSuccessText("Verification email sent!");
      }
    }
  }

  return (
    <AuthInfoView
      title="Verify your email"
      description="We sent you an email with a link to verify your email address. Please check your inbox."
      submitLabel="Didn't receive an email?"
      submitText="Resend email"
      onSubmit={handleResendEmail}
      errorMsg={emailError?.message}
      successMsg={resendSuccessText}
      loading={sending}
    />
  );
}

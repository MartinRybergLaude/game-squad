import { useState } from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";

import { auth } from "../../firebaseConfig";
import { VerificationView } from "./verificationView";

export default function VerificationPresenter() {
  const [user] = useAuthState(auth);
  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
  const [resendSuccess, setResendSuccess] = useState(false);

  async function handleResendEmail() {
    setResendSuccess(false);
    if (user && !user.emailVerified) {
      const verificationSent = await sendEmailVerification();
      if (verificationSent) {
        setResendSuccess(true);
      }
    }
  }

  return (
    <VerificationView
      onResendEmail={handleResendEmail}
      loading={sending}
      error={emailError?.message}
      resendSuccess={resendSuccess}
    />
  );
}

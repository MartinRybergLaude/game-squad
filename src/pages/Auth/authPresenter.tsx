import { useEffect, useState } from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { applyActionCode, Auth } from "firebase/auth";

import { loginRoute } from "../../App";
import AuthInfoView from "../../components/authInfo/authInfoView";
import LoaderScreenView from "../../components/loaderScreen/loaderScreenView";
import { auth } from "../../firebaseConfig";

export default function AuthPresenter() {
  const [searchParams] = useSearchParams();
  const [verifyError, setVerifyError] = useState<string>();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
  const [resendSuccessText, setResendSuccessText] = useState<string>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");
    async function handleAction(auth: Auth, oobCode: string) {
      applyActionCode(auth, oobCode)
        .then(() => {
          navigate(`${loginRoute.path}?verified=true`);
          return;
        })
        .catch((error: unknown) => {
          setShowLoading(false);
          if (error instanceof FirebaseError) {
            setVerifyError(error.message);
          }
        });
    }
    if (mode === "verifyEmail" && oobCode) {
      handleAction(auth, oobCode);
    } else {
      setShowLoading(false);
    }
  }, []);

  async function handleResendEmail() {
    setResendSuccessText(undefined);
    setVerifyError(undefined);
    if (user && !user.emailVerified) {
      const verificationSent = await sendEmailVerification();
      if (verificationSent) {
        setResendSuccessText("Verification email sent!");
      }
    } else if (user) {
      setVerifyError("Email already verified");
    } else {
      setVerifyError("User not found");
    }
  }

  return showLoading ? (
    <LoaderScreenView />
  ) : (
    <AuthInfoView
      title="Something went wrong!"
      description="Please check your email and click on the link we sent you to verify your account."
      submitLabel="Didn't receive an email?"
      submitText="Resend email"
      onSubmit={handleResendEmail}
      errorMsg={emailError?.message || verifyError}
      successMsg={resendSuccessText}
      loading={sending}
    />
  );
}

import { useEffect, useState } from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { applyActionCode, Auth, confirmPasswordReset } from "firebase/auth";

import ResetPasswordView from "~/components/resetPassword/resetPasswordView";
import { auth } from "~/utils/firebaseConfig";

import { loginRoute, requestResetRoute } from "../../App";
import AuthInfoView from "../../components/authInfo/authInfoView";
import LoaderScreenView from "../../components/loaderScreen/loaderScreenView";

export interface ResetPasswordFormValues {
  password: string;
  passwordConfirm: string;
}

/*
 * This is the presenter for any email-triggered authentication mechanisms,
 * including email verification and password reset. It's a bit messy, but it
 * does work and is fairly easy to follow.
 *                                                                           */
export default function AuthPresenter() {
  const [searchParams] = useSearchParams();
  const [verifyError, setVerifyError] = useState<string>();
  const [resetPasswordError, setResetPasswordError] = useState<string>();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
  const [resendSuccessText, setResendSuccessText] = useState<string>();
  const [showLoading, setShowLoading] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    if (mode === "verifyEmail" || mode === "verifyAndChangeEmail") {
      handleVerify(auth, oobCode);
    } else if (mode === "resetPassword") {
      setShowResetPassword(true);
      setShowLoading(false);
    } else {
      setShowLoading(false);
    }
  }, []);

  async function handleResetPassword(values: ResetPasswordFormValues) {
    const oobCode = searchParams.get("oobCode");

    if (!oobCode) {
      setResetPasswordError("Invalid reset code.");
      setShowLoading(false);
      return;
    }

    setShowLoading(true);
    confirmPasswordReset(auth, oobCode, values.password)
      .then(() => {
        navigate(`${loginRoute.path}?reset=true`);
        return;
      })
      .catch((error: unknown) => {
        setShowLoading(false);
        if (error instanceof FirebaseError) {
          setResetPasswordError(error.message);
        }
      });
  }

  async function handleVerify(auth: Auth, oobCode: string | null) {
    if (!oobCode) {
      setVerifyError("Invalid verification code.");
      setShowLoading(false);
      return;
    }
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

  if (showLoading) {
    return <LoaderScreenView />;
  } else if (verifyError) {
    return (
      <AuthInfoView
        title="Something went wrong!"
        description="We couldn't verify your email address."
        submitLabel="Please try again."
        submitText="Resend email"
        onSubmit={handleResendEmail}
        successMsg={resendSuccessText}
        errorMsg={emailError?.message || verifyError}
        loading={sending}
      />
    );
  } else if (resetPasswordError) {
    return (
      <AuthInfoView
        title="Something went wrong!"
        description="We couldn't reset your password."
        submitLabel="Please try again."
        submitText="Try again"
        onSubmit={() => {
          navigate(requestResetRoute.path ?? "/reset-password");
        }}
        successMsg={resendSuccessText}
        errorMsg={emailError?.message || verifyError}
        loading={sending}
      />
    );
  } else if (showResetPassword) {
    return <ResetPasswordView onSubmit={handleResetPassword} />;
  } else {
    navigate(loginRoute.path ?? "/login");
    return null;
  }
}

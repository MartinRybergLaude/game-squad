import { useEffect, useState } from "react";
import {
  useAuthState,
  useSendEmailVerification,
  useSignOut,
  useUpdateEmail,
  useVerifyBeforeUpdateEmail,
} from "react-firebase-hooks/auth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { applyActionCode, Auth } from "firebase/auth";

import { loginRoute, verificationRoute } from "~/App";
import { auth } from "~/utils/firebaseConfig";

import AuthInfoView from "../authInfo/authInfoView";
import UpdateEmailModalView from "./updateEmailModalView";

export interface UpdateFormValues {
  email: string;
}

export default function UpdateEmailModalPresenter() {
  //const [updateEmail, updating, error] = useUpdateEmail(auth);
  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const [resendSuccessText, setResendSuccessText] = useState<string>();
  const navigate = useNavigate();
  const [signOut] = useSignOut(auth);
  const [verifyBeforeUpdateEmail, updating, error] = useVerifyBeforeUpdateEmail(auth);
  const [verifyError, setVerifyError] = useState<string>();
  const [user] = useAuthState(auth);
  const [searchParams] = useSearchParams();

  /*
  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    console.log(mode);
    console.log(oobCode);

    if (mode === "verifyEmail") {
      handleVerify(auth, oobCode);
    }
  }, []);

  async function handleVerify(auth: Auth, oobCode: string | null) {
    if (!oobCode) {
      setVerifyError("Invalid verification code.");
      return;
    }
    applyActionCode(auth, oobCode)
      .then(() => {
        navigate(`${loginRoute.path}?verified=true`);
        return;
      })
      .catch((error: unknown) => {
        if (error instanceof FirebaseError) {
          setVerifyError(error.message);
        }
      });
  }*/

  async function handleEmailUpdate(values: UpdateFormValues) {
    setResendSuccessText(undefined);
    setVerifyError(undefined);

    const requestEmailUpdate = await verifyBeforeUpdateEmail(values.email);
    if (requestEmailUpdate) {
      setSendSuccessText("Please check your email to verify your updated email adress");
    } else {
      setVerifyError("An error occured");
    }
  }
  /*
  if (verifyError) {
    return (
      <AuthInfoView
        title="Something went wrong!"
        description="We couldn't verify your email address."
        submitLabel="Please try again."
        submitText="Resend email"
        onSubmit={handleEmailUpdate}
        successMsg={resendSuccessText}
        errorMsg={emailError?.message || verifyError}
        loading={sending}
      />
    );
  }*/

  /*
  if (error?.message === "Firebase: Error (auth/requires-recent-login).") {
    const loggedOut = await signOut();
    if (loggedOut) {
      navigate(`${loginRoute.path}?changeAccountSettings=true`);
      return null;
    }
  }
  if (error?.message === "Firebase: Error (auth/email-already-in-use).") {
    console.log("I denna");
    error.message = "That email is already in use";
  }*/

  /*
  async function handleEmailUpdate(values: UpdateFormValues) {
    const requestEmailUpdate = await updateEmail(values.email);
    if (requestEmailUpdate) {
      setSendSuccessText("Your email has been updated!");
    } else {
      const loggedOut = await signOut();
      if (loggedOut) {
        navigate(`${loginRoute.path}?changeAccountSettings=true`);
        return null;
      }
    }
  }*/

  return (
    <UpdateEmailModalView
      onSubmit={handleEmailUpdate}
      errorMsg={error?.message || emailError?.message}
      successMsg={sendSuccessText}
      loading={updating || sending}
    />
  );
}

import { useEffect, useState } from "react";
import {
  useAuthState,
  useSendEmailVerification,
  useUpdateEmail,
  useVerifyBeforeUpdateEmail,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

import { loginRoute, verificationRoute } from "~/App";
import { auth } from "~/utils/firebaseConfig";

import UpdateEmailModalView from "./updateEmailModalView";

export interface UpdateFormValues {
  email: string;
}

export default function UpdateEmailModalPresenter() {
  //const [updateEmail, updating, error] = useUpdateEmail(auth);
  const [sendEmailVerification, sending, emailError] = useSendEmailVerification(auth);
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const [resendSuccessText, setResendSuccessText] = useState<string>();
  const [verifyBeforeUpdateEmail, updating, error] = useVerifyBeforeUpdateEmail(auth);

  const [user] = useAuthState(auth);

  console.log(user);

  const actionCodeSettings = {
    url: "https://www.gamesquad.win/" + `${loginRoute.path}?verified=true`,
  };

  async function handleResendEmail() {
    setResendSuccessText(undefined);
    if (user && !user.emailVerified) {
      const verificationSent = await sendEmailVerification();
      if (verificationSent) {
        setResendSuccessText("Verification email sent!");
      }
    }
  }

  /*
  async function handleEmailUpdate(values: UpdateFormValues) {
    const requestEmailUpdate = await updateEmail(values.email);
    if (requestEmailUpdate) {
      setSendSuccessText("Your email has been updated!");
    }
  }*/

  async function handleEmailUpdate(values: UpdateFormValues) {
    const requestEmailUpdate = await verifyBeforeUpdateEmail(values.email, actionCodeSettings);
    if (requestEmailUpdate) {
      //alert("Please check your email to verify your updated email address");
      setSendSuccessText("Your email has been updated!");
    }
  }

  return (
    <UpdateEmailModalView
      onSubmit={handleEmailUpdate}
      errorMsg={error?.message || emailError?.message}
      successMsg={sendSuccessText}
      loading={updating || sending}
    />
  );
}

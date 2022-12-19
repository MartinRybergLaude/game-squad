import { useEffect, useState } from "react";
import { useSignOut, useVerifyBeforeUpdateEmail } from "react-firebase-hooks/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { loginRoute } from "~/App";
import { auth } from "~/utils/firebaseConfig";

import UpdateEmailModalView from "./updateEmailModalView";

export interface UpdateFormValues {
  email: string;
}

export async function handleSignOut(signOut: () => Promise<boolean>, navigate: NavigateFunction) {
  const loggedOut = await signOut();
  if (loggedOut) {
    navigate(`${loginRoute.path}?changeAccountSettings=true`);
    return null;
  }
}

export default function UpdateEmailModalPresenter() {
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const navigate = useNavigate();
  const [signOut] = useSignOut(auth);
  const [verifyBeforeUpdateEmail, updating, error] = useVerifyBeforeUpdateEmail(auth);

  useEffect(() => {
    if (error) {
      if (error.message === "Firebase: Error (auth/requires-recent-login).") {
        handleSignOut(signOut, navigate);
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMsg("That email is already in use.");
      } else {
        setErrorMsg("There was an unexpected error");
      }
    }
  }, [error]);

  async function handleEmailUpdate(values: UpdateFormValues) {
    setErrorMsg(undefined);
    // @ts-expect-error: VerifyBeforeUpdate should not take ActionCode
    const requestEmailUpdate = await verifyBeforeUpdateEmail(values.email).catch();
    if (requestEmailUpdate) {
      setSendSuccessText(
        "Please check your email to verify your updated email adress. After verifying, please refresh the site and log in again with the new email.",
      );
    }
  }

  return (
    <UpdateEmailModalView
      onSubmit={handleEmailUpdate}
      errorMsg={errorMsg}
      successMsg={sendSuccessText}
      loading={updating}
    />
  );
}

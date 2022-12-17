import { useState } from "react";
import { useSignOut, useUpdatePassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

import { auth } from "~/utils/firebaseConfig";

import { loginRoute } from "../../App";
import UpdatePasswordModalView from "./updatePasswordModalView";

export interface UpdateFormValues {
  password: string;
  passwordConfirm: string;
}

export default function UpdatePasswordModalPresenter() {
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const navigate = useNavigate();
  const [signOut] = useSignOut(auth);

  async function handlePasswordUpdate(values: UpdateFormValues) {
    setSendSuccessText(undefined);
    const requestPasswordUpdate = await updatePassword(values.password);
    if (requestPasswordUpdate) {
      setSendSuccessText("Your Password has been updated!");
      signOut();
      navigate(`${loginRoute.path}?changeAccountSettings=true`);
      return null;
    } else {
      console.log("Caught error");
      console.log(error);
      signOut();
      navigate(`${loginRoute.path}?reset=true`);
      return null;
    }
  }

  return (
    <UpdatePasswordModalView
      onSubmit={handlePasswordUpdate}
      errorMsg={error?.message}
      successMsg={sendSuccessText}
      loading={updating}
    />
  );
}

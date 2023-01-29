import { useState } from "react";
import { useSignOut, useUpdatePassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "~/utils/firebaseConfig";

import { handleSignOut } from "../updateEmailModal/updateEmailModalPresenter";
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
      return null;
    } else {
      handleSignOut(signOut, navigate);
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

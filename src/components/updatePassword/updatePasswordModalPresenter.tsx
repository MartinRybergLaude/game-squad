import { useState } from "react";
import { useUpdatePassword } from "react-firebase-hooks/auth";

import { auth } from "~/firebaseConfig";

import UpdatePasswordModalView from "./updatePasswordModalView";

export interface UpdateFormValues {
  password: string;
  passwordConfirm: string;
}

export default function UpdatePasswordModalPresenter() {
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  const [sendSuccessText, setSendSuccessText] = useState<string>();

  async function handlePasswordUpdate(values: UpdateFormValues) {
    setSendSuccessText(undefined);
    const requestPasswordUpdate = await updatePassword(values.password);
    if (requestPasswordUpdate) {
      setSendSuccessText("Your Password has been updated!");
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

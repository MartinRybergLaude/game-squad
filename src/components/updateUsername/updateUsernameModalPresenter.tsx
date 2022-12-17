import { useState } from "react";
import { useSignOut, useUpdateProfile } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

import { loginRoute } from "~/App";
import { auth } from "~/utils/firebaseConfig";

import UpdateUsernameModalView from "./updateUsernameModalView";

export interface UpdateFormValues {
  username: string;
}

export default function UpdateUsernameModalPresenter() {
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const navigate = useNavigate();
  const [signOut] = useSignOut(auth);

  async function handleUsernameUpdate(values: UpdateFormValues) {
    setSendSuccessText(undefined);
    const requestUsernameUpdate = await updateProfile({ displayName: values.username });
    if (requestUsernameUpdate) {
      setSendSuccessText("Your username has been updated!");
    } else {
      signOut();
      navigate(`${loginRoute.path}?changeAccountSettings=true`);
      return null;
    }
  }

  return (
    <UpdateUsernameModalView
      onSubmit={handleUsernameUpdate}
      errorMsg={error?.message}
      successMsg={sendSuccessText}
      loading={updating}
    />
  );
}

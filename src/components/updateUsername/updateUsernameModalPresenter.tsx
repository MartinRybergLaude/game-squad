import { useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

import { loginRoute } from "~/App";
import { auth } from "~/utils/firebaseConfig";

import { routeLoginPageFuncs } from "../settings/settingsModalPresenter";
import UpdateUsernameModalView from "./updateUsernameModalView";

export interface UpdateFormValues {
  username: string;
}

export default function UpdateUsernameModalPresenter({ navigate, signOut }: routeLoginPageFuncs) {
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [sendSuccessText, setSendSuccessText] = useState<string>();

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

import { useState } from "react";
import { useAuthState, useDeleteUser, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

import { loginRoute } from "~/App";
import { auth } from "~/utils/firebaseConfig";

import DeleteProfileModalView from "./deleteProfileModalView";

export default function DeleteProfileModalPresenter() {
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const [deleteUser, loading, error] = useDeleteUser(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [signOut] = useSignOut(auth);

  async function handleDeleteUser() {
    setSendSuccessText(undefined);
    const requestDeleteUser = await deleteUser();
    if (requestDeleteUser) {
      setSendSuccessText("Your profile has been deleted. You will be redirected to the login page");
      navigate(`${loginRoute.path}`);
      return null;
    } else {
      const loggedOut = await signOut();
      if (loggedOut) {
        navigate(`${loginRoute.path}?changeAccountSettings=true`);
      }
    }
  }

  return (
    <DeleteProfileModalView
      onSubmit={handleDeleteUser}
      errorMsg={error?.message}
      successMsg={sendSuccessText}
      loading={loading}
    />
  );
}

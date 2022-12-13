import { useState } from "react";
import { useAuthState, useDeleteUser } from "react-firebase-hooks/auth";

import { auth } from "~/utils/firebaseConfig";

import DeleteProfileModalView from "./deleteProfileModalView";

export default function DeleteProfileModalPresenter() {
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const [deleteUser, loading, error] = useDeleteUser(auth);
  const [user] = useAuthState(auth);

  // User is not logged in
  if (!user) null;

  async function handleDeleteUser() {
    setSendSuccessText(undefined);
    const requestDeleteUser = await deleteUser();
    if (requestDeleteUser) {
      setSendSuccessText("Your profile has been deleted. You will be redirected to the login page");
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

/* TODO: 
-Add requirement for recent login!!! 
-Maybe add catch for errors?
-After the profile is deleted, a new modal should be shown or something like that with the confirmation message, so the old modal doesn't stay
*/

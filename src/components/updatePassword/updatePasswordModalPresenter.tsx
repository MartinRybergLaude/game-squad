import { useState } from "react";
import { useAuthState, useUpdatePassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { closeAllModals } from "@mantine/modals";
import { FirebaseError } from "firebase/app";
import { updateCurrentUser } from "firebase/auth";

import { auth } from "~/utils/firebaseConfig";

import { loginRoute } from "../../App";
import UpdatePasswordModalView from "./updatePasswordModalView";

export interface UpdateFormValues {
  password: string;
  passwordConfirm: string;
}

export default function UpdatePasswordModalPresenter() {
  const [updatePassword, updating, error] = useUpdatePassword(auth);
  const navigate = useNavigate();
  const [sendSuccessText, setSendSuccessText] = useState<string>();
  const [user] = useAuthState(auth);
  const [showLoading, setShowLoading] = useState(true);

  async function handleAccountChange() {
    updateCurrentUser(auth, auth.currentUser).then(() => {
      navigate(`${loginRoute.path}?changeAccountSettings=true`);
      return;
    });
  }

  /*
  async function handlePasswordUpdate(values: UpdateFormValues) {
    setSendSuccessText(undefined);
    setShowLoading(true);
    updatePassword(values.password)
      .then(() => {
        setSendSuccessText("Your Password has been updated!");
        navigate(`${loginRoute.path}?changeAccountSettings=true`);
        return;
      })
      .catch((error: unknown) => {
        setShowLoading(false);
        if (error instanceof FirebaseError) {
          console.log(error);
        }
      });
  }*/

  async function handlePasswordUpdate(values: UpdateFormValues) {
    setSendSuccessText(undefined);
    const requestPasswordUpdate = await updatePassword(values.password);
    if (requestPasswordUpdate) {
      setSendSuccessText("Your Password has been updated!");
    } else {
      navigate(loginRoute.path ?? "/login");
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

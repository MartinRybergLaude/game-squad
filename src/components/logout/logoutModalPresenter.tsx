import { useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { closeAllModals } from "@mantine/modals";

import { auth } from "~/firebaseConfig";

import LogoutModalView from "./logoutModalView";

export default function LogoutModalPresenter() {
  const [signOut, loading, error] = useSignOut(auth);
  const [user] = useAuthState(auth);

  // User is not logged in
  if (!user) null;

  async function handleSignOut() {
    const requestSignOut = await signOut();
    if (requestSignOut) {
      closeAllModals();
    }
  }

  return <LogoutModalView onSubmit={handleSignOut} errorMsg={error?.message} loading={loading} />;
}

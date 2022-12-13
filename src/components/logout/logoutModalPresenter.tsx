import { useSignOut } from "react-firebase-hooks/auth";
import { closeAllModals } from "@mantine/modals";

import { auth } from "~/utils/firebaseConfig";

import LogoutModalView from "./logoutModalView";

export default function LogoutModalPresenter() {
  const [signOut, loading, error] = useSignOut(auth);

  async function handleSignOut() {
    const requestSignOut = await signOut();
    if (requestSignOut) {
      closeAllModals();
    }
  }

  return <LogoutModalView onSubmit={handleSignOut} errorMsg={error?.message} loading={loading} />;
}

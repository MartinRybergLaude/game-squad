import { useSignOut } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { closeAllModals } from "@mantine/modals";

import { auth } from "~/utils/firebaseConfig";

import { loginRoute } from "../../App";
import LogoutModalView from "./logoutModalView";

export default function LogoutModalPresenter() {
  const [signOut, loading, error] = useSignOut(auth);
  const navigate = useNavigate();

  async function handleSignOut() {
    const requestSignOut = await signOut();
    if (requestSignOut) {
      closeAllModals();
      navigate(loginRoute.path ?? "/login");
      return null;
    }
  }

  return <LogoutModalView onSubmit={handleSignOut} errorMsg={error?.message} loading={loading} />;
}

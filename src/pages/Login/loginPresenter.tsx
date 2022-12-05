import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

import { dashboardRoute } from "../../App";
import { auth } from "../../firebaseConfig";
import LoginView from "./loginView";

export interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginPresenter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified");

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  function handleSubmit(values: LoginFormValues) {
    signInWithEmailAndPassword(values.email, values.password);
  }

  if (user) {
    navigate(dashboardRoute.path || "/");
  }

  return (
    <LoginView
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      verified={verified ? true : false}
    />
  );
}

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { dashboardRoute } from "../../App";
import { auth } from "../../firebaseConfig";
import LoginView from "./loginView";

export interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginPresenter() {
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  function handleSubmit(values: LoginFormValues) {
    signInWithEmailAndPassword(values.email, values.password);
  }

  if (user) {
    navigate(dashboardRoute.path);
  }

  return <LoginView onSubmit={handleSubmit} loading={loading} error={error} />;
}

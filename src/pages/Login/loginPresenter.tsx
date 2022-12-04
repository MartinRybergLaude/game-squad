import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import LoginView from "./loginView";
import { dashboardRoute, loginRoute } from "../../App";
import { useMatch } from "@tanstack/react-router";

export interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginPresenter() {
  const { navigate } = useMatch(loginRoute.id);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSubmit(values: LoginFormValues) {
    signInWithEmailAndPassword(values.email, values.password);
  }

  if (user) {
    navigate({ to: dashboardRoute.id, replace: true });
  }

  return <LoginView onSubmit={handleSubmit} loading={loading} error={error} />;
}

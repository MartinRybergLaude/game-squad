import RegisterView from "./registerView";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { dashboardRoute, registerRoute } from "../../App";
import { useMatch } from "@tanstack/react-router";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPresenter() {
  const { navigate } = useMatch(registerRoute.id);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSubmit(values: RegisterFormValues) {
    console.log("lall");
    createUserWithEmailAndPassword(values.email, values.password);
  }

  if (user) {
    navigate({ to: dashboardRoute.id, replace: true });
  }

  return (
    <RegisterView onSubmit={handleSubmit} loading={loading} error={error} />
  );
}

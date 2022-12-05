import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { dashboardRoute } from "../../App";
import { auth } from "../../firebaseConfig";
import RegisterView from "./registerView";

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPresenter() {
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSubmit(values: RegisterFormValues) {
    createUserWithEmailAndPassword(values.email, values.password);
  }

  if (user) {
    navigate(dashboardRoute.path);
  }

  return <RegisterView onSubmit={handleSubmit} loading={loading} error={error} />;
}

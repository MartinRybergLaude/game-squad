import RegisterView from "./registerView";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { dashboardRoute } from "../../App";
import { useNavigate } from "react-router-dom";

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
    console.log("lall");
    createUserWithEmailAndPassword(values.email, values.password);
  }

  if (user) {
    navigate(dashboardRoute.path);
  }

  return (
    <RegisterView onSubmit={handleSubmit} loading={loading} error={error} />
  );
}

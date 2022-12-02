import LoginView from "./view";

interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginPresenter() {
  function handleSubmit(values: LoginFormValues) {}

  return <LoginView />;
}

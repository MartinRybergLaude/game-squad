import LoginView from "./loginView";

interface LoginFormValues {
  email: string;
  password: string;
}
export default function LoginPresenter() {
  function handleSubmit(values: LoginFormValues) {}

  return <LoginView />;
}

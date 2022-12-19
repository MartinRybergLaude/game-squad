import { useNavigate } from "react-router-dom";

import { loginRoute, registerRoute } from "~/App";

import HomepageView from "./homepageView";

export default function HomepagePresenter() {
  const navigate = useNavigate();

  function handleRegister() {
    navigate(registerRoute.path || "/register");
  }

  function handleLogin() {
    navigate(loginRoute.path || "/login");
  }

  return <HomepageView onSubmit={handleRegister} onLoginClick={handleLogin} />;
}

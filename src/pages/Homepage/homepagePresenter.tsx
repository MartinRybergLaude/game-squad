import { useNavigate } from "react-router-dom";

import { dashboardRoute } from "~/App";

import HomepageView from "./homepageView";

export interface HomepageFormValues {
  continue: Record<string, unknown>;
}

export default function HomepagePresenter() {
  const navigate = useNavigate();

  function handleContinue() {
    navigate(dashboardRoute.path || "/login");
  }

  return <HomepageView onSubmit={handleContinue} />;
}

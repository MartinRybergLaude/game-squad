import { HomePageHeaderView } from "./homePageHeaderView";

export default function homePageHeaderPresenter() {
  return (
    <HomePageHeaderView
      links={[
        { link: "/login", label: "Log in" },
        { link: "/register", label: "Register" },
      ]}
    />
  );
}

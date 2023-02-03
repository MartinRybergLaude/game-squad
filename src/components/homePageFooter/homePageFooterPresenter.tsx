import { HomePageFooterView } from "./homePageFooterView";

export default function HomePageFooterPresenter() {
  return (
    <HomePageFooterView
      links={[
        { link: "/", label: "Home" },
        { link: "mailto:contact@mrlaude.com", label: "Contact" },
        { link: "/register", label: "Register" },
        { link: "/login", label: "Log in" },
      ]}
    />
  );
}

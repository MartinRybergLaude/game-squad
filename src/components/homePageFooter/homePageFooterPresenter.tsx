import { HomePageFooterView } from "./homePageFooterView";

export default function HomePageFooterPresenter() {
  return (
    <HomePageFooterView
      links={[
        { link: "/about", label: "About" },
        { link: "/contact", label: "Contact" },
        { link: "/privacy", label: "Privacy" },
        { link: "/terms", label: "Terms" },
      ]}
    />
  );
}

import SEO from "~/components/seo/seo";

import NotFoundView from "./notFoundView";

export default function NotFoundPresenter() {
  return (
    <>
      <SEO title="Not found" description="Page not found" />
      <NotFoundView />;
    </>
  );
}

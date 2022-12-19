import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
}

// Neither presenter nor view, simply adds meta tags to pages.
export default function SEO({ title, description }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

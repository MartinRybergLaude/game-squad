import { Meta, Title } from "react-head";
interface SEOProps {
  title: string;
  description: string;
}

// Neither presenter nor view, simply adds meta tags to pages.
export default function SEO({ title, description }: SEOProps) {
  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
    </>
  );
}

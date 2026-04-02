import { Helmet } from "react-helmet-async";

const MetaHTML = ({ title, description, canonical, ogImage, ogType }) => {
  const siteName = "Rabbit E-commerce";
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Clothing Store in Etah`;
  const defaultDescription = "Rabbit E-commerce is a premium clothing store in Etah by Ajyendra Singh Jadon. This SEO-optimized demo website features a full cart, secure payments, and admin panel.";
  const metaDescription = description || defaultDescription;
  const currentUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage || "/og-image.jpg"} />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage || "/og-image.jpg"} />
    </Helmet>
  );
};

export default MetaHTML;

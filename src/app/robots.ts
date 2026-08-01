import type { MetadataRoute } from "next";

const SITE = (
  process.env.SITE_URL || "https://www.josiedealbuquerque.com.br"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* As rotas de API não têm nada para indexar e recebem dados de lead.
         Manter fora do rastreamento evita ruído e tentativa de varredura. */
      disallow: ["/api/"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}

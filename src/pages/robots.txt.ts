import type { APIRoute } from "astro";

// Not: GitHub Pages’te proje sitesi alt dizinde yayınlandığı için arama motorları
// alan adının kökündeki robots.txt dosyasını okur. Bu dosya özel alan adına geçildiğinde işe yarar.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(
    `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/sitemap-index.xml`,
    site,
  );
  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemap.href}`, ""].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};

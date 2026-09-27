// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

// GitHub Pages proje sitesi: https://mediaconfig55-afk.github.io/Bilgin-Web/
// Özel alan adına geçildiğinde SITE_URL'yi alan adına, BASE_PATH'i "/" yapmak yeterli.
const SITE_URL = process.env.SITE_URL ?? "https://mediaconfig55-afk.github.io";
const BASE_PATH = process.env.BASE_PATH ?? "/Bilgin-Web";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: "always",
  compressHTML: true,
  build: {
    format: "directory",
    // CSS küçük (~20 KB); sayfaya gömmek, ilk açılıştaki engelleyici isteği kaldırıyor.
    inlineStylesheets: "always",
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404/"),
    }),
  ],
  // Yazı tipleri derleme sırasında indirilip site ile birlikte sunuluyor;
  // ziyaretçinin tarayıcısı Google'a istek atmıyor.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Schibsted Grotesk",
      cssVariable: "--font-schibsted",
      fallbacks: ["Arial", "sans-serif"],
      weights: [500, 600, 700],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      display: "swap",
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Sans",
      cssVariable: "--font-instrument",
      fallbacks: ["Arial", "sans-serif"],
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      display: "swap",
    },
  ],
});

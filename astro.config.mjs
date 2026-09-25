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
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
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
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            weight: "400 600",
            style: "normal",
            display: "swap",
            src: ["./src/assets/fonts/newsreader-var.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "IBM Plex Sans",
      cssVariable: "--font-plex",
      fallbacks: ["Arial", "sans-serif"],
      options: {
        variants: [
          {
            weight: "400 700",
            style: "normal",
            display: "swap",
            src: ["./src/assets/fonts/plex-sans-var.woff2"],
          },
          {
            weight: "400 600",
            style: "italic",
            display: "swap",
            src: ["./src/assets/fonts/plex-sans-italic-var.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "IBM Plex Mono",
      cssVariable: "--font-plex-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            display: "swap",
            src: ["./src/assets/fonts/plex-mono.woff2"],
          },
        ],
      },
    },
  ],
});

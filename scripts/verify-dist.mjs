// Derleme çıktısını yayından önce denetler: node scripts/verify-dist.mjs
// Her HTML sayfasında başlık, açıklama, canonical, tek h1, Open Graph görseli, geçerli JSON-LD,
// görsel alt metinleri ve kırık iç bağlantı olup olmadığına bakar. Hata varsa çıkış kodu 1 olur.
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { parse } from "node-html-parser";

const DIST = new URL("../dist/", import.meta.url);
const distPath = decodeURIComponent(DIST.pathname).replace(/^\/([A-Za-z]:)/, "$1");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

const files = await walk(distPath);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
if (htmlFiles.length === 0) {
  console.error("dist/ içinde HTML bulunamadı. Önce `astro build` çalıştırın.");
  process.exit(1);
}

// Base yolunu ana sayfanın canonical adresinden çıkar (/Bilgin-Web/ ya da /).
const indexHtml = parse(await readFile(join(distPath, "index.html"), "utf8"));
const homeCanonical = indexHtml.querySelector('link[rel="canonical"]')?.getAttribute("href");
const base = homeCanonical ? new URL(homeCanonical).pathname : "/";

const problems = [];
const titles = new Map();
const descriptions = new Map();
const report = (file, message) =>
  problems.push(`${relative(distPath, file).split(sep).join("/")}: ${message}`);

/** Sayfanın dosya yolundan yayındaki adresini çıkarır: dist/isler/finans/index.html → /Bilgin-Web/isler/finans/ */
function pageUrlOf(file) {
  const rel = relative(distPath, file).split(sep).join("/");
  const path = rel.endsWith("index.html") ? rel.slice(0, -"index.html".length) : rel;
  return new URL(`${base}${path}`, "https://site.local");
}

function resolveInternal(href, pageUrl = new URL(base, "https://site.local")) {
  const clean = new URL(href.split("#")[0].split("?")[0] || ".", pageUrl).pathname;
  if (!clean.startsWith(base)) return null;
  const rest = decodeURIComponent(clean.slice(base.length));
  const candidates =
    rest === "" || rest.endsWith("/")
      ? [join(distPath, rest, "index.html")]
      : [join(distPath, rest), join(distPath, `${rest}.html`), join(distPath, rest, "index.html")];
  return candidates.some((candidate) => existsSync(candidate));
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const root = parse(html);
  const isNotFound = file.endsWith(`${sep}404.html`);
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
  const noindex = robots.includes("noindex");

  if (root.querySelector("html")?.getAttribute("lang") !== "tr") report(file, 'lang="tr" eksik');

  const title = root.querySelector("title")?.text.trim() ?? "";
  if (!title) report(file, "<title> yok");
  else if (title.length > 70) report(file, `<title> çok uzun (${title.length}): ${title}`);
  if (title && !noindex) titles.set(title, [...(titles.get(title) ?? []), file]);

  const description = root.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
  if (description.length < 70 || description.length > 170) {
    report(file, `meta description uzunluğu ${description.length} (70-170 olmalı)`);
  }
  if (description && !noindex)
    descriptions.set(description, [...(descriptions.get(description) ?? []), file]);

  if (!noindex) {
    const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
    if (!/^https:\/\//.test(canonical)) report(file, "canonical mutlak https adresi değil");
    else if (!canonical.endsWith("/")) report(file, `canonical / ile bitmiyor: ${canonical}`);
  }

  const h1Count = root.querySelectorAll("h1").length;
  if (h1Count !== 1) report(file, `${h1Count} adet h1 var (1 olmalı)`);

  const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute("content");
  if (!ogImage) report(file, "og:image yok");
  else if (resolveInternal(new URL(ogImage).pathname) === false)
    report(file, `og:image dosyası yok: ${ogImage}`);

  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.text);
      if (data["@context"] !== "https://schema.org") report(file, "JSON-LD @context hatalı");
    } catch (error) {
      report(file, `JSON-LD ayrıştırılamadı: ${error.message}`);
    }
  }
  if (!isNotFound && root.querySelectorAll('script[type="application/ld+json"]').length === 0) {
    report(file, "JSON-LD yok");
  }

  for (const img of root.querySelectorAll("img")) {
    if (!img.hasAttribute("alt"))
      report(file, `alt özniteliği olmayan görsel: ${img.getAttribute("src")}`);
    if (!img.getAttribute("width") || !img.getAttribute("height")) {
      report(file, `width/height eksik görsel: ${img.getAttribute("src")}`);
    }
  }

  const pageUrl = pageUrlOf(file);
  for (const link of root.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) continue;
    const found = resolveInternal(href, pageUrl);
    if (found === null) report(file, `base dışı iç bağlantı: ${href}`);
    else if (!found) report(file, `kırık bağlantı: ${href}`);
  }

  if (
    /lorem ipsum|TODO|undefined|\[object Object\]/i.test(root.querySelector("body")?.text ?? "")
  ) {
    report(file, "sayfada yer tutucu metin var (lorem/TODO/undefined)");
  }
}

for (const [title, pages] of titles) {
  if (pages.length > 1) problems.push(`Aynı başlık ${pages.length} sayfada: ${title}`);
}
for (const [description, pages] of descriptions) {
  if (pages.length > 1)
    problems.push(`Aynı açıklama ${pages.length} sayfada: ${description.slice(0, 60)}…`);
}

for (const required of [
  "sitemap-index.xml",
  "robots.txt",
  "404.html",
  "favicon.ico",
  "site.webmanifest",
]) {
  if (!existsSync(join(distPath, required))) problems.push(`dist/${required} eksik`);
}

if (problems.length) {
  console.error(`\n${problems.length} sorun bulundu:\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(
  `${htmlFiles.length} sayfa denetlendi: başlık, açıklama, canonical, h1, OG görseli, JSON-LD, görseller ve iç bağlantılar sorunsuz.`,
);

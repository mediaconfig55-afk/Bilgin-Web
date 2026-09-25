// GitHub Pages alt dizinde (/Bilgin-Web/) yayınlandığı için tüm iç bağlantılar base’e göre üretilir.

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

/** Site içi yol → base’li yol. "/isler/" → "/Bilgin-Web/isler/" */
export function url(path = "/"): string {
  if (EXTERNAL.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${clean}` || "/";
}

/** Site içi yol → mutlak adres (canonical, Open Graph, JSON-LD için). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:/i.test(path)) return path;
  return new URL(url(path), import.meta.env.SITE).href;
}

/** Aktif menü öğesini bulmak için base’siz yol. */
export function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || "/";
  return pathname;
}

import type { CollectionEntry } from "astro:content";

// İçerik tarihleri YAML’da gün olarak yazılıyor ve UTC gece yarısı olarak okunuyor.
// Biçimlendirirken de UTC kullanılıyor ki gün kaymasın.
const longDate = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const monthYear = new Intl.DateTimeFormat("tr-TR", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const formatDate = (date: Date) => longDate.format(date);
export const formatMonth = (date: Date) => monthYear.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Türkçe metin için dakikada ~190 kelime varsayımıyla okuma süresi. */
export function readingMinutes(text: string): number {
  const words = text
    .replace(/[#>*_`[\]()-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 190));
}

export const statusLabel: Record<CollectionEntry<"work">["data"]["status"], string> = {
  live: "Yayında",
  offline: "Şu an yayında değil",
  "in-use": "Kullanımda",
};

export const kindLabel: Record<CollectionEntry<"work">["data"]["kind"], string> = {
  android: "Android uygulaması",
  web: "Web sitesi",
};

export const sortWork = (a: CollectionEntry<"work">, b: CollectionEntry<"work">) =>
  a.data.order - b.data.order;

export const sortPosts = (a: CollectionEntry<"posts">, b: CollectionEntry<"posts">) =>
  b.data.published.getTime() - a.data.published.getTime();

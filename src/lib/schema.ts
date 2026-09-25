// schema.org yapılandırılmış veri üreticileri. Her sayfa tek bir @graph basar;
// kişi, hizmet ve site düğümleri @id ile birbirine bağlanır.
import type { CollectionEntry } from "astro:content";
import { services, site } from "../data/site";
import { absoluteUrl } from "./url";

export type JsonLd = Record<string, unknown>;

export interface Crumb {
  name: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

const id = {
  person: () => absoluteUrl("/#emre-bilgin"),
  business: () => absoluteUrl("/#hizmet"),
  website: () => absoluteUrl("/#site"),
};

const address = () => ({
  "@type": "PostalAddress",
  addressLocality: site.city,
  addressRegion: site.city,
  addressCountry: site.countryCode,
});

export function personNode(): JsonLd {
  return {
    "@type": "Person",
    "@id": id.person(),
    name: site.name,
    jobTitle: site.jobTitle,
    url: absoluteUrl("/hakkimda/"),
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: address(),
    knowsLanguage: "tr",
    knowsAbout: [
      "Android uygulama geliştirme",
      "React Native",
      "Expo",
      "Kotlin",
      "Web sitesi tasarımı",
      "Teknik SEO",
      "Next.js",
      "Astro",
      "Supabase",
      "Firebase",
      "Yapay zeka destekli yazılım geliştirme",
    ],
    sameAs: [site.github, site.playDeveloper.url],
  };
}

export function businessNode(): JsonLd {
  return {
    "@type": "ProfessionalService",
    "@id": id.business(),
    name: `${site.name} · Android uygulama ve web sitesi geliştirme`,
    description: site.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og/varsayilan.png"),
    logo: absoluteUrl("/icon-512.png"),
    telephone: site.phone,
    email: site.email,
    address: address(),
    areaServed: [
      { "@type": "City", name: "Samsun" },
      { "@type": "Country", name: "Türkiye" },
    ],
    founder: { "@id": id.person() },
    knowsLanguage: "tr",
    sameAs: [site.github, site.playDeveloper.url],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        url: absoluteUrl(service.href),
      },
    })),
  };
}

export function websiteNode(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": id.website(),
    url: absoluteUrl("/"),
    name: site.name,
    description: site.description,
    inLanguage: "tr-TR",
    publisher: { "@id": id.person() },
  };
}

export function webPageNode(opts: {
  path: string;
  title: string;
  description: string;
  type?: string;
  image?: string;
  crumbs?: Crumb[];
}): JsonLd {
  const pageUrl = absoluteUrl(opts.path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${pageUrl}#sayfa`,
    url: pageUrl,
    name: opts.title,
    description: opts.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": id.website() },
    ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", url: opts.image } } : {}),
    ...(opts.crumbs?.length ? { breadcrumb: { "@id": `${pageUrl}#yol` } } : {}),
  };
}

export function breadcrumbNode(path: string, crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#yol`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqNode(path: string, items: FaqItem[]): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#sss`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceNode(opts: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
}): JsonLd {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#hizmet`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": id.business() },
    areaServed: [
      { "@type": "City", name: "Samsun" },
      { "@type": "Country", name: "Türkiye" },
    ],
    availableLanguage: "tr",
  };
}

export function articleNode(opts: {
  path: string;
  title: string;
  description: string;
  published: Date;
  updated?: Date;
  image: string;
}): JsonLd {
  const pageUrl = absoluteUrl(opts.path);
  return {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#yazi`,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: { "@id": id.person() },
    publisher: { "@id": id.person() },
    mainEntityOfPage: { "@id": `${pageUrl}#sayfa` },
    image: opts.image,
    inLanguage: "tr-TR",
  };
}

const appCategories: Record<string, string> = {
  reglim: "HealthApplication",
  hatirlat: "UtilitiesApplication",
  finans: "FinanceApplication",
  "ayik-sofor": "TravelApplication",
};

export function workNode(entry: CollectionEntry<"work">, image?: string): JsonLd {
  const { data } = entry;
  const pageUrl = absoluteUrl(`/isler/${entry.id}/`);

  if (data.kind === "android") {
    return {
      "@type": "MobileApplication",
      "@id": `${pageUrl}#uygulama`,
      name: data.title,
      description: data.description,
      operatingSystem: "Android",
      applicationCategory: appCategories[entry.id] ?? "UtilitiesApplication",
      ...(data.playUrl ? { url: data.playUrl, installUrl: data.playUrl } : {}),
      ...(data.version ? { softwareVersion: data.version } : {}),
      ...(data.released ? { datePublished: data.released.toISOString().slice(0, 10) } : {}),
      ...(data.updated ? { dateModified: data.updated.toISOString().slice(0, 10) } : {}),
      inLanguage: "tr",
      offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
      author: { "@id": id.person() },
      ...(image ? { image } : {}),
    };
  }

  return {
    "@type": "CreativeWork",
    "@id": `${pageUrl}#is`,
    name: data.title,
    description: data.description,
    dateCreated: String(data.year),
    creator: { "@id": id.person() },
    ...(data.liveUrl ? { url: data.liveUrl } : {}),
    ...(image ? { image } : {}),
    inLanguage: "tr",
  };
}

export const graph = (...nodes: JsonLd[]): JsonLd => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

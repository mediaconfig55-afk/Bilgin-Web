import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { formatDate, kindLabel } from "../../lib/format";
import { renderOgImage, type OgCard } from "../../lib/og";

export const getStaticPaths = (async () => {
  const cards: OgCard[] = [
    {
      slug: "varsayilan",
      kicker: "Samsun",
      title: "Android uygulamaları ve web siteleri geliştiriyorum.",
      subtitle: "Google Play’de yayında dört uygulama, işletmeler için hızlı siteler.",
    },
    {
      slug: "isler",
      kicker: "İşler",
      title: "Android uygulamaları ve web siteleri",
      subtitle: "Reglim, HatırLat, Finans, Ayık Şoför, Defne Organizasyon ve diğerleri",
    },
    {
      slug: "hizmetler",
      kicker: "Hizmetler",
      title: "Android uygulama, web sitesi ve yapay zeka destekli geliştirme",
      subtitle: "Samsun’da yüz yüze, Türkiye geneli uzaktan",
    },
    {
      slug: "android-uygulama-gelistirme",
      kicker: "Hizmet",
      title: "Android uygulama geliştirme",
      subtitle: "Tasarım, geliştirme ve Google Play yayını",
    },
    {
      slug: "web-sitesi-tasarimi",
      kicker: "Hizmet",
      title: "Web sitesi tasarımı",
      subtitle: "Telefonda hızlı açılan, Google’da bulunan işletme siteleri",
    },
    {
      slug: "yapay-zeka-destekli-gelistirme",
      kicker: "Hizmet",
      title: "Yapay zeka destekli geliştirme",
      subtitle: "Neyi hızlandırıyor, neyi hâlâ elle yapıyorum",
    },
    {
      slug: "samsun-web-tasarim",
      kicker: "Samsun",
      title: "Samsun’da web tasarım ve mobil uygulama",
      subtitle: "Yüz yüze görüşme, yerel aramalara göre kurulan sayfalar",
    },
    {
      slug: "hakkimda",
      kicker: "Hakkımda",
      title: "Emre Bilgin",
      subtitle: "Samsun’da Android uygulama ve web sitesi geliştirici",
    },
    {
      slug: "iletisim",
      kicker: "İletişim",
      title: "Bir fikrin varsa yaz.",
      subtitle: "WhatsApp, telefon ya da e-posta",
    },
    {
      slug: "yazilar",
      kicker: "Yazılar",
      title: "Android, web ve Google Play notları",
      subtitle: "Kendi projelerimden çıkan yazılar",
    },
  ];

  for (const entry of await getCollection("work")) {
    cards.push({
      slug: `isler-${entry.id}`,
      kicker: kindLabel[entry.data.kind],
      title: entry.data.title,
      subtitle: entry.data.version
        ? `${entry.data.short} · sürüm ${entry.data.version}`
        : entry.data.short,
    });
  }

  for (const post of await getCollection("posts")) {
    cards.push({
      slug: `yazi-${post.id}`,
      kicker: `Yazı · ${post.data.topic}`,
      title: post.data.title,
      subtitle: formatDate(post.data.published),
    });
  }

  return cards.map((card) => ({ params: { slug: card.slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { card } = props as { card: OgCard };
  const png = await renderOgImage(card);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};

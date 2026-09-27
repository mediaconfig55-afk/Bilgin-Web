import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { kindLabel } from "../../lib/format";
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
      slug: "iletisim",
      kicker: "İletişim",
      title: "Fikrini anlat, gerisini ben çıkarayım.",
      subtitle: "WhatsApp, telefon ya da e-posta",
    },
    {
      slug: "gizlilik",
      kicker: "Gizlilik",
      title: "Gizlilik",
      subtitle: "Bu sitede çerez ve izleme kodu yok",
    },
  ];

  for (const entry of await getCollection("work")) {
    cards.push({
      slug: entry.id,
      kicker: kindLabel[entry.data.kind],
      title: entry.data.title,
      subtitle: entry.data.short,
    });
  }

  return cards.map((card) => ({ params: { slug: card.slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { card } = props as { card: OgCard };
  const png = await renderOgImage(card);
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};

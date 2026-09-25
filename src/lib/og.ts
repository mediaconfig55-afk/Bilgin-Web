// Sayfa başına Open Graph görseli (1200×630). Derleme sırasında satori ile SVG’ye,
// resvg ile PNG’ye çevriliyor; tarayıcıya hiçbir betik gitmiyor.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

export interface OgCard {
  slug: string;
  kicker: string;
  title: string;
  subtitle?: string;
}

type Node = { type: string; props: Record<string, unknown> };

const color = {
  paper: "#f9f6ef",
  paper2: "#f1ede4",
  rule: "#d7d2c9",
  ink: "#1b1611",
  muted: "#4c4741",
  neutral: "#67625c",
  accent: "#0b6f49",
};

const fontDir = join(process.cwd(), "src", "assets", "og");
let fontsPromise: Promise<Parameters<typeof satori>[1]["fonts"]> | undefined;

export function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(fontDir, "newsreader-500.ttf")),
    readFile(join(fontDir, "plex-sans-400.ttf")),
    readFile(join(fontDir, "plex-sans-600.ttf")),
  ]).then(([news, plex, plexBold]) => [
    { name: "Newsreader", data: news, weight: 500, style: "normal" },
    { name: "Plex", data: plex, weight: 400, style: "normal" },
    { name: "Plex", data: plexBold, weight: 600, style: "normal" },
  ]);
  return fontsPromise;
}

const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

function titleSize(title: string) {
  if (title.length <= 28) return 88;
  if (title.length <= 48) return 72;
  if (title.length <= 70) return 60;
  return 52;
}

function siteLabel() {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const host = new URL(import.meta.env.SITE ?? "https://example.com").host;
  return `${host}${base}`;
}

export async function renderOgImage(card: OgCard): Promise<Uint8Array> {
  const tree = h(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      backgroundColor: color.paper,
      color: color.ink,
      fontFamily: "Plex",
      padding: "56px 72px 52px",
    },
    [
      h(
        "div",
        {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: 18,
          borderBottom: `3px solid ${color.ink}`,
        },
        [
          h("div", { fontFamily: "Newsreader", fontSize: 36, letterSpacing: -0.5 }, "Emre Bilgin"),
          h("div", { fontSize: 22, color: color.muted }, card.kicker),
        ],
      ),
      h("div", { display: "flex", height: 1, marginTop: 4, backgroundColor: color.ink }, ""),
      h("div", { display: "flex", flexGrow: 1 }, ""),
      h(
        "div",
        {
          display: "flex",
          fontFamily: "Newsreader",
          fontSize: titleSize(card.title),
          lineHeight: 1.04,
          letterSpacing: -1.6,
          maxWidth: 1010,
        },
        card.title,
      ),
      card.subtitle
        ? h(
            "div",
            { display: "flex", marginTop: 22, fontSize: 28, color: color.muted, maxWidth: 980 },
            card.subtitle,
          )
        : h("div", { display: "flex" }, ""),
      h(
        "div",
        {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 44,
          paddingTop: 18,
          borderTop: `1px solid ${color.rule}`,
          fontSize: 20,
          color: color.neutral,
        },
        [
          h("div", { display: "flex" }, "Samsun · Android uygulama ve web sitesi geliştirme"),
          h("div", { display: "flex", alignItems: "center" }, [
            h("div", { width: 12, height: 12, backgroundColor: color.accent, marginRight: 12 }, ""),
            h("div", { display: "flex" }, siteLabel()),
          ]),
        ],
      ),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });

  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}

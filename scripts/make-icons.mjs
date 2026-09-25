// Favicon ve uygulama simgelerini üretir: node scripts/make-icons.mjs
// Çıktılar public/ klasörüne yazılır ve depoya eklenir; derlemede tekrar çalışmaz.
import { readFile, writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const INK = "#1b1611";
const PAPER = "#f9f6ef";
const ACCENT = "#0b6f49";

const font = await readFile(new URL("../src/assets/og/newsreader-500.ttf", import.meta.url));
const fonts = [{ name: "Newsreader", data: font, weight: 500, style: "normal" }];

// Newsreader 500'de "E" harfinin, flex ile ortalandığında merkeze göre sınırları (em cinsinden):
// sol -0.3025, sağ 0.315, üst -0.5, alt 0.265. Harf ve kare birlikte "E." gibi ortalanıyor;
// kare harfin taban çizgisine oturuyor.
function mark({ size, radius, scale }) {
  const letter = Math.round(size * scale);
  const square = Math.max(2, Math.round(letter * 0.15));
  const squareLeft = Math.round(size / 2 + letter * 0.26375);
  const squareTop = Math.round(size / 2 + letter * 0.2325);
  return {
    type: "div",
    props: {
      style: {
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: INK,
        borderRadius: radius,
        position: "relative",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontFamily: "Newsreader",
              fontSize: letter,
              lineHeight: 1,
              color: PAPER,
              marginTop: Math.round(letter * 0.235),
              marginRight: Math.round(letter * 0.2225),
            },
            children: "E",
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              width: square,
              height: square,
              left: squareLeft,
              top: squareTop,
              backgroundColor: ACCENT,
            },
          },
        },
      ],
    },
  };
}

const svgFor = (opts) => satori(mark(opts), { width: opts.size, height: opts.size, fonts });
const png = (svg, size) =>
  new Resvg(svg, { fitTo: { mode: "width", value: size } }).render().asPng();

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = header.length + dir.length;
  images.forEach(([size, data], index) => {
    const at = index * 16;
    dir.writeUInt8(size, at);
    dir.writeUInt8(size, at + 1);
    dir.writeUInt16LE(1, at + 4);
    dir.writeUInt16LE(32, at + 6);
    dir.writeUInt32LE(data.length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...images.map(([, data]) => data)]);
}

const out = (name) => new URL(`../public/${name}`, import.meta.url);

const favicon = await svgFor({ size: 64, radius: 14, scale: 0.76 });
await writeFile(out("favicon.svg"), favicon);
await writeFile(out("favicon.ico"), ico([16, 32, 48].map((size) => [size, png(favicon, size)])));

const apple = await svgFor({ size: 180, radius: 0, scale: 0.64 });
await writeFile(out("apple-touch-icon.png"), png(apple, 180));

const any = await svgFor({ size: 512, radius: 96, scale: 0.68 });
await writeFile(out("icon-192.png"), png(any, 192));
await writeFile(out("icon-512.png"), png(any, 512));

const maskable = await svgFor({ size: 512, radius: 0, scale: 0.52 });
await writeFile(out("icon-maskable-512.png"), png(maskable, 512));

console.log("Simgeler public/ klasörüne yazıldı.");

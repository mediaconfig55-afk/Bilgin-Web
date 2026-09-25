# Emre Bilgin — kişisel site

Samsun'da Android uygulama ve web sitesi geliştirme işleri için kişisel site.
[Astro](https://astro.build) ile yazıldı, statik olarak derlenip GitHub Pages'te yayınlanıyor.

Yayındaki adres: https://mediaconfig55-afk.github.io/Bilgin-Web/

## Komutlar

| Komut             | Ne yapar                                                       |
| ----------------- | -------------------------------------------------------------- |
| `npm install`     | Bağımlılıkları kurar (Node 22.12 veya üstü)                    |
| `npm run dev`     | Geliştirme sunucusu: http://localhost:4321/Bilgin-Web/         |
| `npm run build`   | `dist/` klasörüne derler ve ardından SEO denetimini çalıştırır |
| `npm run preview` | Derlenmiş siteyi yerelde açar                                  |
| `npm run check`   | Astro ve TypeScript tip denetimi                               |
| `npm run format`  | Prettier ile biçimlendirme                                     |

`npm run build` sonunda çalışan `scripts/verify-dist.mjs`; her sayfada başlık, açıklama,
canonical, tek `h1`, Open Graph görseli, JSON-LD, görsel boyutları ve kırık iç bağlantı olup
olmadığına bakar. Bir sorun varsa derleme hata verir ve site yayına çıkmaz.

## Klasörler

```
src/
  content/work/     Her proje bir Markdown dosyası (vaka çalışmaları)
  content/posts/    Blog yazıları
  assets/work/      Proje ekran görüntüleri (derlemede AVIF/WebP'ye çevrilir)
  assets/fonts/     Newsreader, IBM Plex Sans ve Plex Mono (Latin + Türkçe alt küme)
  assets/og/        Paylaşım görselleri için statik font dosyaları
  components/       Başlık, footer, ekran görüntüsü, SSS, iletişim bloğu vb.
  layouts/          Genel sayfa iskeleti ve hizmet sayfası şablonu
  pages/            Sayfalar; og/[slug].png.ts paylaşım görsellerini üretir
  data/site.ts      İletişim bilgileri, menü ve hizmet listesi
  lib/              Bağlantı, tarih ve yapılandırılmış veri (schema.org) yardımcıları
  styles/           Renk, tipografi ve boşluk değişkenleri (tokens.css) ve genel stiller
scripts/
  verify-dist.mjs   Derleme sonrası SEO denetimi
  make-icons.mjs    Favicon ve uygulama simgelerini yeniden üretir
```

## İçerik güncelleme

**Uygulama sürümü değişince:** `src/content/work/<proje>.md` içindeki `version` ve `updated`
alanlarını güncelle. Ana sayfadaki "Şu an yayında" listesi ve paylaşım görseli buradan beslenir.

**Yeni proje eklemek:** `src/content/work/` altına mevcut dosyalardan birini örnek alarak yeni bir
`.md` dosyası ekle, görsellerini `src/assets/work/<proje>/` klasörüne koy. `order` alanı listedeki
sırayı belirler.

**Yeni yazı eklemek:** `src/content/posts/` altına bir `.md` dosyası ekle. Başlık 55 karakteri
geçiyorsa arama sonuçları için `seoTitle` alanına kısa bir başlık yaz.

**İletişim bilgileri:** `src/data/site.ts`.

## Yayın

`main` dalına her gönderimde `.github/workflows/deploy.yml` siteyi derler, denetler ve GitHub
Pages'e yükler. Deponun **Settings → Pages → Build and deployment → Source** ayarı
**GitHub Actions** olmalı.

### Özel alan adına geçiş

`astro.config.mjs` içindeki `SITE_URL` değerini alan adına (ör. `https://emrebilgin.com`),
`BASE_PATH` değerini `/` yap ve `public/` klasörüne alan adını içeren bir `CNAME` dosyası ekle.
Canonical adresler, site haritası, robots.txt ve paylaşım görselleri buna göre kendiliğinden
güncellenir.

### Search Console

Search Console'da HTML etiketiyle doğrulama yapılacaksa kodu `src/data/site.ts` içindeki
`googleSiteVerification` alanına yaz, ardından site haritasını
(`sitemap-index.xml`) Search Console'a ekle.

## Lisanslar

Kod MIT lisanslı (`LICENSE`). Yazı tipleri SIL Open Font License ile dağıtılıyor; lisans metinleri
`src/assets/fonts/` ve `src/assets/og/` klasörlerinde. Proje görselleri ve metinler ilgili
projelere aittir.

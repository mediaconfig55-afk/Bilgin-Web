# Bilgin Web

Emre Bilgin'in kişisel sitesi. Astro ile kuruldu, GitHub Pages'te yayınlanıyor.

**Yayında:** https://mediaconfig55-afk.github.io/Bilgin-Web/

## Site nasıl kurulu

13 sayfa, dört tür:

| Sayfa                   | Dosya                                                    |
| ----------------------- | -------------------------------------------------------- |
| Ana sayfa (3B hero)     | `src/pages/index.astro`                                  |
| İşler listesi           | `src/pages/isler/index.astro`                            |
| Proje sayfaları (×8)    | `src/pages/isler/[slug].astro` + `src/content/work/*.md` |
| İletişim, Gizlilik, 404 | `src/pages/`                                             |

Siteye giren kişi işletme sahibi; teknik terim kullanılmıyor. Bir metin ekleyeceksen
ölçüt şu: **bilgisayarla arası olmayan bir esnaf bunu ilk okuyuşta anlıyor mu?**
Anlamıyorsa o cümle siteye girmez.

## Yeni proje eklemek

`src/content/work/` içine bir `.md` dosyası aç. Frontmatter alanları
`src/content.config.ts` içinde tanımlı; `order` sıralamayı belirliyor (küçük olan önce).
Görseller `src/assets/work/<proje>/` altına konuyor ve frontmatter'dan göreli yolla
bağlanıyor.

Dikey (telefon) bir ekran görüntüsü eklersen proje otomatik olarak ana sayfadaki
3B sahneye de girmeye aday olur (ilk beş proje gösteriliyor).

## 3B hero

`src/components/Hero3D.astro`. Ham WebGL2 ile yazıldı — three.js ya da başka bir
kütüphane yok, toplam ~4 KB. Gerçek uygulama ekranlarını 3B uzayda dokulu yüzeyler
olarak çiziyor.

- Sürüklenebilir; imleç üzerindeyken hafif paralaks veriyor.
- Her ekran kendi proje sayfasına gidiyor (tuval üstündeki görünmez bağlantılar).
- WebGL yoksa altındaki normal görsel dizisi görünür kalıyor.
- Sayfa görüş alanı dışındayken çizim tamamen duruyor.
- Telefonun "animasyonları azalt" ayarına uyuyor.

## Günlük işler

```bash
npm install
npm run dev        # geliştirme
npm run build      # derle + dist denetimi
npm run preview    # derlenmiş hâli aç
npm run check      # tip kontrolü
```

`npm run build`, derlemeden sonra `scripts/verify-dist.mjs` çalıştırıyor: her sayfanın
başlığı, açıklaması, canonical adresi, tek bir h1'i, OG görseli, JSON-LD'si ve iç
bağlantıları kontrol ediliyor. Kırık bir bağlantı varsa derleme kırmızıya düşüyor.

## Yayınlama

`main` dalına atılan her commit GitHub Actions ile otomatik yayınlanıyor
(`.github/workflows/`). Elle bir şey yapmak gerekmiyor.

## Alan adı değiştirmek

`astro.config.mjs` içindeki `SITE_URL` ve `BASE_PATH` yeterli. Kendi alan adına
geçerken `BASE_PATH` `"/"` olacak.

## Tasarım

Renkler, yazı tipleri ve boşluklar `src/styles/tokens.css` içinde tek yerden
yönetiliyor. Kodun hiçbir yerinde doğrudan renk kodu yazılmıyor; her şey bu
dosyadaki değişkenlere bağlı. Yazı tipleri derleme sırasında indirilip site ile
birlikte sunuluyor, ziyaretçinin tarayıcısı Google'a istek atmıyor.

---
title: Yapay zekayla uygulama geliştirmek, hızlanan ve hızlanmayan işler
seoTitle: "Yapay Zekayla Uygulama Geliştirmek: Ne Hızlanıyor?"
description: Yapay zeka araçlarını her gün kullanıyorum. Hangi işi gerçekten hızlandırdıklarını, Türkçe projelerde nerede yanıldıklarını ve bunu nasıl yakaladığımı anlatıyorum.
published: 2026-09-26
topic: Yapay zeka
relatedWork:
  - finans
  - ayik-sofor
relatedService: /yapay-zeka-destekli-gelistirme/
---

Bu yıl Google Play’e çıkardığım dört uygulamanın hepsinde yapay zeka araçları kullandım. Bu yazı bir övgü de değil, bir uyarı da değil. Araçların nerede gerçekten zaman kazandırdığını ve nerede kontrolsüz bırakılınca pahalıya patladığını kendi projelerimden örneklerle yazıyorum.

## Hızlanan işler

**Sürüm geçişleri.** Uygulamalarım üç farklı Expo sürümünde çalışıyor: 54, 55 ve 56. Bir sürümden diğerine geçerken hangi paketin, hangi fonksiyonun değiştiğini bulmak sıkıcı ve uzun bir iş. Araç, değişiklik notlarını ve kodu birlikte okuyup etkilenen yerleri listeleyebiliyor. Karar yine bende ama arama işi kısalıyor.

**İlk taslaklar.** Bir ayarlar ekranı, bir liste, bir form. Bu ekranların ilk hâli kısa sürede çıkıyor. Ben onu sadeleştiriyor, uygulamanın geri kalanıyla aynı dile getiriyor ve kenar durumlarını ekliyorum: liste boşken ne görünüyor, internet yokken ne oluyor, metin çok uzunsa nereden kırılıyor.

**Testler.** Ayık Şoför’deki fiyat hesabı, form doğrulama ve WhatsApp mesajı üreten fonksiyonların hepsi yan etkisiz ve hepsinin testi var. Bu testlerin iskeletini araç çıkarıyor; hangi değerlerin sınanacağına ben karar veriyorum.

**Mağaza belgeleri.** Play Console’daki formlar, mağaza açıklamaları ve gizlilik politikası taslakları. Burada da kural net: listelemedeki her iddia uygulamada karşılığı olan bir özellik olmalı. Play, doğrulanamayan özellik iddialarını ihlal sayıyor.

## Hızlanmayan işler

Araç kodu hızlı yazıyor, ama bazı hatalar ancak Türkiye saatinde, Türkçe metinle ve gerçek bir telefonda görünüyor. Bunlar araçların en sık yaptığı hatalar ve her birini artık proje kuralı olarak tutuyorum.

### Tarih bir gün geriye kayıyor

```js
const tarih = new Date(2026, 1, 21); // 21 Şubat, yerel saatle 00.00
tarih.toISOString().slice(0, 10); // "2026-02-20"
```

`toISOString()` tarihi UTC’ye çeviriyor. Türkiye UTC+3 olduğu için gece yarısıyla sabah üç arasındaki her kayıt bir önceki güne yazılıyor. Finans’ta bu yüzden tarihler hiçbir zaman bu fonksiyonla üretilmiyor; yerel tarihi yazan ayrı bir yardımcı fonksiyon var.

### "1.500" lira, 1,5 lira oluyor

```js
parseFloat("1.500"); // 1.5
```

Türkçe’de nokta binlik ayırıcı, virgül ondalık ayırıcı. Ekranda "1.500" olarak görünen bir tutarı `parseFloat` ile okumak onu bin kat küçültüyor. Finans’ta tutarlar ekrana yazılırken ve ekrandan okunurken iki ayrı fonksiyondan geçiyor.

### "İstanbul" büyük harfle yanlış yazılıyor

```js
"istanbul".toUpperCase(); // "ISTANBUL"
"istanbul".toLocaleUpperCase("tr-TR"); // "İSTANBUL"
```

Dil belirtilmeden yapılan büyük-küçük harf dönüşümü Türkçe’deki noktalı ve noktasız i’yi karıştırıyor. Arama, sıralama ve karşılaştırma yapılan her yerde dil açıkça verilmeli.

### Kapanmayan izin penceresi

Bu, Finans’ın bir sürümünün Google Play incelemesinden dönmesine yol açtı. İzin reddedilince kapanmayan bir pencere uygulamayı kilitliyordu. Hikâyenin tamamını [ayrı bir yazıda](../google-play-giris-kimlik-bilgisi-reddi/) anlattım.

## Gizlilik kararları araca bırakılmıyor

Finans’ta bir dönem Gemini ile çalışan bir bütçe danışmanı vardı. Özellik güzel çalışıyordu, ama çalışması için kullanıcının harcama dökümünü dışarıdaki bir servise göndermesi gerekiyordu. Uygulamanın temel sözü ise verinin telefondan çıkmamasıydı. İkisi aynı anda doğru olamazdı; 1.2 sürümünde danışmanı kaldırdım.

Bu tür kararları bir araç veremez, çünkü mesele teknik değil; kullanıcıya verilen sözle ilgili.

## Kurallar dosyası

Her projede kodla birlikte duran kısa bir kurallar dosyası tutuyorum. Araç her oturuma bu dosyayı okuyarak başlıyor. İçinde şunlar var:

- Projenin ne olduğu, hangi klasörde ne bulunduğu.
- Hangi yardımcı fonksiyonun ne için kullanılacağı.
- Bir daha yapılmaması gereken hatalar ve nedenleri.
- Testlerin ve derlemenin nasıl çalıştırılacağı.

Yeni bir hata yakaladığımda dosyaya bir satır ekliyorum. Böylece aynı hata ikinci kez önüme gelmiyor ve proje büyüdükçe kurallar da birikiyor.

## Müşteri için ne değişiyor

Taslak ve tekrar eden işler kısaldığı için aynı kapsam daha kısa sürede bitiyor ve kazanılan zamanın bir kısmı test ile ince ayara kalıyor. Kalite ölçütü ise değişmiyor: yayına giden her sürüm gerçek bir telefonda, aynı kontrol listesiyle deneniyor.

Bu çalışma şeklinin bir işe nasıl uygulanacağını merak ediyorsan [yöntem sayfama](../../yapay-zeka-destekli-gelistirme/) bakabilir ya da doğrudan yazabilirsin.

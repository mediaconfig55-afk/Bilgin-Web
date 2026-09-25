---
title: Finans
short: Gelir ve gider takibi
tagline: Gelir, gider, taksit ve borç takibi. Hesap istemiyor, veriyi yalnızca telefonda tutuyor.
description: Finans, gelir-gider, taksit ve borç takibi yapan, verileri yalnızca telefonda saklayan Android uygulaması. Play reddinden sonra yeniden kurulan açılış akışıyla.
kind: android
category: Finans
year: 2026
order: 3
status: live
role: Arayüz tasarımı, geliştirme, Play Console yayını
stack:
  - React Native
  - Expo SDK 54
  - SQLite
  - Gifted Charts
  - AdMob
version: 1.2.1
released: 2026-03-13
updated: 2026-09-22
packageName: com.bilgin.finans
monetization: Ücretsiz, kişiselleştirilmemiş reklamlarla
playUrl: https://play.google.com/store/apps/details?id=com.bilgin.finans
icon: ../../assets/work/finans/icon.png
cover: ../../assets/work/finans/ozet.jpg
coverAlt: Finans uygulamasının özet ekranı. Eldeki para, aylık gelir ve gider, bugünkü harcama.
coverFrame: phone
shots:
  - src: ../../assets/work/finans/islemler.jpg
    alt: Finans işlemler ekranı. Arama kutusu, gelir-gider-borç filtreleri ve günlere göre gruplanmış fatura kayıtları.
    caption: İşlemler
    frame: phone
  - src: ../../assets/work/finans/istatistik.jpg
    alt: Finans istatistik ekranı. Şubat 2026 giderlerinin kategorilere göre halka grafiği.
    caption: İstatistik
    frame: phone
services:
  - /android-uygulama-gelistirme/
---

## Ne işe yarıyor

Finans, gelir ve giderleri kaydetmek, taksitleri ve borçları takip etmek için yazdığım bir uygulama. Hesap açılmıyor, e-posta istenmiyor. Bütün veriler telefondaki SQLite veritabanında duruyor.

- Taksitli alışverişte bütün aylar tek seferde, ileri tarihli işlem olarak oluşuyor. Kuruş farkı son taksite yazılıyor, toplam her zaman tutuyor.
- Kategori bütçeleri var: limitin yüzde 80’ine gelince uyarı geliyor, aşılınca ana sayfada görünüyor.
- Borç ve alacaklar kişi bazında, kısmi ödemelerle takip ediliyor.
- Fatura hatırlatıcıları her ay seçilen gün ve saatte bildirim gönderiyor. Bildirim izni isteğe bağlı; verilmese de uygulamanın geri kalanı çalışıyor.
- Veriler Excel’e aktarılabiliyor ya da JSON yedeğiyle yeni telefona taşınabiliyor. Geri yükleme tek bir veritabanı işleminde yapılıyor; bozuk bir yedek dosyası mevcut veriyi silmiyor.

## Türkçe yerel ayarların tuzakları

Para ve tarih, Türkçe bir uygulamada en çok hata çıkaran iki alan. Projenin README dosyasına üç kural yazdım ve her değişikliği bunlara göre kontrol ediyorum:

1. Tarihler `toISOString()` ile üretilmiyor. UTC’ye çevrim, Türkiye saatiyle gece yarısından sonra girilen kayıtları bir gün geriye kaydırıyor.
2. Ekranda "1.500" olarak görünen tutar `parseFloat` ile okunmuyor; bu fonksiyon onu 1,5 sanıyor. Okuma ve yazma için ayrı yardımcı fonksiyonlar kullanılıyor.
3. Veritabanı şeması değiştiğinde sürüm numarası artıyor ve mevcut veriyi koruyan bir geçiş adımı ekleniyor.

## Google Play reddi ve düzeltmesi

1.2.0 sürümü "giriş kimlik bilgisi sağlanmadı" gerekçesiyle reddedildi. Oysa uygulamada giriş ekranı yoktu. Sorun, açılıştaki bildirim izni penceresinin kapatılamamasıydı: izni reddeden kullanıcı "Ayarlara Git" ile "Tekrar Dene" arasında sıkışıyordu. Android aynı izin iki kez reddedilince sistem penceresini bir daha göstermediği için bu bir döngüye dönüşüyordu. İncelemeyi yapan kişi uygulamanın içine giremeyince bunu bir giriş duvarı saydı.

İzin ve isim adımlarına "Şimdi değil" ve "Atla" seçeneklerini ekledim, izni ikinci kez isteyen kodu kaldırdım ve Play Console’daki uygulama erişimi beyanını düzelttim. 1.2.1 incelemeden geçti. Bu sürümde uygulamanın boyutu da yaklaşık 20 MB küçüldü. Süreci [ayrı bir yazıda](../../yazilar/google-play-giris-kimlik-bilgisi-reddi/) adım adım anlattım.

## Gizlilik

Finansal veriler cihazdan çıkmıyor, hiçbir sunucuya gönderilmiyor. Reklamlar kişiselleştirilmemiş olarak gösteriliyor ve kullanıcının harcama verisiyle ilişkilendirilmiyor.

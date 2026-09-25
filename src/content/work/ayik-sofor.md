---
title: Ayık Şoför Samsun
short: Özel şoför çağırma
tagline: Samsun’da özel şoför çağırma uygulaması. Talep, konum bağlantısıyla birlikte WhatsApp’tan iletiliyor.
description: Ayık Şoför Samsun için geliştirdiğim Android uygulaması. Şoför talebini konum bağlantısıyla WhatsApp’a iletiyor; sunucu ya da panel gerektirmiyor.
kind: android
category: Ulaşım
year: 2026
order: 4
status: live
role: Arayüz tasarımı, geliştirme, Play Console yayını
client: Ayık Şoför
location: Samsun
stack:
  - React Native
  - Expo SDK 54
  - expo-location
  - Reanimated
version: 1.3.1
released: 2026-03-08
updated: 2026-09-23
packageName: com.ayiksofor.app
monetization: Ücretsiz
playUrl: https://play.google.com/store/apps/details?id=com.ayiksofor.app
icon: ../../assets/work/ayik-sofor/icon.png
cover: ../../assets/work/ayik-sofor/ana-ekran.jpg
coverAlt: Ayık Şoför uygulamasının ana ekranı. Ortada "Başlat" düğmesi, altında şoförü ara, VIP ayrıcalıkları ve fiyatlar düğmeleri.
coverFrame: phone
shots:
  - src: ../../assets/work/ayik-sofor/fiyatlar.jpg
    alt: Ayık Şoför fiyat tarifeleri. Açılış ücreti, kilometre başı ücret, bekleme ücreti ve tahmini fiyat hesaplayıcı.
    caption: Fiyat tarifeleri ve hesaplayıcı
    frame: phone
  - src: ../../assets/work/ayik-sofor/sofor-hatti.jpg
    alt: Ayık Şoför şoför hattı ekranı. WhatsApp ve telefonla ulaşma seçenekleri.
    caption: Şoför hattı
    frame: phone
services:
  - /android-uygulama-gelistirme/
  - /samsun-web-tasarim/
---

## İş

Ayık Şoför, Samsun’da alkol aldığınızda ya da yorgun olduğunuzda aracınızla sizi evinize bırakan bir şoför hizmeti. Talepler çoğunlukla gece ve telefondan geliyor. Uygulamanın tek bir görevi var: bu talebi eksiksiz ve tek dokunuşla iletmek.

## Neden sunucu yok

Hizmet zaten WhatsApp üzerinden yürüyordu. Ayrı bir sipariş paneli kurmak yerine uygulama; ad, plaka, kişi sayısı, varış adresi ve notu konum bağlantısıyla birlikte hazır bir WhatsApp mesajına dönüştürüyor. İşletmenin bakımını yapması gereken bir sunucu, veritabanı ya da yönetim paneli yok. İşletme için bu, aylık sunucu gideri ve bakım derdi olmadan çalışan bir uygulama demek.

## Ayrıntılar

- Konum, talep gönderildiği anda alınıyor. Zaman aşımı olursa son bilinen konum kullanılıyor. İzin ya da GPS kapalıysa üst çubuktaki rozetten tek dokunuşla açılabiliyor.
- Ad ve plaka telefonda hatırlanıyor; bir sonraki talepte yeniden yazılmıyor.
- Tarife listesi ve kilometreye göre tahmini fiyat hesaplayıcı var.
- Açık ve koyu tema, dokunsal geri bildirim var; telefonun "animasyonları azalt" ayarına uyuluyor.
- Arka planda konum, depolama ve mikrofon izinleri bilerek kapatıldı. Uygulama yalnızca işine yarayan izni istiyor.

## Teknik notlar

Expo SDK 54 ve React Native 0.81 ile, yeni mimari ve Hermes açık olarak yazıldı. Fiyat hesabı, form doğrulama ve WhatsApp mesajı üretimi yan etkisiz fonksiyonlara ayrıldı ve testlerle korunuyor. Sürüm imzalama derleme adımına eklendi; yeni sürüm tek komutla hazırlanıyor.

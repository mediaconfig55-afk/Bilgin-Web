---
title: HatırLat
short: Hatırlatıcı ve fatura takibi
tagline: İlaç, fatura, doğum günü ve namaz vakti hatırlatıcısı. İnternetsiz çalışıyor, hesap istemiyor.
description: HatırLat, faturaları, ilaç saatlerini ve namaz vakitlerini tek yerde toplayan, internetsiz çalışan Android hatırlatıcı. Tasarım, geliştirme ve Google Play yayını.
kind: android
category: Hatırlatıcı ve ajanda
year: 2026
order: 2
status: live
role: Arayüz tasarımı, geliştirme, mağaza görselleri, Play Console yayını
stack:
  - React Native
  - Expo SDK 55
  - SQLite
  - Expo Notifications
  - AdMob
version: 1.2.1
released: 2026-05-13
updated: 2026-09-25
packageName: com.hatirlat.app
monetization: Ücretsiz, reklamlı; HatırLat Pro aylık, yıllık ya da ömür boyu
playUrl: https://play.google.com/store/apps/details?id=com.hatirlat.app
icon: ../../assets/work/hatirlat/icon.png
cover: ../../assets/work/hatirlat/feature.jpg
coverAlt: HatırLat’ın Google Play öne çıkan görseli. Koyu zemin üzerinde "Hiçbir şeyi unutma." başlığı ve uygulamanın Bugün ekranı.
coverFrame: wide
shots:
  - src: ../../assets/work/hatirlat/bugun.jpg
    alt: HatırLat Bugün ekranı. Günün planı kartı, sıradaki hatırlatma ve kısayollar.
    caption: Bugün ekranı
    frame: phone
  - src: ../../assets/work/hatirlat/odemeler.jpg
    alt: HatırLat Ödemeler ekranı. Eylül ayının toplamı, ödenen ve kalan tutarlar, fatura listesi.
    caption: Ödemeler sekmesi
    frame: phone
  - src: ../../assets/work/hatirlat/takvim.jpg
    alt: HatırLat takvim ekranı. Ekim 2026 takviminde Cumhuriyet Bayramı resmi tatil olarak işaretli.
    caption: Türkiye takvimi
    frame: phone
  - src: ../../assets/work/hatirlat/namaz.jpg
    alt: HatırLat namaz vakitleri ekranı. İstanbul için günün vakitleri ve öğle vaktine kalan süre.
    caption: Namaz vakitleri
    frame: phone
services:
  - /android-uygulama-gelistirme/
---

## Çıkış noktası

Aynı hafta içinde elektrik faturasının son günü, annenin ilaç saati, MTV ödemesi ve bir doğum günü hatırlanmak zorunda. Bunun için genelde birkaç ayrı uygulama kullanılıyor ya da hiçbiri. HatırLat, Türkiye’deki günlük hayata özgü bu hatırlatmaları tek uygulamada, hesap açmadan ve internete bağlanmadan topluyor.

## Neler yapıyor

- Bir kez, her gün, haftanın belirli günleri, her ay, her yıl ya da "3 saatte bir" gibi özel tekrarlar kurulabiliyor.
- Bildirimden tek dokunuşla "Tamamlandı" ya da 10 dakika, 1 saat erteleme seçiliyor. Sık tekrarlanan hatırlatmalar 23.00 ile 07.00 arasında susuyor.
- Ödemeler sekmesi fatura, kira, aidat, kredi kartı ve taksitleri tutarlarıyla gösteriyor: bu ay ne ödendi, ne kaldı.
- MTV, araç muayenesi, trafik sigortası, kasko ve kış lastiği için hazır şablonlar var.
- 81 il için Diyanet hesaplama yöntemiyle internetsiz namaz vakitleri hesaplanıyor. Konum izni istenmiyor, il seçmek yeterli. Ramazan’da sahur ve iftar hatırlatması da var.
- Resmi tatiller, bayramlar ve kandiller takvimde hazır geliyor.

## Tasarım kararları

Koyu bir arayüz ve tek bir vurgu rengi seçtim; kullanıcı isterse beş renkten birine geçebiliyor. Mağaza görsellerini de uygulamayla aynı dilde hazırladım: her görselin üstünde tek cümlelik bir başlık, altında gerçek ekran. Yukarıdaki görseller Google Play listelemesinde kullanılanlar.

## 1.2 sürümünde neler değişti

Bazı telefonlarda günlük ve haftalık hatırlatmaların hiç gelmemesi düzeltildi. Aylık ve yıllık tekrar, "1 gün önce hatırlat" seçeneği, Ödemeler sekmesi, isteğe bağlı namaz vakitleri, sistem teması, PIN ve parmak izi kilidi bu sürümde eklendi.

## Gelir modeli

Uygulama ücretsiz ve reklamla destekleniyor. Ücretsiz sürümde aynı anda 15 hatırlatıcı kurulabiliyor. HatırLat Pro sınırsız hatırlatıcı, 30 günlük ayrıntılı istatistik ve haftalık yedek hatırlatması açıyor.

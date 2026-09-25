---
title: Reglim
short: Adet ve regl takvimi
tagline: Adet ve regl takvimi. Sağlık verisini telefonda, şifreli olarak tutan bir Android uygulaması.
description: Reglim, Google Play’de yayında olan adet ve regl takvimi. Verileri cihazda AES-256 ile şifreleyen uygulamayı nasıl tasarlayıp geliştirdiğimi anlatıyorum.
kind: android
category: Sağlık
year: 2026
order: 1
status: live
role: Arayüz tasarımı, geliştirme, Play Console yayını
stack:
  - React Native
  - Expo SDK 56
  - Expo Router
  - SQLite
  - Firebase
  - RevenueCat
version: 7.1.0
released: 2026-06-10
updated: 2026-09-12
packageName: com.regliyiz.app
monetization: Ücretsiz; Premium aylık, yıllık ya da ömür boyu
playUrl: https://play.google.com/store/apps/details?id=com.regliyiz.app
icon: ../../assets/work/reglim/icon.png
services:
  - /android-uygulama-gelistirme/
---

## Başlangıç noktası

Regl takibi, insanların telefonlarına kaydettiği en mahrem verilerden biri. Bu tür uygulamalarda en sık duyulan soru da verinin nerede durduğu. Reglim’i bu soruya göre kurdum: veri varsayılan olarak telefonda kalıyor, hassas alanlar cihazın içinde şifreleniyor, bulut yedeği tamamen isteğe bağlı.

## Uygulama neler yapıyor

- Bir sonraki regl gününü, yumurtlama tarihini ve doğurgan dönemi tahmin ediyor. Tahminin ne kadar güvenilir olduğunu yüzdeyle gösteriyor; kayıt arttıkça isabet de artıyor.
- Düzensiz döngüleri fark edip tahminleri buna göre ayarlıyor.
- Altı kategoride 77 belirti ve 29 ruh hali kaydedilebiliyor. Listede olmayan belirti kullanıcı tarafından eklenebiliyor.
- Su, uyku, adım, kilo, tansiyon, nabız ve kan şekeri kaydı tutuluyor.
- Doğum kontrol hapı, halka, bant ve iğne için hatırlatıcılar var. Kilit ekranında görünecek metni kullanıcı seçiyor; bildirim sıradan bir "su iç" mesajı gibi görünebiliyor.

## Gizlilik nasıl sağlandı

Notlar, tansiyon, nabız ve kan şekeri kayıtları AES-256 ile şifreleniyor. Şifreleme anahtarı Android Keystore’da duruyor ve hiçbir zaman sunucuya düz metin olarak gitmiyor. Uygulama PIN ya da parmak iziyle kilitlenebiliyor.

Bulut yedeği açılsa bile şifreli alanlar yalnızca kullanıcının bildiği yedekleme parolasıyla çözülebiliyor. Hesap ve bütün veriler uygulamanın içinden kalıcı olarak silinebiliyor. Uygulamada reklam yok.

## Premium ve mağaza

Döngü takibi, takvim, günlük kayıt, hatırlatıcılar ve yedekleme ücretsiz. 7.1 sürümüyle gelen Premium; doktora götürülebilecek PDF sağlık raporu, gelişmiş istatistikler, hafta hafta gebelik takibi, beş renk teması ve gizli bildirim modunu açıyor. Abonelik ve ömür boyu satın alma RevenueCat üzerinden yönetiliyor.

Mağaza metinlerini de ben hazırladım. Play, doğrulanamayan özellik iddialarını listeleme ihlali sayıyor; bu yüzden metindeki her madde uygulamada karşılığı olan bir özellik.

## Teknik notlar

Uygulama Expo SDK 56 ve React Native 0.85 ile yazıldı. Yerel veri SQLite’ta, isteğe bağlı bulut yedeği Firebase’de tutuluyor. Arayüz Türkçe ve İngilizce; dil uygulamanın içinden değiştirilebiliyor.

Reglim tıbbi teşhis aracı değil. Tahminler, kullanıcının kendi geçmişine dayanan istatistiksel öngörüler; uygulamanın içinde de bu açıkça yazıyor.

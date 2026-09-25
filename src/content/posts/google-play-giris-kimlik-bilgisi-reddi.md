---
title: Giriş ekranı olmayan uygulamama gelen Google Play reddi
description: Finans uygulamamın 1.2.0 sürümü "giriş kimlik bilgisi sağlanmadı" gerekçesiyle reddedildi. Sebep kapatılamayan bir izin penceresiydi. Çözümü adım adım anlatıyorum.
published: 2026-09-26
topic: Google Play
relatedWork:
  - finans
relatedService: /android-uygulama-gelistirme/
---

Finans uygulamamın 1.2.0 sürümü Google Play incelemesinden şu gerekçeyle döndü: **"Play Console Şartlarının İhlali — giriş kimlik bilgisi sağlanmadı."**

İlk tepkim şaşkınlıktı. Finans’ta hesap yok, e-posta yok, giriş ekranı yok. Uygulama açılıyor, adını soruyor ve kullanılmaya başlanıyor. İncelemecinin hangi giriş bilgisini beklediğini anlamak için uygulamayı onun gözüyle açmam gerekti.

## Asıl sebep: kapanmayan bir izin penceresi

Uygulama ilk açıldığında fatura hatırlatıcıları için bildirim izni istiyordu. Bu adım iki hata içeriyordu:

1. İzin penceresi kapatılamıyordu. Tek düğmesi "İzin Ver" idi, dışarı dokununca da kapanmıyordu.
2. İzin reddedilince çıkan uyarının iki seçeneği vardı: "Ayarlara Git" ve "Tekrar Dene".

Kâğıt üzerinde "Tekrar Dene" masum görünüyor. Ama Android 11’den bu yana, kullanıcı aynı izni iki kez reddederse sistem izin penceresini o uygulama için bir daha göstermiyor. İzin isteği ekrana hiçbir şey getirmeden anında "reddedildi" diye dönüyor. Sonuç: kullanıcı "Tekrar Dene"ye bastıkça aynı uyarıyı görüyor ve uygulamanın içine hiç giremiyor.

Bunun üstüne isim adımı da atlanamıyordu. İzni vermek istemeyen biri için uygulama, açılış ekranında kilitli kalan bir kutuydu.

## İncelemeci ne gördü

Google Play incelemesi gerçek cihazlarda, gerçek kullanıcı gibi yapılıyor. İzni reddeden bir incelemeci uygulamanın içine giremiyor ve bunu en yakın kategoriye koyuyor: uygulamaya erişim kısıtlı, giriş bilgisi verilmemiş.

Yani red gerekçesi yanlış değildi, sadece benim beklediğim dilde yazılmamıştı. İncelemeci uygulamanın içini göremediğini söylüyordu.

## Çözüm, birinci kısım: kod

- İzin penceresine **"Şimdi değil"**, isim adımına **"Atla"** seçeneği ekledim. İkisi de dışarı dokununca kapanıyor.
- İzin reddedilse bile akış bir sonraki adıma, oradan uygulamaya devam ediyor.
- İznin sonucu bir kez alınıyor ve uygulamanın geri kalanına iletiliyor. Uygulama izni ikinci kez istemiyor.
- Bildirim izni verilmese de hatırlatıcılar dışındaki her özellik çalışıyor.

Genel bir kural olarak: izni uygulama açılır açılmaz değil, o izne gerçekten ihtiyaç duyulan anda istemek daha doğru. Kullanıcı bir fatura hatırlatıcısı kurarken bildirim izninin neden gerektiğini zaten anlıyor.

## Çözüm, ikinci kısım: Play Console

Kodu düzeltmek tek başına yetmedi, çünkü redin resmî gerekçesi bir beyandı. Play Console’da **Uygulama içeriği > Uygulama erişimi** bölümünde, tüm işlevlerin herhangi bir giriş bilgisi olmadan kullanılabildiğini belirten seçeneği işaretledim.

Uygulaman gerçekten giriş istiyorsa aynı bölüme incelemeci için bir test hesabı ve kısa bir açıklama eklemen gerekiyor. Burayı boş bırakmak, giriş ekranı olan uygulamaların sık yaşadığı redlerden biri.

Aynı sürümde veri güvenliği formunu ve gizlilik politikasını da uygulamanın gerçekte yaptığı şeyle yeniden eşleştirdim. İnceleme bu belgelerin birbiriyle tutarlı olmasına bakıyor.

## Test: izni reddederek

Yeni sürümü herkese açmadan önce iç test kanalında gerçek bir telefonda şunları denedim:

- Açılışta bildirim iznini reddet: uygulamaya girilebiliyor mu?
- İsim adımında "Atla"ya bas: ana ekran açılıyor mu?
- Bildirim izni yokken bir fatura hatırlatıcısı kurmaya çalış: uygulama çökmeden ne olduğunu anlatıyor mu?

Bu senaryoların hiçbiri "izin ver"e basan geliştiricinin kendi testinde ortaya çıkmıyor. Hepsi, izni reddeden bir kullanıcıda çıkıyor.

## Sonuç

1.2.1 sürümü incelemeden geçti ve Google Play’de yayında. Bu sürümde uygulamanın boyutu da yaklaşık 20 MB küçüldü.

## Kısa kontrol listesi

Uygulamanı incelemeye göndermeden önce:

1. Açılışta izin isteme; izni gerektiği anda iste.
2. Her izin penceresinin bir "şimdi değil" çıkışı olsun.
3. Uygulamayı izinleri reddederek test et. İki retten sonra sistemin pencereyi göstermediğini unutma.
4. Uygulama erişimi beyanını gerçeğe göre doldur; giriş gerekiyorsa test hesabı ver.
5. Gizlilik politikası, veri güvenliği formu ve uygulamanın davranışı aynı şeyi söylesin.

Uygulaman incelemeden dönüyorsa ya da neden döndüğünü anlamadıysan, red metnini ve uygulamanın bağlantısını bana gönder; birlikte bakalım.

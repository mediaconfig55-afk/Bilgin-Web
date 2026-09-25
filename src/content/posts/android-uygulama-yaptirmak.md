---
title: Android uygulama yaptırmak, fiyatı ve süreyi belirleyen 7 şey
seoTitle: "Android Uygulama Yaptırmak: Fiyatı Belirleyen 7 Şey"
description: Android uygulama yaptırmadan önce bilmen gerekenler. Fiyatı ve süreyi neyin belirlediği, Google Play hesabı, kapalı test şartı ve yayından sonraki bakım.
published: 2026-09-26
topic: Android uygulama
relatedWork:
  - ayik-sofor
  - reglim
  - hatirlat
relatedService: /android-uygulama-gelistirme/
---

"Bir uygulama ne kadara yapılır?" sorusunun dürüst cevabı "neye göre?" sorusuyla başlıyor. Aynı cümleyle tarif edilen iki uygulamadan biri iki haftada, diğeri iki ayda bitebiliyor. Aşağıdaki yedi başlık bu farkın nereden geldiğini gösteriyor. Teklif alırken hangi soruları sorman gerektiğini de bunlardan çıkarabilirsin.

## 1. Ekran sayısı ve akış

Her ekran tasarlanıyor, yazılıyor ve test ediliyor. Ama ekranın sayısından çok, ekranlar arasındaki akış belirleyici: kaç adımda sipariş veriliyor, geri dönünce ne oluyor, bir adım yarıda kalırsa ne kaydediliyor?

[Ayık Şoför Samsun](../../isler/ayik-sofor/) uygulamasının akışı kısa: açılış, tanıtım, izin ekranı ve tek bir ana ekran. Talep, fiyat ve iletişim birer alt panel olarak açılıyor. [Reglim](../../isler/reglim/) ise takvim, günlük kayıt, istatistik, hatırlatıcılar, yedekleme ve Premium ekranlarıyla çok daha geniş bir uygulama.

## 2. Kullanıcı hesabı gerekiyor mu?

Hesap demek; kayıt, giriş, şifre sıfırlama, hesap silme ve bunların hepsinin sunucu tarafı demek. Google Play, hesap açılabilen uygulamalarda hesabın uygulama içinden silinebilmesini de istiyor.

Her uygulamanın hesaba ihtiyacı yok. [Finans](../../isler/finans/) ve [HatırLat](../../isler/hatirlat/) hesap istemiyor; veriler telefonda kalıyor, yeni telefona yedek dosyasıyla taşınıyor. Bu hem maliyeti hem de gizlilik yükünü azaltıyor.

## 3. Veri nerede duracak?

Veri yalnızca telefonda duracaksa bir sunucuya gerek yok. Birden fazla cihazda görünmesi, başka kullanıcılarla paylaşılması ya da bir yönetim panelinden izlenmesi gerekiyorsa sunucu gerekiyor. Firebase ve Supabase gibi hazır servisler bu işi hızlandırıyor ama her biri, kullanım arttıkça büyüyen bir aylık gider demek. Bu gider teklifte değil, uygulamanın ömrü boyunca ödeniyor; baştan konuşulmalı.

## 4. Uygulama nasıl para kazanacak?

Üç yaygın model var: reklam, abonelik ve tek seferlik satın alma. Reklam en kolay kurulanı ama kullanıcı deneyimini etkiliyor ve veri güvenliği formunda beyan gerektiriyor. Abonelik ve satın alma için mağaza ürünlerinin tanımlanması, satın almanın doğrulanması ve iadelerin düşünülmesi gerekiyor.

Google Play, uygulama içi satışlardan hizmet bedeli kesiyor; oran gelir türüne göre değişiyor. Gelir planı yaparken bu kesinti hesaba katılmalı.

## 5. Dış servisler ve izinler

Konum, kamera, bildirim, harita, ödeme, yapay zeka... Her bağlantı kendi entegrasyon işini ve kendi mağaza beyanını getiriyor. Konum kullanan bir uygulama, konumu neden ve ne zaman kullandığını hem kullanıcıya hem de Google’a açıklamak zorunda.

Ayık Şoför konumu yalnızca talep gönderildiği anda alıyor. Arka planda konum izni bilerek kapalı; bu hem kullanıcıya daha az şey sormak hem de mağaza incelemesinden daha kolay geçmek demek.

## 6. Tasarım ne kadar özgün olacak?

Hazır bileşenlerle kurulan sade bir arayüz ile markaya özel çizilen bir arayüz arasında ciddi bir süre farkı var. Mağaza görselleri de işin bir parçası: kullanıcı uygulamayı indirmeden önce ekran görüntülerine bakıyor. HatırLat’ın mağaza görselleri, her ekranın üstüne tek cümlelik bir başlık koyacak şekilde ayrıca tasarlandı.

## 7. Yayın ve sonrası

Yazılan uygulamanın yayına çıkması ayrı bir süreç:

- Google Play geliştirici hesabı için 25 dolarlık tek seferlik kayıt ücreti ve kimlik doğrulaması gerekiyor.
- 13 Kasım 2023’ten sonra açılan kişisel hesaplarda, uygulama herkese açılmadan önce en az 12 kişinin katıldığı bir kapalı testin 14 gün boyunca kesintisiz sürmesi gerekiyor. Şirket adına açılan hesaplar bu şarttan muaf.
- İnceleme her zaman ilk seferde geçmiyor. [Finans’ın bir sürümü neden döndü?](../google-play-giris-kimlik-bilgisi-reddi/)

Yayından sonra da iş bitmiyor. Android her yıl yeni bir sürüm çıkarıyor ve Google Play, güncellemelerin yeni API seviyelerini hedeflemesini şart koşuyor. Uygulamayı yıllarca yayında tutmak için küçük ama düzenli bir bakım bütçesi ayırmak gerekiyor.

## Maliyeti düşürmenin üç yolu

1. **İlk sürümü küçük tut.** Uygulamanın var olma sebebi olan tek işi en iyi şekilde yapan bir sürümle başla. Gerisini kullanıcıların ne yaptığına bakarak ekle.
2. **Gerekmiyorsa hesap ve sunucu kurma.** Verinin telefonda kalabildiği her durumda hem geliştirme hem de aylık gider düşüyor.
3. **Tek platformla başla.** Türkiye’de telefonların büyük çoğunluğu Android. React Native ile yazılan bir uygulama gerekirse sonra iOS’a da taşınabiliyor.

## Teklif alırken sorman gerekenler

- Teklif hangi ekranları ve özellikleri kapsıyor, hangilerini kapsamıyor?
- Sunucu gerekiyor mu, gerekiyorsa aylık gideri ne olacak ve kimin adına açılacak?
- Google Play hesabı kimin adına açılacak?
- Kaynak kod teslim ediliyor mu?
- Yayından sonra hata düzeltme ve güncellemeler nasıl yürüyecek?

Bu soruların cevabını benden de isteyebilirsin. Fikrini birkaç cümleyle anlatman, ilk görüşme için yeterli.

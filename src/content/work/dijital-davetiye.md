---
title: Dijital Davetiye
short: QR kodlu düğün davetiyesi
tagline: QR kodlu düğün davetiyesi. Katılım bildirimi, anı defteri ve misafirlerin yüklediği ortak fotoğraf galerisi.
description: Next.js ve Supabase ile geliştirdiğim QR kodlu dijital düğün davetiyesi. Katılım bildirimi, anı defteri, IBAN hediye kartları ve misafir fotoğrafları.
kind: web
category: Etkinlik
year: 2026
order: 8
status: in-use
role: Ürün tasarımı, geliştirme, yönetim paneli
stack:
  - Next.js 16
  - React
  - Tailwind CSS
  - Framer Motion
  - Supabase
  - Three.js
links:
  - label: Instagram hesabı
    href: https://www.instagram.com/dijital_davetimm/
cover: ../../assets/work/dijital-davetiye/tanitim.jpg
coverAlt: Dijital Davetiye tanıtım sayfası. "Davetiyeniz Artık Dijital." başlığı ve döndürülebilen 3D davetiye kartı ile QR kod.
coverFrame: desktop
shots:
  - src: ../../assets/work/dijital-davetiye/davetiye.jpg
    alt: Örnek dijital davetiye. Elif ve Kaan’ın isimleri, düğün tarihi, saati ve Samsun konumu.
    caption: Örnek davetiye
    frame: phone
  - src: ../../assets/work/dijital-davetiye/geri-sayim.jpg
    alt: Örnek davetiyedeki geri sayım bölümü. Gün, saat, dakika ve saniye kutuları.
    caption: Geri sayım
    frame: phone
services:
  - /web-sitesi-tasarimi/
---

## Fikir

Kâğıt davetiye basılıyor, dağıtılıyor ve düğünden sonra çoğu zaman atılıyor. Dijital davetiye tek bir bağlantı. Misafir programı, konumu ve geri sayımı görüyor, katılımını bildiriyor. Düğün günü de masadaki QR kodu okutup çektiği fotoğrafları ortak galeriye yüklüyor.

## Neler var

- Karşılama animasyonu, aile kartları, program akışı ve canlı geri sayım.
- Katılım bildirimi, anı defteri ve IBAN’lı hediye kartları; hepsi Supabase’e kaydediliyor.
- QR kodla, giriş yapmadan fotoğraf yükleme. Galeri etkinlik bitene kadar kilitli kalıyor.
- Şifreli yönetim paneli: katılım ve anı defteri listeleri, fotoğraf havuzunu elle açma, QR kodu indirme.
- İsimler, tarih, program ve renkler tek bir ayar dosyasında ya da yönetim panelinde tutuluyor; yeni bir düğün için sayfaların koduna dokunmak gerekmiyor.

## Görsellerdeki davetiye

Buradaki "Elif & Kaan" davetiyesi, potansiyel müşterilere gösterilen hayali bir örnek. Gerçek davetiyeler çiftlere özel olduğu için burada yayınlanmıyor.

## Teknik notlar

Davetiye Next.js 16 (App Router), Tailwind CSS v4 ve Framer Motion ile yazıldı; veriler ve fotoğraflar Supabase’de tutuluyor. Tanıtım sayfasındaki davetiye kartı Three.js ile hazırlandı ve parmakla döndürülebiliyor.

// Sitenin tek kaynaktan yönetilen bilgileri. İletişim ya da konum değişirse yalnızca burayı güncellemek yeterli.

export const site = {
  name: "Emre Bilgin",
  jobTitle: "Android uygulama ve web sitesi geliştirici",
  description:
    "Samsun’da Android uygulama ve web sitesi geliştiriyorum. Google Play’de yayında dört uygulama, işletmeler için hızlı ve aramada bulunan siteler.",
  lang: "tr",
  locale: "tr_TR",
  city: "Samsun",
  country: "Türkiye",
  countryCode: "TR",
  email: "dibicemre.055@gmail.com",
  phone: "+905442946570",
  phoneDisplay: "+90 544 294 65 70",
  whatsappNumber: "905442946570",
  github: "https://github.com/mediaconfig55-afk",
  playDeveloper: {
    name: "Lokums",
    url: "https://play.google.com/store/apps/developer?id=Lokums",
  },
  // Search Console doğrulama kodu (HTML etiketi yöntemi). Boş bırakılırsa etiket basılmaz.
  googleSiteVerification: "",
} as const;

export const defaultWhatsappMessage = "Merhaba Emre, web sitenden yazıyorum.";

export function whatsappUrl(message: string = defaultWhatsappMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mailtoUrl = (subject = "Proje hakkında") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const primaryNav = [
  { href: "/isler/", label: "İşler" },
  { href: "/iletisim/", label: "İletişim" },
] as const;

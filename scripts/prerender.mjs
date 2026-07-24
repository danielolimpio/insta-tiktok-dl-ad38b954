// Post-build static pre-rendering (SEO SSG).
//
// For each public route, writes dist/<slug>/index.html by cloning the built
// dist/index.html and rewriting:
//   - <html lang="..">
//   - <title>, meta description, meta robots, canonical
//   - hreflang <link rel="alternate"> entries
//   - og:title / og:description / og:url / og:locale
//   - twitter title/description
//   - <noscript> fallback for users/crawlers without JavaScript.
//
// The SPA still hydrates on top identically: main.tsx uses createRoot()
// (not hydrateRoot), which REPLACES the contents of #root when React
// mounts. The visible UI remains the fully-styled React app; SEO fallback
// content is kept inside <noscript> only to avoid first-load layout flashes.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const SITE_URL = "https://baixarvideostiktok.com";

// ---- Locale table --------------------------------------------------------

const LOCALES = [
  { code: "en",  bcp47: "en-US",  ogLocale: "en_US",  dir: "ltr" },
  { code: "id",  bcp47: "id-ID",  ogLocale: "id_ID",  dir: "ltr" },
  { code: "pt",  bcp47: "pt-BR",  ogLocale: "pt_BR",  dir: "ltr" }, // root "/"
  { code: "es",  bcp47: "es-MX",  ogLocale: "es_MX",  dir: "ltr" },
  { code: "ur",  bcp47: "ur-PK",  ogLocale: "ur_PK",  dir: "rtl" },
  { code: "fil", bcp47: "fil-PH", ogLocale: "fil_PH", dir: "ltr" },
  { code: "ru",  bcp47: "ru-RU",  ogLocale: "ru_RU",  dir: "ltr" },
  { code: "bn",  bcp47: "bn-BD",  ogLocale: "bn_BD",  dir: "ltr" },
  { code: "ar",  bcp47: "ar-SA",  ogLocale: "ar_SA",  dir: "rtl" },
  { code: "vi",  bcp47: "vi-VN",  ogLocale: "vi_VN",  dir: "ltr" },
];

const localeByCode = Object.fromEntries(LOCALES.map((l) => [l.code, l]));

// ---- Content per locale --------------------------------------------------
//
// Every homepage gets: title, description, H1, intro, 6 feature bullets,
// 4-step how-it-works, 5-item FAQ, and CTA. This mirrors what the React
// app renders visually and gives Google a solid content signal on pass 1.

const HOME = {
  pt: {
    path: "/",
    lang: "pt-BR",
    title: "Baixar Vídeo TikTok Sem Marca D'Água | MP4 HD Grátis — TikDown",
    description:
      "Baixar vídeo TikTok sem marca d'água em MP4 HD ou MP3. TikTok downloader online, grátis, sem cadastro. Funciona em PC, Android e iPhone.",
    h1: "Baixar Vídeo do TikTok Sem Marca D'Água",
    intro:
      "Cole o link do TikTok para baixar o vídeo em MP4 HD ou extrair o áudio em MP3. Ferramenta 100% gratuita, sem cadastro e sem instalar app — funciona no PC, Android e iPhone.",
    featuresTitle: "Por que usar o TikDown",
    features: [
      "Baixe vídeos do TikTok sem marca d'água em MP4 HD (720p / 1080p).",
      "Extraia o áudio de qualquer vídeo do TikTok em MP3 de alta qualidade.",
      "100% grátis, sem cadastro, sem limite diário de downloads.",
      "Funciona direto no navegador — PC, Mac, Android e iPhone.",
      "Sem instalar aplicativo, sem extensão, sem anúncios invasivos.",
      "Downloads rápidos com servidores otimizados no mundo todo.",
    ],
    stepsTitle: "Como baixar um vídeo do TikTok",
    steps: [
      "Copie o link do vídeo do TikTok que você quer baixar.",
      "Cole o link no campo acima e clique em Baixar.",
      "Escolha o formato: MP4 HD (vídeo) ou MP3 (áudio).",
      "Salve o arquivo no seu dispositivo em segundos.",
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      { q: "É realmente grátis?", a: "Sim. O TikDown é 100% gratuito e não exige cadastro nem instalação." },
      { q: "Baixa sem marca d'água?", a: "Sim. Os vídeos são salvos em MP4 HD sem o logotipo do TikTok." },
      { q: "Funciona no iPhone?", a: "Funciona. No iPhone use o navegador Safari e mantenha a página aberta durante o download." },
      { q: "Posso baixar o áudio (MP3)?", a: "Sim. Escolha a opção MP3 e o áudio original do vídeo é extraído em alta qualidade." },
      { q: "Tem limite de downloads?", a: "Não. Você pode baixar quantos vídeos quiser, sem limite diário." },
    ],
    ctaTitle: "Comece agora",
    ctaText: "Cole o link do TikTok no topo da página para começar. Sem cadastro, sem espera.",
    navTitle: "Explore o site",
    nav: [
      { href: "/", label: "Início" },
      { href: "/video", label: "Baixar Vídeo" },
      { href: "/audio", label: "Baixar Áudio" },
      { href: "/faq", label: "Perguntas Frequentes" },
      { href: "/ajuda", label: "Central de Ajuda" },
      { href: "/sobre", label: "Sobre" },
    ],
  },
  en: {
    path: "/en",
    lang: "en-US",
    title: "TikTok Video Downloader — Download TikTok Without Watermark (MP4 HD)",
    description:
      "Free TikTok video downloader. Save TikTok videos to MP4 HD without watermark or extract MP3 audio. Online, fast, no app, no login.",
    h1: "Download TikTok Videos Without Watermark",
    intro:
      "Paste any TikTok link to save the video in MP4 HD or extract the audio to MP3. 100% free, no signup, no app — works on PC, Android and iPhone.",
    featuresTitle: "Why TikDown",
    features: [
      "Download TikTok videos without watermark in MP4 HD (720p / 1080p).",
      "Extract audio from any TikTok video to high-quality MP3.",
      "100% free, no signup, no daily download limit.",
      "Runs in your browser — Windows, macOS, Android and iPhone.",
      "No app to install, no browser extension, no intrusive ads.",
      "Fast downloads with servers optimized worldwide.",
    ],
    stepsTitle: "How to download a TikTok video",
    steps: [
      "Copy the link of the TikTok video you want to save.",
      "Paste the link in the box above and click Download.",
      "Choose your format: MP4 HD (video) or MP3 (audio).",
      "Save the file to your device in seconds.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      { q: "Is it really free?", a: "Yes. TikDown is 100% free and requires no signup or installation." },
      { q: "Does it remove the watermark?", a: "Yes. Videos are saved in MP4 HD without the TikTok logo." },
      { q: "Does it work on iPhone?", a: "It does. Use Safari on iPhone and keep the tab open while the file downloads." },
      { q: "Can I get MP3 audio?", a: "Yes. Pick MP3 and the original audio is extracted at high quality." },
      { q: "Is there a download limit?", a: "No. Download as many videos as you want, with no daily cap." },
    ],
    ctaTitle: "Get started",
    ctaText: "Paste a TikTok link at the top of the page to begin. No signup, no waiting.",
    navTitle: "Explore",
    nav: [
      { href: "/en", label: "Home" },
      { href: "/video", label: "Video downloader" },
      { href: "/audio", label: "Audio (MP3)" },
      { href: "/faq", label: "FAQ" },
      { href: "/ajuda", label: "Help" },
      { href: "/sobre", label: "About" },
    ],
  },
  id: {
    path: "/id",
    lang: "id-ID",
    title: "Download Video TikTok Tanpa Watermark — MP4 HD Gratis",
    description:
      "Download video TikTok tanpa watermark dalam MP4 HD atau ekstrak audio MP3. Pengunduh online gratis, cepat, tanpa aplikasi.",
    h1: "Download Video TikTok Tanpa Watermark",
    intro:
      "Tempel tautan TikTok untuk menyimpan video dalam MP4 HD atau mengunduh audio MP3. Gratis 100%, tanpa daftar, tanpa aplikasi.",
    featuresTitle: "Mengapa TikDown",
    features: [
      "Unduh video TikTok tanpa watermark dalam MP4 HD.",
      "Ekstrak audio TikTok ke MP3 kualitas tinggi.",
      "100% gratis, tanpa daftar, tanpa batas harian.",
      "Berjalan di browser — PC, Android, dan iPhone.",
      "Tanpa aplikasi, tanpa ekstensi, tanpa iklan mengganggu.",
      "Unduhan cepat dengan server global.",
    ],
    stepsTitle: "Cara mengunduh video TikTok",
    steps: [
      "Salin tautan video TikTok yang ingin diunduh.",
      "Tempel tautan di kotak di atas dan klik Unduh.",
      "Pilih format: MP4 HD (video) atau MP3 (audio).",
      "Simpan file ke perangkat Anda dalam hitungan detik.",
    ],
    faqTitle: "Pertanyaan umum",
    faq: [
      { q: "Apakah benar-benar gratis?", a: "Ya. TikDown 100% gratis, tanpa daftar dan tanpa instalasi." },
      { q: "Apakah menghapus watermark?", a: "Ya. Video disimpan dalam MP4 HD tanpa logo TikTok." },
      { q: "Berfungsi di iPhone?", a: "Ya. Gunakan Safari dan biarkan tab tetap terbuka saat mengunduh." },
      { q: "Bisa mengunduh MP3?", a: "Bisa. Pilih opsi MP3 untuk mengekstrak audio berkualitas tinggi." },
      { q: "Ada batas unduhan?", a: "Tidak ada. Unduh sebanyak yang Anda inginkan setiap hari." },
    ],
    ctaTitle: "Mulai sekarang",
    ctaText: "Tempel tautan TikTok di bagian atas halaman untuk memulai.",
    navTitle: "Jelajahi",
    nav: [
      { href: "/id", label: "Beranda" },
      { href: "/video", label: "Video" },
      { href: "/audio", label: "Audio (MP3)" },
      { href: "/faq", label: "FAQ" },
      { href: "/ajuda", label: "Bantuan" },
      { href: "/sobre", label: "Tentang" },
    ],
  },
  es: {
    path: "/es",
    lang: "es-MX",
    title: "Descargar Video TikTok Sin Marca de Agua — MP4 HD Gratis",
    description:
      "Descargar video TikTok sin marca de agua en MP4 HD o extraer audio MP3. Descargador online gratis, rápido, sin app.",
    h1: "Descargar Videos de TikTok Sin Marca de Agua",
    intro:
      "Pega el enlace de TikTok para guardar el video en MP4 HD o extraer el audio en MP3. 100% gratis, sin registro y sin app.",
    featuresTitle: "Por qué TikDown",
    features: [
      "Descarga videos de TikTok sin marca de agua en MP4 HD.",
      "Extrae el audio de cualquier TikTok en MP3 de alta calidad.",
      "100% gratis, sin registro, sin límite diario.",
      "Funciona en el navegador — PC, Android e iPhone.",
      "Sin app, sin extensión, sin anuncios invasivos.",
      "Descargas rápidas con servidores globales.",
    ],
    stepsTitle: "Cómo descargar un video de TikTok",
    steps: [
      "Copia el enlace del video de TikTok que quieres guardar.",
      "Pega el enlace en el cuadro de arriba y haz clic en Descargar.",
      "Elige el formato: MP4 HD (video) o MP3 (audio).",
      "Guarda el archivo en tu dispositivo en segundos.",
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { q: "¿Es realmente gratis?", a: "Sí. TikDown es 100% gratis y no requiere registro." },
      { q: "¿Quita la marca de agua?", a: "Sí. Los videos se guardan en MP4 HD sin el logo de TikTok." },
      { q: "¿Funciona en iPhone?", a: "Sí. Usa Safari y mantén la pestaña abierta durante la descarga." },
      { q: "¿Puedo obtener MP3?", a: "Sí. Elige MP3 y se extrae el audio original en alta calidad." },
      { q: "¿Hay límite de descargas?", a: "No. Descarga todos los videos que quieras sin límite diario." },
    ],
    ctaTitle: "Empieza ahora",
    ctaText: "Pega un enlace de TikTok arriba para comenzar. Sin registro, sin espera.",
    navTitle: "Explora",
    nav: [
      { href: "/es", label: "Inicio" },
      { href: "/video", label: "Video" },
      { href: "/audio", label: "Audio (MP3)" },
      { href: "/faq", label: "FAQ" },
      { href: "/ajuda", label: "Ayuda" },
      { href: "/sobre", label: "Acerca de" },
    ],
  },
  ur: {
    path: "/ur",
    lang: "ur-PK",
    title: "ٹک ٹاک ویڈیو ڈاؤن لوڈ کریں — واٹر مارک کے بغیر MP4 HD مفت",
    description:
      "ٹک ٹاک ویڈیو واٹر مارک کے بغیر MP4 HD میں ڈاؤن لوڈ کریں یا MP3 آڈیو نکالیں۔ مفت آن لائن ٹک ٹاک ڈاؤن لوڈر۔",
    h1: "ٹک ٹاک ویڈیو واٹر مارک کے بغیر ڈاؤن لوڈ کریں",
    intro:
      "ٹک ٹاک لنک پیسٹ کریں اور MP4 HD یا MP3 میں محفوظ کریں۔ 100% مفت، رجسٹریشن یا ایپ کے بغیر۔",
    featuresTitle: "TikDown کیوں",
    features: [
      "بغیر واٹر مارک کے MP4 HD میں ٹک ٹاک ویڈیو ڈاؤن لوڈ کریں۔",
      "کسی بھی ٹک ٹاک ویڈیو سے MP3 آڈیو نکالیں۔",
      "100% مفت، رجسٹریشن نہیں، روزانہ کوئی حد نہیں۔",
      "براؤزر میں چلتا ہے — PC، Android اور iPhone۔",
      "کوئی ایپ یا ایکسٹینشن انسٹال کرنے کی ضرورت نہیں۔",
      "دنیا بھر میں تیز سرورز کے ساتھ فوری ڈاؤن لوڈ۔",
    ],
    stepsTitle: "ٹک ٹاک ویڈیو ڈاؤن لوڈ کرنے کا طریقہ",
    steps: [
      "ٹک ٹاک ویڈیو کا لنک کاپی کریں۔",
      "لنک اوپر والے باکس میں پیسٹ کریں اور ڈاؤن لوڈ پر کلک کریں۔",
      "فارمیٹ منتخب کریں: MP4 HD یا MP3۔",
      "فائل کو اپنے ڈیوائس پر محفوظ کریں۔",
    ],
    faqTitle: "عام سوالات",
    faq: [
      { q: "کیا یہ واقعی مفت ہے؟", a: "جی ہاں۔ TikDown مکمل طور پر مفت ہے۔" },
      { q: "کیا واٹر مارک ہٹاتا ہے؟", a: "جی ہاں۔ ویڈیوز بغیر لوگو کے محفوظ ہوتی ہیں۔" },
      { q: "کیا iPhone پر کام کرتا ہے؟", a: "جی ہاں۔ Safari استعمال کریں۔" },
      { q: "کیا MP3 مل سکتا ہے؟", a: "جی ہاں۔ MP3 آپشن منتخب کریں۔" },
      { q: "کیا ڈاؤن لوڈ کی کوئی حد ہے؟", a: "نہیں۔ لامحدود ڈاؤن لوڈ کریں۔" },
    ],
    ctaTitle: "ابھی شروع کریں",
    ctaText: "شروع کرنے کے لیے صفحہ کے اوپر ٹک ٹاک لنک پیسٹ کریں۔",
    navTitle: "دریافت کریں",
    nav: [
      { href: "/ur", label: "ہوم" },
      { href: "/video", label: "ویڈیو" },
      { href: "/audio", label: "آڈیو" },
      { href: "/faq", label: "سوالات" },
      { href: "/ajuda", label: "مدد" },
      { href: "/sobre", label: "بارے میں" },
    ],
  },
  fil: {
    path: "/fil",
    lang: "fil-PH",
    title: "Mag-download ng TikTok Video Walang Watermark — MP4 HD Libre",
    description:
      "Mag-download ng TikTok videos nang walang watermark sa MP4 HD o kumuha ng MP3 audio. Libre, mabilis, walang app.",
    h1: "Mag-download ng TikTok Videos Nang Walang Watermark",
    intro:
      "I-paste ang link ng TikTok para i-save ang video sa MP4 HD o kunin ang audio bilang MP3. 100% libre, walang pag-sign up.",
    featuresTitle: "Bakit TikDown",
    features: [
      "Mag-download ng TikTok nang walang watermark sa MP4 HD.",
      "Kunin ang audio ng TikTok bilang mataas na kalidad na MP3.",
      "100% libre, walang sign-up, walang limitasyon.",
      "Gumagana sa browser — PC, Android at iPhone.",
      "Walang app, walang extension, walang nakakainis na ads.",
      "Mabilis na download gamit ang global servers.",
    ],
    stepsTitle: "Paano mag-download ng TikTok video",
    steps: [
      "Kopyahin ang link ng TikTok video.",
      "I-paste ang link sa kahon sa itaas at i-click ang Download.",
      "Pumili ng format: MP4 HD o MP3.",
      "I-save ang file sa iyong device.",
    ],
    faqTitle: "Mga karaniwang tanong",
    faq: [
      { q: "Libre ba talaga?", a: "Oo. 100% libre ang TikDown." },
      { q: "Inaalis ba ang watermark?", a: "Oo. Naka-save sa MP4 HD nang walang logo." },
      { q: "Gumagana sa iPhone?", a: "Oo. Gamitin ang Safari." },
      { q: "Puwede bang MP3?", a: "Oo. Piliin ang MP3." },
      { q: "May limit ba?", a: "Wala. Unlimited downloads." },
    ],
    ctaTitle: "Magsimula na",
    ctaText: "I-paste ang TikTok link sa itaas para magsimula.",
    navTitle: "Tuklasin",
    nav: [
      { href: "/fil", label: "Home" },
      { href: "/video", label: "Video" },
      { href: "/audio", label: "Audio" },
      { href: "/faq", label: "FAQ" },
      { href: "/ajuda", label: "Tulong" },
      { href: "/sobre", label: "Tungkol" },
    ],
  },
  ru: {
    path: "/ru",
    lang: "ru-RU",
    title: "Скачать видео TikTok без водяного знака — MP4 HD бесплатно",
    description:
      "Скачать видео TikTok без водяного знака в MP4 HD или извлечь аудио MP3. Онлайн-загрузчик, бесплатно, без приложения.",
    h1: "Скачать видео TikTok без водяного знака",
    intro:
      "Вставьте ссылку TikTok, чтобы сохранить видео в MP4 HD или извлечь аудио в MP3. Полностью бесплатно, без регистрации.",
    featuresTitle: "Почему TikDown",
    features: [
      "Скачивайте видео TikTok без водяного знака в MP4 HD.",
      "Извлекайте аудио из TikTok в MP3 высокого качества.",
      "100% бесплатно, без регистрации, без ограничений.",
      "Работает в браузере — PC, Android и iPhone.",
      "Без установки приложения и расширений.",
      "Быстрая загрузка с глобальных серверов.",
    ],
    stepsTitle: "Как скачать видео TikTok",
    steps: [
      "Скопируйте ссылку на видео TikTok.",
      "Вставьте ссылку в поле выше и нажмите Скачать.",
      "Выберите формат: MP4 HD или MP3.",
      "Сохраните файл на устройстве.",
    ],
    faqTitle: "Частые вопросы",
    faq: [
      { q: "Это бесплатно?", a: "Да. TikDown полностью бесплатен." },
      { q: "Убирает водяной знак?", a: "Да. Видео сохраняются в MP4 HD без логотипа." },
      { q: "Работает на iPhone?", a: "Да. Используйте Safari." },
      { q: "Можно получить MP3?", a: "Да. Выберите MP3." },
      { q: "Есть лимит?", a: "Нет, скачивайте без ограничений." },
    ],
    ctaTitle: "Начать сейчас",
    ctaText: "Вставьте ссылку TikTok вверху страницы, чтобы начать.",
    navTitle: "Обзор",
    nav: [
      { href: "/ru", label: "Главная" },
      { href: "/video", label: "Видео" },
      { href: "/audio", label: "Аудио" },
      { href: "/faq", label: "FAQ" },
      { href: "/ajuda", label: "Помощь" },
      { href: "/sobre", label: "О нас" },
    ],
  },
  bn: {
    path: "/bn",
    lang: "bn-BD",
    title: "টিকটক ভিডিও ডাউনলোড করুন — ওয়াটারমার্ক ছাড়া MP4 HD বিনামূল্যে",
    description:
      "টিকটক ভিডিও ওয়াটারমার্ক ছাড়া MP4 HD-তে ডাউনলোড করুন বা MP3 অডিও নিন। বিনামূল্যে অনলাইন ডাউনলোডার।",
    h1: "ওয়াটারমার্ক ছাড়া টিকটক ভিডিও ডাউনলোড করুন",
    intro:
      "টিকটক লিঙ্কটি পেস্ট করে MP4 HD বা MP3-তে সংরক্ষণ করুন। 100% বিনামূল্যে, নিবন্ধন ছাড়াই।",
    featuresTitle: "কেন TikDown",
    features: [
      "ওয়াটারমার্ক ছাড়া MP4 HD-তে টিকটক ভিডিও ডাউনলোড করুন।",
      "যেকোনো টিকটক থেকে উচ্চ মানের MP3 অডিও বের করুন।",
      "100% বিনামূল্যে, নিবন্ধন নেই, দৈনিক সীমা নেই।",
      "ব্রাউজারে চলে — PC, Android এবং iPhone।",
      "কোনো অ্যাপ বা এক্সটেনশন ইনস্টল করার প্রয়োজন নেই।",
      "বিশ্বব্যাপী সার্ভার সহ দ্রুত ডাউনলোড।",
    ],
    stepsTitle: "টিকটক ভিডিও ডাউনলোড করার উপায়",
    steps: [
      "টিকটক ভিডিওর লিঙ্কটি কপি করুন।",
      "উপরের বাক্সে লিঙ্কটি পেস্ট করুন এবং ডাউনলোড ক্লিক করুন।",
      "ফরম্যাট নির্বাচন করুন: MP4 HD বা MP3।",
      "ফাইলটি ডিভাইসে সংরক্ষণ করুন।",
    ],
    faqTitle: "সাধারণ প্রশ্ন",
    faq: [
      { q: "এটা কি সত্যিই বিনামূল্যে?", a: "হ্যাঁ। TikDown 100% বিনামূল্যে।" },
      { q: "ওয়াটারমার্ক সরায়?", a: "হ্যাঁ। MP4 HD-তে লোগো ছাড়াই সংরক্ষিত হয়।" },
      { q: "iPhone-এ কাজ করে?", a: "হ্যাঁ। Safari ব্যবহার করুন।" },
      { q: "MP3 পাওয়া যাবে?", a: "হ্যাঁ। MP3 নির্বাচন করুন।" },
      { q: "কোনো সীমা আছে?", a: "না। সীমাহীন ডাউনলোড।" },
    ],
    ctaTitle: "এখনই শুরু করুন",
    ctaText: "শুরু করতে পৃষ্ঠার উপরে টিকটক লিঙ্কটি পেস্ট করুন।",
    navTitle: "অন্বেষণ করুন",
    nav: [
      { href: "/bn", label: "হোম" },
      { href: "/video", label: "ভিডিও" },
      { href: "/audio", label: "অডিও" },
      { href: "/faq", label: "FAQ" },
      { href: "/ajuda", label: "সাহায্য" },
      { href: "/sobre", label: "সম্পর্কে" },
    ],
  },
  ar: {
    path: "/ar",
    lang: "ar-SA",
    title: "تنزيل فيديو تيك توك بدون علامة مائية — MP4 HD مجانا",
    description:
      "تنزيل فيديو تيك توك بدون علامة مائية بجودة MP4 HD أو استخراج الصوت MP3. أداة مجانية عبر الإنترنت.",
    h1: "تنزيل فيديوهات تيك توك بدون علامة مائية",
    intro:
      "الصق رابط تيك توك لحفظ الفيديو بصيغة MP4 HD أو استخراج الصوت MP3. مجاني 100٪ بدون تسجيل.",
    featuresTitle: "لماذا TikDown",
    features: [
      "تنزيل فيديوهات تيك توك بدون علامة مائية بصيغة MP4 HD.",
      "استخراج الصوت من أي فيديو تيك توك بصيغة MP3 عالية الجودة.",
      "مجاني 100٪، بدون تسجيل، بدون حد يومي.",
      "يعمل في المتصفح — PC و Android و iPhone.",
      "بدون تطبيق أو إضافة أو إعلانات مزعجة.",
      "تنزيلات سريعة عبر خوادم عالمية.",
    ],
    stepsTitle: "طريقة تنزيل فيديو تيك توك",
    steps: [
      "انسخ رابط فيديو تيك توك.",
      "الصق الرابط في المربع أعلاه واضغط تنزيل.",
      "اختر الصيغة: MP4 HD أو MP3.",
      "احفظ الملف على جهازك.",
    ],
    faqTitle: "الأسئلة الشائعة",
    faq: [
      { q: "هل هو مجاني فعلاً؟", a: "نعم. TikDown مجاني 100٪." },
      { q: "هل يزيل العلامة المائية؟", a: "نعم. يتم الحفظ بصيغة MP4 HD بدون شعار." },
      { q: "هل يعمل على iPhone؟", a: "نعم. استخدم Safari." },
      { q: "هل يمكن الحصول على MP3؟", a: "نعم. اختر MP3." },
      { q: "هل هناك حد للتنزيلات؟", a: "لا. تنزيلات غير محدودة." },
    ],
    ctaTitle: "ابدأ الآن",
    ctaText: "الصق رابط تيك توك في أعلى الصفحة للبدء.",
    navTitle: "استكشف",
    nav: [
      { href: "/ar", label: "الرئيسية" },
      { href: "/video", label: "فيديو" },
      { href: "/audio", label: "صوت" },
      { href: "/faq", label: "الأسئلة" },
      { href: "/ajuda", label: "مساعدة" },
      { href: "/sobre", label: "حول" },
    ],
  },
  vi: {
    path: "/vi",
    lang: "vi-VN",
    title: "Tải Video TikTok Không Logo — MP4 HD Miễn Phí",
    description:
      "Tải video TikTok không logo (không watermark) chất lượng MP4 HD hoặc trích xuất MP3. Công cụ trực tuyến miễn phí.",
    h1: "Tải Video TikTok Không Watermark",
    intro:
      "Dán liên kết TikTok để lưu video MP4 HD hoặc trích xuất âm thanh MP3. Miễn phí 100%, không cần đăng ký.",
    featuresTitle: "Tại sao chọn TikDown",
    features: [
      "Tải video TikTok không watermark ở định dạng MP4 HD.",
      "Trích xuất âm thanh TikTok sang MP3 chất lượng cao.",
      "100% miễn phí, không đăng ký, không giới hạn.",
      "Chạy trên trình duyệt — PC, Android và iPhone.",
      "Không cần cài ứng dụng hay tiện ích mở rộng.",
      "Tải xuống nhanh với máy chủ toàn cầu.",
    ],
    stepsTitle: "Cách tải video TikTok",
    steps: [
      "Sao chép liên kết video TikTok.",
      "Dán liên kết vào ô ở trên và nhấn Tải xuống.",
      "Chọn định dạng: MP4 HD hoặc MP3.",
      "Lưu tệp về thiết bị của bạn.",
    ],
    faqTitle: "Câu hỏi thường gặp",
    faq: [
      { q: "Có thực sự miễn phí?", a: "Có. TikDown hoàn toàn miễn phí." },
      { q: "Có xóa watermark?", a: "Có. Video được lưu MP4 HD không logo." },
      { q: "Có chạy trên iPhone?", a: "Có. Dùng Safari." },
      { q: "Có thể lấy MP3?", a: "Có. Chọn MP3." },
      { q: "Có giới hạn không?", a: "Không. Tải không giới hạn." },
    ],
    ctaTitle: "Bắt đầu ngay",
    ctaText: "Dán liên kết TikTok ở đầu trang để bắt đầu.",
    navTitle: "Khám phá",
    nav: [
      { href: "/vi", label: "Trang chủ" },
      { href: "/video", label: "Video" },
      { href: "/audio", label: "Âm thanh" },
      { href: "/faq", label: "FAQ" },
      { href: "/ajuda", label: "Trợ giúp" },
      { href: "/sobre", label: "Giới thiệu" },
    ],
  },
};

/** Non-home routes (Portuguese only) */
const OTHER_ROUTES = [
  {
    path: "/download",
    lang: "pt-BR",
    title: "Baixar TikTok — Download Direto MP4 HD | TikDown",
    description:
      "Página de download direto de vídeos do TikTok em MP4 HD sem marca d'água. Cole o link e receba o arquivo em segundos.",
    h1: "Download de Vídeo do TikTok",
    intro:
      "Página de download direto. Cole a URL de um vídeo público do TikTok e receba o MP4 HD sem marca d'água imediatamente.",
    features: [
      "Download direto em MP4 HD sem marca d'água.",
      "Servidores globais para downloads em segundos.",
      "Sem instalar app, sem cadastro.",
    ],
    robots: "index, follow",
  },
  {
    path: "/video",
    lang: "pt-BR",
    title: "Baixar Vídeo do TikTok em MP4 HD Sem Marca D'Água | TikDown",
    description:
      "Baixe o vídeo do TikTok em MP4 HD, com áudio original e sem marca d'água. Rápido, grátis e compatível com PC, Android e iPhone.",
    h1: "Baixar Vídeo do TikTok em MP4 HD",
    intro:
      "Salve qualquer vídeo público do TikTok em MP4 HD 1080p com áudio original preservado. Sem marca d'água, sem cadastro.",
    features: [
      "MP4 HD 720p e 1080p com áudio original.",
      "Compatível com PC, Mac, Android e iPhone.",
      "Sem marca d'água do TikTok.",
      "100% online, sem instalação.",
    ],
    robots: "index, follow",
  },
  {
    path: "/audio",
    lang: "pt-BR",
    title: "Baixar Áudio TikTok em MP3 — Extrator de Som Grátis | TikDown",
    description:
      "Extraia o áudio de qualquer vídeo do TikTok em MP3 alta qualidade. Ferramenta online grátis para salvar músicas e sons virais.",
    h1: "Baixar Áudio do TikTok em MP3",
    intro:
      "Converta o som de vídeos do TikTok para MP3 e salve músicas, dublagens e sons virais no seu dispositivo. Grátis, online e sem instalar app.",
    features: [
      "MP3 de alta qualidade extraído do vídeo original.",
      "Ideal para músicas, sons virais e dublagens.",
      "Funciona em qualquer navegador moderno.",
    ],
    robots: "index, follow",
  },
  {
    path: "/faq",
    lang: "pt-BR",
    title: "Perguntas Frequentes (FAQ) — Baixador de TikTok | TikDown",
    description:
      "Tire suas dúvidas sobre como baixar vídeos do TikTok sem marca d'água. 30+ respostas sobre formatos, segurança, MP3, iPhone, Android e PC.",
    h1: "Perguntas Frequentes",
    intro:
      "Reunimos as principais dúvidas sobre baixar vídeos do TikTok: formatos suportados, qualidade, segurança, uso em iPhone, Android e PC, e muito mais.",
    features: [
      "É grátis? Sim, 100% gratuito.",
      "Baixa sem marca d'água? Sim, em MP4 HD.",
      "Funciona no iPhone? Sim, via Safari.",
      "É seguro? Não coletamos dados pessoais.",
    ],
    robots: "index, follow",
  },
  {
    path: "/sobre",
    lang: "pt-BR",
    title: "Sobre o TikDown — Baixador de Vídeos TikTok Gratuito",
    description:
      "Conheça o TikDown: baixador de vídeos do TikTok sem marca d'água, gratuito, sem cadastro, com foco em privacidade e velocidade.",
    h1: "Sobre o TikDown",
    intro:
      "O TikDown é uma ferramenta gratuita e sem cadastro para baixar vídeos e áudios do TikTok, criada para ser rápida, segura e respeitar a privacidade do usuário.",
    features: [
      "Ferramenta 100% gratuita e sem cadastro.",
      "Sem coleta de dados pessoais.",
      "Servidores globais otimizados.",
    ],
    robots: "index, follow",
  },
  {
    path: "/ajuda",
    lang: "pt-BR",
    title: "Central de Ajuda — Como Baixar Vídeos do TikTok | TikDown",
    description:
      "Central de ajuda do TikDown. Tutoriais passo a passo para baixar vídeos do TikTok no PC, Android e iPhone sem marca d'água.",
    h1: "Central de Ajuda",
    intro:
      "Tutoriais passo a passo para copiar o link do TikTok, colar no TikDown e baixar o vídeo em MP4 HD ou MP3, em qualquer dispositivo.",
    features: [
      "Tutorial para PC e Mac.",
      "Tutorial para Android.",
      "Tutorial para iPhone com Safari.",
    ],
    robots: "index, follow",
  },
  {
    path: "/privacidade",
    lang: "pt-BR",
    title: "Política de Privacidade | TikDown",
    description:
      "Saiba como o TikDown protege seus dados. Não coletamos dados pessoais nem armazenamos vídeos baixados.",
    h1: "Política de Privacidade",
    intro:
      "Detalhamos aqui como o TikDown trata seus dados, quais cookies utilizamos e por que não armazenamos nenhum vídeo em nossos servidores.",
    robots: "noindex, follow",
  },
  {
    path: "/termos",
    lang: "pt-BR",
    title: "Termos de Uso | TikDown TikTok Downloader",
    description:
      "Termos de uso do TikDown: regras, direitos autorais e responsabilidades ao baixar conteúdo do TikTok.",
    h1: "Termos de Uso",
    intro:
      "Estes termos definem as regras para uso do TikDown, incluindo respeito aos direitos autorais dos criadores e aos termos de serviço do TikTok.",
    robots: "noindex, follow",
  },
  {
    path: "/contato",
    lang: "pt-BR",
    title: "Contato | TikDown TikTok Downloader",
    description:
      "Fale com a equipe do TikDown. Dúvidas, sugestões ou parcerias sobre o baixador de vídeos do TikTok.",
    h1: "Contato",
    intro:
      "Envie sua mensagem para nossa equipe. Respondemos dúvidas técnicas, sugestões de melhoria e propostas de parceria.",
    robots: "noindex, follow",
  },
  {
    path: "/uso-responsavel",
    lang: "pt-BR",
    title: "Uso Responsável | TikDown TikTok Downloader",
    description:
      "Diretrizes de uso responsável: respeite direitos autorais, créditos dos criadores e a política do TikTok.",
    h1: "Política de Uso Responsável",
    intro:
      "Baixar vídeos vem com responsabilidade. Confira nossas diretrizes sobre direitos autorais, crédito aos criadores e uso ético do conteúdo.",
    robots: "noindex, follow",
  },
];

// ---- HTML helpers --------------------------------------------------------

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHreflangLinks() {
  const links = LOCALES.map(
    (l) =>
      `    <link rel="alternate" hreflang="${l.bcp47}" href="${SITE_URL}${
        l.code === "pt" ? "/" : "/" + l.code
      }" />`
  );
  links.push(`    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`);
  return links.join("\n");
}

function replaceOrInsert(html, regex, replacement, fallbackAfter) {
  if (regex.test(html)) return html.replace(regex, replacement);
  return html.replace(/<head>/i, `<head>\n${fallbackAfter}`);
}

/**
 * Build the pre-render SEO shell used only inside <noscript>. Keeping this
 * outside #root prevents first-time visitors from seeing an unstyled SEO shell
 * while JS/CSS assets are still being downloaded or replaced from cache.
 */
function buildInRootShell(route) {
  const S = {
    wrap:
      "max-width:960px;margin:0 auto;padding:2rem 1.25rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;line-height:1.55;",
    h1: "font-size:2rem;font-weight:800;margin:0 0 1rem;line-height:1.2;",
    h2: "font-size:1.35rem;font-weight:700;margin:2rem 0 .75rem;",
    p: "margin:0 0 1rem;color:#333;",
    ul: "margin:0 0 1rem;padding-left:1.25rem;",
    li: "margin:.35rem 0;",
    nav: "margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:.5rem .9rem;",
    a: "color:#0057ff;text-decoration:underline;",
  };

  const features = route.features && route.features.length
    ? `<h2 style="${S.h2}">${escapeHtml(route.featuresTitle || "Recursos")}</h2>
    <ul style="${S.ul}">${route.features
        .map((f) => `<li style="${S.li}">${escapeHtml(f)}</li>`)
        .join("")}</ul>`
    : "";

  const steps = route.steps && route.steps.length
    ? `<h2 style="${S.h2}">${escapeHtml(route.stepsTitle || "Como funciona")}</h2>
    <ol style="${S.ul}">${route.steps
        .map((s) => `<li style="${S.li}">${escapeHtml(s)}</li>`)
        .join("")}</ol>`
    : "";

  const faq = route.faq && route.faq.length
    ? `<h2 style="${S.h2}">${escapeHtml(route.faqTitle || "FAQ")}</h2>
    <dl>${route.faq
        .map(
          (f) =>
            `<dt style="font-weight:700;margin-top:.75rem;">${escapeHtml(f.q)}</dt><dd style="margin:.25rem 0 0;">${escapeHtml(f.a)}</dd>`
        )
        .join("")}</dl>`
    : "";

  const cta = route.ctaTitle
    ? `<h2 style="${S.h2}">${escapeHtml(route.ctaTitle)}</h2><p style="${S.p}">${escapeHtml(route.ctaText || "")}</p>`
    : "";

  const nav = route.nav && route.nav.length
    ? `<nav aria-label="Site" style="${S.nav}">${route.nav
        .map((l) => `<a href="${l.href}" style="${S.a}">${escapeHtml(l.label)}</a>`)
        .join("")}</nav>`
    : "";

  return `<div style="${S.wrap}">
      <h1 style="${S.h1}">${escapeHtml(route.h1)}</h1>
      <p style="${S.p}">${escapeHtml(route.intro)}</p>
      ${features}
      ${steps}
      ${faq}
      ${cta}
      ${nav}
    </div>`;
}

/** FAQ JSON-LD embedded server-side so crawlers pick it up on pass 1. */
function buildFaqJsonLd(route) {
  if (!route.faq || !route.faq.length) return "";
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: route.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return `\n    <script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

// ---- Main HTML transform -------------------------------------------------

function transformHtml(template, route) {
  let html = template;
  const canonical = `${SITE_URL}${route.path}`;
  const robots =
    route.robots ||
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const lang = route.lang || "pt-BR";
  const localeMeta = LOCALES.find((l) => l.bcp47 === lang);
  const htmlDir = localeMeta?.dir || "ltr";
  const ogLocale = localeMeta?.ogLocale || "pt_BR";

  // <html lang="..." dir="...">
  html = html.replace(
    /<html\b[^>]*>/i,
    `<html lang="${lang}" dir="${htmlDir}">`
  );

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // meta description
  html = replaceOrInsert(
    html,
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${description}">`,
    `    <meta name="description" content="${description}">\n`
  );

  // meta robots
  html = replaceOrInsert(
    html,
    /<meta\s+name=["']robots["'][^>]*>/i,
    `<meta name="robots" content="${escapeHtml(robots)}">`,
    `    <meta name="robots" content="${escapeHtml(robots)}">\n`
  );

  // canonical
  html = replaceOrInsert(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonical}" />`,
    `    <link rel="canonical" href="${canonical}" />\n`
  );

  // og / twitter
  html = html.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:locale["'][^>]*>/i,
    `<meta property="og:locale" content="${ogLocale}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${title}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${description}">`
  );

  // Fresh hreflang set
  html = html.replace(
    /\n?\s*<link\s+rel=["']alternate["']\s+hreflang=["'][^"']*["'][^>]*>\s*/gi,
    "\n"
  );
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    (m) => `${m}\n${buildHreflangLinks()}${buildFaqJsonLd(route)}`
  );

  // Keep #root empty so users never see an unstyled static shell before React.
  html = html.replace(
    /<div\s+id=["']root["'][^>]*>[\s\S]*?<\/div>/i,
    `<div id="root"></div>`
  );

  // Semantic fallback for absolute-no-JS crawlers/users.
  const noscript = `<noscript>${buildInRootShell(route)}</noscript>`;
  html = html.replace(/<body([^>]*)>/i, `<body$1>${noscript}`);

  return html;
}

// ---- Runner --------------------------------------------------------------

async function writeRoute(distDir, template, route) {
  const html = transformHtml(template, route);
  const outPath =
    route.path === "/"
      ? resolve(distDir, "index.html")
      : resolve(distDir, route.path.replace(/^\//, ""), "index.html");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, "utf8");
  return outPath;
}

export async function prerender(distDir) {
  const templatePath = resolve(distDir, "index.html");
  let template;
  try {
    template = await readFile(templatePath, "utf8");
  } catch {
    console.warn(`[prerender] no dist/index.html at ${templatePath}, skipping.`);
    return;
  }

  const allRoutes = [...Object.values(HOME), ...OTHER_ROUTES];
  const written = [];
  for (const route of allRoutes) {
    const out = await writeRoute(distDir, template, route);
    written.push(out);
  }
  console.log(`[prerender] wrote ${written.length} static route shells with rich #root SEO content`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dist = resolve(process.cwd(), "dist");
  prerender(dist).catch((err) => {
    console.error("[prerender] failed:", err);
    process.exit(1);
  });
}

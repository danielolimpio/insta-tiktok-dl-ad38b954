import type { Locale } from "./config";

export interface Translation {
  // SEO
  title: string;
  description: string;
  keywords: string;
  // UI
  heroBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  ctaDownload: string;
  ctaProcessing: string;
  inputPlaceholder: string;
  pasteBtn: string;
  clearBtn: string;
  resultsTitle: string;
  // How it works
  howItWorksTitle: string;
  steps: { title: string; desc: string }[];
  // Features
  featuresTitle: string;
  features: { title: string; desc: string }[];
  // FAQ
  faqTitle: string;
  faqs: { q: string; a: string }[];
  // Footer
  footerTagline: string;
  switchLanguage: string;
}

export const T: Record<Locale, Translation> = {
  en: {
    title: "TikTok Video Downloader – Download TikTok Without Watermark",
    description: "Free TikTok video downloader. Download TikTok to MP4 HD without watermark. Online, fast, no app, no login — works on iPhone, Android & PC.",
    keywords: "tiktok video downloader, download tiktok without watermark, tiktok to mp4, save tiktok video, tiktok downloader, tiktok mp4, free tiktok downloader online, tiktok no watermark download, download tiktok mp4 hd, tiktok video downloader no watermark",
    heroBadge: "Free TikTok Downloader",
    heroTitle: "TikTok Video Downloader",
    heroTitleAccent: "Without Watermark",
    heroSubtitle: "Free online TikTok downloader to save TikTok videos in MP4 HD without watermark. Works on iPhone, Android and PC — no app, no login required.",
    ctaDownload: "Download",
    ctaProcessing: "Processing...",
    inputPlaceholder: "Paste the TikTok video link here to download without watermark...",
    pasteBtn: "Paste",
    clearBtn: "Clear",
    resultsTitle: "Video Ready to Download",
    howItWorksTitle: "How to Download TikTok Videos",
    steps: [
      { title: "Copy the link", desc: "Open TikTok, tap Share and copy the video link." },
      { title: "Paste above", desc: "Paste the link in the field and click Download." },
      { title: "Save MP4 HD", desc: "Get your TikTok video in MP4 HD without watermark." },
    ],
    featuresTitle: "Why Choose Our TikTok Downloader",
    features: [
      { title: "No Watermark", desc: "Clean MP4 with no TikTok logo." },
      { title: "HD 1080p", desc: "Full HD quality whenever available." },
      { title: "MP4 & MP3", desc: "Save video or extract audio only." },
      { title: "100% Free", desc: "Unlimited downloads, no fees." },
      { title: "No Login", desc: "No sign-up, no account needed." },
      { title: "Fast & Safe", desc: "Files ready in seconds. Secure." },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "How do I download a TikTok video without watermark?", a: "Copy the TikTok video link, paste it in the field above and click Download. Our TikTok downloader removes the watermark and delivers a clean MP4 HD file in seconds." },
      { q: "Is this TikTok downloader free?", a: "Yes. Our TikTok video downloader is 100% free, with unlimited downloads, no sign-up and no hidden fees." },
      { q: "Can I download TikTok videos on iPhone and Android?", a: "Yes. The tool works in any mobile browser. No app or APK install required — just paste the link and save the MP4." },
      { q: "What is the maximum video quality?", a: "We deliver TikTok videos in the highest quality available from the source — usually 1080p Full HD MP4." },
      { q: "Can I extract MP3 audio from TikTok?", a: "Yes. After processing, you can choose to download the original audio of the TikTok video in MP3 format." },
    ],
    footerTagline: "Free TikTok video downloader · No watermark · MP4 HD",
    switchLanguage: "Language",
  },
  pt: {
    title: "Baixar Vídeo TikTok Sem Marca D'Água | MP4 HD Grátis",
    description: "Baixar vídeo TikTok sem marca d'água em MP4 HD. Download TikTok online, grátis, sem app — funciona no PC, Android e iPhone.",
    keywords: "baixar vídeo tiktok, baixar tiktok sem marca d'água, download tiktok mp4, salvar vídeo tiktok, baixar tiktok online, tiktok downloader português, baixar vídeo tiktok hd, como baixar vídeo do tiktok, baixar vídeo do tiktok, download tiktok sem marca d'água",
    heroBadge: "Baixar TikTok Grátis",
    heroTitle: "Baixar Vídeo TikTok",
    heroTitleAccent: "Sem Marca D'Água",
    heroSubtitle: "Baixador online para baixar vídeo do TikTok em MP4 HD sem marca d'água. Grátis, sem cadastro — funciona no PC, Android e iPhone.",
    ctaDownload: "Baixar Agora",
    ctaProcessing: "Processando...",
    inputPlaceholder: "Cole o link do vídeo do TikTok para baixar sem marca d'água...",
    pasteBtn: "Colar",
    clearBtn: "Limpar",
    resultsTitle: "Vídeo Pronto para Download",
    howItWorksTitle: "Como Baixar Vídeo do TikTok",
    steps: [
      { title: "Copie o link", desc: "Abra o TikTok, toque em Compartilhar e copie o link do vídeo." },
      { title: "Cole acima", desc: "Cole o link no campo e clique em Baixar Agora." },
      { title: "Salve em MP4 HD", desc: "Receba o vídeo do TikTok em MP4 HD sem marca d'água." },
    ],
    featuresTitle: "Por que Usar Nosso Baixador de TikTok",
    features: [
      { title: "Sem Marca D'Água", desc: "MP4 limpo, sem o logo do TikTok." },
      { title: "HD 1080p", desc: "Qualidade Full HD quando disponível." },
      { title: "MP4 e MP3", desc: "Baixe vídeo ou extraia só o áudio." },
      { title: "100% Grátis", desc: "Downloads ilimitados, sem taxas." },
      { title: "Sem Cadastro", desc: "Sem login, sem conta." },
      { title: "Rápido e Seguro", desc: "Arquivos prontos em segundos." },
    ],
    faqTitle: "Perguntas Frequentes",
    faqs: [
      { q: "Como baixar vídeo do TikTok sem marca d'água?", a: "Copie o link do vídeo no TikTok, cole no campo acima e clique em Baixar Agora. Nosso baixador remove a marca d'água e entrega o vídeo em MP4 HD." },
      { q: "É grátis para baixar vídeos do TikTok?", a: "Sim. O baixador é 100% gratuito, com downloads ilimitados, sem cadastro e sem taxas escondidas." },
      { q: "Funciona no iPhone e Android?", a: "Sim. Funciona em qualquer navegador móvel. Não precisa instalar app ou APK — basta colar o link e salvar o MP4." },
      { q: "Qual a qualidade máxima do vídeo?", a: "Entregamos o vídeo do TikTok na melhor qualidade disponível na fonte — geralmente MP4 1080p Full HD." },
      { q: "Posso baixar só o áudio em MP3?", a: "Sim. Após processar o link, você pode escolher baixar apenas o áudio do TikTok em formato MP3." },
    ],
    footerTagline: "Baixador de vídeo TikTok · Sem marca d'água · MP4 HD",
    switchLanguage: "Idioma",
  },
  id: {
    title: "Download Video TikTok Tanpa Watermark – MP4 HD Gratis",
    description: "Download video TikTok tanpa watermark dalam MP4 HD. Pengunduh TikTok online gratis tanpa aplikasi — bekerja di iPhone, Android & PC.",
    keywords: "download video tiktok, download tiktok tanpa watermark, pengunduh video tiktok, save video tiktok, tiktok downloader tanpa watermark, download video tiktok mp4, simpan video tiktok, download tiktok hd, pengunduh tiktok online, cara download video tiktok",
    heroBadge: "Pengunduh TikTok Gratis",
    heroTitle: "Download Video TikTok",
    heroTitleAccent: "Tanpa Watermark",
    heroSubtitle: "Pengunduh online untuk download video TikTok dalam MP4 HD tanpa watermark. Gratis, tanpa daftar — bekerja di PC, Android dan iPhone.",
    ctaDownload: "Unduh",
    ctaProcessing: "Memproses...",
    inputPlaceholder: "Tempel tautan video TikTok di sini untuk download tanpa watermark...",
    pasteBtn: "Tempel",
    clearBtn: "Hapus",
    resultsTitle: "Video Siap Diunduh",
    howItWorksTitle: "Cara Download Video TikTok",
    steps: [
      { title: "Salin tautan", desc: "Buka TikTok, ketuk Bagikan dan salin tautan video." },
      { title: "Tempel di atas", desc: "Tempel tautan di kolom dan klik Unduh." },
      { title: "Simpan MP4 HD", desc: "Dapatkan video TikTok dalam MP4 HD tanpa watermark." },
    ],
    featuresTitle: "Mengapa Memilih Pengunduh TikTok Kami",
    features: [
      { title: "Tanpa Watermark", desc: "MP4 bersih, tanpa logo TikTok." },
      { title: "HD 1080p", desc: "Kualitas Full HD jika tersedia." },
      { title: "MP4 & MP3", desc: "Simpan video atau ekstrak audio." },
      { title: "100% Gratis", desc: "Unduhan tidak terbatas, tanpa biaya." },
      { title: "Tanpa Login", desc: "Tanpa pendaftaran, tanpa akun." },
      { title: "Cepat & Aman", desc: "File siap dalam hitungan detik." },
    ],
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqs: [
      { q: "Bagaimana cara download video TikTok tanpa watermark?", a: "Salin tautan video TikTok, tempel di kolom di atas dan klik Unduh. Pengunduh kami menghapus watermark dan memberikan MP4 HD yang bersih." },
      { q: "Apakah pengunduh TikTok ini gratis?", a: "Ya. Pengunduh kami 100% gratis, dengan unduhan tak terbatas, tanpa daftar dan tanpa biaya tersembunyi." },
      { q: "Bisakah download video TikTok di iPhone dan Android?", a: "Bisa. Alat ini bekerja di peramban seluler mana pun. Tidak perlu menginstal aplikasi atau APK." },
      { q: "Berapa kualitas video maksimal?", a: "Kami memberikan video TikTok dalam kualitas tertinggi yang tersedia — biasanya MP4 1080p Full HD." },
      { q: "Bisakah ekstrak audio MP3 dari TikTok?", a: "Bisa. Setelah memproses, Anda dapat memilih untuk mengunduh audio TikTok dalam format MP3." },
    ],
    footerTagline: "Pengunduh video TikTok · Tanpa watermark · MP4 HD",
    switchLanguage: "Bahasa",
  },
  es: {
    title: "Descargar Video TikTok Sin Marca de Agua – MP4 HD Gratis",
    description: "Descargar video TikTok sin marca de agua en MP4 HD. Descargador online gratis, sin app — funciona en iPhone, Android y PC.",
    keywords: "descargar video tiktok, descargar tiktok sin marca de agua, bajar videos tiktok, guardar video tiktok, descargar tiktok mp4, tiktok downloader español, descargar video tiktok hd, cómo descargar videos de tiktok, sin marca de agua tiktok, descargar tiktok online gratis",
    heroBadge: "Descargador TikTok Gratis",
    heroTitle: "Descargar Video TikTok",
    heroTitleAccent: "Sin Marca de Agua",
    heroSubtitle: "Descargador online para bajar videos de TikTok en MP4 HD sin marca de agua. Gratis, sin registro — funciona en PC, Android y iPhone.",
    ctaDownload: "Descargar",
    ctaProcessing: "Procesando...",
    inputPlaceholder: "Pega el enlace del video de TikTok para descargar sin marca de agua...",
    pasteBtn: "Pegar",
    clearBtn: "Limpiar",
    resultsTitle: "Video Listo para Descargar",
    howItWorksTitle: "Cómo Descargar Videos de TikTok",
    steps: [
      { title: "Copia el enlace", desc: "Abre TikTok, toca Compartir y copia el enlace del video." },
      { title: "Pégalo arriba", desc: "Pega el enlace en el campo y haz clic en Descargar." },
      { title: "Guarda en MP4 HD", desc: "Obtén tu video de TikTok en MP4 HD sin marca de agua." },
    ],
    featuresTitle: "Por qué Elegir Nuestro Descargador",
    features: [
      { title: "Sin Marca de Agua", desc: "MP4 limpio, sin el logo de TikTok." },
      { title: "HD 1080p", desc: "Calidad Full HD cuando esté disponible." },
      { title: "MP4 y MP3", desc: "Guarda video o extrae solo el audio." },
      { title: "100% Gratis", desc: "Descargas ilimitadas, sin costo." },
      { title: "Sin Registro", desc: "Sin cuenta, sin login." },
      { title: "Rápido y Seguro", desc: "Archivos listos en segundos." },
    ],
    faqTitle: "Preguntas Frecuentes",
    faqs: [
      { q: "¿Cómo descargar un video de TikTok sin marca de agua?", a: "Copia el enlace del video en TikTok, pégalo arriba y haz clic en Descargar. Nuestro descargador quita la marca de agua y entrega un MP4 HD limpio." },
      { q: "¿El descargador de TikTok es gratis?", a: "Sí. Es 100% gratis, con descargas ilimitadas, sin registro y sin costos ocultos." },
      { q: "¿Funciona en iPhone y Android?", a: "Sí. Funciona en cualquier navegador móvil. No necesitas instalar app ni APK." },
      { q: "¿Cuál es la calidad máxima del video?", a: "Entregamos el video en la mejor calidad disponible — normalmente MP4 1080p Full HD." },
      { q: "¿Puedo extraer el audio MP3?", a: "Sí. Después de procesar el enlace, puedes elegir descargar solo el audio en formato MP3." },
    ],
    footerTagline: "Descargador de video TikTok · Sin marca de agua · MP4 HD",
    switchLanguage: "Idioma",
  },
  hi: {
    title: "TikTok Video Download Without Watermark – MP4 HD Free",
    description: "TikTok video download bina watermark ke MP4 HD mein. Free online TikTok downloader, no app — iPhone, Android & PC par chalta hai.",
    keywords: "tiktok video download, tiktok downloader, download tiktok video without watermark, tiktok mp4 download, save tiktok video, tiktok video kaise download kare, bina watermark ke tiktok download, tiktok downloader online free, douyin download, tiktok hd download",
    heroBadge: "Free TikTok Downloader",
    heroTitle: "TikTok Video Download",
    heroTitleAccent: "Without Watermark",
    heroSubtitle: "Online TikTok downloader to save videos in MP4 HD without watermark. Free, no sign-up — iPhone, Android aur PC par chalta hai.",
    ctaDownload: "Download",
    ctaProcessing: "Processing...",
    inputPlaceholder: "TikTok video link yahan paste karein bina watermark download ke liye...",
    pasteBtn: "Paste",
    clearBtn: "Clear",
    resultsTitle: "Video Download ke Liye Tayar",
    howItWorksTitle: "TikTok Video Kaise Download Kare",
    steps: [
      { title: "Link copy karein", desc: "TikTok kholein, Share par tap karein aur video link copy karein." },
      { title: "Upar paste karein", desc: "Link field mein paste karein aur Download par click karein." },
      { title: "MP4 HD save karein", desc: "TikTok video MP4 HD mein bina watermark ke prapt karein." },
    ],
    featuresTitle: "Hamara TikTok Downloader Kyun Chunein",
    features: [
      { title: "No Watermark", desc: "TikTok logo ke bina saaf MP4." },
      { title: "HD 1080p", desc: "Full HD quality jab available ho." },
      { title: "MP4 & MP3", desc: "Video ya sirf audio download karein." },
      { title: "100% Free", desc: "Unlimited downloads, koi shulk nahi." },
      { title: "No Login", desc: "Koi sign-up nahi, koi account nahi." },
      { title: "Fast & Safe", desc: "Files seconds mein tayar." },
    ],
    faqTitle: "Aksar Puche Jane Wale Sawal",
    faqs: [
      { q: "TikTok video bina watermark ke kaise download karein?", a: "TikTok video ka link copy karein, upar field mein paste karein aur Download click karein. Hamara downloader watermark hata kar saaf MP4 HD file deta hai." },
      { q: "Kya yeh TikTok downloader free hai?", a: "Haan. Hamara TikTok video downloader 100% free hai, unlimited downloads ke saath, bina sign-up ya hidden charges ke." },
      { q: "Kya iPhone aur Android par TikTok download kar sakte hain?", a: "Haan. Yeh tool kisi bhi mobile browser mein chalta hai. App ya APK install karne ki zaroorat nahi." },
      { q: "Maximum video quality kya hai?", a: "Hum TikTok video ko source par available best quality mein dete hain — aksar MP4 1080p Full HD." },
      { q: "Kya MP3 audio extract kar sakte hain?", a: "Haan. Link process karne ke baad aap TikTok video ka audio MP3 format mein download kar sakte hain." },
    ],
    footerTagline: "Free TikTok video downloader · No watermark · MP4 HD",
    switchLanguage: "Bhasha",
  },
  tr: {
    title: "TikTok Video İndir – Filigransız MP4 HD Ücretsiz",
    description: "TikTok video indir, filigransız MP4 HD. Ücretsiz online TikTok indirici, uygulama yok — iPhone, Android ve PC'de çalışır.",
    keywords: "tiktok video indir, tiktok indirici, tiktok video indirici, tiktok watermark kaldır, tiktok mp4 indir, bedava tiktok indirici, tiktok videosu kaydet, tiktok hd indir, filigransız tiktok, tiktok video indirme",
    heroBadge: "Ücretsiz TikTok İndirici",
    heroTitle: "TikTok Video İndir",
    heroTitleAccent: "Filigransız",
    heroSubtitle: "TikTok videolarını filigransız MP4 HD olarak kaydetmek için online indirici. Ücretsiz, kayıt yok — iPhone, Android ve PC'de çalışır.",
    ctaDownload: "İndir",
    ctaProcessing: "İşleniyor...",
    inputPlaceholder: "Filigransız indirmek için TikTok video bağlantısını buraya yapıştırın...",
    pasteBtn: "Yapıştır",
    clearBtn: "Temizle",
    resultsTitle: "Video İndirmeye Hazır",
    howItWorksTitle: "TikTok Video Nasıl İndirilir",
    steps: [
      { title: "Bağlantıyı kopyala", desc: "TikTok'u aç, Paylaş'a dokun ve video bağlantısını kopyala." },
      { title: "Yukarı yapıştır", desc: "Bağlantıyı alana yapıştır ve İndir'e tıkla." },
      { title: "MP4 HD kaydet", desc: "TikTok videosunu filigransız MP4 HD olarak al." },
    ],
    featuresTitle: "Neden Bizim TikTok İndiricimiz",
    features: [
      { title: "Filigransız", desc: "TikTok logosu olmayan temiz MP4." },
      { title: "HD 1080p", desc: "Mümkün olduğunda Full HD kalite." },
      { title: "MP4 ve MP3", desc: "Video kaydet veya sadece ses çıkar." },
      { title: "%100 Ücretsiz", desc: "Sınırsız indirme, ücret yok." },
      { title: "Giriş Yok", desc: "Kayıt yok, hesap yok." },
      { title: "Hızlı ve Güvenli", desc: "Dosyalar saniyeler içinde hazır." },
    ],
    faqTitle: "Sıkça Sorulan Sorular",
    faqs: [
      { q: "TikTok videosu filigransız nasıl indirilir?", a: "TikTok video bağlantısını kopyalayın, yukarıdaki alana yapıştırın ve İndir'e tıklayın. İndiricimiz filigranı kaldırır ve temiz MP4 HD dosya sunar." },
      { q: "Bu TikTok indirici ücretsiz mi?", a: "Evet. TikTok video indiricimiz %100 ücretsizdir, sınırsız indirme, kayıt veya gizli ücret yok." },
      { q: "iPhone ve Android'de TikTok indirebilir miyim?", a: "Evet. Araç herhangi bir mobil tarayıcıda çalışır. Uygulama veya APK kurmaya gerek yok." },
      { q: "Maksimum video kalitesi nedir?", a: "TikTok videolarını kaynakta mevcut en yüksek kalitede sunuyoruz — genellikle MP4 1080p Full HD." },
      { q: "TikTok'tan MP3 ses çıkarabilir miyim?", a: "Evet. Bağlantı işlendikten sonra TikTok videosunun sesini MP3 formatında indirmeyi seçebilirsiniz." },
    ],
    footerTagline: "TikTok video indirici · Filigransız · MP4 HD",
    switchLanguage: "Dil",
  },
};

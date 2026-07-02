// Post-build static pre-rendering.
//
// For each public route, writes dist/<slug>/index.html by cloning the built
// dist/index.html and rewriting:
//   - <title>
//   - <meta name="description">
//   - <link rel="canonical">
//   - <meta name="robots">
//   - hreflang <link rel="alternate"> entries (localized homes)
//   - og:title / og:description / og:url
//   - a <noscript> block inside <body> with H1 + intro + nav links
//     so crawlers see real content without executing JavaScript.
//
// The SPA still hydrates on top — the <div id="root"> is untouched, so React
// takes over identically to before.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const SITE_URL = "https://baixarvideostiktok.com";

// ---- Route table ---------------------------------------------------------

/** Locales matching src/i18n/config.ts */
const LOCALES = [
  { code: "en",  bcp47: "en-US",  ogLocale: "en_US" },
  { code: "id",  bcp47: "id-ID",  ogLocale: "id_ID" },
  { code: "pt",  bcp47: "pt-BR",  ogLocale: "pt_BR" }, // root "/"
  { code: "es",  bcp47: "es-MX",  ogLocale: "es_MX" },
  { code: "ur",  bcp47: "ur-PK",  ogLocale: "ur_PK" },
  { code: "fil", bcp47: "fil-PH", ogLocale: "fil_PH" },
  { code: "ru",  bcp47: "ru-RU",  ogLocale: "ru_RU" },
  { code: "bn",  bcp47: "bn-BD",  ogLocale: "bn_BD" },
  { code: "ar",  bcp47: "ar-SA",  ogLocale: "ar_SA" },
  { code: "vi",  bcp47: "vi-VN",  ogLocale: "vi_VN" },
];

/** Localized homepage content (H1 + intro + primary CTA copy) */
const HOME_LOCALIZED = {
  pt: {
    path: "/",
    title: "Baixar Vídeo TikTok Sem Marca D'Água | MP4 HD Grátis — TikDown",
    description: "Baixar vídeo TikTok sem marca d'água em MP4 HD ou MP3. TikTok downloader online, grátis, sem cadastro. Funciona em PC, Android e iPhone.",
    h1: "Baixar Vídeo do TikTok Sem Marca D'Água",
    intro: "Cole o link do TikTok para baixar o vídeo em MP4 HD ou extrair o áudio em MP3. Ferramenta 100% gratuita, sem cadastro e sem instalar app — funciona no PC, Android e iPhone.",
  },
  en: {
    path: "/en",
    title: "TikTok Video Downloader — Download TikTok Without Watermark (MP4 HD)",
    description: "Free TikTok video downloader. Save TikTok videos to MP4 HD without watermark or extract MP3 audio. Online, fast, no app, no login.",
    h1: "Download TikTok Videos Without Watermark",
    intro: "Paste any TikTok link to save the video in MP4 HD or extract the audio to MP3. 100% free, no signup, no app — works on PC, Android and iPhone.",
  },
  id: {
    path: "/id",
    title: "Download Video TikTok Tanpa Watermark — MP4 HD Gratis",
    description: "Download video TikTok tanpa watermark dalam MP4 HD atau ekstrak audio MP3. Pengunduh online gratis, cepat, tanpa aplikasi.",
    h1: "Download Video TikTok Tanpa Watermark",
    intro: "Tempel tautan TikTok untuk menyimpan video dalam MP4 HD atau mengunduh audio MP3. Gratis 100%, tanpa daftar, tanpa aplikasi.",
  },
  es: {
    path: "/es",
    title: "Descargar Video TikTok Sin Marca de Agua — MP4 HD Gratis",
    description: "Descargar video TikTok sin marca de agua en MP4 HD o extraer audio MP3. Descargador online gratis, rápido, sin app.",
    h1: "Descargar Videos de TikTok Sin Marca de Agua",
    intro: "Pega el enlace de TikTok para guardar el video en MP4 HD o extraer el audio en MP3. 100% gratis, sin registro y sin app.",
  },
  ur: {
    path: "/ur",
    title: "ٹک ٹاک ویڈیو ڈاؤن لوڈ کریں — واٹر مارک کے بغیر MP4 HD مفت",
    description: "ٹک ٹاک ویڈیو واٹر مارک کے بغیر MP4 HD میں ڈاؤن لوڈ کریں یا MP3 آڈیو نکالیں۔ مفت آن لائن ٹک ٹاک ڈاؤن لوڈر۔",
    h1: "ٹک ٹاک ویڈیو واٹر مارک کے بغیر ڈاؤن لوڈ کریں",
    intro: "ٹک ٹاک لنک پیسٹ کریں اور MP4 HD یا MP3 میں محفوظ کریں۔ 100% مفت، رجسٹریشن یا ایپ کے بغیر۔",
  },
  fil: {
    path: "/fil",
    title: "Mag-download ng TikTok Video Walang Watermark — MP4 HD Libre",
    description: "Mag-download ng TikTok videos nang walang watermark sa MP4 HD o kumuha ng MP3 audio. Libre, mabilis, walang app.",
    h1: "Mag-download ng TikTok Videos Nang Walang Watermark",
    intro: "I-paste ang link ng TikTok para i-save ang video sa MP4 HD o kunin ang audio bilang MP3. 100% libre, walang pag-sign up.",
  },
  ru: {
    path: "/ru",
    title: "Скачать видео TikTok без водяного знака — MP4 HD бесплатно",
    description: "Скачать видео TikTok без водяного знака в MP4 HD или извлечь аудио MP3. Онлайн-загрузчик, бесплатно, без приложения.",
    h1: "Скачать видео TikTok без водяного знака",
    intro: "Вставьте ссылку TikTok, чтобы сохранить видео в MP4 HD или извлечь аудио в MP3. Полностью бесплатно, без регистрации.",
  },
  bn: {
    path: "/bn",
    title: "টিকটক ভিডিও ডাউনলোড করুন — ওয়াটারমার্ক ছাড়া MP4 HD বিনামূল্যে",
    description: "টিকটক ভিডিও ওয়াটারমার্ক ছাড়া MP4 HD-তে ডাউনলোড করুন বা MP3 অডিও নিন। বিনামূল্যে অনলাইন ডাউনলোডার।",
    h1: "ওয়াটারমার্ক ছাড়া টিকটক ভিডিও ডাউনলোড করুন",
    intro: "টিকটক লিঙ্কটি পেস্ট করে MP4 HD বা MP3-তে সংরক্ষণ করুন। 100% বিনামূল্যে, নিবন্ধন ছাড়াই।",
  },
  ar: {
    path: "/ar",
    title: "تنزيل فيديو تيك توك بدون علامة مائية — MP4 HD مجانا",
    description: "تنزيل فيديو تيك توك بدون علامة مائية بجودة MP4 HD أو استخراج الصوت MP3. أداة مجانية عبر الإنترنت.",
    h1: "تنزيل فيديوهات تيك توك بدون علامة مائية",
    intro: "الصق رابط تيك توك لحفظ الفيديو بصيغة MP4 HD أو استخراج الصوت MP3. مجاني 100٪ بدون تسجيل.",
  },
  vi: {
    path: "/vi",
    title: "Tải Video TikTok Không Logo — MP4 HD Miễn Phí",
    description: "Tải video TikTok không logo (không watermark) chất lượng MP4 HD hoặc trích xuất MP3. Công cụ trực tuyến miễn phí.",
    h1: "Tải Video TikTok Không Watermark",
    intro: "Dán liên kết TikTok để lưu video MP4 HD hoặc trích xuất âm thanh MP3. Miễn phí 100%, không cần đăng ký.",
  },
};

/** Non-home routes (Portuguese only) */
const OTHER_ROUTES = [
  {
    path: "/download",
    title: "Baixar TikTok — Download Direto MP4 HD | TikDown",
    description: "Página de download direto de vídeos do TikTok em MP4 HD sem marca d'água. Cole o link e receba o arquivo em segundos.",
    h1: "Download de Vídeo do TikTok",
    intro: "Página de download direto. Cole a URL de um vídeo público do TikTok e receba o MP4 HD sem marca d'água imediatamente.",
    robots: "index, follow",
  },
  {
    path: "/video",
    title: "Baixar Vídeo do TikTok em MP4 HD Sem Marca D'Água | TikDown",
    description: "Baixe o vídeo do TikTok em MP4 HD, com áudio original e sem marca d'água. Rápido, grátis e compatível com PC, Android e iPhone.",
    h1: "Baixar Vídeo do TikTok em MP4 HD",
    intro: "Salve qualquer vídeo público do TikTok em MP4 HD 1080p com áudio original preservado. Sem marca d'água, sem cadastro.",
    robots: "index, follow",
  },
  {
    path: "/audio",
    title: "Baixar Áudio TikTok em MP3 — Extrator de Som Grátis | TikDown",
    description: "Extraia o áudio de qualquer vídeo do TikTok em MP3 alta qualidade. Ferramenta online grátis para salvar músicas e sons virais.",
    h1: "Baixar Áudio do TikTok em MP3",
    intro: "Converta o som de vídeos do TikTok para MP3 e salve músicas, dublagens e sons virais no seu dispositivo. Grátis, online e sem instalar app.",
    robots: "index, follow",
  },
  {
    path: "/faq",
    title: "Perguntas Frequentes (FAQ) — Baixador de TikTok | TikDown",
    description: "Tire suas dúvidas sobre como baixar vídeos do TikTok sem marca d'água. 30+ respostas sobre formatos, segurança, MP3, iPhone, Android e PC.",
    h1: "Perguntas Frequentes",
    intro: "Reunimos as principais dúvidas sobre baixar vídeos do TikTok: formatos suportados, qualidade, segurança, uso em iPhone, Android e PC, e muito mais.",
    robots: "index, follow",
  },
  {
    path: "/sobre",
    title: "Sobre o TikDown — Baixador de Vídeos TikTok Gratuito",
    description: "Conheça o TikDown: baixador de vídeos do TikTok sem marca d'água, gratuito, sem cadastro, com foco em privacidade e velocidade.",
    h1: "Sobre o TikDown",
    intro: "O TikDown é uma ferramenta gratuita e sem cadastro para baixar vídeos e áudios do TikTok, criada para ser rápida, segura e respeitar a privacidade do usuário.",
    robots: "index, follow",
  },
  {
    path: "/ajuda",
    title: "Central de Ajuda — Como Baixar Vídeos do TikTok | TikDown",
    description: "Central de ajuda do TikDown. Tutoriais passo a passo para baixar vídeos do TikTok no PC, Android e iPhone sem marca d'água.",
    h1: "Central de Ajuda",
    intro: "Tutoriais passo a passo para copiar o link do TikTok, colar no TikDown e baixar o vídeo em MP4 HD ou MP3, em qualquer dispositivo.",
    robots: "index, follow",
  },
  {
    path: "/privacidade",
    title: "Política de Privacidade | TikDown",
    description: "Saiba como o TikDown protege seus dados. Não coletamos dados pessoais nem armazenamos vídeos baixados.",
    h1: "Política de Privacidade",
    intro: "Detalhamos aqui como o TikDown trata seus dados, quais cookies utilizamos e por que não armazenamos nenhum vídeo em nossos servidores.",
    robots: "noindex, follow",
  },
  {
    path: "/termos",
    title: "Termos de Uso | TikDown TikTok Downloader",
    description: "Termos de uso do TikDown: regras, direitos autorais e responsabilidades ao baixar conteúdo do TikTok.",
    h1: "Termos de Uso",
    intro: "Estes termos definem as regras para uso do TikDown, incluindo respeito aos direitos autorais dos criadores e aos termos de serviço do TikTok.",
    robots: "noindex, follow",
  },
  {
    path: "/contato",
    title: "Contato | TikDown TikTok Downloader",
    description: "Fale com a equipe do TikDown. Dúvidas, sugestões ou parcerias sobre o baixador de vídeos do TikTok.",
    h1: "Contato",
    intro: "Envie sua mensagem para nossa equipe. Respondemos dúvidas técnicas, sugestões de melhoria e propostas de parceria.",
    robots: "noindex, follow",
  },
  {
    path: "/uso-responsavel",
    title: "Uso Responsável | TikDown TikTok Downloader",
    description: "Diretrizes de uso responsável: respeite direitos autorais, créditos dos criadores e a política do TikTok.",
    h1: "Política de Uso Responsável",
    intro: "Baixar vídeos vem com responsabilidade. Confira nossas diretrizes sobre direitos autorais, crédito aos criadores e uso ético do conteúdo.",
    robots: "noindex, follow",
  },
];

// ---- HTML transform ------------------------------------------------------

function buildHreflangLinks() {
  const links = LOCALES.map(
    (l) =>
      `    <link rel="alternate" hreflang="${l.bcp47}" href="${SITE_URL}${l.code === "pt" ? "/" : "/" + l.code}" />`
  );
  links.push(`    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`);
  return links.join("\n");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceOrInsert(html, regex, replacement, fallbackAfter) {
  if (regex.test(html)) return html.replace(regex, replacement);
  // insert right after <head>
  return html.replace(/<head>/i, `<head>\n${fallbackAfter}`);
}

function transformHtml(template, route) {
  let html = template;
  const canonical = `${SITE_URL}${route.path}`;
  const robots = route.robots || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

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

  // og:title / og:description / og:url
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

  // twitter title/description
  html = html.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${title}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${description}">`
  );

  // Replace all existing hreflang alternates with a fresh, complete set
  html = html.replace(/\n?\s*<link\s+rel=["']alternate["']\s+hreflang=["'][^"']*["'][^>]*>\s*/gi, "\n");
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, (m) => `${m}\n${buildHreflangLinks()}`);

  // Inject a <noscript> SEO block right after <body>. Crawlers see H1 +
  // intro + navigation links without executing JavaScript. Hydration is
  // unaffected because the block sits outside #root.
  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/video", label: "Vídeo" },
    { href: "/audio", label: "Áudio" },
    { href: "/faq", label: "FAQ" },
    { href: "/sobre", label: "Sobre" },
    { href: "/ajuda", label: "Ajuda" },
  ]
    .map((l) => `<a href="${l.href}">${l.label}</a>`)
    .join(" · ");

  const noscript = `
<noscript>
  <div style="max-width:720px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;color:#111;background:#fff;">
    <h1>${escapeHtml(route.h1)}</h1>
    <p>${escapeHtml(route.intro)}</p>
    <nav aria-label="Site navigation">${navLinks}</nav>
    <p><a href="${SITE_URL}${route.path}">${escapeHtml(canonical)}</a></p>
  </div>
</noscript>`;

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
    console.warn(`[prerender] no dist/index.html found at ${templatePath}, skipping.`);
    return;
  }

  const allRoutes = [
    ...Object.values(HOME_LOCALIZED).map((h) => ({ ...h, robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" })),
    ...OTHER_ROUTES,
  ];

  const written = [];
  for (const route of allRoutes) {
    const out = await writeRoute(distDir, template, route);
    written.push(out);
  }
  console.log(`[prerender] wrote ${written.length} static route shells`);
}

// Allow running directly: `node scripts/prerender.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
  const dist = resolve(process.cwd(), "dist");
  prerender(dist).catch((err) => {
    console.error("[prerender] failed:", err);
    process.exit(1);
  });
}

import { Link } from "react-router-dom";
import { Video, Music, History } from "lucide-react";

interface RelatedToolsProps {
  exclude: "video" | "audio" | "download";
}

const tools = {
  video: {
    to: "/video",
    icon: Video,
    title: "Baixar Vídeo MP4 HD",
    desc: "TikTok em MP4 1080p sem marca d'água",
  },
  audio: {
    to: "/audio",
    icon: Music,
    title: "Baixar Áudio MP3",
    desc: "Extraia músicas e sons virais em MP3",
  },
  download: {
    to: "/download",
    icon: History,
    title: "Histórico de Downloads",
    desc: "Veja todos os TikToks que você já baixou",
  },
} as const;

export function RelatedTools({ exclude }: RelatedToolsProps) {
  const visible = (Object.keys(tools) as (keyof typeof tools)[]).filter((k) => k !== exclude);

  return (
    <section className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-foreground mb-4 text-center">
        Continue explorando o TikDown
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {visible.map((key) => {
          const t = tools[key];
          const Icon = t.icon;
          return (
            <Link
              key={key}
              to={t.to}
              className="group p-5 rounded-xl border border-border bg-card hover:border-tiktok-cyan/40 transition-colors"
            >
              <Icon className="w-6 h-6 text-tiktok-cyan mb-2" />
              <h3 className="font-semibold text-foreground group-hover:text-tiktok-cyan transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

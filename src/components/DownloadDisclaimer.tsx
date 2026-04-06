import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export function DownloadDisclaimer() {
  return (
    <p className="mt-3 text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
      <ShieldAlert className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5 text-muted-foreground" />
      Certifique-se de não violar os direitos de terceiros com os vídeos que baixar do TikTok. Conteúdos protegidos por direitos autorais não podem ser baixados com esta ferramenta.{" "}
      <Link to="/uso-responsavel" className="text-tiktok-cyan hover:underline font-medium">
        Saiba mais
      </Link>
    </p>
  );
}

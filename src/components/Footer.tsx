import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoInstagram from "@/assets/logo-instagram.png";
import logoFacebook from "@/assets/logo-facebook.png";
import logoYoutube from "@/assets/logo-youtube.png";
import logoKwai from "@/assets/logo-kwai.png";

export function Footer() {
  return (
    <footer className="bg-tiktok-dark text-secondary-foreground mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img src={logo} alt="TikDown - Baixar Videos TikTok" className="w-8 h-8 rounded-lg flex-shrink-0" />
            <div className="text-center md:text-left">
              <h3 className="font-bold text-sm text-secondary-foreground leading-tight">Baixar Videos TikTok</h3>
              <p className="text-xs text-muted-foreground leading-tight">Sem Marca d'Água • Grátis</p>
            </div>
          </div>
          <nav className="flex flex-nowrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground whitespace-nowrap">
            <Link to="/termos" className="hover:text-tiktok-cyan transition-colors">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-tiktok-cyan transition-colors">Privacidade</Link>
            <Link to="/contato" className="hover:text-tiktok-cyan transition-colors">Contato</Link>
            <Link to="/sobre" className="hover:text-tiktok-cyan transition-colors">Sobre</Link>
            <Link to="/uso-responsavel" className="hover:text-tiktok-cyan transition-colors">Uso Responsável</Link>
            <Link to="/faq" className="hover:text-tiktok-cyan transition-colors">FAQ</Link>
          </nav>
        </div>

        {/* SEO text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground/70 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-secondary-foreground">BaixarVideosTikTok.com</strong> é a ferramenta gratuita para <em>baixar vídeo do TikTok sem marca d'água</em>, <em>converter TikTok para MP4 e MP3</em>, <em>remover marca d'água do TikTok</em> e <em>salvar áudio do TikTok</em> em qualquer dispositivo. Suporte global: TikTok downloader, download TikTok without watermark, save TikTok video, tiktok mp3 download — descargar video tiktok, télécharger vidéo tiktok, tiktok video herunterladen, scaricare video tiktok. Free, no login required.
          </p>
        </div>

        {/* Outras Plataformas */}
        <div className="mt-8 pt-6 border-t border-sidebar-border/50">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Baixar Vídeos de Outras Plataformas
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://baixarvideosinstagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/30 transition-all group">
              <img src={logoInstagram} alt="Baixar Videos Instagram" className="w-6 h-6 rounded" />
              <span className="text-sm text-pink-400 group-hover:text-pink-300">Instagram</span>
            </a>
            <a href="https://baixarvideosfacebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-800/20 hover:from-blue-600/30 hover:to-blue-800/30 border border-blue-500/30 transition-all group">
              <img src={logoFacebook} alt="Baixar Videos Facebook" className="w-6 h-6 rounded" />
              <span className="text-sm text-blue-400 group-hover:text-blue-300">Facebook</span>
            </a>
            <a href="https://baixarvideoyoutube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600/20 to-red-800/20 hover:from-red-600/30 hover:to-red-800/30 border border-red-500/30 transition-all group">
              <img src={logoYoutube} alt="Baixar Videos Youtube" className="w-6 h-6 rounded" />
              <span className="text-sm text-red-400 group-hover:text-red-300">Youtube</span>
            </a>
            <a href="https://baixarvideoskwai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-500/30 transition-all group">
              <img src={logoKwai} alt="Baixar Videos Kwai" className="w-6 h-6 rounded" />
              <span className="text-sm text-orange-400 group-hover:text-orange-300">Kwai</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-sidebar-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} baixarvideostiktok.com — Baixar Videos TikTok Sem Marca d'Água. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Não somos afiliados ao TikTok, ByteDance ou Douyin. Baixador de videos TikTok online gratuito.
          </p>
        </div>
      </div>
    </footer>
  );
}

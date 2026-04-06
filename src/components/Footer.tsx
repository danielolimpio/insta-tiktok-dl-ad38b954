import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-tiktok-dark text-secondary-foreground mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg text-secondary-foreground">TikDown</h3>
            <p className="text-xs text-muted-foreground mt-1">Sem Marca d'Água • Grátis • Ilimitado</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/termos" className="hover:text-tiktok-cyan transition-colors">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-tiktok-cyan transition-colors">Privacidade</Link>
            <Link to="/contato" className="hover:text-tiktok-cyan transition-colors">Contato</Link>
            <Link to="/sobre" className="hover:text-tiktok-cyan transition-colors">Sobre</Link>
            <Link to="/uso-responsavel" className="hover:text-tiktok-cyan transition-colors">Uso Responsável</Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-sidebar-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} baixarvideostiktok.com — Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Não somos afiliados ao TikTok, ByteDance ou Douyin.
          </p>
        </div>
      </div>
    </footer>
  );
}

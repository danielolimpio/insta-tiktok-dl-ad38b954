import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO
        title="Página Não Encontrada | TikDown"
        description="A página que você procura não foi encontrada. Volte para o TikDown e baixe vídeos do TikTok sem marca d'água em MP4 HD."
        canonical={`https://baixarvideostiktok.com${location.pathname}`}
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Página não encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar para o Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;

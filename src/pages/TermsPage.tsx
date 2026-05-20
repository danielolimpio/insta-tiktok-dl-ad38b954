import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, Scale, Ban, RefreshCw, Gavel } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <SEO
        title="Termos de Uso | TikDown TikTok Downloader"
        description="Leia os termos de uso do TikDown, o baixador de vídeos do TikTok gratuito. Regras, direitos autorais e responsabilidades ao baixar conteúdo."
        canonical="https://baixarvideostiktok.com/termos"
      />
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto pt-8 lg:pt-0">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl gradient-tiktok flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Termos de <span className="text-gradient-tiktok">Uso</span> do Baixador de Videos TikTok
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: Scale,
                  title: "Aceitação dos Termos",
                  content: "Ao acessar e utilizar o site baixarvideostiktok.com, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, recomendamos que não utilize nossos serviços. O uso continuado do site constitui aceitação total destes termos."
                },
                {
                  icon: FileText,
                  title: "Descrição do Serviço",
                  content: "O baixarvideostiktok.com é um baixador de videos TikTok online e gratuito que permite baixar videos do TikTok sem marca d'água. Nosso serviço processa links do TikTok para salvar video do TikTok em formato MP4 e áudios em MP3. Funciona como app para baixar videos do TikTok no celular Android, iPhone e PC. Não hospedamos conteúdo em nossos servidores."
                },
                {
                  icon: AlertTriangle,
                  title: "Responsabilidade do Usuário",
                  content: "O usuário é o único responsável pelo uso dos vídeos baixados através do nosso serviço. Recomendamos que respeite os direitos autorais e de propriedade intelectual dos criadores de conteúdo. Não nos responsabilizamos pelo uso indevido do conteúdo baixado."
                },
                {
                  icon: Ban,
                  title: "Uso Proibido",
                  content: "É proibido utilizar nosso serviço para: redistribuir conteúdo protegido por direitos autorais sem autorização, atividades ilegais, tentar comprometer a segurança ou desempenho do site, ou qualquer uso que viole leis aplicáveis."
                },
                {
                  icon: RefreshCw,
                  title: "Alterações nos Termos",
                  content: "Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação no site. Recomendamos que revise periodicamente esta página para estar ciente de quaisquer mudanças."
                },
                {
                  icon: Gavel,
                  title: "Isenção de Responsabilidade",
                  content: "O serviço é fornecido 'como está', sem garantias de qualquer tipo. Não garantimos disponibilidade ininterrupta ou livre de erros. Não somos afiliados ao TikTok, ByteDance ou qualquer outra plataforma de mídia social."
                },
              ].map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-border bg-card"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-tiktok-cyan" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TermsPage;

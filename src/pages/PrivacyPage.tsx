import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Server, UserCheck, Mail } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto pt-8 lg:pt-0">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl gradient-tiktok flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Política de <span className="text-gradient-tiktok">Privacidade</span>
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: Eye,
                  title: "Informações que Coletamos",
                  content: "O site baixarvideostiktok.com não coleta dados pessoais identificáveis. Não exigimos cadastro, login ou qualquer tipo de registro para utilizar nossos serviços. As únicas informações processadas são os links de vídeo do TikTok que você insere voluntariamente para realizar o download."
                },
                {
                  icon: Lock,
                  title: "Uso de Cookies",
                  content: "Utilizamos cookies essenciais para garantir o funcionamento adequado do site e cookies analíticos (como Google Analytics) para compreender como os visitantes interagem com nosso site. Esses cookies não coletam informações pessoais identificáveis. Você pode desabilitar cookies nas configurações do seu navegador."
                },
                {
                  icon: Server,
                  title: "Armazenamento de Dados",
                  content: "Não armazenamos nenhum vídeo em nossos servidores. Os links de download são processados em tempo real e não ficam registrados em nosso sistema. Não mantemos histórico de downloads, links inseridos ou qualquer outra informação de uso."
                },
                {
                  icon: UserCheck,
                  title: "Compartilhamento de Dados",
                  content: "Não vendemos, alugamos ou compartilhamos qualquer informação com terceiros. Os dados de navegação coletados via cookies analíticos são utilizados exclusivamente para melhorar a experiência do usuário no site."
                },
                {
                  icon: Shield,
                  title: "Segurança",
                  content: "Implementamos medidas de segurança para proteger nosso site contra acessos não autorizados. Utilizamos conexão HTTPS para garantir que a comunicação entre você e nosso servidor seja criptografada e segura."
                },
                {
                  icon: Mail,
                  title: "Contato",
                  content: "Se você tiver dúvidas sobre nossa política de privacidade, entre em contato conosco através da página de Contato ou envie um e-mail para contato@baixarvideostiktok.com."
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

export default PrivacyPage;

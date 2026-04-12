import { motion } from "framer-motion";
import {
  Download, Smartphone, Monitor, Shield, Zap, Globe,
  CheckCircle, Sparkles, Music2
} from "lucide-react";
import videoDownloaderImg from "@/assets/video-downloader.webp";
import tiktokDownloaderImg from "@/assets/tiktok-downloader.png";
import howPicImg from "@/assets/how-pic.avif";

export function AdSenseContent() {
  return (
    <div className="space-y-24 max-w-5xl mx-auto">
      {/* Section 1: What is BaixarVideosTikTok */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Baixar Videos TikTok com o <span className="text-gradient-tiktok">Melhor Baixador Online</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              O <strong className="text-foreground">baixarvideostiktok.com</strong> é o melhor baixador de videos TikTok online e gratuito. Aqui você pode baixar videos do TikTok pelo link, salvar video do TikTok em MP4 com resolução HD e tirar marca d'água do TikTok facilmente. Siga as instruções abaixo para aprender como baixar TikTok video sem marca d'água.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Com nosso baixador de vídeo do TikTok, você pode salvar videos TikTok, remover marca d'água TikTok e converter para MP4 ou MP3 com a melhor qualidade. É a ferramenta ideal para quem quer salvar vídeos do TikTok de forma rápida e segura.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Funciona como um aplicativo para baixar video do TikTok — mas sem precisar instalar nada. Basta colar o link e baixar do TikTok direto no navegador do celular ou PC.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img src={videoDownloaderImg} alt="Baixar videos TikTok sem marca d'água - Baixador de videos TikTok online" className="w-full max-w-sm rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Section 2: How to download - Step by step */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="text-tiktok-pink font-semibold text-sm mb-2 italic">
            Salvar video do TikTok em três etapas simples e rápidas
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Como baixar video do TikTok <span className="text-gradient-tiktok">sem marca d'água?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img src={howPicImg} alt="Como baixar video do TikTok sem marca d'água no celular e PC" className="w-full max-w-md rounded-3xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                step: "1",
                title: "Encontre o vídeo no TikTok",
                desc: "Abra o aplicativo TikTok no celular Android ou iPhone. Role a tela para encontrar o vídeo que deseja baixar. Reproduza para confirmar se é o correto."
              },
              {
                step: "2",
                title: "Copie o link do vídeo",
                desc: "Toque em Compartilhar e selecione Copiar link. Aceita links normais, vm.tiktok.com e vt.tiktok.com — o salve link for TikTok funciona com todos os formatos."
              },
              {
                step: "3",
                title: "Baixe o TikTok video sem marca d'água",
                desc: "Cole o link no campo acima, clique em Baixar Agora e escolha a qualidade. O sistema vai remover marca d'água TikTok e entregar o vídeo em MP4 HD pronto para salvar."
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl gradient-tiktok flex items-center justify-center flex-shrink-0 text-primary-foreground font-extrabold text-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3: Feature Grid - 6 icons */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Por que usar o <span className="text-gradient-tiktok">TikDown para baixar videos TikTok?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Download, title: "Baixar videos do TikTok", desc: "Baixe videos do TikTok em MP4 para editar e republicar. Baixador de videos TikTok grátis e ilimitado." },
            { icon: Sparkles, title: "Tirar marca d'água do TikTok", desc: "Remover marca d'água TikTok automaticamente. Tirar a marca d'água do TikTok online com um clique." },
            { icon: Shield, title: "Sem cadastro necessário", desc: "Para baixar do TikTok não precisa criar conta. Cole o link e salvar video do TikTok instantaneamente." },
            { icon: Zap, title: "Download rápido", desc: "Salvar videos TikTok pelo link em alta velocidade. Nossos servidores são otimizados para baixar TikTok video rapidamente." },
            { icon: Music2, title: "Download MP3 e MP4", desc: "Baixar TikTok vídeo em MP4 ou extrair o áudio em MP3. Salva video TikTok com todas as opções de formato." },
            { icon: Globe, title: "Todos os dispositivos", desc: "TikTok download Android, iPhone e PC. Funciona como app de baixar video do TikTok em qualquer navegador." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border bg-card text-center hover:border-tiktok-cyan/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-tiktok-cyan" />
              </div>
              <h3 className="font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: Mobile / Desktop */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-tiktok-pink/10 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-tiktok-pink" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Baixar video do TikTok no celular Android e iPhone</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Quer baixar videos do TikTok no celular? O TikDown funciona perfeitamente como app para baixar videos do TikTok no Android e iPhone. Não precisa instalar nenhum aplicativo de baixar vídeo do TikTok — basta acessar pelo navegador.
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-tiktok-cyan flex-shrink-0 mt-0.5" /> Abra o TikTok e copie o link do vídeo</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-tiktok-cyan flex-shrink-0 mt-0.5" /> Cole no campo e clique em "Baixar Agora"</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-tiktok-cyan flex-shrink-0 mt-0.5" /> Salvar video do TikTok sem marca d'água no celular</li>
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-tiktok-cyan/10 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-tiktok-cyan" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Baixar TikTok no PC grátis</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Quer baixar TikTok no PC? Esta ferramenta é o método mais simples para baixar videos do TikTok sem marca d'água usando qualquer computador ou notebook. Funciona no Windows, Mac e Linux direto no navegador.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Não é necessário login, cadastro ou instalar software. Copie o link, cole no campo e baixa video do TikTok sem marca d'água instantaneamente. Também oferecemos download em MP3 para salvar TikTok músicas e trilhas sonoras dos vídeos virais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <img src={tiktokDownloaderImg} alt="Baixador de videos TikTok - App para baixar videos do TikTok online" className="w-full max-w-sm" />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-foreground mb-3">
          Comece a Baixar Videos TikTok <span className="text-gradient-tiktok">Agora Mesmo!</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Milhares de pessoas já usam o baixarvideostiktok.com diariamente para baixar videos do TikTok, salvar videos TikTok em MP4 e tirar marca d'água do TikTok online. Junte-se a eles — baixar TikTok vídeo é grátis, rápido e ilimitado. Não precisa de cadastro, não precisa instalar nenhum aplicativo para baixar video do TikTok. Cole o link e baixe!
        </p>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  Download, Smartphone, Monitor, Shield, Zap, Globe,
  CheckCircle, Sparkles, ArrowRight, Play, Music2, Film
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
            Baixar vídeo do TikTok com o <span className="text-gradient-tiktok">TikTok Downloader</span>
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
              O <strong className="text-foreground">baixarvideostiktok.com</strong> é uma ferramenta online para baixar vídeos do TikTok pelo link. O TikTok downloader pode ajudá-lo a salvar vídeos do TikTok em MP4 com resolução HD. Para saber como download TikTok vídeo online grátis, siga as instruções abaixo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Com nosso TikTok Download online, você pode salvar facilmente qualquer vídeo, música ou tirar marca d'água do TikTok no formato MP4 com a melhor qualidade e de download TikTok vídeo rápido.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Você não precisa instalar nenhum software no seu celular ou PC. Tudo que você precisa é um link para a página que contém o vídeo TikTok e todo o processamento é feito do nosso lado.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img src={videoDownloaderImg} alt="Baixar vídeos do TikTok sem marca d'água" className="w-full max-w-sm rounded-2xl" />
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
            É tão simples que você pode salvar seus vídeos em três etapas fáceis
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Como baixar vídeo do TikTok <span className="text-gradient-tiktok">sem marca d'água?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img src={howPicImg} alt="Como baixar vídeo do TikTok" className="w-full max-w-md rounded-3xl" />
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
                title: "Encontrar um TT",
                desc: "Abra o aplicativo TikTok no seu dispositivo móvel. Role a tela para encontrar o vídeo que deseja salvar. Reproduza o vídeo para confirmar se é o correto."
              },
              {
                step: "2",
                title: "Copiar o link",
                desc: "Toque no botão Compartilhar, localizado no lado direito da tela. Selecione Copiar link no menu. Verifique sua área de transferência para garantir que o URL foi copiado corretamente."
              },
              {
                step: "3",
                title: "Salvar TikTok",
                desc: "Acesse o baixarvideostiktok.com e cole o link copiado no campo de texto na parte superior. Clique em \"Baixar Agora\" para iniciar o download do vídeo."
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
            Por que escolher o <span className="text-gradient-tiktok">BaixarVideosTikTok?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Download, title: "Baixar vídeo do TikTok", desc: "Baixe vídeos do TikTok para editar e publicar seus vídeos. É grátis e sem limites." },
            { icon: Sparkles, title: "Sem marca d'água", desc: "Baixe o TikTok sem marca d'água, obter vídeos sem o logotipo TT em alta definição." },
            { icon: Shield, title: "Sem registro necessário", desc: "Seu registro não é necessário. Basta abrir nosso site e colar o link." },
            { icon: Zap, title: "Alta velocidade", desc: "Salvar vídeos do TikTok pelo link em alta velocidade com servidores otimizados." },
            { icon: Music2, title: "Download MP3 e MP4", desc: "TikTok download MP4 e arquivos MP3. Converta o áudio das músicas virais." },
            { icon: Globe, title: "Todos os dispositivos", desc: "TikTok vídeo download funciona em todos os navegadores e todos OS (Windows, MacOS, Linux, Android, iOS)." },
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
              <h2 className="text-xl font-bold text-foreground">Como baixar vídeo de TikTok no celular em MP4?</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Se está querendo fazer download em seu celular (Android, iPhone), a maneira mais fácil é utilizar nosso site responsivo. É rápido e gratuito!
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-tiktok-cyan flex-shrink-0 mt-0.5" /> Abra o vídeo no TikTok e copie o link</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-tiktok-cyan flex-shrink-0 mt-0.5" /> Cole no campo acima e clique em "Baixar Agora"</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-tiktok-cyan flex-shrink-0 mt-0.5" /> Escolha a qualidade e baixe sem marca d'água</li>
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
              <h2 className="text-xl font-bold text-foreground">Baixar vídeo TikTok no PC grátis</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Esta ferramenta é um método simples e conveniente para que o usuário possa baixar vídeos do TikTok sem marca d'água usando qualquer PC ou notebook no navegador.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Não é necessário fazer login, criar contas ou instalar software adicional. Copie o link, cole no campo e faça o download. Além disso, você pode baixar vários vídeos ao mesmo tempo. Também suportamos download em MP3 para que você possa salvar músicas e trilhas sonoras dos vídeos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Final CTA with image */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <img src={tiktokDownloaderImg} alt="TikTok Video Downloader" className="w-full max-w-sm" />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-foreground mb-3">
          Comece a Baixar <span className="text-gradient-tiktok">Agora Mesmo!</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Milhares de pessoas já usam o baixarvideostiktok.com todos os dias para salvar seus vídeos favoritos do TikTok. Junte-se a eles e comece a baixar vídeos sem marca d'água, em alta qualidade e totalmente grátis. Não precisa de cadastro, não precisa instalar nada. Cole o link e baixe!
        </p>
      </section>
    </div>
  );
}

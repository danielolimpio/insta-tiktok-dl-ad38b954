import { ClipboardPaste, Download, Save } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: ClipboardPaste, title: "Cole o link", desc: "Copie o link do vídeo no TikTok e cole no campo acima." },
  { icon: Download, title: "Clique em baixar", desc: "Clique no botão para processar e preparar o download." },
  { icon: Save, title: "Faça o download", desc: "Escolha a qualidade e salve o vídeo no seu dispositivo." },
];

export function HowItWorks() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Como Baixar Vídeos do TikTok
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-tiktok-cyan/10 flex items-center justify-center mb-4 relative">
              <step.icon className="w-6 h-6 text-tiktok-cyan" />
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-tiktok-cyan text-accent-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="font-bold text-foreground text-sm">{step.title}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

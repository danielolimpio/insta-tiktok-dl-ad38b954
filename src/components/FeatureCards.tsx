import { CheckCircle, Infinity, Star, Gift } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: CheckCircle, title: "Sem Marca d'Água", desc: "Vídeos limpos, sem logos" },
  { icon: Infinity, title: "Download Ilimitado", desc: "Sem limites de uso" },
  { icon: Star, title: "Alta Qualidade", desc: "Até 1080p em MP4" },
  { icon: Gift, title: "100% Grátis", desc: "Nenhum custo, nunca" },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mx-auto">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="flex flex-col items-center text-center p-5 rounded-2xl bg-muted/50 border border-border hover:border-tiktok-cyan/30 transition-colors duration-300"
        >
          <f.icon className="w-8 h-8 text-tiktok-cyan mb-3" />
          <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

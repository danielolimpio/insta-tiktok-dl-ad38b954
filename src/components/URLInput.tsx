import { useState } from "react";
import { Link, Clipboard, X, Download, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { DownloadDisclaimer } from "./DownloadDisclaimer";

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function URLInput({ onSubmit, isLoading }: URLInputProps) {
  const [url, setUrl] = useState("");

  const isValidTikTokUrl = (u: string) =>
    /^https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\/.+/i.test(u.trim());

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast.success("Link colado da área de transferência!");
    } catch {
      toast.error("Não foi possível acessar a área de transferência.");
    }
  };

  const handleSubmit = () => {
    if (!url.trim()) {
      toast.error("Cole um link do TikTok para continuar.");
      return;
    }
    if (!isValidTikTokUrl(url)) {
      toast.error("Link inválido. Verifique e tente novamente.");
      return;
    }
    onSubmit(url.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="relative flex items-center">
        <div className="absolute left-4 text-muted-foreground">
          <Link className="w-5 h-5" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Cole o link do vídeo do TikTok aqui..."
          className="w-full h-14 pl-12 pr-44 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-tiktok-cyan transition-colors duration-300 text-sm"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          <button
            onClick={handlePaste}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors duration-300"
          >
            <Clipboard className="w-3.5 h-3.5" />
            Colar
          </button>
          <button
            onClick={() => setUrl("")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors duration-300"
          >
            <X className="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-4 w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-60"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        {isLoading ? "Processando..." : "Baixar Agora"}
      </motion.button>

      <DownloadDisclaimer />
    </motion.div>
  );
}

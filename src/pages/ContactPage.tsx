import { useState } from "react";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Clock, Globe } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Preencha todos os campos.");
      return;
    }
    toast.success("Mensagem enviada com sucesso! Responderemos em breve.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto pt-8 lg:pt-0">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl gradient-tiktok flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Entre em <span className="text-gradient-tiktok">Contato</span>
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Dúvidas sobre como baixar videos TikTok ou usar nosso baixador? Ficaremos felizes em ajudar!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl border border-border bg-card space-y-4"
              >
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-tiktok-cyan" />
                  Envie sua Mensagem
                </h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-tiktok-cyan transition-colors"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-tiktok-cyan transition-colors"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sua mensagem..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-tiktok-cyan transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </button>
              </motion.form>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {[
                  { icon: Mail, title: "E-mail", desc: "contato@baixarvideostiktok.com", sub: "Respondemos em até 24 horas." },
                  { icon: Globe, title: "Website", desc: "baixarvideostiktok.com", sub: "Acesse de qualquer dispositivo." },
                  { icon: Clock, title: "Horário", desc: "Suporte 24/7", sub: "Estamos sempre disponíveis para ajudar." },
                  { icon: MapPin, title: "Localização", desc: "Brasil", sub: "Serviço disponível mundialmente." },
                ].map((info, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-border bg-card flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-tiktok-cyan" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{info.title}</h3>
                      <p className="text-sm text-foreground mt-0.5">{info.desc}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;

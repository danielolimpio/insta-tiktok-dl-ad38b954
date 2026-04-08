import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Download, Video, Music, Settings, HelpCircle, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Início", icon: Home, path: "/" },
  { label: "Download", icon: Download, path: "/download" },
  { label: "Vídeo", icon: Video, path: "/video" },
  { label: "Áudio/MP3", icon: Music, path: "/audio" },
  { label: "Configurações", icon: Settings, path: "/configuracoes" },
  { label: "Ajuda e Suporte", icon: HelpCircle, path: "/ajuda" },
];

export function AppSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebar = (
    <div className="flex flex-col h-full bg-tiktok-black text-sidebar-foreground">
      <div className="p-6 flex items-center gap-3">
        <img src={logo} alt="TikDown" className="w-10 h-10 rounded-xl object-cover" />
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">TikDown</h1>
          <p className="text-xs text-muted-foreground">Baixar Vídeos</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => { navigate(item.path); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-tiktok-cyan/15 text-tiktok-cyan"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">v1.0.0 • TikDown</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] h-screen fixed left-0 top-0 z-40">
        {sidebar}
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-tiktok-black flex items-center justify-center text-sidebar-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-tiktok-black z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-[280px] h-screen z-50 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-sidebar-foreground/70"
              >
                <X className="w-5 h-5" />
              </button>
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

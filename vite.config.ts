import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { prerender } from "./scripts/prerender.mjs";

// Post-build plugin: writes one static <slug>/index.html per public route,
// each with a unique <title>, meta description, canonical, robots directive,
// hreflang set, and a <noscript> block containing H1 + intro + nav links.
// This lets crawlers index every route without executing JavaScript, while
// the SPA still hydrates identically on top of <div id="root">.
function staticPrerenderPlugin(): Plugin {
  return {
    name: "static-route-prerender",
    apply: "build",
    async closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      try {
        await prerender(distDir);
      } catch (err) {
        console.warn("[static-route-prerender] skipped:", err);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && staticPrerenderPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

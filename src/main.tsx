import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setupAutoInstallPrompt } from "./lib/pwa-install";

setupAutoInstallPrompt();

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(<App />);
}

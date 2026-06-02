import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setupAutoInstallPrompt } from "./lib/pwa-install";

setupAutoInstallPrompt();

createRoot(document.getElementById("root")!).render(<App />);

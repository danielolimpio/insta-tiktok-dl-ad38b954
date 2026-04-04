import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DownloadPage from "./pages/DownloadPage.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import AudioPage from "./pages/AudioPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import HelpPage from "./pages/HelpPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="/ajuda" element={<HelpPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

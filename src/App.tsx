import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

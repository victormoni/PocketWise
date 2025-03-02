import { Routes, Route } from "react-router-dom";
import { Pages } from "./pages/index";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/register" element={<Pages.Register />} />
    </Routes>
  );
}
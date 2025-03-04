import { Routes, Route } from "react-router-dom";
import { Pages } from "./pages/index";
import { PrivateRoute } from "./routes/PrivateRoute";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/register" element={<Pages.Register />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Pages.Dashboard />} />
        </Route>
    </Routes>
  );
}
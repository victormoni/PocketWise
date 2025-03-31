import { Routes, Route } from "react-router-dom";
import { Pages } from "./pages/index";
import { PrivateRoute } from "./routes/PrivateRoute";
import SidebarLayout from "./components/layouts/Sidebar";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/register" element={<Pages.Register />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/about" element={<Pages.About />} />
      <Route path="/forgot-password" element={<Pages.ForgotPassword />} />
      <Route path="/reset-password" element={<Pages.ResetPassword />} />
      <Route element={<PrivateRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Pages.Dashboards.DashboardHome />} />
          <Route path="/dashboard/by-category" element={<Pages.Dashboards.DashboardCategory />} />
          <Route path="/dashboard/year-resume" element={<Pages.Dashboards.DashboardYearResume />} />
        </Route>
      </Route>
    </Routes>
  );
}


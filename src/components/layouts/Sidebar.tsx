// /components/Layout.jsx
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider } from "../ui/sidebar";

export default function SidebarLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </>
  );
}

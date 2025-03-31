import * as React from "react";
import {
  Goal,
  Hammer,
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import logoBlack from "./../assets/logo-black-full.svg";
import logoWhite from "./../assets/logo-white-full.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "./ui/theme-provider";
import { ModeToggle } from "./ui/mode-toggle";
import userPhoto from './../assets/dollar-bag.png'

// This is sample data.
const data = {
  user: {
    name: "budgetify",
    email: "budget@fy.com",
    avatar: userPhoto,
  },
  navMain: [
    {
      title: "Dashboards",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Por Categoria",
          url: "/dashboard/by-category",
        },
        {
          title: "Resumo Anual",
          url: "/dashboard/year-resume",
        }
      ],
    },
    {
      title: "Sonhos",
      url: "#",
      icon: Goal,
      items: [
        {
          title: "Progresso",
          url: "/goals/progress",
        },
      ],
    },
    {
      title: "Gerenciar",
      url: "#",
      icon: Hammer,
      items: [
        {
          title: "Propriedades",
          url: "/properties/manager",
        },
      ],
    }
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("vite-ui-theme");
  
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      
        setTheme(systemTheme)
    }
  
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
    } else {
      setTheme("light");
    }
  }, [setTheme, theme]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <Link to="/dashboard">
          <img
            src={theme === "dark" ? logoWhite : logoBlack}
            alt="logo"
            className="transition-opacity duration-300 h-30 object-cover justify-cente w-full"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="pl-2 items-end flex flex-col">
          <ModeToggle />
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

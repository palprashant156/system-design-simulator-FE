"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Cpu,
  BarChart3,
  LogOut,
  Zap,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { useAuthStore } from "../../stores/useAuthStore";

interface SidebarProps {
  projectId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ projectId }) => {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Templates",
      icon: Layers,
      href: "/templates",
      active: pathname === "/templates",
    },
  ];

  if (projectId) {
    navItems.push(
      {
        label: "Architecture Canvas",
        icon: Cpu,
        href: `/projects/${projectId}`,
        active: pathname === `/projects/${projectId}`,
      },
      {
        label: "Simulation Workbench",
        icon: Zap,
        href: `/projects/${projectId}/simulate`,
        active: pathname === `/projects/${projectId}/simulate`,
      },
      {
        label: "Analytics Dashboard",
        icon: BarChart3,
        href: `/projects/${projectId}/analytics`,
        active: pathname === `/projects/${projectId}/analytics`,
      },
    );
  }

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-md flex flex-col h-screen select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
          <Zap className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 text-sm tracking-wide">
            System Design
          </h1>
          <p className="text-[11px] font-medium text-cyan-400">Simulator Pro</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {user?.name || "Engineer"}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

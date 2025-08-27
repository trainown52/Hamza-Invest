"use client";
import Link from "next/link";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import { useUI } from "../store/ui";
import {
  BarChart2,
  Building2,
  Users2,
  Wallet2,
  FileText,
  Bell,
  Shield,
  Home,
} from "lucide-react";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/corporations", label: "Corporations", icon: Building2 },
  { href: "/admin/users", label: "Users (KYC)", icon: Users2 },
  { href: "/admin/dividends", label: "Dividends", icon: BarChart2 },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: Wallet2 },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { closeSidebar } = useUI();

  return (
    <aside className="h-full w-72 shrink-0 border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2 px-5 h-16 border-b">
        <div className="h-8 w-8 rounded-xl bg-gray-900" />
        <div className="font-semibold text-black text-2xl">Hamza Admin</div>
      </div>
      <nav className="p-3 space-y-1 ">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={closeSidebar}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700",
                active ? "bg-gray-900 text-white" : "hover:bg-gray-100"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
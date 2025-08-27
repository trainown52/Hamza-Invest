"use client";
import { Button } from "../components/ui/button";
import { useUI } from "../store/ui";
import { Menu } from "lucide-react";

export default function Topbar() {
  const { toggleSidebar } = useUI();

  return (
    <header className="h-16 border-b bg-white flex items-center px-4 gap-3 sticky top-0 z-40">
      <Button
        variant="ghost"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="font-extralight text-2xl text-gray-500">Admin Panel</div>
      <div className="ml-auto flex items-center gap-3 text-sm text-gray-700">
        <span>Chartered Accountant</span>
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </div>
    </header>
  );
}
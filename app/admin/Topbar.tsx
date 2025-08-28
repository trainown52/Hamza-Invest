"use client";
import { Button } from "../components/ui/button";
import { useUI } from "../store/ui";
import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { toggleSidebar } = useUI();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <header className="h-16 border-b bg-white flex items-center px-4 gap-3  top-0 z-40">
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
        <Button
          variant="outline"
          className="flex items-center cursor-pointer gap-2 px-3 py-2 text-sm"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>
    </header>
  );
}
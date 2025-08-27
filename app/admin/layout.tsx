"use client";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useUI } from "../store/ui";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, closeSidebar } = useUI();

  return (
    <div className="min-h-screen flex">
      {/* Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-72">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/30"
            onClick={closeSidebar}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-5 md:p-8 bg-gray-50 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
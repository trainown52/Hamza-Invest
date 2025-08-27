"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

// Mock user role check (replace with actual auth logic)
const isAdmin = false; // Placeholder: Replace with actual auth check (e.g., from context or auth provider)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clientNavItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Buy", href: "/buy" },
    { name: "Dividends", href: "/dividends" },
    // { name: "Company Info", href: "/company-infos" },
    { name: "Reports", href: "/reports" },
    { name: "KYC", href: "/kyc" },
    { name: "Withdraw", href: "/withdrawals" }, // <-- Add Withdraw button
    // { name: "Settings", href: "/setting" },
  ];

  const adminNavItems = [
    { name: "Admin Dashboard", href: "/admin/dashboard" },
    { name: "Corporation Management", href: "/admin/corporations" },
    { name: "Upload Center", href: "/admin/uploads" },
    { name: "Withdrawal Requests", href: "/admin/withdrawals" },
    { name: "User Management", href: "/admin/users" },
    // { name: "Settings", href: "/settings" },
  ];

  const navItems = isAdmin ? [...clientNavItems, ...adminNavItems] : clientNavItems;

  return (
    <nav
      className={`backdrop-blur-md bg-white/90 text-black border-b border-gray-200 w-full fixed z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-black group-hover:opacity-80 transition-opacity">
              Hamza Invest
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  pathname === item.href
                    ? "bg-black/5 text-black font-semibold"
                    : "text-gray-600 hover:text-black hover:bg-black/5"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="block mx-auto mt-1 w-1 h-1 bg-black rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-black hover:bg-black hover:text-white transition-all duration-200 hover:shadow-md"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-black/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={26} className="text-black" />
              ) : (
                <Menu size={26} className="text-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === item.href
                  ? "bg-black/10 text-black font-semibold"
                  : "text-gray-600 hover:bg-black/5 hover:text-black"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex space-x-3 pt-4">
            <Link
              href="/login"
              className="flex-1 text-center px-4 py-2 text-sm rounded-lg border border-gray-300 text-black hover:bg-black hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
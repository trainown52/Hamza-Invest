"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Mock user role check (replace with actual auth logic)
const isAdmin = false; // Placeholder: Replace with actual auth check (e.g., from context or auth provider)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    
    // Listen for login/logout changes
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    
    // Listen for custom events and storage changes
    window.addEventListener("storage", checkLogin);
    window.addEventListener("login", checkLogin);
    window.addEventListener("logout", checkLogin);
    
    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("login", checkLogin);
      window.removeEventListener("logout", checkLogin);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // This ensures we don't render auth-dependent UI until after hydration
  useEffect(() => {
    if (isMounted) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, [isMounted, pathname]); // Also check on route changes

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("logout"));
    setIsOpen(false);
    router.replace("/login");
  }

  const clientNavItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Buy", href: "/buy" },
    { name: "Dividends", href: "/dividends" },
    // { name: "Company Info", href: "/company-infos" },
    { name: "Reports", href: "/reports" },
    { name: "Withdraw", href: "/withdrawals" },
    // { name: "Settings", href: "/setting" },
  ];

  function handleNavClick(href: string) {
    if (!isLoggedIn && href !== "/login" && href !== "/signup") {
      // Prevent navigation and show toast
      if (typeof window !== "undefined") {
        import("react-hot-toast").then(({ default: toast }) => {
          toast.error("Please login to access this page.");
        });
      }
      router.replace("/login");
      return;
    }
    router.push(href);
  }

  const adminNavItems = [
    { name: "Admin Dashboard", href: "/admin/dashboard" },
    { name: "Corporation Management", href: "/admin/corporations" },
    { name: "Upload Center", href: "/admin/uploads" },
    { name: "Withdrawal Requests", href: "/admin/withdrawals" },
    { name: "User Management", href: "/admin/users" },
    // { name: "Settings", href: "/settings" },
  ];

  const navItems = isAdmin ? [...clientNavItems, ...adminNavItems] : clientNavItems;

  // Hide Navbar on admin pages
  if (pathname.startsWith('/admin')) {
    // Do not render anything, not even a nav element
    return <></>;
  }

  // Don't render auth-dependent UI until after component mounts
  if (!isMounted) {
    return (
      <nav className="backdrop-blur-md bg-white/90 text-black border-b border-gray-200 w-full fixed z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="hidden md:flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="hidden md:flex space-x-3">
              <div className="w-16 h-9 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-9 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="md:hidden">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`backdrop-blur-md bg-white/90 text-black border-b border-gray-200 w-full fixed z-50 transition-all duration-300 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            className="flex items-center space-x-2 group bg-transparent border-none outline-none cursor-pointer"
            onClick={() => {
              if (!isLoggedIn) {
                import("react-hot-toast").then(({ default: toast }) => {
                  toast.error("Please login to access this page.");
                });
                router.replace("/login");
                return;
              }
              router.push("/");
            }}
          >
            <span className="text-2xl font-bold text-black group-hover:opacity-80 transition-opacity">
              Hamza Invest
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all bg-transparent border-none outline-none cursor-pointer ${
                  pathname === item.href
                    ? "bg-black/5 text-black font-semibold"
                    : "text-gray-600 hover:text-black hover:bg-black/5"
                }`}
                style={{ background: "none" }}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="block mx-auto mt-1 w-1 h-1 bg-black rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg bg-black text-white cursor-pointer transition-all duration-200 hover:shadow-md"
              >
                Logout
              </button>
            ) : (
              <>
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
              </>
            )}
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
            <button
              key={item.name}
              onClick={() => { setIsOpen(false); handleNavClick(item.href); }}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors bg-transparent border-none outline-none cursor-pointer ${
                pathname === item.href
                  ? "bg-black/10 text-black font-semibold"
                  : "text-gray-600 hover:bg-black/5 hover:text-black"
              }`}
              style={{ background: "none" }}
            >
              {item.name}
            </button>
          ))}
          <div className="flex space-x-3 pt-4">
            {isLoggedIn ? (
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="flex-1 text-center px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
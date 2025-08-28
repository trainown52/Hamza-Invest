"use client";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        if (data.role === "admin") {
          localStorage.setItem("token", data.token);
          toast.success("Admin login successful!");
          router.push("/admin/dashboard");
          return;
        }
        // Check KYC status for non-admin users
        const kycRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kyc?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.token}`,
            "Content-Type": "application/json"
          }
        });
        const kycData = await kycRes.json();
        if (kycRes.ok && kycData.status === "approved") {
          localStorage.setItem("token", data.token);
          toast.success("Login successful!");
          router.push("/");
        } else {
          toast.error(kycData.status === "pending" ? "Your KYC is under review." : (kycData.status === "rejected" ? "Your KYC was rejected." : "KYC not found. Please complete KYC."));
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen mt-14 flex items-center justify-center bg-white px-6 py-12">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Hamza Invest
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Secure Investor Portal
          </h2>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center mb-1">
            <Lock className="w-5 h-5 mr-2 text-black" />
            <h3 className="text-2xl font-bold text-black">Account Login</h3>
          </div>
          <p className="text-gray-600 mb-6">Access your investment dashboard</p>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="investor@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-black hover:text-gray-700"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200"
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          {/* Sign Up Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to Hamza Invest?
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/signup"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
              >
                Create investor account
              </Link>
            </div>
          </div>
        </div>

        {/* Security Disclaimer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          <Lock className="inline-block w-3 h-3 mr-1 text-black" />
          All data is encrypted and securely stored.
          <br className="sm:hidden" /> 2FA required for all accounts.
        </p>
      </div>
    </div>
     </>
  );
}

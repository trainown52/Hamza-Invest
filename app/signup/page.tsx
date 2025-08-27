"use client";

import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // use email as username
          email,
          password,
          role: "user"
        })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Signup successful!");
        // Optionally redirect to dashboard or login
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Hamza Invest
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Investor Sign In
          </h2>
        </div>

        {/* Sign In Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center mb-1">
            <Lock className="w-5 h-5 mr-2 text-black" />
            <h3 className="text-2xl font-bold text-black">Secure Sign In</h3>
          </div>
          <p className="text-gray-600 mb-6">Access your investment portfolio</p>

          <form className="space-y-5" onSubmit={handleSignup}>
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

            {/* 2FA Toggle */}
            <div className="flex items-center">
              <input
                id="enable-2fa"
                name="enable-2fa"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label
                htmlFor="enable-2fa"
                className="ml-2 block text-sm text-gray-700"
              >
                Require 2FA for this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          {/* Alternative Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Other options
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                href="/signup"
                className="flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
              >
                Create account
              </Link>
              <Link
                href="/forgot-password"
                className="flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
              >
                Recover account
              </Link>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-6 flex justify-center space-x-6">
          <div className="flex items-center text-xs text-gray-500">
            <Lock className="w-3 h-3 mr-1 text-black" />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Shield className="w-3 h-3 mr-1 text-black" />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

"use client";

import Link from "next/link";
import { Lock, Mail, ArrowRight, Shield, X } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showKyc, setShowKyc] = useState(false);
  const [signupData, setSignupData] = useState<{ email: string; password: string } | null>(null);
  // KYC modal states
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupData({ email, password });
    setShowKyc(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIdFile(e.target.files?.[0] || null);
  }

  async function handleKycSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (!signupData) return;
    try {
      // Signup API
      const signupRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signupData.email,
          email: signupData.email,
          password: signupData.password,
          role: "user"
        })
      });
      const signup = await signupRes.json();
      if (!signupRes.ok || !signup.token) {
        toast.error(signup.message || "Signup failed");
        setShowKyc(false);
        setLoading(false);
        return;
      }
      localStorage.setItem("token", signup.token);
  // KYC API (multipart/form-data)
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("dob", dob);
  formData.append("address", address);
  formData.append("country", country);
  formData.append("idType", idType);
  formData.append("idNumber", idNumber);
  // Attach signup email to KYC (try both 'email' and 'userEmail' for backend compatibility)
  formData.append("email", signupData.email);
  formData.append("userEmail", signupData.email);
  if (idFile) formData.append("idFile", idFile);
      const kycRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kyc`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${signup.token}`,
        },
        body: formData
      });
      const kyc = await kycRes.json();
      if (kycRes.ok) {
        toast.success("Signup & KYC submitted!");
        setShowKyc(false);
        // Optionally redirect
      } else {
        toast.error(kyc.message || "KYC failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
      setShowKyc(false);
    }
    setLoading(false);
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
              Investor Sign Up
            </h2>
          </div>

          {/* Sign In Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg backdrop-blur-sm">
            <div className="flex items-center mb-1">
              <Lock className="w-5 h-5 mr-2 text-black" />
              <h3 className="text-2xl font-bold text-black">Secure Sign Up</h3>
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
                Sign Up
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
                  href="/login"
                  className="flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                >
                  Already Have account?
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

      {/* KYC Modal */}
      {showKyc && (
        <div className="fixed inset-0 z-50 flex overflow-auto  md:pt-80  items-center justify-center bg-transparent backdrop-blur-xs no-scrollbar">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl mx-4 relative animate-in fade-in-90 zoom-in-95">
            <button
              className="absolute top-4 cursor-pointer right-4 text-gray-500 hover:text-black transition-colors"
              onClick={() => setShowKyc(false)}
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              KYC Verification
            </h2>
            
            <form className="space-y-4" onSubmit={handleKycSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={fullName} 
                  onChange={e => setFullName(e.target.value)} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="Enter your full name" 
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  required 
                  value={dob} 
                  onChange={e => setDob(e.target.value)} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Address</label>
                <input 
                  type="text" 
                  required 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="Your address" 
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Country</label>
                <input 
                  type="text" 
                  required 
                  value={country} 
                  onChange={e => setCountry(e.target.value)} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="Country of residence" 
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">ID Type</label>
                <select 
                  required 
                  value={idType} 
                  onChange={e => setIdType(e.target.value)} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select ID type</option>
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID</option>
                  <option value="driver_license">Driver's License</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">ID Number</label>
                <input 
                  type="text" 
                  required 
                  value={idNumber} 
                  onChange={e => setIdNumber(e.target.value)} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="Enter your ID number" 
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Upload ID Document</label>
                <input 
                  type="file" 
                  accept="image/*,application/pdf" 
                  required 
                  onChange={handleFileChange} 
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black/10 file:text-gray-900 hover:file:bg-black/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit KYC"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart2, ShieldCheck, FileText, DivideCircle, UserCheck, PieChart, MessageSquare, Smartphone, Lock } from "lucide-react";
import { Building2, TrendingUp, Users } from "lucide-react";
// Adjust path as needed
import Features from "./components/Feature";
import HowItWorks from "./components/HowItsWork";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import "./scrollbar-hide.css";
import Link from 'next/link';
import { X } from 'lucide-react';
import axios from 'axios';

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });
export default function Hero() {
  // Placeholder for dynamic data (e.g., fetch from API for stats/corporations)
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (globeRef.current) {
      // Position the globe at start
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);

      // Enable auto-rotation
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8; // adjust speed (default ~2)
    }
  }, []);
  const statsData = [
    { value: "12+", label: "Active Corporations", icon: <PieChart className="h-5 w-5 text-black" /> },
    { value: "$5M+", label: "Total Investments", icon: <BarChart2 className="h-5 w-5 text-black" /> },
    { value: "2.1k", label: "Verified Investors", icon: <UserCheck className="h-5 w-5 text-black" /> },
    { value: "$850k", label: "Dividends Paid", icon: <DivideCircle className="h-5 w-5 text-black" /> },
  ];

  // Show only 3 companies for preview
  const [companies, setCompanies] = useState<any[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const res = await axios.get<any[]>(`${API_BASE}/api/companies`);
        setCompanies(Array.isArray(res.data) ? res.data : []);
      } catch {
        setCompanies([]);
      }
      setLoadingCompanies(false);
    };
    fetchCompanies();
  }, []);

  const openModal = (company: any) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };


  // Live organizations data (companies)
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);

  useEffect(() => {
    const fetchOrgs = async () => {
      setLoadingOrgs(true);
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
        const res = await axios.get<any[]>(`${API_BASE}/api/companies`);
        setOrganizations(Array.isArray(res.data) ? res.data : []);
      } catch {
        setOrganizations([]);
      }
      setLoadingOrgs(false);
    };
    fetchOrgs();
  }, []);

  return (
    <section
      className="relative mt-14 bg-white text-black pt-24 pb-32 overflow-hidden"
      aria-label="Investment Platform Hero Section"
    >
      {/* Background with Parallax Gradient */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-gray-200 to-black opacity-10 rounded-full"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 lg:gap-12 relative z-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Investor Portal Now Live
            </span>
            <ArrowUpRight className="ml-2 h-4 w-4 text-black" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
          >
            Invest Across{' '}
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Hamza Waheed
            </span>{' '}
            Corporations
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto md:mx-0"
          >
            A centralized, ultra-secure platform to invest in multiple corporations, track performance, receive dividends, and access transparent reports. Managed by a robust admin backend. Available on{' '}
            <span className="font-medium">iOS & Android</span>.
          </motion.p>

          {/* Security Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm"
          >
            <Lock className="h-4 w-4 text-black mr-2 animate-pulse" />
            <span className="text-sm font-medium text-black">Secured with 2FA, KYC & IP Monitoring</span>
          </motion.div>

          {/* Key Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0"
          >
            {[
              { icon: BarChart2, text: "Real-time Portfolio" },
              { icon: DivideCircle, text: "Dividend Tracking" },
              { icon: FileText, text: "Financial Reports" },
              { icon: MessageSquare, text: "Communication Center" },
              { icon: ShieldCheck, text: "KYC & 2FA Security" },
              { icon: UserCheck, text: "Admin Oversight" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                role="listitem"
              >
                <feature.icon className="h-4 w-4 text-black" />
                <span className="text-sm font-medium text-gray-800">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Link
              href="/signup"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="Sign up to start investing"
            >
              Get Started
              <ArrowUpRight className="ml-2 h-4 w-4 inline" />
            </Link>
            <Link
              href="/explore"
              className="px-6 py-3 rounded-xl border-2 border-black text-black hover:bg-black hover:text-white font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="View available corporations"
            >
              Explore Corporations
            </Link>
            {/* Optional: Referral Program Teaser */}
            <Link
              href="/refarrel"
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition-all"
              aria-label="Learn about referral bonuses"
            >
              Earn Referral Bonuses
            </Link>
          </motion.div>

          {/* Mobile App CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center justify-center md:justify-start"
          >
            <Smartphone className="h-5 w-5 text-black mr-2" />
            <span className="text-sm font-medium text-gray-800">
              Download our app on{' '}
              <Link href="/mobile" className="underline hover:text-gray-600">
                iOS & Android
              </Link>
            </span>
          </motion.div>
        </div>

        {/* Right Side: Stats with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-md rounded-xl p-5 shadow-md border border-gray-200/50 hover:shadow-lg transition-all"
              aria-label={`${stat.label}: ${stat.value}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                {stat.icon}
              </div>
              <p className="text-gray-700 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Corporation Preview Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-6">Featured Corporations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingCompanies ? (
            <div className="text-black">Loading corporations…</div>
          ) : companies.length === 0 ? (
            <div className="text-black">No corporations found.</div>
          ) : (
            companies.slice(0, 3).map((corp, index) => (
              <motion.div
                key={corp._id || index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {corp.logo && (
                  <div className="flex justify-center mb-3">
                    <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}${corp.logo}`} alt={corp.name + " logo"} className="w-24 h-24 object-contain rounded" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-black text-center">{corp.name}</h3>
                <p className="text-sm text-gray-700 mt-2 text-center">{corp.description || corp.industry || "No description"}</p>
                <p className="text-sm font-medium text-gray-600 mt-2 text-center">
                  {corp.shares?.total ? `${corp.shares.total.toLocaleString()} shares available` : "Shares info unavailable"}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full font-medium cursor-pointer"
                  onClick={() => openModal(corp)}
                >
                  View More
                </button>
              </motion.div>
            ))
          )}
        </div>
      {/* Modal for Corporation Details */}
  {isModalOpen && selectedCompany && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Enhanced Backdrop */}
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-300"
      onClick={closeModal}
    ></div>

    {/* Modal Container */}
    <div className="relative z-50 w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto scrollbar-hide transform transition-all duration-300 scale-100 opacity-100">
      
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute cursor-pointer top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      {/* Logo Image */}
      {selectedCompany.logo && (
        <div className="flex justify-center mb-6">
          <div className="w-44 h-32 relative mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}${selectedCompany.logo}`}
              alt={selectedCompany.name + " logo"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Company Name and Industry */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">
        {selectedCompany.name}
      </h2>
      <div className="text-center text-gray-500 text-base mb-6">
        {selectedCompany.industry}
      </div>

      {/* Description */}
      <div className="prose prose-lg max-w-none mx-auto text-gray-700 mb-8 text-center px-4">
        <p>{selectedCompany.description}</p>
      </div>

      {/* Shares & Financials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Shares Card */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Shares
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between"><span className="font-medium">Total:</span> {selectedCompany.shares?.total ?? 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Available:</span> {selectedCompany.shares?.available ?? 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Price Per Share:</span> PKR {selectedCompany.shares?.pricePerShare ?? 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Min Investment:</span> {selectedCompany.shares?.minInvestmentShares ?? 'N/A'}</li>
          </ul>
        </div>
        
        {/* Financials Card */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Financials
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between"><span className="font-medium">Annual Revenue:</span> PKR {selectedCompany.financials?.annualRevenue ?? 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Annual Profit/Loss:</span> {selectedCompany.financials?.annualProfitLoss ?? 'N/A'}%</li>
            <li className="flex justify-between"><span className="font-medium">Growth Rate:</span> {selectedCompany.financials?.growthRate ?? 'N/A'}%</li>
            <li className="flex justify-between"><span className="font-medium">Valuation:</span> PKR {selectedCompany.financials?.valuation ?? 'N/A'}</li>
          </ul>
        </div>
      </div>

      {/* Legal & Other Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Legal Card */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Legal
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between"><span className="font-medium">Registration #:</span> {selectedCompany.legal?.registrationNumber ?? 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Incorporation Date:</span> {selectedCompany.legal?.incorporationDate ? new Date(selectedCompany.legal.incorporationDate).toLocaleDateString() : 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Country:</span> {selectedCompany.legal?.country ?? 'N/A'}</li>
          </ul>
        </div>
        
        {/* Other Info Card */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Other Info
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between"><span className="font-medium">Location:</span> {selectedCompany.location ?? 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Website:</span> {selectedCompany.website ?? 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Created:</span> {selectedCompany.createdAt ? new Date(selectedCompany.createdAt).toLocaleDateString() : 'N/A'}</li>
            <li className="flex justify-between"><span className="font-medium">Updated:</span> {selectedCompany.updatedAt ? new Date(selectedCompany.updatedAt).toLocaleDateString() : 'N/A'}</li>
          </ul>
        </div>
      </div>

      {/* Extra Info Section */}
      <div className="bg-gray-50 rounded-xl p-5 mb-8 text-center text-gray-700 border border-gray-100 shadow-sm">
        <span className="font-semibold text-black">Why invest in {selectedCompany.name}?</span> <br />
        {selectedCompany.name} is a trusted corporation in the {selectedCompany.industry}. With a strong growth rate and solid financials, it's a great opportunity for investors looking for long-term returns and stability.
        {/* Buy Now Button */}
      <div className="flex justify-center mt-6">
        <Link href="/buy">
          <button className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 cursor-pointer text-lg shadow-md hover:shadow-lg">
            Buy Now
          </button>
        </Link>
      </div>
      </div>

      
    </div>
  </div>
)}
      </motion.div>


      <section className="relative mt-10 py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
        {/* Background Globe */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <div className="w-[700px] h-[700px]">
            <Globe
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(0,0,0,0)"
              width={600}
              height={600}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             Explore Global Organizations
          </motion.h2>

          <motion.p
            className="text-lg max-w-2xl text-center mx-auto mb-10 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Discover organizations worldwide and invest in opportunities that make a difference.
          </motion.p>

          {/* Cards Section */}
          <div className="grid gap-10 md:grid-cols-3 mt-10">
            {loadingOrgs ? (
              <div className="text-black">Loading organizations…</div>
            ) : organizations.length === 0 ? (
              <div className="text-black">No organizations found.</div>
            ) : (
              organizations.map((org, index) => (
                <motion.div
                  key={org._id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 relative z-20"
                >
                  {org.logo && (
                    <div className="flex justify-center mb-5">
                      <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}${org.logo}`} alt={org.name + " logo"} className="w-24 h-18 object-contain rounded" />
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{org.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{org.description || org.industry || "No description"}</p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-green-600">{org.financials?.annualProfitLoss ? `${org.financials.annualProfitLoss}%` : "N/A"}</p>
                      <p className="text-xs text-gray-500">Annual Profit</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{org.investors || org.shares?.available ? `${org.shares.available?.toLocaleString() || "N/A"}` : "N/A"}</p>
                      <p className="text-xs text-gray-500">Investors</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{org.financials?.growthRate ? `${org.financials.growthRate}%` : "N/A"}</p>
                      <p className="text-xs text-gray-500">Growth</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>



      {/* Integrated Sub-Components */}
      {/* TODO: Customize Features to include blockchain/AI teasers if enabled */}
      <Features />
      {/* TODO: Customize HowItWorks to detail client/admin workflows */}
      <HowItWorks />
    </section>
  );
}
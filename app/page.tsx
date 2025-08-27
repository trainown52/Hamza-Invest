"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart2, ShieldCheck, FileText, DivideCircle, UserCheck, PieChart, MessageSquare, Smartphone, Lock } from "lucide-react";
import { Building2, TrendingUp, Users } from "lucide-react";
// Adjust path as needed
import Features from "./components/Feature";
import HowItWorks from "./components/HowItsWork";
import { useEffect, useRef } from 'react';

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

  const corporationsData = [
    { name: "TechCorp", desc: "Innovative tech solutions", shares: "100K available" },
    { name: "GreenEnergy", desc: "Sustainable energy projects", shares: "50K available" },
    { name: "HealthWave", desc: "Healthcare advancements", shares: "75K available" },
  ];


  const organizations = [
    {
      name: "Green Energy Corp",
      description:
        "A leader in renewable energy solutions. Invest in solar, wind & hydro projects for a sustainable future.",
      profit: "12.4%",
      investors: "24k+",
      growth: "18% YoY",
      icon: <TrendingUp className="w-10 h-10 text-green-500" />,
    },
    {
      name: "Health Plus",
      description:
        "Expanding healthcare facilities and digital health platforms across multiple regions.",
      profit: "9.8%",
      investors: "15k+",
      growth: "12% YoY",
      icon: <Users className="w-10 h-10 text-blue-500" />,
    },
    {
      name: "Tech Innovators",
      description:
        "Revolutionizing AI & Blockchain for businesses worldwide. Be part of the digital future.",
      profit: "15.7%",
      investors: "30k+",
      growth: "22% YoY",
      icon: <Building2 className="w-10 h-10 text-purple-500" />,
    },
  ];

  return (
    <section
      className="relative bg-white text-black pt-24 pb-32 overflow-hidden"
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
          {corporationsData.map((corp, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-black">{corp.name}</h3>
              <p className="text-sm text-gray-700 mt-2">{corp.desc}</p>
              <p className="text-sm font-medium text-gray-600 mt-2">{corp.shares}</p>
              <Link
                href={`/corporations/${corp.name.toLowerCase()}`}
                className="mt-4 inline-block text-sm font-medium text-black hover:text-gray-600 underline"
                aria-label={`View details for ${corp.name}`}
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
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
            {organizations.map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 relative z-20"
              >
                <div className="flex justify-center mb-5">{org.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{org.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{org.description}</p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-green-600">{org.profit}</p>
                    <p className="text-xs text-gray-500">Annual Profit</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">{org.investors}</p>
                    <p className="text-xs text-gray-500">Investors</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-purple-600">{org.growth}</p>
                    <p className="text-xs text-gray-500">Growth</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
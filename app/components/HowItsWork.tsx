"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BadgeCheck,
  Search,
  ArrowUpDown,
  CircleDollarSign,
  FileText,
  Bell,
  Lock,
  UserCheck,
  Building2,
  ClipboardList,
  Smartphone,
} from "lucide-react";

export default function HowItWorks() {
  const clientSteps = [
    {
      title: "Sign Up & Verify",
      desc: "Create an account, complete KYC, and secure with 2FA and transaction PIN.",
      step: "1",
      icon: <BadgeCheck className="w-5 h-5 animate-pulse" />,
      link: "/signup",
    },
    {
      title: "Explore Corporations",
      desc: "Browse multiple corporations, review performance, and access reports.",
      step: "2",
      icon: <Search className="w-5 h-5 animate-pulse" />,
      link: "/corporations",
    },
    {
      title: "Invest & Track",
      desc: "Buy shares with live pricing, track portfolio and dividends.",
      step: "3",
      icon: <ArrowUpDown className="w-5 h-5 animate-pulse" />,
      link: "/portfolio",
    },
    {
      title: "Receive Dividends",
      desc: "Get dividend updates, withdraw funds, or reinvest earnings.",
      step: "4",
      icon: <CircleDollarSign className="w-5 h-5 animate-pulse" />,
      link: "/dividends",
    },
    {
      title: "Access Reports",
      desc: "Download financial reports, audits, and policy documents.",
      step: "5",
      icon: <FileText className="w-5 h-5 animate-pulse" />,
      link: "/reports",
    },
    {
      title: "Stay Informed",
      desc: "Receive admin updates, ask questions via the Communication Center.",
      step: "6",
      icon: <Bell className="w-5 h-5 animate-pulse" />,
      link: "/communications",
    },
  ];

  const adminSteps = [
    {
      title: "Secure Login",
      desc: "Access the admin dashboard with 2FA authentication.",
      step: "1",
      icon: <Lock className="w-5 h-5 animate-pulse" />,
      link: "/admin/login",
    },
    {
      title: "Manage KYC",
      desc: "Review and approve user KYC documents for verification.",
      step: "2",
      icon: <UserCheck className="w-5 h-5 animate-pulse" />,
      link: "/admin/kyc",
    },
    {
      title: "Manage Corporations",
      desc: "Add/remove corporations, set share prices, and upload reports.",
      step: "3",
      icon: <Building2 className="w-5 h-5 animate-pulse" />,
      link: "/admin/corporations",
    },
    {
      title: "Handle Dividends",
      desc: "Declare dividends and schedule payouts for investors.",
      step: "4",
      icon: <CircleDollarSign className="w-5 h-5 animate-pulse" />,
      link: "/admin/dividends",
    },
    {
      title: "Process Withdrawals",
      desc: "Approve or reject investor withdrawal requests securely.",
      step: "5",
      icon: <BadgeCheck className="w-5 h-5 animate-pulse" />,
      link: "/admin/withdrawals",
    },
    {
      title: "Monitor & Communicate",
      desc: "Track activity, send updates, and manage platform security.",
      step: "6",
      icon: <Bell className="w-5 h-5 animate-pulse" />,
      link: "/admin/communications",
    },
  ];

  const optionalFeatures = [
    {
      title: "Blockchain Ledger",
      desc: "Transparent transaction tracking (Coming Soon).",
      icon: <Lock className="w-5 h-5 animate-pulse" />,
    },
    {
      title: "AI Investment Assistant",
      desc: "Personalized stock recommendations (Coming Soon).",
      icon: <CircleDollarSign className="w-5 h-5 animate-pulse" />,
    },
  ];

  return (
    <section className="relative bg-white text-black py-28 overflow-hidden">
      {/* Background with Parallax Gradient */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-gray-200 to-black opacity-10 rounded-full"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            How{' '}
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-black to-yellow-500/70 mt-2 mx-auto w-24"
          ></motion.div>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Simple steps for investors and administrators to leverage the Hamza Invest platform. Available on iOS & Android.
          </p>
        </motion.div>

        {/* Progress Bar (Large Screens) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="hidden lg:flex justify-center mb-8"
        >
          <div className="relative w-full max-w-4xl h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute h-full bg-gradient-to-r from-black to-yellow-500/70"
            ></motion.div>
          </div>
        </motion.div>

        {/* Client Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
            <h3 className="text-2xl font-extrabold px-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Client Workflow
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientSteps.map((step, idx) => (
              <Link
                key={idx}
                href={step.link}
                className="block"
                aria-label={`Navigate to ${step.title}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white/70 backdrop-blur-md rounded-xl p-10 border border-gray-200/50 hover:border-gray-400/50 transition-all hover:shadow-lg relative overflow-hidden cursor-pointer"
                  role="listitem"
                >
                  {/* Step gradient accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-800 to-yellow-500/70 opacity-10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    {/* Step indicator */}
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-black to-gray-700 flex items-center justify-center text-white font-extrabold text-xl mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="flex items-center justify-center">
                        {step.icon}
                        <span className="ml-2">{step.step}</span>
                      </span>
                    </motion.div>
                    {/* Content */}
                    <h3 className="text-2xl font-extrabold mb-3 text-black">{step.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{step.desc}</p>
                    {/* Connector line (except last item) */}
                    {idx !== clientSteps.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-10 h-px bg-gradient-to-r from-gray-300 to-yellow-500/70 group-hover:bg-yellow-500 transition"
                      ></motion.div>
                    )}
                    {/* Mobile progression dots */}
                    {idx !== clientSteps.length - 1 && (
                      <div className="lg:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full group-hover:bg-yellow-500/70 transition"></div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

    
        

        {/* Optional Features Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-center justify-center mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
            <h3 className="text-2xl font-extrabold px-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Coming Soon
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {optionalFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/70 backdrop-blur-md rounded-xl p-10 border border-gray-200/50 hover:border-gray-400/50 transition-all hover:shadow-lg"
                aria-label={feature.title}
                role="listitem"
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center mb-4 group-hover:bg-gray-100/80 transition"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-extrabold text-black">{feature.title}</h4>
                <p className="mt-2 text-gray-700 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-700 mb-6 text-lg">
            Ready to start your investment journey? Download our app on{' '}
            <Link href="/mobile" className="underline hover:text-gray-600">
              iOS & Android
            </Link>.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-black to-gray-600 text-white font-medium hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            aria-label="Get started with Hamza Invest"
          >
            Get Started Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
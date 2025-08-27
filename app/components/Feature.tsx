"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  ArrowUpDown,
  Wallet,
  FileSearch,
  Shield,
  MessageSquare,
  Building2,
  UserCheck,
  ClipboardList,
  BadgeCheck,
  Bell,
  Lock,
} from "lucide-react";

export default function Features() {
  const userFeatures = [
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Multi-Corporation Dashboard",
      desc: "Track performance across all investments with real-time portfolio analytics.",
    },
    {
      icon: <ArrowUpDown className="w-6 h-6" />,
      title: "Buy & Sell Shares",
      desc: "Trade shares in any listed corporation with live pricing and transaction history.",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Dividend Management",
      desc: "Track dividend payments with history and upcoming payout schedules.",
    },
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Reports & Audits",
      desc: "Access transparent financial reports, audits, and downloadable documents.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Profile & Security",
      desc: "Manage KYC, enable 2FA, set transaction PIN, and view activity logs.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Communication Center",
      desc: "Receive admin announcements, ask questions, and view legal notices.",
    },
  ];

  const adminFeatures = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Corporation Management",
      desc: "Add/remove corporations, set share prices, and manage dividend schedules.",
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "User & KYC Management",
      desc: "Verify investors, manage accounts, and monitor activity logs.",
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "Document Center",
      desc: "Upload and organize financial reports, policies, and legal documents.",
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "Withdrawal Approvals",
      desc: "Review and process investor withdrawal requests securely.",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notifications & Communication",
      desc: "Send updates, alerts, and company news to investors.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Security Monitoring",
      desc: "Monitor login activity, IP tracking, and manage 2FA settings.",
    },
  ];

 
  return (
    <section className="bg-white text-black py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Platform{' '}
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-black to-yellow-500/50 mt-2 mx-auto w-24"
          ></motion.div>
          <p className="mt-4 text-gray-700 text-lg">
            Comprehensive tools for{' '}
            <span className="font-medium bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Investors
            </span>{' '}
            and{' '}
            <span className="font-medium bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Administrators
            </span>
          </p>
        </motion.div>

        {/* User Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
            <h3 className="text-2xl font-bold px-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Investor Features
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/70 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 hover:border-gray-400/50 transition-all hover:shadow-lg"
                aria-label={feature.title}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center mb-4 group-hover:bg-gray-100/80 transition"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-semibold text-black">{feature.title}</h4>
                <p className="mt-2 text-gray-700 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Admin Features */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
            <h3 className="text-2xl font-bold px-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Admin Features
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/70 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 hover:border-gray-400/50 transition-all hover:shadow-lg"
                aria-label={feature.title}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center mb-4 group-hover:bg-gray-100/80 transition"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-semibold text-black">{feature.title}</h4>
                <p className="mt-2 text-gray-700 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Optional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          {/* <div className="flex items-center justify-center mb-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
            <h3 className="text-2xl font-bold px-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Coming Soon
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-px bg-gray-300 flex-1"
            ></motion.div>
          </div> */}
         
        </motion.div>
      </div>
    </section>
  );
}
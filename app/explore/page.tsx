
"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BarChart2, FileText, DivideCircle, PieChart, X } from "lucide-react";

export default function Explore() {
  // Dummy data aligned with project requirements
  const corporationsData = [
    {
      id: "hw-tech-innovations",
      name: "HW Tech Innovations",
      desc: "Cutting-edge technology solutions including AI-driven tools and blockchain-based ledgers for transparent investments.",
      availableShares: 200000,
      price: 50.0,
      gain: "+15%",
      dividends: "Quarterly payouts at 5% yield",
      reports: "Financials, audits, performance charts",
      reportUrl: "/reports/hw-tech-innovations.pdf",
      roadmap: "Q4 2025: Launch AI investment assistant",
    },
    {
      id: "hw-green-energy",
      name: "HW Green Energy",
      desc: "Sustainable renewable energy projects with real-time performance tracking and dividend reinvestment options.",
      availableShares: 150000,
      price: 30.0,
      gain: "+8%",
      dividends: "Annual dividends based on project earnings",
      reports: "Audit reports, environmental impact statements",
      reportUrl: "/reports/hw-green-energy.pdf",
      roadmap: "Q1 2026: Expand solar projects",
    },
    {
      id: "hw-health-solutions",
      name: "HW Health Solutions",
      desc: "Advanced healthcare advancements with secure KYC-integrated investor portals and multi-payment methods.",
      availableShares: 100000,
      price: 40.0,
      gain: "+12%",
      dividends: "Bi-annual distributions with auto-withdrawal",
      reports: "Company financials, policy documents",
      reportUrl: "/reports/hw-health-solutions.pdf",
      roadmap: "Q3 2025: New telemedicine platform",
    },
    {
      id: "hw-finance-group",
      name: "HW Finance Group",
      desc: "Innovative financial services offering portfolio summaries, transaction history, and AI investment suggestions.",
      availableShares: 80000,
      price: 60.0,
      gain: "+20%",
      dividends: "Monthly dividends with referral bonuses",
      reports: "Revenue insights, audit logs",
      reportUrl: "/reports/hw-finance-group.pdf",
      roadmap: "Q2 2026: Crypto payment integration",
    },
    {
      id: "hw-real-estate-ventures",
      name: "HW Real Estate Ventures",
      desc: "Premium real estate development with admin-managed updates, notifications, and secure 2FA-protected profiles.",
      availableShares: 120000,
      price: 45.0,
      gain: "+10%",
      dividends: "Semi-annual payouts tracked via dashboard",
      reports: "Project roadmaps, legal notices",
      reportUrl: "/reports/hw-real-estate-ventures.pdf",
      roadmap: "Q4 2025: New urban development project",
    },
  ];

  // Mock user state (simulating authentication and KYC status)
  const [user, setUser] = useState({ isAuthenticated: true, isKycVerified: true });
  const [portfolio, setPortfolio] = useState<{ [key: string]: number }>({});
  const [selectedCorp, setSelectedCorp] = useState<typeof corporationsData[0] | null>(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [shareAmount, setShareAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

  // Handle Buy Shares
  const handleBuyShares = (corp: typeof corporationsData[0]) => {
    if (!user.isAuthenticated) {
      setTransactionStatus("Please log in to buy shares.");
      return;
    }
    if (!user.isKycVerified) {
      setTransactionStatus("Please complete KYC verification to buy shares.");
      return;
    }
    setSelectedCorp(corp);
    setShowBuyModal(true);
  };

  // Confirm Share Purchase
  const confirmPurchase = () => {
    if (!selectedCorp) return;
    const shares = parseInt(shareAmount);
    if (isNaN(shares) || shares <= 0) {
      setTransactionStatus("Please enter a valid number of shares.");
      return;
    }
    if (shares > selectedCorp.availableShares) {
      setTransactionStatus(`Cannot purchase more than ${selectedCorp.availableShares} available shares.`);
      return;
    }
    const totalCost = shares * selectedCorp.price;
    setPortfolio((prev) => ({
      ...prev,
      [selectedCorp.id]: (prev[selectedCorp.id] || 0) + shares,
    }));
    setTransactionStatus(
      `Successfully purchased ${shares} shares of ${selectedCorp.name} for $${totalCost.toFixed(2)}.`
    );
    setShareAmount("");
    setTimeout(() => setShowBuyModal(false), 2000);
  };

  // Handle View Details
  const handleViewDetails = (corp: typeof corporationsData[0]) => {
    setSelectedCorp(corp);
    setShowDetailsModal(true);
  };

  return (
    <section
      className="relative bg-white text-black pt-24 pb-32 overflow-hidden"
      aria-label="Explore Corporations Section"
    >
      {/* Background with Parallax Gradient */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-gray-200 to-black opacity-10 rounded-full"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Explore{' '}
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Hamza Waheed
            </span>{' '}
            Corporations
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Discover investment opportunities across our diverse portfolio. View real-time share prices, track performance, and access transparent financial reports.
          </p>
        </motion.div>

        {/* Corporations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {corporationsData.map((corp, index) => (
            <motion.div
              key={corp.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              role="article"
              aria-label={`Investment details for ${corp.name}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">{corp.name}</h3>
                <PieChart className="h-5 w-5 text-black" />
              </div>
              <p className="text-sm text-gray-700 mt-2">{corp.desc}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  <BarChart2 className="inline h-4 w-4 mr-1" />
                  Shares: {corp.availableShares.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-gray-600">Price: ${corp.price.toFixed(2)}</p>
                <p className="text-sm font-medium text-gray-600">Gain/Loss: {corp.gain}</p>
                <p className="text-sm font-medium text-gray-600">
                  <DivideCircle className="inline h-4 w-4 mr-1" />
                  Dividends: {corp.dividends}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  <FileText className="inline h-4 w-4 mr-1" />
                  Reports: {corp.reports}
                </p>
                <p className="text-sm font-medium text-gray-600">Roadmap: {corp.roadmap}</p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleBuyShares(corp)}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  aria-label={`Buy shares in ${corp.name}`}
                >
                  Buy Shares
                  <ArrowUpRight className="ml-2 h-4 w-4 inline" />
                </button>
                <button
                  onClick={() => handleViewDetails(corp)}
                  className="px-6 py-2 rounded-xl border-2 border-black text-black hover:bg-black hover:text-white font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  aria-label={`View details for ${corp.name}`}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-medium text-gray-800 inline-flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            All investments are backed by transparent financial reports and secure KYC/2FA protocols.
            <span className="ml-2 text-gray-600">
              (Blockchain ledger available for select corporations)
            </span>
          </p>
        </motion.div>

        {/* Buy Shares Modal */}
        <AnimatePresence>
          {showBuyModal && selectedCorp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              role="dialog"
              aria-label={`Buy shares in ${selectedCorp.name}`}
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-black">Buy Shares in {selectedCorp.name}</h2>
                  <button
                    onClick={() => setShowBuyModal(false)}
                    className="text-gray-600 hover:text-black"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  Price per share: ${selectedCorp.price.toFixed(2)} | Available: {selectedCorp.availableShares.toLocaleString()}
                </p>
                <div className="mt-4">
                  <label htmlFor="shareAmount" className="text-sm font-medium text-gray-800">
                    Number of Shares
                  </label>
                  <input
                    id="shareAmount"
                    type="number"
                    value={shareAmount}
                    onChange={(e) => setShareAmount(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter number of shares"
                    aria-label="Number of shares to buy"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-800">Payment Method</label>
                  <select
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Select payment method"
                  >
                    <option>Bank Transfer</option>
                    <option>Credit Card</option>
                    <option>Cryptocurrency</option>
                  </select>
                </div>
                {transactionStatus && (
                  <p className="mt-4 text-sm text-gray-700">{transactionStatus}</p>
                )}
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => setShowBuyModal(false)}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    aria-label="Cancel purchase"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPurchase}
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white font-medium"
                    aria-label="Confirm share purchase"
                  >
                    Confirm Purchase
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedCorp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              role="dialog"
              aria-label={`Details for ${selectedCorp.name}`}
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-black">{selectedCorp.name}</h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-600 hover:text-black"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-700 mt-2">{selectedCorp.desc}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Shares Available: {selectedCorp.availableShares.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-gray-600">Price: ${selectedCorp.price.toFixed(2)}</p>
                  <p className="text-sm font-medium text-gray-600">Gain/Loss: {selectedCorp.gain}</p>
                  <p className="text-sm font-medium text-gray-600">Dividends: {selectedCorp.dividends}</p>
                  <p className="text-sm font-medium text-gray-600">Roadmap: {selectedCorp.roadmap}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={selectedCorp.reportUrl}
                    className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white font-medium"
                    aria-label={`Download report for ${selectedCorp.name}`}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download Report
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

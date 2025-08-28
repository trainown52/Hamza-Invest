"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Users, Gift, Copy, Check, X } from "lucide-react";

export default function Referrals() {
  // Dummy data for referral program, aligned with project requirements
  const referralData = {
    referralCode: "HW-REF-2025-ABC123", // Unique user referral code
    referralLink: "https://hamzawaheed.com/signup?ref=HW-REF-2025-ABC123", // Shareable link
    bonusStructure: [
      { milestone: 1, bonus: "5 bonus shares in any corporation" },
      { milestone: 3, bonus: "15 bonus shares + 1% extra dividend yield for one quarter" },
      { milestone: 5, bonus: "50 bonus shares + priority access to new corporation listings" },
      { milestone: 10, bonus: "100 bonus shares + exclusive investor webinar invitation" },
    ],
    referredUsers: [
      { name: "John Doe", status: "Verified & Invested", date: "2025-07-15", bonusEarned: "5 shares" },
      { name: "Jane Smith", status: "Signed Up", date: "2025-08-01", bonusEarned: "Pending" },
      { name: "Alex Johnson", status: "Verified & Invested", date: "2025-08-10", bonusEarned: "5 shares" },
    ],
    totalReferrals: 3,
    totalBonusesEarned: "15 shares + 1% dividend boost",
    terms: "Refer friends via your unique link. Bonuses awarded after referred user completes KYC and invests at least $100. Bonuses are credited to your portfolio automatically. Limited to verified users only.",
  };

  // State for functionality
  const [copied, setCopied] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<typeof referralData.bonusStructure[0] | null>(null);

  // Functionality: Copy referral link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Functionality: View bonus details in modal
  const handleViewBonus = (milestone: typeof referralData.bonusStructure[0]) => {
    setSelectedMilestone(milestone);
    setShowBonusModal(true);
  };

  // Functionality: Claim bonus (mock simulation)
  const handleClaimBonus = () => {
    // Mock API call to credit bonus to portfolio
    alert(`Bonus for ${selectedMilestone?.milestone} referrals claimed! Added to your portfolio.`);
    setShowBonusModal(false);
  };

  return (
    <section
      className="relative bg-white mt-14 text-black pt-24 pb-32 overflow-hidden"
      aria-label="Referral Program Section"
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
            Earn Referral Bonuses with{' '}
            <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Hamza Waheed
            </span>{' '}
            Investments
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Invite friends and earn share bonuses, extra dividends, and exclusive perks. Track your referrals and claim rewards seamlessly.
          </p>
        </motion.div>

        {/* Referral Code and Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50"
        >
          <h2 className="text-xl font-semibold text-black mb-4">Your Referral Details</h2>
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-600">
              Referral Code: <span className="font-bold text-black">{referralData.referralCode}</span>
            </p>
            <p className="text-sm font-medium text-gray-600">
              Shareable Link: <span className="font-bold text-black break-all">{referralData.referralLink}</span>
            </p>
            <button
              onClick={handleCopyLink}
              className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="Copy referral link"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Bonus Structure Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold text-black mb-6">Bonus Structure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {referralData.bonusStructure.map((bonus, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">{bonus.milestone} Referrals</h3>
                  <Gift className="h-5 w-5 text-black" />
                </div>
                <p className="text-sm text-gray-700 mt-2">{bonus.bonus}</p>
                <button
                  onClick={() => handleViewBonus(bonus)}
                  className="mt-4 inline-block text-sm font-medium text-black hover:text-gray-600 underline"
                  aria-label={`View details for ${bonus.milestone} referrals bonus`}
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Referred Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold text-black mb-6">Your Referrals ({referralData.totalReferrals})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200/50">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-800">Bonus Earned</th>
                </tr>
              </thead>
              <tbody>
                {referralData.referredUsers.map((user, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.bonusEarned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            Total Bonuses Earned: <span className="font-bold text-black">{referralData.totalBonusesEarned}</span>
          </p>
        </motion.div>

        {/* Terms and Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-medium text-gray-800">{referralData.terms}</p>
          <p className="mt-2 text-sm text-gray-600">
            Secured with KYC verification and 2FA. Bonuses are non-transferable and subject to admin approval.
          </p>
        </motion.div>
      </div>

      {/* Bonus Details Modal */}
      <AnimatePresence>
        {showBonusModal && selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            role="dialog"
            aria-label={`Details for ${selectedMilestone.milestone} referrals bonus`}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black">{selectedMilestone.milestone} Referrals Bonus</h2>
                <button
                  onClick={() => setShowBonusModal(false)}
                  className="text-gray-600 hover:text-black"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-700 mt-2">{selectedMilestone.bonus}</p>
              <p className="text-sm text-gray-600 mt-4">
                Achieve this milestone by referring {selectedMilestone.milestone} friends who complete KYC and invest. Bonuses credited automatically.
              </p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowBonusModal(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                  aria-label="Close"
                >
                  Close
                </button>
                <button
                  onClick={handleClaimBonus}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-black to-gray-700 hover:from-gray-800 hover:to-black text-white font-medium"
                  aria-label="Claim bonus"
                >
                  Claim Bonus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
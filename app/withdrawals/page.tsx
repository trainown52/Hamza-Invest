"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// Withdrawal type for user history
type Withdrawal = {
  _id: string;
  amount: number;
  method: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
};

export default function UserWithdrawPage() {
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !method) {
      toast.error("Please enter amount and select method.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in.");
        setLoading(false);
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/withdrawals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, method }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to submit withdrawal request");
      }
      toast.success("Withdrawal request submitted!");
      setAmount(0);
      setMethod("");
    } catch (err: any) {
      toast.error(err.message || "Error submitting withdrawal request");
    } finally {
      setLoading(false);
    }
  };
  
  // Dummy summary data
  const totalBalance = 120000;
  const pendingApprovals = 2;
  const totalWithdrawals = 5;
  
  // Dummy history
  const dummyWithdrawals: Withdrawal[] = [
    {
      _id: "1",
      amount: 25000,
      method: "bank",
      status: "approved",
      requestedAt: "2025-08-20T10:30:00Z",
    },
    {
      _id: "2",
      amount: 15000,
      method: "easypaisa",
      status: "pending",
      requestedAt: "2025-08-25T14:10:00Z",
    },
    {
      _id: "3",
      amount: 10000,
      method: "jazzcash",
      status: "rejected",
      requestedAt: "2025-08-18T09:00:00Z",
    },
    {
      _id: "4",
      amount: 20000,
      method: "bank",
      status: "approved",
      requestedAt: "2025-08-10T12:00:00Z",
    },
    {
      _id: "5",
      amount: 30000,
      method: "easypaisa",
      status: "approved",
      requestedAt: "2025-08-05T16:45:00Z",
    },
  ];

  return (
    <main className="min-h-screen p-8 mt-14 flex flex-col items-center bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Summary Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 text-gray-800 rounded-xl shadow-md p-6 flex flex-col items-start">
          <div className="text-lg font-semibold mb-2 text-gray-600">Total Balance</div>
          <div className="text-3xl font-bold text-gray-900">PKR {totalBalance.toLocaleString()}</div>
        </div>
        
        <div className="bg-white border border-gray-200 text-gray-800 rounded-xl shadow-md p-6 flex flex-col items-start">
          <div className="text-lg font-semibold mb-2 text-gray-600">Pending Approvals</div>
          <div className="text-3xl font-bold text-gray-900">{pendingApprovals}</div>
        </div>
        
        <div className="bg-white border border-gray-200 text-gray-800 rounded-xl shadow-md p-6 flex flex-col items-start">
          <div className="text-lg font-semibold mb-2 text-gray-600">Total Withdrawals</div>
          <div className="text-3xl font-bold text-gray-900">{totalWithdrawals}</div>
        </div>
      </div>

      {/* Withdrawal Form */}
      <div className="max-w-lg w-full bg-white border border-gray-200 rounded-2xl shadow-md p-10 mb-10">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">Request Withdrawal</h2>
  <form className="space-y-7" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Amount (PKR)</label>
            <input
              type="number"
              required
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full text-gray-900 border-2 border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white placeholder-gray-400"
              placeholder="Enter amount"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Method</label>
            <select
              required
              value={method}
              onChange={e => setMethod(e.target.value)}
              className="w-full text-gray-900 border-2 border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
            >
              <option value="" className="text-gray-500">Select method</option>
              <option value="bank">Bank Transfer</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="jazzcash">JazzCash</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-md text-lg"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      {/* Withdrawal History */}
      <div className="max-w-3xl w-full bg-white border border-gray-200 rounded-2xl shadow-md p-10">
        <h3 className="text-xl font-bold mb-6 text-gray-900 text-center">Your Withdrawal History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Amount</th>
                <th className="p-4 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Method</th>
                <th className="p-4 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Requested</th>
              </tr>
            </thead>
            
            <tbody>
              {dummyWithdrawals.map((w) => (
                <tr key={w._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-900 font-bold">PKR {w.amount.toLocaleString()}</td>
                  <td className="p-4 text-gray-700 capitalize">{w.method}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${w.status === "approved" ? "bg-green-100 text-green-800" : w.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">{new Date(w.requestedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {dummyWithdrawals.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No withdrawal history found.
          </div>
        )}
      </div>
    </main>
  );
}
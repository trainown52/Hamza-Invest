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
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  async function fetchWithdrawals() {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/withdrawals/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setWithdrawals(data.withdrawals || []);
    } catch {
      setWithdrawals([]);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/withdrawals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, method }),
      });
      if (res.ok) {
        toast.success("Withdrawal request submitted");
        setAmount(0);
        setMethod("");
        fetchWithdrawals();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to submit request");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center bg-gray-50">
      <Toaster position="top-right" />
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Request Withdrawal</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Amount (PKR)</label>
            <input
              type="number"
              required
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full text-black border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Method</label>
            <select
              required
              value={method}
              onChange={e => setMethod(e.target.value)}
              className="w-full text-black border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select method</option>
              <option value="bank">Bank Transfer</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="jazzcash">JazzCash</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Your Withdrawal History</h3>
        {historyLoading ? (
          <div>Loading...</div>
        ) : withdrawals.length === 0 ? (
          <div className="text-gray-500">No withdrawal requests found.</div>
        ) : (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-gray-700 font-semibold">Amount</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Method</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Status</th>
                <th className="p-3 text-left text-gray-700 font-semibold">Requested</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w._id} className="border-b">
                  <td className="p-3 text-gray-900">PKR {w.amount.toLocaleString()}</td>
                  <td className="p-3 text-gray-900 capitalize">{w.method}</td>
                  <td className={`p-3 capitalize font-medium ${w.status === "approved" ? "text-green-600" : w.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>{w.status}</td>
                  <td className="p-3 text-gray-900">{new Date(w.requestedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

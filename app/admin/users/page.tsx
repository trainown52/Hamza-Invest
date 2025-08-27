"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Kyc = {
  _id: string;
  fullName: string;
  user?: { email?: string };
  country: string;
  idType: string;
  idNumber: string;
  status: "pending" | "approved" | "rejected";
};

// Add User type
type User = {
  _id: string;
  name: string;
  email: string;
  joinedAt: string;
  role?: string;
};

export default function AdminUsersPage() {
  const [kycs, setKycs] = useState<Kyc[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [activeTab, setActiveTab] = useState<'users' | 'kycs'>('users');

  useEffect(() => {
    async function fetchKycs() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/kyc/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setKycs(data.kycs || []);
      } catch (err) {
        toast.error("Failed to fetch KYC data");
      } finally {
        setLoading(false);
      }
    }
    fetchKycs();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/auth/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        toast.error('Failed to fetch users');
      }
    }
    fetchUsers();
  }, []);

  async function handleStatusChange(id: string) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/kyc/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success("Status updated");
        setKycs((prev) => prev.map(k => k._id === id ? { ...k, status } : k));
        setEditingId(null);
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Network error");
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-8 bg-gray-50 min-h-screen">
        
        <div className="flex gap-2 mb-8 bg-white p-1 rounded-lg w-max shadow-sm">
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'users' ? 'bg-black text-white shadow' : 'bg-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'kycs' ? 'bg-black text-white shadow' : 'bg-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('kycs')}
          >
            KYC Verifications
          </button>
        </div>
        
        {activeTab === 'users' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-800">{user.email}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role || 'user'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Full Name</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Country</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">ID Type</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">ID Number</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {kycs.map((kyc) => (
                    <tr key={kyc._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-800 font-medium">{kyc.fullName}</td>
                      <td className="p-4 text-gray-600">{kyc.user?.email || '-'}</td>
                      <td className="p-4 text-gray-600">{kyc.country}</td>
                      <td className="p-4 text-gray-600">{kyc.idType}</td>
                      <td className="p-4 text-gray-600 font-mono">{kyc.idNumber}</td>
                      <td className="p-4">
                        {editingId === kyc._id ? (
                          <select
                            value={status}
                            onChange={e => setStatus(e.target.value as 'pending' | 'approved' | 'rejected')}
                            className="border text-black border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option className="text-black" value="pending">Pending</option>
                            <option className="text-black" value="approved">Approved</option>
                            <option className="text-black" value="rejected">Rejected</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${kyc.status === 'approved' ? 'bg-green-100 text-green-800' : kyc.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {editingId === kyc._id ? (
                            <>
                              <button
                                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                onClick={() => handleStatusChange(kyc._id)}
                              >
                                Save
                              </button>
                              <button
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-lg font-medium hover:bg-blue-200 transition-colors"
                              onClick={() => { setEditingId(kyc._id); setStatus(kyc.status); }}
                            >
                              Edit Status
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
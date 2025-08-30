"use client";
// import { corporations } from "../../lib/data";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Fragment } from "react";
import "./corporations.css";
import { X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, THead, TBody, TR, TH, TD } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CorporationsPage() {
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
	const [query, setQuery] = useState("");
	const [companies, setCompanies] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [formData, setFormData] = useState<any>({
		name: "",
		logo: "",
		industry: "",
		description: "",
		location: "",
		website: "",
		shares: {
			total: 0,
			available: 0,
			pricePerShare: 0,
			minInvestmentShares: 0
		},
		financials: {
			annualRevenue: 0,
			annualProfitLoss: 0,
			growthRate: 0,
			valuation: 0
		},
		legal: {
			registrationNumber: "",
			incorporationDate: "",
			country: ""
		}
	});
	const [editId, setEditId] = useState<string | null>(null);

	const filtered = companies.filter(
		(c) =>
			c.name.toLowerCase().includes(query.toLowerCase())
	);


	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setIsAdmin(false);
			router.replace("/login");
			return;
		}
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			setIsAdmin(payload.role === "admin");
			if (payload.role !== "admin") {
				router.replace("/");
			}
		} catch {
			setIsAdmin(false);
			router.replace("/login");
		}
	}, [router]);

	useEffect(() => {
		if (isAdmin) fetchCompanies();
		// eslint-disable-next-line
	}, [isAdmin]);

	const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
	const fetchCompanies = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${API_BASE}/api/companies`);
			setCompanies(res.data as any[]);
		} catch (err) {
			toast.error("Failed to fetch companies");
		}
		setLoading(false);
	};

	const handleCreateOrUpdate = async (e: any) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		try {
			if (editId) {
				await axios.put(`${API_BASE}/api/companies/${editId}`, formData, {
					headers: { Authorization: `Bearer ${token}` }
				});
				toast.success("Company updated successfully");
			} else {
				await axios.post(`${API_BASE}/api/companies`, formData, {
					headers: { Authorization: `Bearer ${token}` }
				});
				toast.success("Company added successfully");
			}
			setShowForm(false);
			setEditId(null);
			setFormData({
				name: "",
				logo: "",
				industry: "",
				description: "",
				location: "",
				website: "",
				shares: {
					total: 0,
					available: 0,
					pricePerShare: 0,
					minInvestmentShares: 0
				},
				financials: {
					annualRevenue: 0,
					annualProfitLoss: 0,
					growthRate: 0,
					valuation: 0
				},
				legal: {
					registrationNumber: "",
					incorporationDate: "",
					country: ""
				}
			});
			fetchCompanies();
		} catch (err) {
			toast.error(editId ? "Failed to update company" : "Failed to add company");
		}
	};

	const handleEdit = (company: any) => {
		setEditId(company._id);
		setFormData(company);
		setShowForm(true);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		const token = localStorage.getItem("token");
		try {
			await axios.delete(`${API_BASE}/api/companies/${deleteId}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			toast.success("Company deleted successfully");
			fetchCompanies();
		} catch (err) {
			toast.error("Failed to delete company");
		}
		setShowDeleteModal(false);
		setDeleteId(null);
	};

	if (isAdmin === false) return null;

	return (
			<Fragment>
				<Toaster position="top-right" />
			{/* Modal for Add/Edit */}
				{showForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						{/* Backdrop */}
						<div
							className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity"
							onClick={() => { setShowForm(false); setEditId(null); }}
						></div>

						{/* Modal Container */}
						<div className="relative z-50 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-10 max-h-[90vh] overflow-y-auto scrollbar-hide">
							{/* Close Button */}
							<button
								onClick={() => { setShowForm(false); setEditId(null); }}
								className="absolute top-6 right-6 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
							>
								<X className="w-5 h-5 text-gray-600" />
							</button>

							{/* Form */}
							<div className="prose prose-lg max-w-none mx-auto text-gray-700">
								<h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6">
									{editId ? 'Edit Corporation' : 'Add Corporation'}
								</h2>

								<form onSubmit={handleCreateOrUpdate} className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-gray-700">Name</label>
										<input
											type="text"
											value={formData.name}
											onChange={e => setFormData({ ...formData, name: e.target.value })}
											className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">Logo</label>
										<input
											type="file"
											accept="image/*"
											onChange={async (e) => {
												const file = e.target.files?.[0];
												if (!file) return;
												const form = new FormData();
												form.append("logo", file);
												try {
													const token = localStorage.getItem("token");
													const res = await axios.post(`${API_BASE}/api/companies/upload-logo`, form, {
														headers: {
															"Content-Type": "multipart/form-data",
															Authorization: `Bearer ${token}`
														}
													});
													setFormData((prev: any) => ({ ...prev, logo: (res.data as { url: string }).url }));

												} catch {
													
												}
											}}
											className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">Industry</label>
										<input
											type="text"
											value={formData.industry}
											onChange={e => setFormData({ ...formData, industry: e.target.value })}
											className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">Description</label>
										<input
											type="text"
											value={formData.description}
											onChange={e => setFormData({ ...formData, description: e.target.value })}
											className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">Location</label>
										<input
											type="text"
											value={formData.location}
											onChange={e => setFormData({ ...formData, location: e.target.value })}
											className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700">Website (optional)</label>
										<input
											type="text"
											value={formData.website}
											onChange={e => setFormData({ ...formData, website: e.target.value })}
											className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
										/>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700">Total Shares</label>
											<input
												type="number"
												value={formData.shares.total}
												onChange={e => setFormData({ ...formData, shares: { ...formData.shares, total: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Available Shares</label>
											<input
												type="number"
												value={formData.shares.available}
												onChange={e => setFormData({ ...formData, shares: { ...formData.shares, available: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Price Per Share</label>
											<input
												type="number"
												value={formData.shares.pricePerShare}
												onChange={e => setFormData({ ...formData, shares: { ...formData.shares, pricePerShare: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Min Investment Shares</label>
											<input
												type="number"
												value={formData.shares.minInvestmentShares}
												onChange={e => setFormData({ ...formData, shares: { ...formData.shares, minInvestmentShares: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700">Annual Revenue</label>
											<input
												type="number"
												value={formData.financials.annualRevenue}
												onChange={e => setFormData({ ...formData, financials: { ...formData.financials, annualRevenue: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Annual Profit/Loss</label>
											<input
												type="number"
												value={formData.financials.annualProfitLoss}
												onChange={e => setFormData({ ...formData, financials: { ...formData.financials, annualProfitLoss: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Growth Rate (%)</label>
											<input
												type="number"
												value={formData.financials.growthRate}
												onChange={e => setFormData({ ...formData, financials: { ...formData.financials, growthRate: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Valuation</label>
											<input
												type="number"
												value={formData.financials.valuation}
												onChange={e => setFormData({ ...formData, financials: { ...formData.financials, valuation: Number(e.target.value) } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700">Registration Number</label>
											<input
												type="text"
												value={formData.legal.registrationNumber}
												onChange={e => setFormData({ ...formData, legal: { ...formData.legal, registrationNumber: e.target.value } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Incorporation Date</label>
											<input
												type="date"
												value={formData.legal.incorporationDate?.slice(0,10) || ""}
												onChange={e => setFormData({ ...formData, legal: { ...formData.legal, incorporationDate: e.target.value } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
										<div className="col-span-2">
											<label className="block text-sm font-medium text-gray-700">Country</label>
											<input
												type="text"
												value={formData.legal.country}
												onChange={e => setFormData({ ...formData, legal: { ...formData.legal, country: e.target.value } })}
												className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
											/>
										</div>
									</div>
									<div className="flex justify-end gap-4 pt-4">
										<button
											type="button"
											onClick={() => { setShowForm(false); setEditId(null); }}
											className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
										>
											{editId ? 'Update' : 'Add'}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
			)}

			{/* Modal for Delete Confirmation */}
			{showDeleteModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/20 backdrop-blur-xs bg-opacity-40">
					<div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-black scrollbar-hide">
						<h2 className="text-lg font-bold mb-4">Delete Corporation</h2>
						<p className="mb-6">Are you sure you want to delete this corporation?</p>
						<div className="flex gap-2 justify-end">
							<Button
								className="bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition cursor-pointer"
								onClick={handleDelete}
							>
								Delete
							</Button>
							<Button
								variant="outline"
								className="bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition cursor-pointer"
								onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			)}

			<div className="space-y-5 bg-white min-h-screen p-6">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold text-black">Corporation Management</h1>
					<Button onClick={() => { setShowForm(true); setEditId(null); }} className="bg-black text-white font-semibold cursor-pointer">Add Corporation</Button>
				</div>

				<Card className="bg-white">
					<CardHeader>
						<div className="flex items-center gap-3">
							<Input
								placeholder="Search by name…"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								className="max-w-xs text-black bg-white border-gray-300"
							/>
						</div>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div className="text-black">Loading…</div>
						) : (
							<Table>
								<THead>
									<TR className="bg-gray-100 text-black">
										<TH>Name</TH>
										<TH>Industry</TH>
										<TH>Share Price</TH>
										<TH>Total Shares</TH>
										<TH>Created</TH>
										<TH>Actions</TH>
									</TR>
								</THead>
								<TBody>
									{filtered.map((r) => (
										<TR key={r._id} className="border-b border-gray-200">
											<TD className="text-black">{r.name}</TD>
											<TD className="text-black">{r.industry}</TD>
											<TD className="text-black">PKR {r.shares?.pricePerShare?.toFixed(2)}</TD>
											<TD className="text-black">{r.shares?.total?.toLocaleString()}</TD>
											<TD className="text-black">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}</TD>
											<TD>
												<div className="flex gap-2">
													<Button
														variant="outline"
														className="border-blue-600 text-blue-700 font-semibold hover:bg-blue-50 cursor-pointer"
														onClick={() => handleEdit(r)}
													>
														Edit
													</Button>
													<Button
														variant="outline"
														className="border-red-600 text-red-700 font-semibold hover:bg-red-50 cursor-pointer"
														onClick={() => { setShowDeleteModal(true); setDeleteId(r._id); }}
													>
														Delete
													</Button>
												</div>
											</TD>
										</TR>
									))}
								</TBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</Fragment>
	);
}
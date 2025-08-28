"use client";
import { corporations } from "../../lib/data";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
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
	const rows = corporations.filter(
		(c) =>
			c.name.toLowerCase().includes(query.toLowerCase()) ||
			c.ticker.toLowerCase().includes(query.toLowerCase())
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

	if (isAdmin === false) return null;

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Corporation Management</h1>
				<Button onClick={() => alert("TODO: open create form")}>
					Add Corporation
				</Button>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center gap-3">
						<Input
							placeholder="Search by name or ticker…"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="max-w-xs"
						/>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<THead>
							<TR>
								<TH>Name</TH>
								<TH>Ticker</TH>
								<TH>Share Price</TH>
								<TH>Total Shares</TH>
								<TH>Status</TH>
								<TH>setting </TH>
							</TR>
						</THead>
						<TBody>
							{rows.map((r) => (
								<TR key={r.id}>
									<TD>{r.name}</TD>
									<TD>{r.ticker}</TD>
									<TD>PKR {r.sharePrice.toFixed(2)}</TD>
									<TD>{r.totalShares.toLocaleString()}</TD>
									<TD>
										{r.active ? (
											<Badge intent="success">Active</Badge>
										) : (
											<Badge intent="danger">Inactive</Badge>
										)}
									</TD>
									<TD>
										<div className="flex gap-2 justify-end">
											<Button
												variant="outline"
												onClick={() => alert("Edit " + r.name)}
											>
												Edit
											</Button>
											<Button
												variant="ghost"
												onClick={() => alert("Set price for " + r.ticker)}
											>
												Set Price
											</Button>
										</div>
									</TD>
								</TR>
							))}
						</TBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
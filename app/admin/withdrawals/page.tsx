"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";

// Withdrawal type
type Withdrawal = {
  _id: string;
  user: { _id: string; name: string; email: string };
  amount: number;
  method: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
};

export default function WithdrawalsPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);

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
    async function fetchWithdrawals() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/withdrawals`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setWithdrawals(data.withdrawals || []);
      } catch (err) {
        toast.error("Failed to fetch withdrawals");
      } finally {
        setLoading(false);
      }
    }
    fetchWithdrawals();
  }, []);

  async function handleStatus(id: string, status: "approved" | "rejected") {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/withdrawals/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        toast.success(`Withdrawal ${status}`);
        setWithdrawals((prev) =>
          prev.map((w) => (w._id === id ? { ...w, status } : w))
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Network error");
    }
  }

  if (isAdmin === false) return null;

  return (
    <main className="min-h-screen p-8 space-y-8 bg-gray-50">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        💳 Withdrawal Requests
      </h1>
      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Pending & Processed Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>User</TH>
                  <TH>Amount</TH>
                  <TH>Method</TH>
                  <TH>Status</TH>
                  <TH>Requested</TH>

                </TR>
              </THead>
              <TBody>
                {withdrawals.map((w) => (
                  <TR key={w._id} className="hover:bg-gray-50">
                    <TD>{w.user?.name}</TD>
                    <TD className="text-gray-700 font-medium">
                      PKR {w.amount.toLocaleString()}
                    </TD>
                    <TD className="capitalize">{w.method}</TD>
                    <TD
                      className={`capitalize font-medium ${w.status === "approved"
                          ? "text-green-600"
                          : w.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                    >
                      {w.status}
                    </TD>
                    <TD>{w.requestedAt}</TD>
                    <TD className="text-right flex gap-4 justify-end">
                      {w.status === "pending" && (
                        <>
                          <Button
                            onClick={() => handleStatus(w._id, "approved")}
                            className="px-4 py-1.5 rounded-lg"
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleStatus(w._id, "rejected")}
                            className="px-4 py-1.5 rounded-lg"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

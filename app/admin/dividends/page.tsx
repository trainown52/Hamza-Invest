"use client";

import { useState } from "react";
import { dividends, corporations } from "../../lib/data";
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
import { Input } from "../../components/ui/input";

export default function DividendsPage() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [corp, setCorp] = useState(corporations[0]?.id ?? "");

  return (
    <main className="min-h-screen p-8 space-y-8 bg-gray-50">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        📈 Dividend Management
      </h1>

      {/* Schedule New Dividend */}
      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Schedule New Dividend
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-3">
          <select
            value={corp}
            onChange={(e) => setCorp(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {corporations.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.ticker})
              </option>
            ))}
          </select>

          <Input
            placeholder="Amount per share (PKR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="rounded-lg border-gray-300 focus:ring-gray-400"
          />

          <Input
            placeholder="Pay date (YYYY-MM-DD)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border-gray-300 focus:ring-gray-400"
          />

          <Button
            onClick={() => alert("Scheduled!")}
            className="px-4 py-2 rounded-lg"
          >
            Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Dividends Table */}
      <Card className="shadow-md rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Upcoming & Past Dividends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Company</TH>
                <TH>Amount / Share</TH>
                <TH>Pay Date</TH>
                <TH>Status</TH>
                <TH></TH>
              </TR>
            </THead>
            <TBody>
              {dividends.map((d) => {
                const company = corporations.find(
                  (c) => c.id === d.corporationId
                );
                return (
                  <TR key={d.id} className="hover:bg-gray-50">
                    <TD className="font-medium text-gray-800">
                      {company?.name}
                    </TD>
                    <TD className="text-gray-700">
                      PKR {d.amountPerShare.toFixed(2)}
                    </TD>
                    <TD className="text-gray-600">{d.payDate}</TD>
                    <TD
                      className={`capitalize font-medium ${
                        d.status === "paid"
                          ? "text-green-600"
                          : d.status === "scheduled"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {d.status}
                    </TD>
                    <TD className="text-right">
                      {d.status !== "paid" && (
                        <Button
                          variant="outline"
                          onClick={() => alert("Mark paid")}
                          className="px-4 py-1.5 rounded-lg"
                        >
                          Mark Paid
                        </Button>
                      )}
                    </TD>
                  </TR>
                );
              })}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

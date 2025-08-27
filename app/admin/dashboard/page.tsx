"use client";

import StatCard from "../../components/common/StatCard";
import AreaTrend from "../../components/charts/AreaTrend";
import BarByCompany from "../../components/charts/BarByCompany";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function DashboardPage() {
  const kpis = [
    { label: "Total Clients", value: 1240, hint: "+3.2% vs last month" },
    { label: "Total Investment Raised", value: "PKR 984M", hint: "+1.1% WoW" },
    { label: "Active Corporations", value: 7 },
    { label: "Active Dividend Payouts", value: 3 },
  ];

  const trend = [
    { name: "Jan", value: 60 },
    { name: "Feb", value: 72 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 95 },
    { name: "May", value: 110 },
    { name: "Jun", value: 120 },
    { name: "Jul", value: 140 },
  ];

  const byCompany = [
    { name: "HWL", value: 420 },
    { name: "HWF", value: 260 },
    { name: "HWE", value: 180 },
  ];

  return (
    <main className="min-h-screen p-8 space-y-8 bg-gray-50">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        📊 Admin Dashboard
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <StatCard key={i} label={k.label} value={k.value} hint={k.hint} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-md rounded-2xl border border-gray-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold">
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AreaTrend data={trend} />
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold">
              Revenue Per Company
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarByCompany data={byCompany} />
          </CardContent>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold">
              Upcoming Dividends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg">
                <span className="text-gray-700">HWL • 05 Sep 2025</span>
                <span className="font-semibold text-gray-800">
                  PKR 1.50 / share
                </span>
              </li>
              <li className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg">
                <span className="text-gray-700">HWF • 12 Sep 2025</span>
                <span className="font-semibold text-gray-800">
                  PKR 0.80 / share
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold">
              Pending Withdrawals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg">
                <span className="text-gray-700">Ali Raza • Bank</span>
                <span className="font-semibold text-gray-800">
                  PKR 45,000
                </span>
              </li>
              <li className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg">
                <span className="text-gray-700">Sara Khan • Wallet</span>
                <span className="font-semibold text-gray-800">
                  PKR 12,000
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

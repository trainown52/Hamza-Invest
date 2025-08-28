
"use client";

import { ArrowUpRight, TrendingUp, Wallet, DivideCircle, FileText, Building2, Download, BarChart2, ChevronDown, ChevronUp, MessageSquare, Shield } from "lucide-react";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);


export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("1y");
  const [expandedCorporation, setExpandedCorporation] = useState<number | null>(null);
  const [expandedDividend, setExpandedDividend] = useState<number | null>(null);
  const [autoWithdrawal, setAutoWithdrawal] = useState(false);


  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Hamza Tech Share Price ($)",
        data: [],
        borderColor: "#1f77b4",
        backgroundColor: "rgba(31,119,180,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  });

  // Sample portfolio data (replace with API data in production)
  const portfolioData = {
    totalValue: 48250.75,
    totalChange: 12.4,
    corporations: [
      {
        id: 1,
        name: "Hamza Tech",
        value: 18500,
        change: 18.2,
        shares: 150,
        sector: "Technology",
        purchaseDate: "2023-01-15",
        avgPrice: 123.33,
        currentPrice: 150.00,
        transactionHistory: [
          { type: "Buy", shares: 100, price: 120.00, date: "2023-01-15" },
          { type: "Buy", shares: 50, price: 130.00, date: "2023-03-10" },
        ],
        dividends: [
          { amount: 150.00, date: "2023-06-15", status: "Paid" },
          { amount: 120.00, date: "2023-03-15", status: "Paid" },
        ],
      },
      {
        id: 2,
        name: "Hamza Energy",
        value: 12500,
        change: 8.5,
        shares: 250,
        sector: "Energy",
        purchaseDate: "2022-11-10",
        avgPrice: 50.00,
        currentPrice: 60.00,
        transactionHistory: [
          { type: "Buy", shares: 200, price: 48.00, date: "2022-11-10" },
          { type: "Buy", shares: 50, price: 52.00, date: "2023-02-15" },
        ],
        dividends: [
          { amount: 250.00, date: "2023-06-10", status: "Paid" },
          { amount: 225.00, date: "2023-03-10", status: "Paid" },
        ],
      },
      {
        id: 3,
        name: "Hamza Real Estate",
        value: 9250,
        change: 5.3,
        shares: 75,
        sector: "Real Estate",
        purchaseDate: "2023-02-20",
        avgPrice: 123.33,
        currentPrice: 130.00,
        transactionHistory: [
          { type: "Buy", shares: 75, price: 123.33, date: "2023-02-20" },
        ],
        dividends: [{ amount: 75.00, date: "2023-06-20", status: "Paid" }],
      },
      {
        id: 4,
        name: "Hamza Logistics",
        value: 8000.75,
        change: 15.7,
        shares: 180,
        sector: "Transportation",
        purchaseDate: "2023-03-05",
        avgPrice: 44.45,
        currentPrice: 50.00,
        transactionHistory: [
          { type: "Buy", shares: 180, price: 44.45, date: "2023-03-05" },
        ],
        dividends: [],
      },
    ],
    dividends: {
      ytd: 1850.50,
      upcoming: 625.00,
      history: [
        {
          corp: "Hamza Tech",
          amount: 450.00,
          date: "2023-06-15",
          paymentMethod: "Bank Transfer",
          transactionId: "TX789456123",
        },
        {
          corp: "Hamza Energy",
          amount: 375.50,
          date: "2023-06-10",
          paymentMethod: "Reinvested",
          transactionId: "TX321654987",
        },
      ],
    },
    reports: [
      { name: "Q2 2023 Financial Report", type: "PDF", date: "2023-07-15", size: "2.4 MB", url: "/reports/q2-2023.pdf" },
      { name: "Annual Audit 2022", type: "PDF", date: "2023-03-20", size: "5.1 MB", url: "/reports/audit-2022.pdf" },
      { name: "Corporate Governance", type: "PDF", date: "2023-01-10", size: "1.2 MB", url: "/reports/governance.pdf" },
    ],
    announcements: [
      { title: "New Share Offering", content: "Hamza Tech is issuing new shares starting next month.", date: "2023-08-01" },
      { title: "Dividend Update", content: "Upcoming dividends for Hamza Energy scheduled for Q3.", date: "2023-07-15" },
    ],
  };





  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#000" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#000" },
      },
      y: {
        ticks: { color: "#000" },
      },
    },
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#000000",
          font: { size: 12 },
        },
      },
    },
  };

  const toggleCorporationExpand = (index: number) => {
    setExpandedCorporation(expandedCorporation === index ? null : index);
  };

  const toggleDividendExpand = (index: number) => {
    setExpandedDividend(expandedDividend === index ? null : index);
  };

  return (
    <div className="bg-gray-100 mt-14 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black flex items-center">
              <Wallet className="w-6 h-6 mr-2 text-black" />
              Investment Portfolio
            </h2>
            <p className="text-gray-600 mt-1 text-sm">Manage your investments across Hamza Waheed corporations</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all hover:border-gray-400"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1w">1 Week</option>
              <option value="1m">1 Month</option>
              <option value="1y">1 Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>


        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">

          {/* ====================== */}
          {/* 🔹 Real-Time Graph */}
          {/* ====================== */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-black mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-black" />
              Real-Time Share Price
            </h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <Line data={chartData} options={lineOptions} height={100} />
            </div>
          </div>

          {/* keep your existing portfolio summary + rest of UI here */}
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Value */}
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Portfolio Value</p>
                <p className="text-2xl font-bold text-black mt-1">${portfolioData.totalValue.toLocaleString()}</p>
              </div>
              <div
                className={`flex items-center px-2 py-1 rounded-full text-sm ${portfolioData.totalChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  } hover:${portfolioData.totalChange >= 0 ? "bg-green-200" : "bg-red-200"} transition-colors`}
              >
                <TrendingUp
                  className={`w-4 h-4 mr-1 ${portfolioData.totalChange >= 0 ? "text-green-600" : "text-red-600"}`}
                />
                {portfolioData.totalChange}%
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Last updated: {new Date().toLocaleString()}</p>
          </div>

          {/* Dividends */}
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Dividends YTD</p>
                <p className="text-2xl font-bold text-black mt-1">${portfolioData.dividends.ytd.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <DivideCircle className="w-5 h-5 text-black" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Upcoming: ${portfolioData.dividends.upcoming}</p>
          </div>

          {/* Asset Allocation Chart */}
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <p className="text-sm text-gray-600 mb-2">Asset Allocation</p>
            <div className="h-40">
              <Pie data={chartData} options={chartOptions} />
            </div>
            <Link href="/portfolio/breakdown" className="text-xs text-gray-600 hover:text-black transition-colors flex items-center justify-center mt-2">
              View Detailed Breakdown
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>

        {/* Corporation Holdings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-black" />
            Your Corporations
            <span className="ml-2 text-sm text-gray-500">({portfolioData.corporations.length} holdings)</span>
          </h3>
          <div className="space-y-3">
            {portfolioData.corporations.map((corp, index) => (
              <div key={corp.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <button
                  onClick={() => toggleCorporationExpand(index)}
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="font-medium text-black">{corp.name.charAt(0)}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-black">{corp.name}</p>
                      <p className="text-sm text-gray-600">{corp.sector}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-black">${corp.value.toLocaleString()}</p>
                      <p
                        className={`text-sm flex items-center justify-end ${corp.change >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {Math.abs(corp.change)}%
                      </p>
                    </div>
                    {expandedCorporation === index ? (
                      <ChevronUp className="w-5 h-5 text-black" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-black" />
                    )}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedCorporation === index ? "max-h-[500px]" : "max-h-0"}`}>
                  <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-black mb-2">Investment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shares Held:</span>
                          <span className="font-medium text-black">{corp.shares.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Purchase Price:</span>
                          <span className="font-medium text-black">${corp.avgPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Share Price:</span>
                          <span className="font-medium text-black">${corp.currentPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purchase Date:</span>
                          <span className="font-medium text-black">{new Date(corp.purchaseDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-black mb-2">Transaction History</h4>
                      {corp.transactionHistory.length > 0 ? (
                        <div className="space-y-2 text-sm">
                          {corp.transactionHistory.map((tx, txIndex) => (
                            <div key={txIndex} className="flex justify-between">
                              <span className="text-gray-600">{tx.type} ({new Date(tx.date).toLocaleDateString()}):</span>
                              <span className="font-medium text-black">
                                {tx.shares} shares @ ${tx.price.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">No transactions</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-black mb-2">Dividend History</h4>
                      {corp.dividends.length > 0 ? (
                        <div className="space-y-2 text-sm">
                          {corp.dividends.map((div, divIndex) => (
                            <div key={divIndex} className="flex justify-between">
                              <span className="text-gray-600">{new Date(div.date).toLocaleDateString()}:</span>
                              <span className="font-medium text-green-600">+${div.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">No dividend history</p>
                      )}
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                    <Link
                      href={`/buy?corp=${corp.id}`}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
                    >
                      Buy Shares
                    </Link>
                    <Link
                      href={`/buy?corp=${corp.id}&action=sell`}
                      className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
                    >
                      Buy Shares
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dividend Management */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <DivideCircle className="w-5 h-5 mr-2 text-black" />
            Dividend Management
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Auto-Withdrawal</p>
                <p className="text-xs text-gray-500">Automatically withdraw dividends to your linked account</p>
              </div>
              <button
                onClick={() => setAutoWithdrawal(!autoWithdrawal)}
                className={`px-3 py-1 rounded-full text-sm ${autoWithdrawal ? "bg-green-600 text-white" : "bg-gray-200 text-black"
                  } hover:${autoWithdrawal ? "bg-green-700" : "bg-gray-300"} transition-colors`}
              >
                {autoWithdrawal ? "Enabled" : "Disabled"}
              </button>
            </div>
            <div className="border-t border-gray-200 pt-4">
              {portfolioData.dividends.history.map((div, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleDividendExpand(index)}
                    className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors border-b border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <DivideCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-black">{div.corp}</p>
                        <p className="text-sm text-gray-600">{new Date(div.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium text-green-600">+${div.amount.toFixed(2)}</p>
                      {expandedDividend === index ? (
                        <ChevronUp className="w-5 h-5 text-black" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-black" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedDividend === index ? "max-h-48" : "max-h-0"}`}>
                    <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-black mb-2">Payment Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium text-black">{div.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Transaction ID:</span>
                            <span className="font-medium text-black">{div.transactionId}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-black mb-2">Actions</h4>
                        <div className="flex space-x-3">
                          <button className="px-3 py-1 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-colors text-sm">
                            View Receipt
                          </button>
                          <Link href="/support" className="px-3 py-1 bg-gray-100 text-black rounded-md hover:bg-gray-200 transition-colors text-sm">
                            Report Issue
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reports & Audits */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-black" />
            Reports & Audits
            <span className="ml-2 text-sm text-gray-500">({portfolioData.reports.length} documents)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.reports.map((report, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex justify-between items-start mb-3">
                  <FileText className="w-5 h-5 text-black" />
                  <span className="text-xs bg-gray-100 text-black px-2 py-1 rounded-full">{report.type}</span>
                </div>
                <h4 className="font-medium text-black mb-1">{report.name}</h4>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <p className="text-xs text-gray-600">{new Date(report.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-600">{report.size}</p>
                  </div>
                  <a href={report.url} download className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Download className="w-4 h-4 text-black" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile & Security */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-black" />
            Profile & Security
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">KYC Status</p>
              <p className="text-sm font-medium text-black">Verified</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Two-Factor Authentication</p>
              <p className="text-sm font-medium text-black">Enabled</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Transaction PIN</p>
              <p className="text-sm font-medium text-black">Set</p>
            </div>
            {/* <div>
              <Link href="/settings" className="text-sm text-black hover:text-gray-600 flex items-center">
                Manage Security Settings
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div> */}
          </div>
        </div>

        {/* Communication Center */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-black" />
            Communication Center
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-black mb-2">Announcements</h4>
              {portfolioData.announcements.map((ann, index) => (
                <div key={index} className="mb-3">
                  <p className="text-sm font-medium text-black">{ann.title}</p>
                  <p className="text-xs text-gray-600">{ann.content}</p>
                  <p className="text-xs text-gray-500">{new Date(ann.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-black mb-2">Ask a Question</h4>
              <form className="space-y-3">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows={4}
                  placeholder="Type your question here..."
                ></textarea>
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                  Submit Question
                </button>
              </form>
            </div>
            <div className="mt-4 flex space-x-3">
              <Link href="/privacy-policy" className="text-xs text-black hover:text-gray-600">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-black hover:text-gray-600">
                Terms & Conditions
              </Link>
              <Link href="/disclaimer" className="text-xs text-black hover:text-gray-600">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/withdraw"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Request Withdrawal
            </Link>
            <button className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Generate Tax Report
            </button>
            <Link
              href="/portfolio/analytics"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              View Full Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

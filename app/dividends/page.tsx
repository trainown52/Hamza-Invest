"use client";

import {
  DivideCircle,
  ChevronDown,
  ChevronUp,
  Download,
  TrendingUp,
  FileText,
  Wallet,
  AlertCircle,
  Store,
  ArrowLeftRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/** ===== Types ===== */
type Period = "Weekly" | "Monthly" | "Yearly";

interface DividendReport {
  date: string;                 // ISO date
  period: Period;               // Weekly | Monthly | Yearly
  companyPnlAmount: number;     // company's profit/loss for the period
  status: "Paid" | "Scheduled";
  notes: string;
}

interface Corporation {
  id: number;
  name: string;
  // How much THIS USER invested in this corporation (USD).
  // Using your rule: $100 invested = 1% ownership.
  investedUsd: number;
  reports: DividendReport[];
}

interface DividendData {
  corporations: Corporation[];
}

/** ===== Helpers ===== */

// $100 invested = 1% ownership → ownership % = invested / 100
function ownershipPercent(investedUsd: number) {
  return investedUsd / 100; // e.g. $250 -> 2.5 (%)
}

// User share = company P&L * (ownership% / 100)
// Returns a number that could be negative if company lost money.
function userShareFromPnl(companyPnl: number, investedUsd: number) {
  const pct = ownershipPercent(investedUsd) / 100; // convert to fraction
  return companyPnl * pct;
}

function fmtMoney(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** CSV Export helpers */
function reportsToCsvRows(corp: Corporation) {
  const ownPct = ownershipPercent(corp.investedUsd);
  return corp.reports.map((r) => {
    const yourShare = userShareFromPnl(r.companyPnlAmount, corp.investedUsd);
    return [
      corp.name,
      r.period,
      r.status,
      r.date,
      r.companyPnlAmount.toString(),
      `${ownPct}%`,
      yourShare.toString(),
      r.notes.replace(/\n/g, " "),
    ];
  });
}

function downloadCsv(filename: string, rows: string[][]) {
  const header = [
    "Corporation",
    "Period",
    "Status",
    "Date",
    "Company_PnL_USD",
    "Ownership_Percent",
    "Your_Share_USD",
    "Notes",
  ];

  const csv = [header, ...rows]
    .map((cols) =>
      cols
        .map((c) => {
          const needsQuotes = /[",\n]/.test(c);
          const safe = c.replace(/"/g, '""');
          return needsQuotes ? `"${safe}"` : safe;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** ===== Component ===== */
export default function Dividends() {
  const [expandedCorp, setExpandedCorp] = useState<number | null>(null);
  const [data, setData] = useState<DividendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated fetch
  useEffect(() => {
    (async () => {
      try {
        // Sample data aligned to your model and rule
        const sample: DividendData = {
          corporations: [
            {
              id: 1,
              name: "Hamza Tech",
              investedUsd: 300, // → 3% ownership
              reports: [
                {
                  date: "2025-08-15",
                  period: "Weekly",
                  companyPnlAmount: 1800, // company profit for that week
                  status: "Paid",
                  notes: "Strong device sales; weekly distribution.",
                },
                {
                  date: "2025-07-31",
                  period: "Monthly",
                  companyPnlAmount: 9200,
                  status: "Paid",
                  notes: "Stable margins; monthly dividend.",
                },
                {
                  date: "2025-12-31",
                  period: "Yearly",
                  companyPnlAmount: 120000,
                  status: "Scheduled",
                  notes: "Projected annual payout based on YTD trend.",
                },
              ],
            },
            {
              id: 2,
              name: "Hamza Energy",
              investedUsd: 100, // → 1% ownership
              reports: [
                {
                  date: "2025-08-20",
                  period: "Weekly",
                  companyPnlAmount: -500, // loss week → user shares loss
                  status: "Paid",
                  notes: "Maintenance downtime impacted output.",
                },
                {
                  date: "2025-07-31",
                  period: "Monthly",
                  companyPnlAmount: 15000,
                  status: "Paid",
                  notes: "Oil & gas prices supportive.",
                },
                {
                  date: "2025-12-31",
                  period: "Yearly",
                  companyPnlAmount: 80000,
                  status: "Scheduled",
                  notes: "Annual allocation based on audited results.",
                },
              ],
            },
            {
              id: 3,
              name: "Hamza Real Estate",
              investedUsd: 250, // → 2.5% ownership
              reports: [
                {
                  date: "2025-08-18",
                  period: "Weekly",
                  companyPnlAmount: 2400,
                  status: "Paid",
                  notes: "Rent collections above forecast.",
                },
                {
                  date: "2025-07-31",
                  period: "Monthly",
                  companyPnlAmount: 7200,
                  status: "Paid",
                  notes: "Low vacancy; monthly distribution.",
                },
                {
                  date: "2025-12-31",
                  period: "Yearly",
                  companyPnlAmount: 65000,
                  status: "Scheduled",
                  notes: "Year-end property revaluation impact.",
                },
              ],
            },
            {
              id: 4,
              name: "Hamza Logistics",
              investedUsd: 50, // → 0.5% ownership
              reports: [
                {
                  date: "2025-08-12",
                  period: "Weekly",
                  companyPnlAmount: 300,
                  status: "Paid",
                  notes: "New route pilot.",
                },
                {
                  date: "2025-07-31",
                  period: "Monthly",
                  companyPnlAmount: -1200,
                  status: "Paid",
                  notes: "Fuel spikes & onboarding costs.",
                },
                {
                  date: "2025-12-31",
                  period: "Yearly",
                  companyPnlAmount: 15000,
                  status: "Scheduled",
                  notes: "Peak season forecast.",
                },
              ],
            },
          ],
        };

        setData(sample);
        setLoading(false);
      } catch (e) {
        setError("Failed to load dividend data");
        setLoading(false);
      }
    })();
  }, []);

  const totalEarnedYtd = useMemo(() => {
    if (!data) return 0;
    // sum only "Paid" user shares as YTD
    let total = 0;
    for (const corp of data.corporations) {
      for (const r of corp.reports) {
        if (r.status === "Paid") {
          total += userShareFromPnl(r.companyPnlAmount, corp.investedUsd);
        }
      }
    }
    return total;
  }, [data]);

  const allCorpsCsvRows = useMemo(() => {
    if (!data) return [] as string[][];
    return data.corporations.flatMap((c) => reportsToCsvRows(c));
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-xl">
        {error ?? "No data"}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen mt-14 p-6 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg border border-gray-300 p-6 md:p-8">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black flex items-center">
            <DivideCircle className="w-8 h-8 mr-3 text-black" />
            Dividends Dashboard
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Track your investments and dividend earnings across all corporations
          </p>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-base text-gray-600 font-medium">Total User P&L (Paid YTD)</p>
                <p className="text-3xl font-bold text-black mt-2">
                  ${fmtMoney(totalEarnedYtd)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Sum of your paid shares across all corporations
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-300 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-base text-gray-600 font-medium">All Corporations</p>
                <p className="text-3xl font-bold text-black mt-2">
                  {data.corporations.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-black" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Browse all companies where you can buy/sell shares
            </p>
          </div>
        </div>

        {/* Corporations (Buy/Sell quick list) */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-black mb-5 flex items-center">
            <ArrowLeftRight className="w-6 h-6 mr-2 text-black" />
            Corporations (Buy / Sell)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.corporations.map((corp) => (
              <div
                key={corp.id}
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="font-semibold text-black text-lg">
                      {corp.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-black text-lg">{corp.name}</p>
                    <p className="text-sm text-gray-600">
                      Your Invested: ${fmtMoney(corp.investedUsd)} • Ownership:{" "}
                      {ownershipPercent(corp.investedUsd)}%
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/market/${corp.id}/buy`}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Buy
                  </Link>
                  <Link
                    href={`/market/${corp.id}/sell`}
                    className="px-4 py-2 border border-gray-400 text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Sell
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dividend Details by Corporation */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-black mb-6 flex items-center">
            <DivideCircle className="w-6 h-6 mr-2 text-black" />
            Dividend Details by Corporation
          </h3>

          <div className="space-y-4">
            {data.corporations.map((corp, index) => {
              const ownPct = ownershipPercent(corp.investedUsd);

              // Group reports by period for a clearer structure
              const grouped: Record<Period, DividendReport[]> = {
                Weekly: [],
                Monthly: [],
                Yearly: [],
              };
              for (const r of corp.reports) grouped[r.period].push(r);

              const paidUserSum = corp.reports
                .filter((r) => r.status === "Paid")
                .reduce(
                  (sum, r) => sum + userShareFromPnl(r.companyPnlAmount, corp.investedUsd),
                  0
                );

              return (
                <div
                  key={corp.id}
                  className="bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedCorp(expandedCorp === index ? null : index)
                    }
                    className="w-full p-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    aria-expanded={expandedCorp === index}
                    aria-label={`Toggle details for ${corp.name}`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <span className="font-semibold text-black text-lg">
                          {corp.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-black text-lg">{corp.name}</p>
                        <p className="text-base text-gray-600">
                          Your Invested: ${fmtMoney(corp.investedUsd)} • Ownership:{" "}
                          {ownPct}% • Paid YTD: ${fmtMoney(paidUserSum)}
                        </p>
                      </div>
                    </div>
                    {expandedCorp === index ? (
                      <ChevronUp className="w-6 h-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedCorp === index ? "max-h-[1200px]" : "max-h-0"
                    }`}
                  >
                    {/* Ownership formula explanation */}
                    <div className="p-5 border-t border-gray-300 bg-gray-50">
                      <h4 className="text-base font-semibold text-black mb-3">
                        Ownership & Formula
                      </h4>
                      <p className="text-sm text-gray-700">
                        Rule: <span className="font-medium">$100</span> invested ={" "}
                        <span className="font-medium">1% ownership</span>. Your
                        ownership in <span className="font-medium">{corp.name}</span> is{" "}
                        <span className="font-medium">{ownPct}%</span>. For each report,
                        your share = <i>Company P&amp;L × (Ownership% ÷ 100)</i>. If the
                        company earns profit you receive your share as profit; if the
                        company incurs loss you bear your share of the loss.
                      </p>
                    </div>

                    {/* Weekly / Monthly / Yearly sections */}
                    {(["Weekly", "Monthly", "Yearly"] as Period[]).map((period) => (
                      <div key={period} className="p-5 border-t border-gray-300">
                        <h5 className="text-base font-semibold text-black mb-3 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-black" />
                          {period} Reports
                        </h5>

                        {grouped[period].length > 0 ? (
                          <div className="space-y-4">
                            {grouped[period].map((r, i) => {
                              const yourShare = userShareFromPnl(
                                r.companyPnlAmount,
                                corp.investedUsd
                              );
                              return (
                                <div
                                  key={`${period}-${i}`}
                                  className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
                                >
                                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <p className="text-base font-medium text-black">
                                      {new Date(r.date).toLocaleDateString()} •{" "}
                                      <span
                                        className={`${
                                          r.companyPnlAmount >= 0
                                            ? "text-black"
                                            : "text-black"
                                        }`}
                                      >
                                        Company P&amp;L: $
                                        {fmtMoney(r.companyPnlAmount)}
                                      </span>
                                    </p>
                                    <p className="text-base">
                                      Your Share:{" "}
                                      <span
                                        className={`font-semibold ${
                                          yourShare >= 0
                                            ? "text-black"
                                            : "text-black"
                                        }`}
                                      >
                                        ${fmtMoney(yourShare)}
                                      </span>{" "}
                                      ({ownPct}%)
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-2">
                                    {r.status} • {r.notes}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-base text-gray-600">No {period.toLowerCase()} reports</p>
                        )}
                      </div>
                    ))}

                    {/* Export buttons */}
                    <div className="p-5 border-t border-gray-300 flex justify-end gap-3">
                      <button
                        onClick={() =>
                          downloadCsv(
                            `${corp.name.replace(/\s+/g, "_")}_reports.csv`,
                            reportsToCsvRows(corp)
                          )
                        }
                        className="px-4 py-2 border border-gray-400 text-black rounded-lg hover:bg-gray-100 transition-colors text-base font-medium flex items-center"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download {corp.name} CSV
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Download All */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => downloadCsv("all_dividend_reports.csv", allCorpsCsvRows)}
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-base font-medium flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download All Reports
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-8 border-t border-gray-300">
          <h3 className="text-xl font-semibold text-black mb-5">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/withdraw"
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-base font-medium flex items-center"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Request Withdrawal
            </Link>
            <button
              onClick={() => downloadCsv("all_dividend_reports.csv", allCorpsCsvRows)}
              className="px-5 py-3 border border-gray-400 text-black rounded-lg hover:bg-gray-100 transition-colors text-base font-medium flex items-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Dividend Report (CSV)
            </button>
            <Link
              href="/support"
              className="px-5 py-3 border border-gray-400 text-black rounded-lg hover:bg-gray-100 transition-colors text-base font-medium flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Building2, TrendingUp, TrendingDown, PieChart, FileText, ArrowUpRight, ChevronDown, ChevronUp, Download, Calendar, Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend } from "chart.js";
import 'chartjs-adapter-date-fns'; // For time scale support

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend);

export default function CompanyInfo() {
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);

  // Enhanced sample data with more details from project documents (replace with API fetch in production)
  const companies = [
    {
      id: 1,
      symbol: "HTECH",
      name: "Hamza Tech",
      sector: "Technology",
      currentPrice: 124.50,
      change: 2.4,
      marketCap: 1250000000,
      peRatio: 22.5,
      dividendYield: 1.2,
      volume: 3200,
      high: 126.70,
      low: 123.30,
      description: "Hamza Tech is a leading innovator in AI, cloud computing, and blockchain solutions, providing scalable enterprise software and services.",
      founded: "2010-03-15",
      headquarters: "Dubai, UAE",
      employees: 2500,
      ceo: "Hamza Waheed",
      website: "https://hamzatech.com",
      financials: {
        revenue: 450000000,
        netIncome: 75000000,
        assets: 2000000000,
        liabilities: 800000000,
        ebitda: 150000000,
        eps: 3.45,
      },
      dividendHistory: [
        { date: "2023-06-15", amount: 150.00, status: "Paid", yield: 1.2 },
        { date: "2023-03-15", amount: 120.00, status: "Paid", yield: 1.0 },
      ],
      upcomingDividends: [
        { date: "2023-09-15", amount: 200.00, status: "Scheduled", yield: 1.6 },
      ],
      reports: [
        { name: "Q2 2023 Financial Report", type: "PDF", date: "2023-07-15", size: "2.4 MB", url: "/reports/htech-q2-2023.pdf", description: "Detailed quarterly financial statements and performance analysis." },
        { name: "Annual Audit 2022", type: "PDF", date: "2023-03-20", size: "5.1 MB", url: "/reports/htech-audit-2022.pdf", description: "Comprehensive audit report including balance sheets and cash flow." },
        { name: "Corporate Governance Policy", type: "PDF", date: "2023-01-10", size: "1.2 MB", url: "/reports/htech-governance.pdf", description: "Policies on board structure, ethics, and compliance." },
      ],
      roadmap: [
        { milestone: "Launch AI Platform V2", date: "2023-10-01", status: "Upcoming", details: "Enhanced AI capabilities with machine learning integration." },
        { milestone: "Expand to Asia Markets", date: "2024-01-15", status: "Planned", details: "Opening new offices in Singapore and Tokyo." },
        { milestone: "Blockchain Partnership Announcement", date: "2023-08-20", status: "Completed", details: "Collaborated with leading blockchain firms for secure data solutions." },
      ],
      projectInsights: [
        { project: "AI-Driven Analytics Tool", insights: "This tool uses advanced AI to provide real-time business insights, reducing decision-making time by 40%." },
        { project: "Cloud Infrastructure Upgrade", insights: "Upgraded to hybrid cloud model, improving scalability and reducing costs by 25%." },
        { project: "Sustainability Initiative", insights: "Implemented green data centers, achieving 30% reduction in carbon footprint." },
      ],
      performanceData: [
        { date: "2023-01-01", price: 110.00 },
        { date: "2023-02-01", price: 115.50 },
        { date: "2023-03-01", price: 118.75 },
        { date: "2023-04-01", price: 120.25 },
        { date: "2023-05-01", price: 122.00 },
        { date: "2023-06-01", price: 124.50 },
      ],
    },
    {
      id: 2,
      symbol: "HENE",
      name: "Hamza Energy",
      sector: "Energy",
      currentPrice: 58.75,
      change: -0.8,
      marketCap: 800000000,
      peRatio: 18.3,
      dividendYield: 1.5,
      volume: 4500,
      high: 59.95,
      low: 57.55,
      description: "Hamza Energy specializes in renewable energy sources, focusing on solar, wind, and hydroelectric power generation and distribution.",
      founded: "2005-07-20",
      headquarters: "Riyadh, Saudi Arabia",
      employees: 1800,
      ceo: "Hamza Waheed",
      website: "https://hamzaenergy.com",
      financials: {
        revenue: 300000000,
        netIncome: 50000000,
        assets: 1500000000,
        liabilities: 600000000,
        ebitda: 120000000,
        eps: 2.78,
      },
      dividendHistory: [
        { date: "2023-06-10", amount: 250.00, status: "Paid", yield: 1.5 },
        { date: "2023-03-10", amount: 225.00, status: "Paid", yield: 1.3 },
      ],
      upcomingDividends: [
        { date: "2023-09-10", amount: 300.00, status: "Scheduled", yield: 1.8 },
      ],
      reports: [
        { name: "Q2 2023 Energy Report", type: "PDF", date: "2023-07-10", size: "3.1 MB", url: "/reports/hene-q2-2023.pdf", description: "Quarterly report on energy production and sustainability metrics." },
        { name: "Sustainability Audit 2022", type: "PDF", date: "2023-04-15", size: "4.2 MB", url: "/reports/hene-sustainability-2022.pdf", description: "Audit focusing on environmental impact and green initiatives." },
      ],
      roadmap: [
        { milestone: "Solar Farm Expansion", date: "2023-11-01", status: "Upcoming", details: "Adding 100MW capacity in the Middle East." },
        { milestone: "Wind Energy Partnership", date: "2024-03-20", status: "Planned", details: "Collaborating with European firms for offshore wind projects." },
        { milestone: "Hydro Project Completion", date: "2023-07-30", status: "Completed", details: "Launched new hydroelectric plant increasing output by 20%." },
      ],
      projectInsights: [
        { project: "Solar Innovation Program", insights: "Developed high-efficiency solar panels, increasing energy capture by 15%." },
        { project: "Wind Turbine Optimization", insights: "AI-optimized turbines for better performance in varying wind conditions." },
        { project: "Carbon Neutral Initiative", insights: "Achieved carbon neutrality in operations through renewable sourcing." },
      ],
      performanceData: [
        { date: "2023-01-01", price: 60.00 },
        { date: "2023-02-01", price: 59.20 },
        { date: "2023-03-01", price: 58.50 },
        { date: "2023-04-01", price: 58.00 },
        { date: "2023-05-01", price: 58.75 },
        { date: "2023-06-01", price: 58.75 },
      ],
    },
    {
      id: 3,
      symbol: "HRE",
      name: "Hamza Real Estate",
      sector: "Real Estate",
      currentPrice: 92.30,
      change: 1.2,
      marketCap: 950000000,
      peRatio: 15.7,
      dividendYield: 0.8,
      volume: 2800,
      high: 93.50,
      low: 91.10,
      description: "Hamza Real Estate develops and manages premium residential, commercial, and hospitality properties in key markets.",
      founded: "2012-09-10",
      headquarters: "Abu Dhabi, UAE",
      employees: 1200,
      ceo: "Hamza Waheed",
      website: "https://hamzarealestate.com",
      financials: {
        revenue: 200000000,
        netIncome: 35000000,
        assets: 1200000000,
        liabilities: 450000000,
        ebitda: 80000000,
        eps: 2.12,
      },
      dividendHistory: [
        { date: "2023-06-20", amount: 75.00, status: "Paid", yield: 0.8 },
      ],
      upcomingDividends: [
        { date: "2023-09-20", amount: 100.00, status: "Scheduled", yield: 1.0 },
      ],
      reports: [
        { name: "Q2 2023 Property Report", type: "PDF", date: "2023-07-20", size: "1.8 MB", url: "/reports/hre-q2-2023.pdf", description: "Quarterly update on property developments and market analysis." },
        { name: "Investment Policy Document", type: "PDF", date: "2023-02-15", size: "1.5 MB", url: "/reports/hre-investment-policy.pdf", description: "Guidelines for real estate investments and risk management." },
      ],
      roadmap: [
        { milestone: "New Residential Complex Launch", date: "2023-12-01", status: "Upcoming", details: "Luxury apartments in Dubai with smart home features." },
        { milestone: "Commercial Tower Construction", date: "2024-06-15", status: "Planned", details: "State-of-the-art office spaces in Abu Dhabi." },
        { milestone: "Hospitality Project Completion", date: "2023-05-30", status: "Completed", details: "Opened 5-star hotel in Riyadh." },
      ],
      projectInsights: [
        { project: "Urban Development Initiative", insights: "Focused on sustainable urban planning, reducing water usage by 20% in new developments." },
        { project: "Commercial Leasing Program", insights: "Achieved 95% occupancy rate through innovative leasing strategies." },
        { project: "Green Building Certification", insights: "All new projects certified LEED Gold, emphasizing eco-friendly construction." },
      ],
      performanceData: [
        { date: "2023-01-01", price: 90.00 },
        { date: "2023-02-01", price: 91.00 },
        { date: "2023-03-01", price: 91.50 },
        { date: "2023-04-01", price: 92.00 },
        { date: "2023-05-01", price: 92.30 },
        { date: "2023-06-01", price: 92.30 },
      ],
    },
    {
      id: 4,
      symbol: "HLOG",
      name: "Hamza Logistics",
      sector: "Transportation",
      currentPrice: 45.60,
      change: 3.1,
      marketCap: 600000000,
      peRatio: 20.1,
      dividendYield: 0.5,
      volume: 3500,
      high: 46.80,
      low: 44.40,
      description: "Hamza Logistics offers comprehensive supply chain management, freight forwarding, and transportation services worldwide.",
      founded: "2015-01-25",
      headquarters: "Doha, Qatar",
      employees: 900,
      ceo: "Hamza Waheed",
      website: "https://hamzalogistics.com",
      financials: {
        revenue: 150000000,
        netIncome: 25000000,
        assets: 800000000,
        liabilities: 300000000,
        ebitda: 60000000,
        eps: 1.67,
      },
      dividendHistory: [],
      upcomingDividends: [
        { date: "2023-09-05", amount: 25.00, status: "Scheduled", yield: 0.5 },
      ],
      reports: [
        { name: "Q2 2023 Logistics Report", type: "PDF", date: "2023-07-05", size: "2.0 MB", url: "/reports/hlog-q2-2023.pdf", description: "Analysis of supply chain efficiency and global operations." },
        { name: "Audit Log 2022", type: "PDF", date: "2023-04-10", size: "3.5 MB", url: "/reports/hlog-audit-2022.pdf", description: "Detailed audit of logistics operations and compliance." },
      ],
      roadmap: [
        { milestone: "Fleet Expansion", date: "2023-10-15", status: "Upcoming", details: "Adding 50 new electric vehicles to the fleet." },
        { milestone: "Global Warehouse Network", date: "2024-02-01", status: "Planned", details: "Opening warehouses in Europe and Asia." },
        { milestone: "AI Supply Chain System", date: "2023-06-15", status: "Completed", details: "Implemented AI for route optimization, reducing costs by 15%." },
      ],
      projectInsights: [
        { project: "Smart Logistics Platform", insights: "AI-powered platform for real-time tracking, improving delivery times by 25%." },
        { project: "Sustainable Transport Initiative", insights: "Shifted to eco-friendly vehicles, reducing emissions by 30%." },
        { project: "E-commerce Integration", insights: "Partnered with major e-commerce platforms for seamless logistics." },
      ],
      performanceData: [
        { date: "2023-01-01", price: 42.00 },
        { date: "2023-02-01", price: 43.50 },
        { date: "2023-03-01", price: 44.00 },
        { date: "2023-04-01", price: 44.50 },
        { date: "2023-05-01", price: 45.00 },
        { date: "2023-06-01", price: 45.60 },
      ],
    },
  ];

  const toggleCompanyExpand = (index: number) => {
    setExpandedCompany(expandedCompany === index ? null : index);
  };

  // Chart configuration for performance history
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time" as const,
        time: { unit: "month" as const },
        title: { display: true, text: "Date", color: "#000000" },
        ticks: { color: "#000000" },
      },
      y: {
        title: { display: true, text: "Price ($)", color: "#000000" },
        ticks: { color: "#000000" },
      },
    },
    plugins: {
      legend: { position: "top" as const, labels: { color: "#000000" } },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            {/* <h2 className="text-2xl font-bold text-black flex items-center">
              <Building2 className="w-6 h-6 mr-2 text-black" />
              Company Information
            </h2> */}
            <p className="text-gray-600 mt-1 text-sm">Detailed insights, roadmaps, financials, and reports for Hamza Waheed corporations</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Link
              href="/portfolio"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Company List */}
        <div className="space-y-4">
          {companies.map((company, index) => {
            const chartData = {
              labels: company.performanceData.map(data => data.date),
              datasets: [
                {
                  label: `${company.name} Price`,
                  data: company.performanceData.map(data => data.price),
                  borderColor: "#1f77b4",
                  backgroundColor: "rgba(31, 119, 180, 0.2)",
                  fill: true,
                  tension: 0.3,
                },
              ],
            };

            return (
              <div key={company.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <button
                  onClick={() => toggleCompanyExpand(index)}
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="font-medium text-black">{company.name.charAt(0)}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-black">{company.name} ({company.symbol})</p>
                      <p className="text-sm text-gray-600">{company.sector}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium text-black">${company.currentPrice.toFixed(2)}</p>
                      <p className={`text-sm flex items-center justify-end ${company.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {company.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {Math.abs(company.change)}%
                      </p>
                    </div>
                    {expandedCompany === index ? (
                      <ChevronUp className="w-5 h-5 text-black" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-black" />
                    )}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedCompany === index ? "max-h-[1200px]" : "max-h-0"}`}>
                  <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Overview, Financials, and Insights */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-black mb-2">Company Overview</h4>
                      <p className="text-sm text-gray-600 mb-4">{company.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-gray-600">Founded:</span>
                        <span className="text-black">{new Date(company.founded).toLocaleDateString()}</span>
                        <span className="text-gray-600">Headquarters:</span>
                        <span className="text-black">{company.headquarters}</span>
                        <span className="text-gray-600">Employees:</span>
                        <span className="text-black">{company.employees.toLocaleString()}</span>
                        <span className="text-gray-600">CEO:</span>
                        <span className="text-black">{company.ceo}</span>
                        <span className="text-gray-600">Website:</span>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 flex items-center">
                          Visit <Globe className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                      <h4 className="text-sm font-medium text-black mt-4 mb-2">Key Financials</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-gray-600">Market Cap:</span>
                        <span className="text-black">${(company.marketCap / 1000000).toFixed(2)}M</span>
                        <span className="text-gray-600">P/E Ratio:</span>
                        <span className="text-black">{company.peRatio.toFixed(2)}</span>
                        <span className="text-gray-600">Dividend Yield:</span>
                        <span className="text-black">{company.dividendYield}%</span>
                        <span className="text-gray-600">Revenue:</span>
                        <span className="text-black">${(company.financials.revenue / 1000000).toFixed(2)}M</span>
                        <span className="text-gray-600">Net Income:</span>
                        <span className="text-black">${(company.financials.netIncome / 1000000).toFixed(2)}M</span>
                        <span className="text-gray-600">Assets:</span>
                        <span className="text-black">${(company.financials.assets / 1000000).toFixed(2)}M</span>
                        <span className="text-gray-600">Liabilities:</span>
                        <span className="text-black">${(company.financials.liabilities / 1000000).toFixed(2)}M</span>
                        <span className="text-gray-600">EBITDA:</span>
                        <span className="text-black">${(company.financials.ebitda / 1000000).toFixed(2)}M</span>
                        <span className="text-gray-600">EPS:</span>
                        <span className="text-black">${company.financials.eps.toFixed(2)}</span>
                      </div>
                    </div>
                    {/* Right Column: Performance Chart */}
                    <div>
                      <h4 className="text-sm font-medium text-black mb-2">Price Performance (6 Months)</h4>
                      <div className="h-64">
                        <Line data={chartData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                  {/* Roadmap */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <h4 className="text-sm font-medium text-black mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Roadmap
                    </h4>
                    <div className="space-y-3">
                      {company.roadmap.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <div>
                            <p className="text-sm font-medium text-black">{item.milestone}</p>
                            <p className="text-xs text-gray-600">{item.details}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-black">{new Date(item.date).toLocaleDateString()}</p>
                            <p className={`text-xs ${item.status === "Completed" ? "text-green-600" : item.status === "Upcoming" ? "text-blue-600" : "text-gray-600"}`}>{item.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Project Insights */}
                  <div className="p-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-black mb-2 flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      Project Insights
                    </h4>
                    <div className="space-y-3">
                      {company.projectInsights.map((insight, insightIndex) => (
                        <div key={insightIndex}>
                          <p className="text-sm font-medium text-black">{insight.project}</p>
                          <p className="text-sm text-gray-600">{insight.insights}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Dividends */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <h4 className="text-sm font-medium text-black mb-2 flex items-center">
                      <PieChart className="w-4 h-4 mr-1" />
                      Dividends
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium text-black mb-1">History</h5>
                        {company.dividendHistory.length > 0 ? (
                          <div className="space-y-2 text-sm">
                            {company.dividendHistory.map((div, divIndex) => (
                              <div key={divIndex} className="flex justify-between">
                                <span className="text-gray-600">{new Date(div.date).toLocaleDateString()} ({div.status}, Yield: {div.yield}%):</span>
                                <span className="text-green-600">${div.amount.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">No dividend history</p>
                        )}
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-black mb-1">Upcoming</h5>
                        {company.upcomingDividends.length > 0 ? (
                          <div className="space-y-2 text-sm">
                            {company.upcomingDividends.map((div, divIndex) => (
                              <div key={divIndex} className="flex justify-between">
                                <span className="text-gray-600">{new Date(div.date).toLocaleDateString()} ({div.status}, Yield: {div.yield}%):</span>
                                <span className="text-black">${div.amount.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">No upcoming dividends</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Reports */}
                  <div className="p-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-black mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Reports & Audits
                    </h4>
                    <div className="space-y-3">
                      {company.reports.map((report, reportIndex) => (
                        <div key={reportIndex} className="flex justify-between items-center border border-gray-200 p-3 rounded-md">
                          <div>
                            <p className="text-sm font-medium text-black">{report.name}</p>
                            <p className="text-xs text-gray-600">{report.description}</p>
                            <p className="text-xs text-gray-500">{new Date(report.date).toLocaleDateString()} • {report.size}</p>
                          </div>
                          <a href={report.url} download className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <Download className="w-4 h-4 text-black" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
                    <Link
                      href={`/buy?corp=${company.id}`}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
                    >
                      Buy Shares
                    </Link>
                    <Link
                      href={`/buy?corp=${company.id}&action=sell`}
                      className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
                    >
                      Buy Shares
                    </Link>
                    <Link
                      href="/support"
                      className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Portfolio
            </Link>
            <Link
              href="/dividends"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <PieChart className="w-4 h-4 mr-2" />
              Manage Dividends
            </Link>
            <button className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

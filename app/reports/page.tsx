
"use client";

import { FileText, Download, Filter, Calendar, ChevronDown, ChevronUp, ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Reports() {
  const [filterCorp, setFilterCorp] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [expandedReport, setExpandedReport] = useState<number | null>(null);

  // Sample data based on project requirements (replace with API fetch in production)
  const reportsData = {
    corporations: [
      { id: 0, name: "All Corporations" },
      { id: 1, name: "Hamza Tech", symbol: "HTECH" },
      { id: 2, name: "Hamza Energy", symbol: "HENE" },
      { id: 3, name: "Hamza Real Estate", symbol: "HRE" },
      { id: 4, name: "Hamza Logistics", symbol: "HLOG" },
    ],
    reports: [
      {
        id: 1,
        corporationId: 1,
        name: "Q2 2023 Financial Report",
        type: "PDF",
        date: "2023-07-15",
        size: "2.4 MB",
        url: "/reports/htech-q2-2023.pdf",
        description: "Detailed quarterly financial statements, including revenue, expenses, and profit margins for Hamza Tech.",
        category: "Financial",
      },
      {
        id: 2,
        corporationId: 1,
        name: "Annual Audit 2022",
        type: "PDF",
        date: "2023-03-20",
        size: "5.1 MB",
        url: "/reports/htech-audit-2022.pdf",
        description: "Comprehensive audit report covering balance sheets, cash flow, and compliance for Hamza Tech.",
        category: "Audit",
      },
      {
        id: 3,
        corporationId: 1,
        name: "Corporate Governance Policy",
        type: "PDF",
        date: "2023-01-10",
        size: "1.2 MB",
        url: "/reports/htech-governance.pdf",
        description: "Policies outlining board structure, ethics, and compliance standards for Hamza Tech.",
        category: "Governance",
      },
      {
        id: 4,
        corporationId: 2,
        name: "Q2 2023 Energy Report",
        type: "PDF",
        date: "2023-07-10",
        size: "3.1 MB",
        url: "/reports/hene-q2-2023.pdf",
        description: "Quarterly report on energy production, sustainability metrics, and operational efficiency for Hamza Energy.",
        category: "Financial",
      },
      {
        id: 5,
        corporationId: 2,
        name: "Sustainability Audit 2022",
        type: "PDF",
        date: "2023-04-15",
        size: "4.2 MB",
        url: "/reports/hene-sustainability-2022.pdf",
        description: "Audit focusing on environmental impact, renewable energy adoption, and green initiatives for Hamza Energy.",
        category: "Audit",
      },
      {
        id: 6,
        corporationId: 3,
        name: "Q2 2023 Property Report",
        type: "PDF",
        date: "2023-07-20",
        size: "1.8 MB",
        url: "/reports/hre-q2-2023.pdf",
        description: "Quarterly update on property developments, market trends, and leasing performance for Hamza Real Estate.",
        category: "Financial",
      },
      {
        id: 7,
        corporationId: 3,
        name: "Investment Policy Document",
        type: "PDF",
        date: "2023-02-15",
        size: "1.5 MB",
        url: "/reports/hre-investment-policy.pdf",
        description: "Guidelines for real estate investments, risk management, and portfolio strategies for Hamza Real Estate.",
        category: "Governance",
      },
      {
        id: 8,
        corporationId: 4,
        name: "Q2 2023 Logistics Report",
        type: "PDF",
        date: "2023-07-05",
        size: "2.0 MB",
        url: "/reports/hlog-q2-2023.pdf",
        description: "Analysis of supply chain efficiency, fleet performance, and global operations for Hamza Logistics.",
        category: "Financial",
      },
      {
        id: 9,
        corporationId: 4,
        name: "Audit Log 2022",
        type: "PDF",
        date: "2023-04-10",
        size: "3.5 MB",
        url: "/reports/hlog-audit-2022.pdf",
        description: "Detailed audit of logistics operations, compliance, and risk management for Hamza Logistics.",
        category: "Audit",
      },
    ],
  };

  // Filter and sort reports
  const filteredReports = reportsData.reports
    .filter(report => filterCorp === "all" || report.corporationId === parseInt(filterCorp))
    .filter(report => filterType === "all" || report.type === filterType)
    .filter(report => {
      if (filterDate === "all") return true;
      const reportDate = new Date(report.date);
      const now = new Date();
      if (filterDate === "last-30") return reportDate >= new Date(now.setDate(now.getDate() - 30));
      if (filterDate === "last-90") return reportDate >= new Date(now.setDate(now.getDate() - 90));
      if (filterDate === "last-year") return reportDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return 0;
    });

  const toggleReportExpand = (id: number) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black flex items-center">
              <FileText className="w-6 h-6 mr-2 text-black" />
              Reports & Audits
            </h2>
            <p className="text-gray-600 mt-1 text-sm">Access, filter, and generate financial reports and audits for all corporations</p>
          </div>
          {/* <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Link
              href="/company-info"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              View Company Info
            </Link>
          </div> */}
        </div>

        {/* Filters */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-black" />
            Filter Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Corporation</label>
              <select
                value={filterCorp}
                onChange={(e) => setFilterCorp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
              >
                {reportsData.corporations.map(corp => (
                  <option key={corp.id} value={corp.id}>{corp.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Report Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
              >
                <option value="all">All Types</option>
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Date Range</label>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
              >
                <option value="all">All Time</option>
                <option value="last-30">Last 30 Days</option>
                <option value="last-90">Last 90 Days</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-black mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
            </select>
          </div>
        </div>

        {/* Report List */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-black" />
            Available Reports
          </h3>
          {filteredReports.length > 0 ? (
            <div className="space-y-3">
              {filteredReports.map(report => (
                <div key={report.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <button
                    onClick={() => toggleReportExpand(report.id)}
                    className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-black">{report.name}</p>
                        <p className="text-sm text-gray-600">
                          {reportsData.corporations.find(corp => corp.id === report.corporationId)?.name} • {report.category} • {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <a href={report.url} download className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <Download className="w-4 h-4 text-black" />
                      </a>
                      {expandedReport === report.id ? (
                        <ChevronUp className="w-5 h-5 text-black" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-black" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedReport === report.id ? "max-h-96" : "max-h-0"}`}>
                    <div className="p-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="text-black">{report.type}</span>
                        <span className="text-gray-600">Size:</span>
                        <span className="text-black">{report.size}</span>
                        <span className="text-gray-600">Date:</span>
                        <span className="text-black">{new Date(report.date).toLocaleDateString()}</span>
                        <span className="text-gray-600">Category:</span>
                        <span className="text-black">{report.category}</span>
                      </div>
                      <div className="mt-4 flex justify-end space-x-3">
                        <button className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                          <Search className="w-4 h-4 mr-2" />
                          Preview
                        </button>
                        <a href={report.url} download className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No reports match the selected filters.</p>
          )}
        </div>

        {/* Generate Custom Report */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-black" />
            Generate Custom Report
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Create a custom report by selecting the desired metrics and format.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Report Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                >
                  <option value="performance">Performance Summary</option>
                  <option value="dividend">Dividend Report</option>
                  <option value="financial">Financial Overview</option>
                  <option value="audit">Audit Summary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Format</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
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
              href="/company-info"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
            
              Company Information
            </Link>
            <Link
              href="/dividends"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Manage Dividends
            </Link>
            <Link
              href="/support"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

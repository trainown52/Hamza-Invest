
"use client";

import { HelpCircle, Mail, MessageSquare, Phone, FileText, ChevronDown, ChevronUp, ArrowUpRight, Send, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Support() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketPriority, setTicketPriority] = useState("Medium");

  // Sample data based on project requirements (replace with API fetch in production)
  const supportData = {
    faqs: [
      {
        id: 1,
        category: "Account Management",
        questions: [
          { question: "How do I reset my password?", answer: "Go to the login page, click 'Forgot Password,' and follow the instructions to reset via email." },
          { question: "How do I update my profile details?", answer: "Navigate to the Profile section in the Investor Panel and edit your information." },
        ],
      },
      {
        id: 2,
        category: "Trading",
        questions: [
          { question: "How do I buy shares?", answer: "Visit the Trade section, select a corporation, and submit a buy order with the desired quantity." },
          { question: "What are the trading fees?", answer: "Trading fees vary by transaction size. Check the Trade page for a detailed fee schedule." },
        ],
      },
      {
        id: 3,
        category: "Dividends",
        questions: [
          { question: "When are dividends paid?", answer: "Dividends are paid quarterly. Check the Dividends section for schedules." },
          { question: "How do I enable auto-withdrawal?", answer: "Toggle the auto-withdrawal option in the Dividends section and select a payment method." },
        ],
      },
    ],
    tickets: [
      {
        id: 1,
        subject: "Issue with Dividend Payment",
        status: "Resolved",
        priority: "High",
        date: "2023-06-10",
        description: "Dividend for Q2 2023 not credited to bank account.",
        response: "Issue resolved. Funds transferred on 2023-06-12.",
      },
      {
        id: 2,
        subject: "Unable to Access Trade Page",
        status: "In Progress",
        priority: "Medium",
        date: "2023-07-01",
        description: "Error 403 when accessing the Trade section.",
        response: "Our team is investigating. Update expected by 2023-07-05.",
      },
      {
        id: 3,
        subject: "Report Download Failure",
        status: "Open",
        priority: "Low",
        date: "2023-07-15",
        description: "Unable to download Q2 2023 Financial Report for Hamza Tech.",
        response: "Awaiting response from support team.",
      },
    ],
    contactMethods: [
      { type: "Email", value: "support@hamzawinvest.com", icon: <Mail className="w-5 h-5 text-black" /> },
      { type: "Live Chat", value: "Start Chat", link: "/support/chat", icon: <MessageSquare className="w-5 h-5 text-black" /> },
      { type: "Phone", value: "+971-4-123-4567", icon: <Phone className="w-5 h-5 text-black" /> },
    ],
    guides: [
      { name: "Investor Panel User Guide", type: "PDF", size: "1.8 MB", url: "/guides/investor-panel-guide.pdf", description: "Complete guide to navigating the Investor Panel." },
      { name: "Trading Manual", type: "PDF", size: "2.5 MB", url: "/guides/trading-manual.pdf", description: "Step-by-step instructions for trading shares." },
    ],
  };

  const toggleFAQExpand = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const toggleTicketExpand = (id: number) => {
    setExpandedTicket(expandedTicket === id ? null : id);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission (replace with API POST in production)
    console.log("Submitting ticket:", { subject: ticketSubject, message: ticketMessage, priority: ticketPriority });
    setTicketSubject("");
    setTicketMessage("");
    setTicketPriority("Medium");
  };

  return (
    <div className="bg-gray-100 mt-14 min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black flex items-center">
              <HelpCircle className="w-6 h-6 mr-2 text-black" />
              Support Center
            </h2>
            <p className="text-gray-600 mt-1 text-sm">Access help resources, submit tickets, or contact our support team</p>
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

        {/* FAQs */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-black" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {supportData.faqs.map(faq => (
              <div key={faq.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <button
                  onClick={() => toggleFAQExpand(faq.id)}
                  className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <p className="font-medium text-black">{faq.category}</p>
                    <p className="text-sm text-gray-600">{faq.questions.length} Questions</p>
                  </div>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedFAQ === faq.id ? "max-h-[500px]" : "max-h-0"}`}>
                  <div className="p-4 border-t border-gray-200">
                    {faq.questions.map((q, index) => (
                      <div key={index} className="mb-4">
                        <p className="text-sm font-medium text-black">{q.question}</p>
                        <p className="text-sm text-gray-600">{q.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Support Ticket */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Send className="w-5 h-5 mr-2 text-black" />
            Submit a Support Ticket
          </h3>
          <form onSubmit={handleTicketSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Subject</label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                placeholder="Enter ticket subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Priority</label>
              <select
                value={ticketPriority}
                onChange={(e) => setTicketPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black mb-1">Message</label>
              <textarea
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                placeholder="Describe your issue"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Ticket
              </button>
            </div>
          </form>
        </div>

        {/* Ticket History */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-black" />
            Ticket History
          </h3>
          {supportData.tickets.length > 0 ? (
            <div className="space-y-3">
              {supportData.tickets.map(ticket => (
                <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <button
                    onClick={() => toggleTicketExpand(ticket.id)}
                    className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5 text-black" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-black">{ticket.subject}</p>
                        <p className="text-sm text-gray-600">
                          Status: {ticket.status} • Priority: {ticket.priority} • {new Date(ticket.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {expandedTicket === ticket.id ? (
                      <ChevronUp className="w-5 h-5 text-black" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-black" />
                    )}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedTicket === ticket.id ? "max-h-96" : "max-h-0"}`}>
                    <div className="p-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      <p className="text-sm text-black">
                        <span className="font-medium">Response:</span> {ticket.response}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No support tickets found.</p>
          )}
        </div>

        {/* Contact Methods */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-black" />
            Contact Support
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportData.contactMethods.map((method, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md">
                {method.icon}
                <div>
                  <p className="text-sm font-medium text-black">{method.type}</p>
                  {method.link ? (
                    <Link href={method.link} className="text-sm text-gray-600 hover:text-black">
                      {method.value}
                    </Link>
                  ) : (
                    <p className="text-sm text-gray-600">{method.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guides and Resources */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-black" />
            Guides and Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportData.guides.map((guide, index) => (
              <div key={index} className="flex justify-between items-center border border-gray-200 p-3 rounded-md">
                <div>
                  <p className="text-sm font-medium text-black">{guide.name}</p>
                  <p className="text-xs text-gray-600">{guide.description}</p>
                  <p className="text-xs text-gray-500">{guide.size} • {guide.type}</p>
                </div>
                <a href={guide.url} download className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
               
                </a>
              </div>
            ))}
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
            {/* <Link
              href="/company-info"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Company Information
            </Link> */}
            <Link
              href="/dividends"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Manage Dividends
            </Link>
            <Link
              href="/reports"
              className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

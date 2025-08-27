
"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Building, Twitter, Linkedin, Instagram } from "lucide-react";

// Mock user role check (replace with actual auth logic from your auth provider)
const isAdmin = false; // Placeholder: Replace with actual auth check (e.g., from context or auth provider)

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-black mb-3">Contact Us</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-black" />
              <a href="mailto:support@hamzainvest.com" className="hover:text-gray-600 hover:underline transition">
                support@hamzainvest.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-black" />
              <a href="tel:+1234567890" className="hover:text-gray-600 hover:underline transition">
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-black" />
              <span>Dubai, UAE</span>
            </li>
          </ul>
          <div className="flex space-x-3 pt-2">
            <a href="https://twitter.com" className="text-black hover:text-gray-600 transition">
              <Twitter size={18} />
            </a>
            <a href="https://linkedin.com" className="text-black hover:text-gray-600 transition">
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com" className="text-black hover:text-gray-600 transition">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Company Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Building size={24} className="text-black" />
            <h2 className="text-xl font-bold text-black">Hamza Invest</h2>
          </div>
          <p className="text-xs text-black leading-tight">
            Your trusted platform for secure investments across Hamza Waheed's corporations. Empowering wealth with transparency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold text-black mb-3">Quick Links</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-gray-600 hover:underline transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-gray-600 hover:underline transition">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/buy" className="hover:text-gray-600 hover:underline transition">
                Buy
              </Link>
            </li>
            <li>
              <Link href="/dividend" className="hover:text-gray-600 hover:underline transition">
                Dividends
              </Link>
            </li>
            {/* <li>
              <Link href="/company-inf" className="hover:text-gray-600 hover:underline transition">
                Company Info
              </Link>
            </li> */}
            <li>
              <Link href="/reports" className="hover:text-gray-600 hover:underline transition">
                Reports
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-gray-600 hover:underline transition">
                Support
              </Link>
            </li>
            {/* <li>
              <Link href="/settingsx" className="hover:text-gray-600 hover:underline transition">
                Settings
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Admin Links & Legal */}
        <div className="space-y-4">
          {/* Admin Links (Conditional) */}
          {isAdmin && (
            <div>
              <h3 className="text-base font-semibold text-black mb-3">Admin Panel</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/admin/dashboard" className="hover:text-gray-600 hover:underline transition">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/corporations" className="hover:text-gray-600 hover:underline transition">
                    Corporation Management
                  </Link>
                </li>
                <li>
                  <Link href="/admin/uploads" className="hover:text-gray-600 hover:underline transition">
                    Upload Center
                  </Link>
                </li>
                <li>
                  <Link href="/admin/withdrawals" className="hover:text-gray-600 hover:underline transition">
                    Withdrawal Requests
                  </Link>
                </li>
                <li>
                  <Link href="/admin/users" className="hover:text-gray-600 hover:underline transition">
                    User Management
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Legal */}
          <div>
            <h3 className="text-base font-semibold text-black mb-3">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-600 hover:underline transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-600 hover:underline transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/investment-agreements" className="hover:text-gray-600 hover:underline transition">
                  Investment Agreements
                </Link>
              </li>
              <li>
                <Link href="/company-instructions" className="hover:text-gray-600 hover:underline transition">
                  Company Instructions
                </Link>
              </li>
              <li>
                <Link href="/audit-reports" className="hover:text-gray-600 hover:underline transition">
                  Audit Reports
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-gray-600 hover:underline transition">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-black space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} Hamza Invest. All rights reserved.</p>
          <p>Powered by Hamza Waheed Corporations</p>
        </div>
      </div>
    </footer>
  );
}

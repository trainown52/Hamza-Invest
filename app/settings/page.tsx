
"use client";

import { FC, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { Settings2, User, Bell, CreditCard, Lock, Code, Save, ArrowUpRight, Banknote, Bitcoin, Trash2 } from "lucide-react";

// Debugging log to verify component loading
console.log("Settings component loaded");

// Error Boundary Component
const ErrorBoundary: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (error) console.error("Error in Settings:", error);
  }, [error]);
  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;
  return <>{children}</>;
};

// Define types for state
interface Profile {
  name: string;
  email: string;
  phone: string;
}

interface Notifications {
  email: { dividends: boolean; trades: boolean; reports: boolean };
  sms: { dividends: boolean; trades: boolean; reports: boolean };
  inApp: { dividends: boolean; trades: boolean; reports: boolean };
}

interface PaymentMethod {
  id: number;
  type: string;
  details: string;
  isDefault: boolean;
}

interface NewPaymentMethod {
  type: string;
  details: string;
}

interface Security {
  twoFactor: boolean;
  password: string;
  confirmPassword: string;
}

interface Session {
  id: number;
  device: string;
  lastActive: string;
  ip: string;
}

const Settings: FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "payment" | "security" | "api">("profile");
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@hamzawinvest.com",
    phone: "+971-4-123-4567",
  });
  const [notifications, setNotifications] = useState<Notifications>({
    email: { dividends: true, trades: true, reports: false },
    sms: { dividends: false, trades: false, reports: false },
    inApp: { dividends: true, trades: true, reports: true },
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: "Bank Transfer", details: "****1234", isDefault: true },
    { id: 2, type: "Credit Card", details: "****5678", isDefault: false },
  ]);
  const [newPaymentMethod, setNewPaymentMethod] = useState<NewPaymentMethod>({ type: "bank", details: "" });
  const [security, setSecurity] = useState<Security>({
    twoFactor: false,
    password: "",
    confirmPassword: "",
  });
  const [apiKey, setApiKey] = useState<string>("****-****-****-****");

  // Mock data for sessions (replace with API: GET /api/user/sessions)
  const sessions: Session[] = [
    { id: 1, device: "Chrome on Windows", lastActive: "2023-08-17T15:30:00", ip: "192.168.1.1" },
    { id: 2, device: "Safari on iPhone", lastActive: "2023-08-16T10:15:00", ip: "192.168.1.2" },
  ];

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Updating profile:", profile); // Replace with POST /api/user/settings/profile
  };

  const handleNotificationChange = (type: keyof Notifications, key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: { ...prev[type], [key]: value },
    }));
  };

  const handlePaymentMethodAdd = (e: FormEvent) => {
    e.preventDefault();
    if (newPaymentMethod.details) {
      setPaymentMethods(prev => [
        ...prev,
        { id: prev.length + 1, type: newPaymentMethod.type, details: newPaymentMethod.details, isDefault: false },
      ]);
      setNewPaymentMethod({ type: "bank", details: "" });
      console.log("Adding payment method:", newPaymentMethod); // Replace with POST /api/user/payment-methods
    }
  };

  const handlePaymentMethodRemove = (id: number) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    console.log("Removing payment method:", id); // Replace with DELETE /api/user/payment-methods/:id
  };

  const handleSecuritySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (security.password === security.confirmPassword) {
      console.log("Updating security:", security); // Replace with POST /api/user/settings/security
      setSecurity({ ...security, password: "", confirmPassword: "" });
    } else {
      alert("Passwords do not match");
    }
  };

  const handleGenerateApiKey = () => {
    setApiKey("new-api-key-1234-5678");
    console.log("Generated new API key"); // Replace with POST /api/user/api-key
  };

  return (
    <ErrorBoundary>
      <div className="bg-gray-100 min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black flex items-center">
                <Settings2 className="w-6 h-6 mr-2 text-black" aria-hidden="true" />
                Settings
              </h2>
              <p className="text-gray-600 mt-1 text-sm">Manage your account, notifications, payment methods, and security settings</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Link
                href="/portfolio"
                className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" aria-hidden="true" />
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200">
            {(["profile", "notifications", "payment", "security", "api"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab ? "border-b-2 border-black text-black" : "text-gray-600 hover:text-black"
                }`}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-black" aria-hidden="true" />
                Profile Settings
              </h3>
              <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-black" aria-hidden="true" />
                Notification Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["email", "sms", "inApp"] as const).map(type => (
                  <div key={type}>
                    <h4 className="text-sm font-medium text-black mb-2 capitalize">{type}</h4>
                    <div className="space-y-2">
                      {Object.keys(notifications[type]).map(key => (
                        <label key={key} className="flex items-center space-x-2 text-sm text-black">
                          <input
                            type="checkbox"
                            checked={notifications[type][key as keyof typeof notifications.email]}
                            onChange={e => handleNotificationChange(type, key, e.target.checked)}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                          />
                          <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => console.log("Saving notifications:", notifications)}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                  Save Notifications
                </button>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {activeTab === "payment" && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-black" aria-hidden="true" />
                Payment Methods
              </h3>
              <div className="space-y-3 mb-4">
                {paymentMethods.length > 0 ? (
                  paymentMethods.map(method => (
                    <div key={method.id} className="flex justify-between items-center border border-gray-200 p-3 rounded-md">
                      <div className="flex items-center space-x-3">
                        {method.type === "Bank Transfer" ? (
                          <Banknote className="w-5 h-5 text-black" aria-hidden="true" />
                        ) : (
                          <Bitcoin className="w-5 h-5 text-black" aria-hidden="true" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-black">{method.type}</p>
                          <p className="text-xs text-gray-600">{method.details}</p>
                          {method.isDefault && <p className="text-xs text-green-600">Default</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => handlePaymentMethodRemove(method.id)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={`Remove ${method.type} payment method`}
                      >
                        <Trash2 className="w-4 h-4 text-black" aria-hidden="true" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No payment methods added.</p>
                )}
              </div>
              <form onSubmit={handlePaymentMethodAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="payment-type" className="block text-sm font-medium text-black mb-1">
                    Payment Type
                  </label>
                  <select
                    id="payment-type"
                    value={newPaymentMethod.type}
                    onChange={e => setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                  >
                    <option value="bank">Bank Transfer</option>
                    <option value="card">Credit Card</option>
                    <option value="crypto">Crypto Wallet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="payment-details" className="block text-sm font-medium text-black mb-1">
                    Details
                  </label>
                  <input
                    id="payment-details"
                    type="text"
                    value={newPaymentMethod.details}
                    onChange={e => setNewPaymentMethod({ ...newPaymentMethod, details: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                    placeholder="Enter account details"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                    Add Payment Method
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-black" aria-hidden="true" />
                Security Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm text-black">
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={e => setSecurity({ ...security, twoFactor: e.target.checked })}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <span>Enable Two-Factor Authentication (2FA)</span>
                  </label>
                </div>
                <form onSubmit={handleSecuritySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                      New Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={security.password}
                      onChange={e => setSecurity({ ...security, password: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-black mb-1">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={security.confirmPassword}
                      onChange={e => setSecurity({ ...security, confirmPassword: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                      Update Password
                    </button>
                  </div>
                </form>
                <div>
                  <h4 className="text-sm font-medium text-black mb-2">Active Sessions</h4>
                  {sessions.length > 0 ? (
                    sessions.map(session => (
                      <div key={session.id} className="flex justify-between items-center border border-gray-200 p-3 rounded-md mb-2">
                        <div>
                          <p className="text-sm font-medium text-black">{session.device}</p>
                          <p className="text-xs text-gray-600">Last Active: {new Date(session.lastActive).toLocaleString()}</p>
                          <p className="text-xs text-gray-600">IP: {session.ip}</p>
                        </div>
                        <button
                          onClick={() => console.log("Terminating session:", session.id)}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          aria-label={`Terminate session on ${session.device}`}
                        >
                          <Trash2 className="w-4 h-4 text-black" aria-hidden="true" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">No active sessions found.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* API Access */}
          {activeTab === "api" && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-black" aria-hidden="true" />
                API Access
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage your API key for accessing xAI’s API service. For more details, visit{" "}
                <a href="https://x.ai/api" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                  xAI API Documentation
                </a>.
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black bg-gray-100"
                  aria-label="API Key"
                />
                <button
                  onClick={handleGenerateApiKey}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
                >
                  <Code className="w-4 h-4 mr-2" aria-hidden="true" />
                  Generate New Key
                </button>
              </div>
              <p className="text-xs text-gray-600">Keep your API key secure and do not share it publicly.</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/portfolio"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" aria-hidden="true" />
                View Portfolio
              </Link>
              {/* <Link
                href="/company-info"
                className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
              >
                <User className="w-4 h-4 mr-2" aria-hidden="true" />
                Company Information
              </Link> */}
              <Link
                href="/dividends"
                className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
              >
                <CreditCard className="w-4 h-4 mr-2" aria-hidden="true" />
                Manage Dividends
              </Link>
              <Link
                href="/reports"
                className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center"
              >
               
                View Reports
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
      </div>
    </ErrorBoundary>
  );
};

export default Settings;
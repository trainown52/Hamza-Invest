"use client";
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  PieChart,
  Info,
  CreditCard,
  Banknote,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  History,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TradeComponent() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [selectedCorp, setSelectedCorp] = useState("HTECH");
  const [quantity, setQuantity] = useState(10);
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [corporations, setCorporations] = useState([
    { symbol: "HTECH", name: "Hamza Tech", price: 124.5, change: 2.4 },
    { symbol: "HENE", name: "Hamza Energy", price: 58.75, change: -0.8 },
    { symbol: "HRE", name: "Hamza Real Estate", price: 92.3, change: 1.2 },
    { symbol: "HLOG", name: "Hamza Logistics", price: 45.6, change: 3.1 },
  ]);
  const [priceHistory, setPriceHistory] = useState<Record<string, { time: string; price: number }[]>>({});

  const portfolio = {
    cashBalance: 12500.75,
    holdings: [
      { symbol: "HTECH", shares: 50, avgPrice: 118.25 },
      { symbol: "HENE", shares: 120, avgPrice: 56.4 },
    ],
  };
  const transactionHistory = [
    {
      date: "2023-07-15",
      type: "Buy",
      symbol: "HTECH",
      quantity: 20,
      price: 120.0,
      total: 2400.0,
      status: "Completed",
    },
    {
      date: "2023-06-10",
      type: "Sell",
      symbol: "HENE",
      quantity: 10,
      price: 115.5,
      total: 1155.0,
      status: "Completed",
    },
    {
      date: "2023-05-20",
      type: "Buy",
      symbol: "HRE",
      quantity: 15,
      price: 118.75,
      total: 1781.25,
      status: "Completed",
    },
    {
      date: "2023-05-15",
      type: "Buy",
      symbol: "HTECH",
      quantity: 5,
      price: 117.5,
      total: 587.5,
      status: "Completed",
    },
    {
      date: "2023-05-10",
      type: "Sell",
      symbol: "HLOG",
      quantity: 30,
      price: 44.2,
      total: 1326.0,
      status: "Completed",
    },
  ];

  // Update current time and simulate price changes for all corporations
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCorporations((prevCorps) =>
        prevCorps.map((corp) => {
          if (Math.random() > 0.7) {
            const newPrice = corp.price * (1 + (Math.random() * 0.02 - 0.01));
            const newChange = ((newPrice - corp.price) / corp.price) * 100;
            setPriceHistory((prevHistory) => {
              const corpHistory = prevHistory[corp.symbol] || [];
              const updatedHistory = [...corpHistory, { time: new Date().toLocaleTimeString(), price: newPrice }].slice(-10);
              return { ...prevHistory, [corp.symbol]: updatedHistory };
            });
            return { ...corp, price: newPrice, change: newChange };
          }
          return corp;
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedCorpData = corporations.find((corp) => corp.symbol === selectedCorp);
  const holdingData = portfolio.holdings.find((item) => item.symbol === selectedCorp);
  const availableShares = holdingData ? holdingData.shares : 0;
  const totalValue = quantity * (selectedCorpData?.price || 0);
  const canSell = activeTab === "sell" && quantity <= availableShares;
  const canBuy = activeTab === "buy" && totalValue <= portfolio.cashBalance;

  const filteredTransactionHistory = transactionHistory.filter((txn) => txn.symbol === selectedCorp);

  const handlePlaceOrder = () => {
    if ((activeTab === "sell" && !canSell) || (activeTab === "buy" && !canBuy)) {
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-black flex items-center">
              <ArrowUpDown className="w-7 h-7 mr-2 text-black" />
              {activeTab === "buy" ? "Buy Shares" : "Sell Shares"}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              {activeTab === "buy"
                ? "Purchase shares in Hamza Waheed corporations with real-time prices"
                : "Sell your shares in Hamza Waheed corporations with real-time prices"}
            </p>
          </div>
          {/* Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-full mt-4 md:mt-0 shadow-inner">
            {["buy", "sell"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "buy" | "sell")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? activeTab === "buy"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:text-black hover:bg-gray-200"
                }`}
              >
                {tab === "buy" ? "Buy" : "Sell"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {activeTab === "buy" ? (
              <>
                <h3 className="text-lg font-semibold text-green-600 mb-4">Available Corporations</h3>
                <div className="space-y-3">
                  {corporations.map((corp) => (
                    <button
                      key={corp.symbol}
                      onClick={() => setSelectedCorp(corp.symbol)}
                      className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all ${
                        selectedCorp === corp.symbol
                          ? "border-green-600 bg-green-50 shadow-sm"
                          : "border-gray-200 hover:border-green-600 hover:shadow-sm"
                      }`}
                    >
                      <div className="text-left">
                        <p className="font-medium text-black">{corp.name}</p>
                        <p className="text-sm text-gray-500">{corp.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-black">${corp.price.toFixed(2)}</p>
                        <p
                          className={`text-xs flex items-center justify-end ${
                            corp.change >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {corp.change >= 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(corp.change)}%
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 p-5 bg-white rounded-xl border border-green-200 shadow-sm">
                  <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                    <PieChart className="w-4 h-4 mr-2 text-green-600" />
                    Buying Power
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cash Balance:</span>
                      <span className="font-semibold text-black">
                        ${portfolio.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="font-semibold text-black">${totalValue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-red-600 mb-4">Your Holdings</h3>
                <div className="space-y-3">
                  {portfolio.holdings.map((holding) => {
                    const corp = corporations.find((c) => c.symbol === holding.symbol);
                    return (
                      <button
                        key={holding.symbol}
                        onClick={() => setSelectedCorp(holding.symbol)}
                        className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all ${
                          selectedCorp === holding.symbol
                            ? "border-red-600 bg-red-50 shadow-sm"
                            : "border-gray-200 hover:border-red-600 hover:shadow-sm"
                        }`}
                      >
                        <div className="text-left">
                          <p className="font-medium text-black">{corp?.name}</p>
                          <p className="text-sm text-gray-500">{holding.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">{holding.shares} shares</p>
                          <p className="text-xs text-gray-500">
                            Value: ${(holding.shares * (corp?.price || 0)).toFixed(2)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                  {portfolio.holdings.length === 0 && (
                    <p className="text-gray-500 text-center">No holdings available to sell</p>
                  )}
                </div>
                <div className="mt-6 p-5 bg-white rounded-xl border border-red-200 shadow-sm">
                  <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                    <PieChart className="w-4 h-4 mr-2 text-red-600" />
                    Selling Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Shares:</span>
                      <span className="font-semibold text-black">{availableShares}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Proceeds:</span>
                      <span className="font-semibold text-black">${totalValue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Middle Column - Order Form */}
          <div className="lg:col-span-1">
            <div className={`bg-white rounded-xl border shadow-sm p-6 ${activeTab === "buy" ? "border-green-200" : "border-red-200"}`}>
              <h3 className={`text-lg font-semibold mb-4 ${activeTab === "buy" ? "text-green-600" : "text-red-600"}`}>
                {activeTab === "buy" ? "Buy Order" : "Sell Order"}
              </h3>
              {/* Company Selection Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === "buy" ? "Select Company to Purchase" : "Select Company to Sell"}
                </label>
                <select
                  value={selectedCorp}
                  onChange={(e) => setSelectedCorp(e.target.value)}
                  className={`w-full p-2 border rounded-md focus:ring-2 ${
                    activeTab === "buy"
                      ? "border-green-300 focus:ring-green-600 focus:border-green-600"
                      : "border-red-300 focus:ring-red-600 focus:border-red-600"
                  }`}
                >
                  {corporations.map((corp) => (
                    <option key={corp.symbol} value={corp.symbol}>
                      {corp.name} ({corp.symbol})
                    </option>
                  ))}
                </select>
              </div>
              {/* Selected Corporation Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-black">{selectedCorpData?.name}</h4>
                    <p className="text-gray-500 text-sm">{selectedCorpData?.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-2xl text-black">${selectedCorpData?.price.toFixed(2)}</p>
                    <p
                      className={`text-sm flex items-center justify-end ${
                        selectedCorpData?.change && selectedCorpData.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {selectedCorpData?.change && selectedCorpData.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {selectedCorpData?.change && Math.abs(selectedCorpData.change)}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  As of {formatTime(currentTime)} - {formatDate(currentTime)}
                </div>
              </div>
              {/* Order Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activeTab === "buy" ? "Purchase Order Type" : "Sell Order Type"}
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setOrderType("market")}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium ${
                      orderType === "market"
                        ? activeTab === "buy"
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-red-600 bg-red-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    Market Order
                  </button>
                  <button
                    onClick={() => setOrderType("limit")}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium ${
                      orderType === "limit"
                        ? activeTab === "buy"
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-red-600 bg-red-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    Limit Order
                  </button>
                </div>
                {orderType === "limit" && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activeTab === "buy" ? "Purchase Limit Price ($)" : "Sell Limit Price ($)"}
                    </label>
                    <input
                      type="number"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                      className={`w-full p-2 border rounded-md focus:ring-2 ${
                        activeTab === "buy"
                          ? "border-green-300 focus:ring-green-600 focus:border-green-600"
                          : "border-red-300 focus:ring-red-600 focus:border-red-600"
                      }`}
                      placeholder="Enter limit price"
                      step="0.01"
                      min="0.01"
                    />
                  </div>
                )}
              </div>
              {/* Quantity Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === "buy" ? "Shares to Purchase" : "Shares to Sell"}
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`p-2 border rounded-l-md ${
                      activeTab === "buy"
                        ? "border-green-300 bg-green-100 hover:bg-green-200"
                        : "border-red-300 bg-red-100 hover:bg-red-200"
                    }`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className={`flex-1 p-2 border-t border-b text-center ${
                      activeTab === "buy"
                        ? "border-green-300"
                        : "border-red-300"
                    }`}
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`p-2 border rounded-r-md ${
                      activeTab === "buy"
                        ? "border-green-300 bg-green-100 hover:bg-green-200"
                        : "border-red-300 bg-red-100 hover:bg-red-200"
                    }`}
                  >
                    +
                  </button>
                </div>
                {activeTab === "sell" && (
                  <div className="mt-1 text-xs text-gray-500">Available: {availableShares} shares</div>
                )}
              </div>
              {/* Order Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className={`font-semibold mb-2 ${activeTab === "buy" ? "text-green-600" : "text-red-600"}`}>
                  {activeTab === "buy" ? "Purchase Summary" : "Sell Summary"}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per share:</span>
                    <span className="font-medium text-black">${selectedCorpData?.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium text-black">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{activeTab === "buy" ? "Estimated Cost" : "Estimated Proceeds"}:</span>
                    <span className="font-medium text-black">${totalValue.toFixed(2)}</span>
                  </div>
                  {orderType === "limit" && limitPrice && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Limit Price:</span>
                      <span className="font-medium text-black">${parseFloat(limitPrice).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={
                  (activeTab === "sell" && !canSell) ||
                  (activeTab === "buy" && !canBuy) ||
                  (orderType === "limit" && !limitPrice)
                }
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  (activeTab === "sell" && !canSell) ||
                  (activeTab === "buy" && !canBuy) ||
                  (orderType === "limit" && !limitPrice)
                    ? "bg-gray-400 cursor-not-allowed"
                    : activeTab === "buy"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {activeTab === "buy" ? "Place Buy Order" : "Place Sell Order"}
              </button>
              {/* Validation Messages */}
              {activeTab === "sell" && quantity > availableShares && (
                <div className="mt-3 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Not enough shares available
                </div>
              )}
              {activeTab === "buy" && totalValue > portfolio.cashBalance && (
                <div className="mt-3 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Insufficient funds
                </div>
              )}
              {orderPlaced && (
                <div className="mt-3 text-sm text-green-600 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Order placed successfully!
                </div>
              )}
            </div>
          </div>
          {/* Right Column - Market Info + History */}
          <div className="lg:col-span-1">
            {/* Price History Chart */}
            <div className={`bg-white rounded-xl border shadow-sm p-6 mb-6 ${activeTab === "buy" ? "border-green-200" : "border-red-200"}`}>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${activeTab === "buy" ? "text-green-600" : "text-red-600"}`}>
                <TrendingUp className="w-5 h-5 mr-2" />
                Price History
              </h3>
              <div className="h-48 bg-gray-50 rounded-lg p-4">
                {(priceHistory[selectedCorp] || []).length > 0 ? (
                  <ResponsiveContainer width="100%" height={192}>
                    <LineChart data={priceHistory[selectedCorp]}>
                      <XAxis dataKey="time" tickFormatter={(t) => t.split(":").slice(0, 2).join(":")} />
                      <YAxis domain={["auto", "auto"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke={activeTab === "buy" ? "#16a34a" : "#dc2626"} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center w-full text-gray-500 flex items-center justify-center h-full">
                    No price history available yet
                  </div>
                )}
              </div>
              <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                <span>Last 10 updates</span>
                <span>Current: ${selectedCorpData?.price.toFixed(2)}</span>
              </div>
            </div>
            {/* Transaction History */}
            <div className={`bg-white rounded-xl border shadow-sm p-6 ${activeTab === "buy" ? "border-green-200" : "border-red-200"}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold flex items-center ${activeTab === "buy" ? "text-green-600" : "text-red-600"}`}>
                  <History className="w-5 h-5 mr-2" />
                  Transaction History for {selectedCorpData?.name}
                </h3>
                <button
                  onClick={() => setExpandedHistory(!expandedHistory)}
                  className="text-sm text-gray-600 hover:text-black flex items-center"
                >
                  {expandedHistory ? "Show Less" : "Show More"}
                  {expandedHistory ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </button>
              </div>
              <div className="space-y-3">
                {filteredTransactionHistory.length === 0 ? (
                  <p className="text-gray-500 text-center">No transactions for this company</p>
                ) : (
                  (expandedHistory ? filteredTransactionHistory : filteredTransactionHistory.slice(0, 3)).map((txn, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-black">
                            {txn.type} {txn.symbol}
                          </p>
                          <p className="text-xs text-gray-500">{txn.date}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${txn.type === "Buy" ? "text-green-600" : "text-red-600"}`}
                          >
                            {txn.type === "Buy" ? "+" : "-"}${txn.total.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {txn.quantity} shares @ ${txn.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center text-xs">
                        <span className="text-gray-500">{txn.status}</span>
                        <button className="text-black hover:underline flex items-center">
                          Details <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Quick Actions */}
            <div className={`mt-6 bg-white rounded-xl border shadow-sm p-6 ${activeTab === "buy" ? "border-green-200" : "border-red-200"}`}>
              <h3 className={`text-lg font-semibold mb-4 ${activeTab === "buy" ? "text-green-600" : "text-red-600"}`}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <CreditCard className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Deposit Funds</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <Banknote className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Withdraw</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <PieChart className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Portfolio</span>
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                  <Info className="w-5 h-5 mb-1 text-black" />
                  <span className="text-sm">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
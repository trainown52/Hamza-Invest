export interface Corporation {
    id: string;
    name: string;
    ticker: string;
    sharePrice: number;
    totalShares: number;
    active: boolean;
  }
  
  export interface Investment {
    id: string;
    userId: string;
    corporationId: string;
    shares: number;
    amount: number;
    createdAt: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    kycStatus: "pending" | "approved" | "rejected";
    joinedAt: string;
  }
  
  export interface Dividend {
    id: string;
    corporationId: string;
    amountPerShare: number;
    payDate: string;
    status: "scheduled" | "paid" | "cancelled";
  }
  
  export interface Withdrawal {
    id: string;
    userId: string;
    amount: number;
    method: "bank" | "wallet";
    status: "pending" | "approved" | "rejected";
    requestedAt: string;
  }
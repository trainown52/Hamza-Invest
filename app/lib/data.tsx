import { Corporation, User, Dividend, Withdrawal } from "./types";

export const corporations: Corporation[] = [
  {
    id: "c1",
    name: "HW Logistics",
    ticker: "HWL",
    sharePrice: 120.5,
    totalShares: 1_000_000,
    active: true,
  },
  {
    id: "c2",
    name: "HW Foods",
    ticker: "HWF",
    sharePrice: 86.1,
    totalShares: 600_000,
    active: true,
  },
  {
    id: "c3",
    name: "HW Energy",
    ticker: "HWE",
    sharePrice: 42.8,
    totalShares: 2_200_000,
    active: false,
  },
];

export const users: User[] = [
  {
    id: "u1",
    name: "Ali Raza",
    email: "ali@example.com",
    kycStatus: "pending",
    joinedAt: "2025-08-01",
  },
  {
    id: "u2",
    name: "Sara Khan",
    email: "sara@example.com",
    kycStatus: "approved",
    joinedAt: "2025-07-22",
  },
  {
    id: "u3",
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    kycStatus: "rejected",
    joinedAt: "2025-07-30",
  },
];

export const dividends: Dividend[] = [
  {
    id: "d1",
    corporationId: "c1",
    amountPerShare: 1.5,
    payDate: "2025-09-05",
    status: "scheduled",
  },
  {
    id: "d2",
    corporationId: "c2",
    amountPerShare: 0.8,
    payDate: "2025-09-12",
    status: "scheduled",
  },
];

export const withdrawals: Withdrawal[] = [
  {
    id: "w1",
    userId: "u2",
    amount: 45000,
    method: "bank",
    status: "pending",
    requestedAt: "2025-08-20",
  },
  {
    id: "w2",
    userId: "u1",
    amount: 12000,
    method: "wallet",
    status: "approved",
    requestedAt: "2025-08-18",
  },
];
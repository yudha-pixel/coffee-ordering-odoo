import { Voucher } from "../types";

export const availableVouchers: Voucher[] = [
  {
    code: "FIRST10",
    discount: 10,
    type: "percentage",
    minOrder: 50000,
    description: "10% off for first-time customers",
    isActive: true,
  },
  {
    code: "SAVE15K",
    discount: 15000,
    type: "fixed",
    minOrder: 100000,
    description: "Rp 15,000 off for orders above Rp 100,000",
    isActive: true,
  },
  {
    code: "STUDENT",
    discount: 15,
    type: "percentage",
    minOrder: 30000,
    description: "15% student discount",
    isActive: true,
  },
];
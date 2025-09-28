export interface Bond {
  id: string;
  name: string;
  issuer: string;
  type: string;
  rating: string;
  currentPrice: number;
  currentYTM: number;
  couponRate: number;
  maturityDate: string;
  maxUnitsAvailable: number;
  heldQuantity: number;
  totalUnits: number;
  faceValue: number;
  remainingMonths?: number;
  investedAmount: number;
  nextCoupon: string;
  issueDate: string;
  status: 'accepted' | 'executed' | 'null';
}

// Legacy type aliases for backward compatibility
export type BondData = Bond;
export type PortfolioHolding = Bond;
export type NewBond = Bond;

export const allBonds: Bond[] = [
  {
    id: "1",
    name: "HDFC Bank Bond Series XV",
    issuer: "HDFC Bank",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 980,
    currentYTM: 9.38,
    couponRate: 6.25,
    maturityDate: "2027-01-20",
    nextCoupon: "2025-10-20",
    issueDate: "2025-01-20",
    maxUnitsAvailable: 15,
    heldQuantity: 30,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 49000,
    status: "executed",
  },
  {
    id: "2",
    name: "ESAF Small Finance Bank Limited Bond",
    issuer: "ESAF Bank",
    type: "Corporate",
    rating: "A-",
    currentPrice: 1037.62,
    currentYTM: 10.89,
    couponRate: 11.3,
    maturityDate: "2031-05-14",
    nextCoupon: "2026-10-15",
    issueDate: "2023-01-15",
    maxUnitsAvailable: 0,
    heldQuantity: 100,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 100000,
    status: "executed",
  },
  {
    id: "3",
    name: "Kerala Infrastructure Investment Fund Board Bond",
    issuer: "Kerala Infrastructure Board",
    type: "PSU",
    rating: "AA",
    currentPrice: 1029.01,
    currentYTM: 8.01,
    couponRate: 9.67,
    maturityDate: "2031-08-14",
    nextCoupon: "2025-12-15",
    issueDate: "2023-06-15",
    maxUnitsAvailable: 70,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 0,
    status: "null",
  },
  {
    id: "4",
    name: "4 Year Vedika Credit Capital Ltd Bond",
    issuer: "Vedika Credit Capital Ltd",
    type: "Corporate",
    rating: "BBB+",
    currentPrice: 10312.01,
    currentYTM: 11.29,
    couponRate: 13.0,
    maturityDate: "2028-07-31",
    nextCoupon: "2026-12-22",
    issueDate: "2024-06-20",
    maxUnitsAvailable: 20,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 0,
    status: "null",
  },
  {
    id: "5",
    name: "Sadbhav Infrastructure Bond",
    issuer: "Sadbhav Infrastructure",
    type: "Corporate",
    rating: "BBB+",
    currentPrice: 829.12,
    currentYTM: 8.59,
    couponRate: 11.50,
    maturityDate: "2029-01-31",
    nextCoupon: "2025-12-09",
    issueDate: "2024-09-10",
    maxUnitsAvailable: 4,
    heldQuantity: 2,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 1658.24,
    status: "executed",
  },
  {
    id: "6",
    name: "ICL Fincorp Bond Series IV",
    issuer: "ICL Fincorp Limited",
    type: "Corporate",
    rating: "BBB+",
    currentPrice: 109.75,
    currentYTM: 11.2,
    couponRate: 13.50,
    maturityDate: "2027-05-31",
    nextCoupon: "2025-11-09",
    issueDate: "2024-04-14",
    maxUnitsAvailable: 43,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 3240,
    investedAmount: 0,
    status: "null",
  },
  {
    id: "7",
    name: "Vismaya Developers Private Limited Bond 2022",
    issuer: "Vismaya Developers",
    type: "Corporate",
    rating: "D",
    currentPrice: 12400,
    currentYTM: 8.87,
    couponRate: 12,
    maturityDate: "2029-05-11",
    nextCoupon: "2027-01-15",
    issueDate: "2022-03-15",
    maxUnitsAvailable: 85,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 0,
    status: "null",
  },
  {
    id: "8",
    name: "Hazaribagh Ranchi Expressway Development Bond",
    issuer: "Hazaribagh Ranchi Expressway Limited",
    type: "PSU",
    rating: "C",
    currentPrice: 12400,
    currentYTM: 6.26,
    couponRate: 8.75,
    maturityDate: "2029-12-14",
    nextCoupon: "2025-10-30",
    issueDate: "2023-12-31",
    maxUnitsAvailable: 92,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 0,
    status: "null",
  },
  {
    id: "9",
    name: "Suzlon Energy Green Bond",
    issuer: "Suzlon Energy Limited",
    type: "Corporate",
    rating: "BB-",
    currentPrice: 113.84,
    currentYTM: 8.3,
    couponRate: 10.25,
    maturityDate: "2027-08-20",
    nextCoupon: "2026-02-20",
    issueDate: "2024-08-20",
    maxUnitsAvailable: 67,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 0,
    status: "null",
  },
];

// Helper functions to filter bonds - now deprecated, use BondStateManager instead
// These are kept for backward compatibility
export const getHeldBonds = (): Bond[] => {
  return allBonds.filter(bond => (bond.heldQuantity || 0) > 0);
};

export const getAvailableBonds = (): Bond[] => {
  return allBonds.filter(bond => bond.maxUnitsAvailable > 0);
};

export const getBondById = (id: string): Bond | undefined => {
  return allBonds.find(bond => bond.id === id);
};

// Legacy exports for backward compatibility
export const mockBondData: { [key: string]: Bond } = {
  ...Object.fromEntries(allBonds.map(bond => [bond.id, bond]))
};

export const portfolioHoldings: Bond[] = getHeldBonds();
export const newBonds: Bond[] = getAvailableBonds();

// Default portfolio summary - now calculated dynamically by BondStateManager
export const portfolioSummary = {
  totalValue: 850000,
  totalInvested: 800000,
  totalGain: 50000,
  gainPercentage: 6.25,
  monthlyIncome: 5680,
  ytdReturn: 8.2,
  avgYield: 7.8,
};

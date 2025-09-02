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
    currentYTM: 8.38,
    couponRate: 8.25,
    maturityDate: "2027-01-20",
    maxUnitsAvailable: 4,
    heldQuantity: 34,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 49000,
    nextCoupon: "2024-10-20",
  },
  {
    id: "2",
    name: "10 Year Government Security",
    issuer: "Government of India",
    type: "Government",
    rating: "AAA",
    currentPrice: 1000,
    currentYTM: 7.35,
    couponRate: 7.35,
    maturityDate: "2026-01-15",
    maxUnitsAvailable: 0,
    heldQuantity: 10,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 100000,
    nextCoupon: "2024-10-15",
  },
  {
    id: "3",
    name: "Reliance Industries Bond",
    issuer: "Reliance Industries",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 1010,
    currentYTM: 8.26,
    couponRate: 8.50,
    maturityDate: "2026-06-15",
    maxUnitsAvailable: 70,
    heldQuantity: 25,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 25250,
    nextCoupon: "2024-12-15",
  },
  {
    id: "4",
    name: "1 Year Government Security",
    issuer: "Government of India",
    type: "Government",
    rating: "AAA",
    currentPrice: 1005,
    currentYTM: 7.68,
    couponRate: 7.80,
    maturityDate: "2026-06-20",
    maxUnitsAvailable: 20,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 0,
    nextCoupon: "2024-12-22",
  },
  {
    id: "5",
    name: "Tata Steel Bond Series II",
    issuer: "Tata Steel Limited",
    type: "Corporate",
    rating: "AA+",
    currentPrice: 975,
    currentYTM: 9.02,
    couponRate: 8.80,
    maturityDate: "2026-09-10",
    maxUnitsAvailable: 4,
    heldQuantity: 0,
    totalUnits: 100,
    faceValue: 1000,
    investedAmount: 0,
    nextCoupon: "2025-01-09",
  },
];

// Helper functions to filter bonds
export const getHeldBonds = (): Bond[] => {
  return allBonds.filter(bond => (bond.heldQuantity || 0) > 0);
};

export const getAvailableBonds = (): Bond[] => {
  return allBonds.filter(bond => (bond.heldQuantity || 0) === 0);
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

export const portfolioSummary = {
  totalValue: 850000,
  totalInvested: 800000,
  totalGain: 50000,
  gainPercentage: 6.25,
  monthlyIncome: 5680,
  ytdReturn: 8.2,
  avgYield: 7.8,
};

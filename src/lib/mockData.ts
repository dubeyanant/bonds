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
  totalUnits: number;
  faceValue: number;
  remainingMonths?: number;
  // Portfolio-specific fields (optional)
  heldQuantity?: number;
  investedAmount?: number;
  nextCoupon?: string;
}

// Legacy type aliases for backward compatibility
export type BondData = Bond;
export type PortfolioHolding = Bond;
export type NewBond = Bond;

export const allBonds: Bond[] = [
  // Held bonds (heldQuantity > 0)
  {
    id: "1",
    name: "HDFC Bank Bond Series XV",
    issuer: "HDFC Bank",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 980,
    currentYTM: 8.38,
    couponRate: 8.25,
    maturityDate: "2027-1-20",
    maxUnitsAvailable: 50,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 50,
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
    maxUnitsAvailable: 100,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 100,
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
    maxUnitsAvailable: 30,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 25,
    investedAmount: 25250,
    nextCoupon: "2024-12-15",
  },
  // Available bonds (heldQuantity = 0 or undefined)
  {
    id: "nb1",
    name: "State Bank of India Bond 2029",
    issuer: "State Bank of India",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 995,
    currentYTM: 8.55,
    couponRate: 8.50,
    maturityDate: "2025-12-15",
    maxUnitsAvailable: 75,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 0,
  },
  {
    id: "nb2",
    name: "15 Year Government Security",
    issuer: "Government of India",
    type: "Government",
    rating: "AAA",
    currentPrice: 1005,
    currentYTM: 7.68,
    couponRate: 7.80,
    maturityDate: "2026-06-20",
    maxUnitsAvailable: 20,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 0,
  },
  {
    id: "nb3",
    name: "Tata Steel Bond Series II",
    issuer: "Tata Steel Limited",
    type: "Corporate",
    rating: "AA+",
    currentPrice: 975,
    currentYTM: 9.02,
    couponRate: 8.80,
    maturityDate: "2026-09-10",
    maxUnitsAvailable: 4,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 0,
  },
  {
    id: "nb4",
    name: "Mahindra Finance NCD",
    issuer: "Mahindra & Mahindra Financial Services",
    type: "Corporate",
    rating: "AA",
    currentPrice: 960,
    currentYTM: 9.89,
    couponRate: 9.50,
    maturityDate: "2026-03-25",
    maxUnitsAvailable: 35,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 0,
  },
  {
    id: "nb5",
    name: "ICICI Bank Perpetual Bond",
    issuer: "ICICI Bank",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 1000, // Estimated price
    currentYTM: 8.98,
    couponRate: 9.2,
    maturityDate: "Perpetual",
    maxUnitsAvailable: 6,
    totalUnits: 100,
    faceValue: 1000,
    heldQuantity: 0,
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

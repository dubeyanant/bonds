export interface BondData {
  id: string;
  name: string;
  issuer: string;
  type: string;
  rating: string;
  currentPrice: number;
  currentYTM: number;
  quantity: number;
  maxUnitsAvailable: number;
  totalUnits: number;
  faceValue: number;
  maturityDate: string;
  remainingMonths?: number;
  couponRate: number;
}

export interface PortfolioHolding {
  id: string;
  name: string;
  issuer: string;
  type: string;
  rating: string;
  heldQuantity: number;
  investedAmount: number;
  maturityDate: string;
  nextCoupon: string;
  yieldCurrent: number;
  maxUnitsAvailable: number;
  totalUnits: number;
}

export interface NewBond {
  id: string;
  name: string;
  issuer: string;
  type: string;
  rating: string;
  maturityDate: string;
  couponRate: number;
  yieldCurrent: number;
  maxUnitsAvailable: number;
  totalUnits: number;
}

export const mockBondData: { [key: string]: BondData } = {
  "1": {
    id: "1",
    name: "HDFC Bank Bond Series XV",
    issuer: "HDFC Bank",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 980,
    currentYTM: 8.38,
    quantity: 50,
    maxUnitsAvailable: 50,
    totalUnits: 100,
    faceValue: 1000,
    maturityDate: "2025-11-20",
    couponRate: 8.25,
  },
  "2": {
    id: "2",
    name: "10 Year Government Security",
    issuer: "Government of India",
    type: "Government",
    rating: "AAA",
    currentPrice: 1000,
    currentYTM: 7.35,
    quantity: 100,
    maxUnitsAvailable: 100,
    totalUnits: 100,
    faceValue: 1000,
    maturityDate: "2026-01-15",
    couponRate: 7.35,
  },
  "3": {
    id: "3",
    name: "Reliance Industries Bond",
    issuer: "Reliance Industries",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 1010,
    currentYTM: 8.26,
    quantity: 25,
    maxUnitsAvailable: 30,
    totalUnits: 100,
    faceValue: 1000,
    maturityDate: "2026-06-15",
    couponRate: 8.50,
  },
  "nb1": {
    id: "nb1",
    name: "State Bank of India Bond 2029",
    issuer: "State Bank of India",
    type: "Corporate",
    rating: "AAA",
    currentPrice: 995,
    currentYTM: 8.55,
    quantity: 0,
    maxUnitsAvailable: 75,
    totalUnits: 100,
    faceValue: 1000,
    maturityDate: "2025-12-15",
    couponRate: 8.50,
  },
  "nb2": {
    id: "nb2",
    name: "15 Year Government Security",
    issuer: "Government of India",
    type: "Government",
    rating: "AAA",
    currentPrice: 1005,
    currentYTM: 7.68,
    quantity: 0,
    maxUnitsAvailable: 20,
    totalUnits: 100,
    faceValue: 1000,
    maturityDate: "2026-06-20",
    couponRate: 7.80,
  },
  "nb3": {
    id: "nb3",
    name: "Tata Steel Bond Series II",
    issuer: "Tata Steel Limited",
    type: "Corporate",
    rating: "AA+",
    currentPrice: 975,
    currentYTM: 9.02,
    quantity: 0,
    maxUnitsAvailable: 4,
    totalUnits: 100,
    faceValue: 1000,
    maturityDate: "2026-09-10",
    couponRate: 8.80,
  },
  "nb4": {
    id: "nb4",
    name: "Mahindra Finance NCD",
    issuer: "Mahindra & Mahindra Financial Services",
    type: "Corporate",
    rating: "AA",
    currentPrice: 960,
    currentYTM: 9.89,
    quantity: 0,
    maxUnitsAvailable: 35,
    totalUnits: 100,
    faceValue: 1000,
    maturityDate: "2026-03-25",
    couponRate: 9.50,
  },
};

export const portfolioHoldings: PortfolioHolding[] = [
  {
    id: "1",
    name: "HDFC Bank Bond Series XV",
    issuer: "HDFC Bank",
    type: "Corporate",
    rating: "AAA",
    heldQuantity: 50,
    investedAmount: 49000,
    maturityDate: "2029-03-20",
    nextCoupon: "2024-09-20",
    yieldCurrent: 8.38,
    maxUnitsAvailable: 50,
    totalUnits: 100,
  },
  {
    id: "2",
    name: "10 Year Government Security",
    issuer: "Government of India",
    type: "Government",
    rating: "AAA",
    heldQuantity: 100,
    investedAmount: 100000,
    maturityDate: "2034-01-15",
    nextCoupon: "2024-10-15",
    yieldCurrent: 7.35,
    maxUnitsAvailable: 100,
    totalUnits: 100,
  },
  {
    id: "3",
    name: "Reliance Industries Bond",
    issuer: "Reliance Industries",
    type: "Corporate",
    rating: "AAA",
    heldQuantity: 25,
    investedAmount: 25250,
    maturityDate: "2026-06-15",
    nextCoupon: "2024-12-15",
    yieldCurrent: 8.26,
    maxUnitsAvailable: 30,
    totalUnits: 100,
  },
];

export const newBonds: NewBond[] = [
  {
    id: "nb1",
    name: "State Bank of India Bond 2029",
    issuer: "State Bank of India",
    type: "Corporate",
    rating: "AAA",
    maturityDate: "2029-12-15",
    couponRate: 8.5,
    yieldCurrent: 8.55,
    maxUnitsAvailable: 75,
    totalUnits: 100,
  },
  {
    id: "nb2",
    name: "15 Year Government Security",
    issuer: "Government of India",
    type: "Government",
    rating: "AAA",
    maturityDate: "2039-06-20",
    couponRate: 7.8,
    yieldCurrent: 7.68,
    maxUnitsAvailable: 20,
    totalUnits: 100,
  },
  {
    id: "nb3",
    name: "Tata Steel Bond Series II",
    issuer: "Tata Steel Limited",
    type: "Corporate",
    rating: "AA+",
    maturityDate: "2027-09-10",
    couponRate: 8.8,
    yieldCurrent: 9.02,
    maxUnitsAvailable: 4,
    totalUnits: 100,
  },
  {
    id: "nb4",
    name: "ICICI Bank Perpetual Bond",
    issuer: "ICICI Bank",
    type: "Corporate",
    rating: "AAA",
    maturityDate: "Perpetual",
    couponRate: 9.2,
    yieldCurrent: 8.98,
    maxUnitsAvailable: 6,
    totalUnits: 100,
  },
  {
    id: "nb5",
    name: "Mahindra Finance NCD",
    issuer: "Mahindra & Mahindra Financial Services",
    type: "Corporate",
    rating: "AA",
    maturityDate: "2026-03-25",
    couponRate: 9.5,
    yieldCurrent: 9.89,
    maxUnitsAvailable: 35,
    totalUnits: 100,
  },
];

export const portfolioSummary = {
  totalValue: 850000,
  totalInvested: 800000,
  totalGain: 50000,
  gainPercentage: 6.25,
  monthlyIncome: 5680,
  ytdReturn: 8.2,
  avgYield: 7.8,
};

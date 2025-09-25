export interface PortfolioInputs {
  stocks: string;
  mutualFunds: string;
  fixedDeposits: string;
  bonds: string;
  otherInvestmentType: string;
  otherInvestmentAmount: string;
}

export interface BondSuggestion {
  id: string;
  name: string;
  issuer: string;
  rating: string;
  currentYield: number;
  currentPrice: number;
  maturityDate: string;
  suggestedAmount: number;
  units: number;
  riskContribution: number;
  reason: string;
}

export interface AllocationChange {
  current: number;
  suggested: number;
  change: number;
}

export interface AnalysisResult {
  currentRiskRating: number;
  improvedRiskRating: number;
  totalInvestment: number;
  allocationChanges: {
    stocks: AllocationChange;
    mutualFunds: AllocationChange;
    fixedDeposits: AllocationChange;
    bonds: AllocationChange;
  };
  suggestions: BondSuggestion[];
  riskReduction: number;
  expectedReturns: number;
}

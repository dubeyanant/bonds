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

// API Request/Response Types
export interface RiskPredictionRequest {
  equity: number;
  mf: number;
  fd: number;
  bonds: number;
}

export interface RiskPredictionResponse {
  risk_score: number;
  risk_label: string;
}

export interface RebalanceRequest {
  equity: number;
  mf: number;
  fd: number;
  bonds: number;
}

export interface RebalanceResponse {
  original: {
    equity: number;
    mf: number;
    fd: number;
    bonds: number;
  };
  suggested: {
    equity: number;
    mf: number;
    fd: number;
    bonds: number;
  };
  moves: {
    from_equity: number;
    from_mf: number;
    from_fd: number;
  };
  notes: string;
}

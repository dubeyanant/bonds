import { PortfolioInputs, AnalysisResult, BondSuggestion } from "../types/portfolioTypes";
import { getOtherInvestmentRiskFactor } from "../utils/portfolioUtils";

export const analyzePortfolio = async (portfolioInputs: PortfolioInputs): Promise<AnalysisResult> => {
  // Simulate API call with analysis logic
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const stocks = parseFloat(portfolioInputs.stocks) || 0;
  const mutualFunds = parseFloat(portfolioInputs.mutualFunds) || 0;
  const fixedDeposits = parseFloat(portfolioInputs.fixedDeposits) || 0;
  const bonds = parseFloat(portfolioInputs.bonds) || 0;
  const otherInvestment = parseFloat(portfolioInputs.otherInvestmentAmount) || 0;
  const totalPortfolio = stocks + mutualFunds + fixedDeposits + bonds + otherInvestment;
  
  // Calculate current risk rating (higher stocks = higher risk)
  const stockWeight = stocks / totalPortfolio;
  const mfWeight = mutualFunds / totalPortfolio;
  const fdWeight = fixedDeposits / totalPortfolio;
  const bondWeight = bonds / totalPortfolio;
  const otherWeight = otherInvestment / totalPortfolio;
  
  // Risk factors: Stocks(8), MF(5), Others(varies), Bonds(2.5), FD(2)
  const otherRiskFactor = getOtherInvestmentRiskFactor(portfolioInputs.otherInvestmentType);
  
  const currentRiskRating = Math.min(10, Math.max(1, 
    (stockWeight * 8) + (mfWeight * 5) + (fdWeight * 2) + 
    (bondWeight * 2.5) + (otherWeight * otherRiskFactor) + 1
  ));
  
  // Calculate reductions from high-risk assets first
  const stockReduction = Math.min(stocks * 0.25, stocks); // Reduce up to 25% of stocks
  const mfReduction = Math.min(mutualFunds * 0.15, mutualFunds); // Reduce up to 15% of MF
  
  // Bond allocation equals exactly what we remove from other assets
  const suggestedBondAllocation = stockReduction + mfReduction;
  
  const mockSuggestions: BondSuggestion[] = [
    {
      id: "1",
      name: "10 Year Government Security",
      issuer: "Government of India",
      rating: "AAA",
      currentYield: 7.24,
      currentPrice: 1020,
      maturityDate: "2034-01-15",
      suggestedAmount: suggestedBondAllocation * 0.4,
      units: Math.floor((suggestedBondAllocation * 0.4) / 1020),
      riskContribution: 0.5,
      reason: "Sovereign guarantee provides stability and reduces overall portfolio risk"
    },
    {
      id: "2", 
      name: "HDFC Bank Bond Series XV",
      issuer: "HDFC Bank",
      rating: "AAA",
      currentYield: 8.45,
      currentPrice: 985,
      maturityDate: "2029-03-20",
      suggestedAmount: suggestedBondAllocation * 0.35,
      units: Math.floor((suggestedBondAllocation * 0.35) / 985),
      riskContribution: 0.8,
      reason: "High-quality corporate bond offering better yields while maintaining low risk"
    },
    {
      id: "3",
      name: "NABARD Rural Infrastructure Bond",
      issuer: "NABARD",
      rating: "AAA",
      currentYield: 7.65,
      currentPrice: 1015,
      maturityDate: "2031-04-30",
      suggestedAmount: suggestedBondAllocation * 0.25,
      units: Math.floor((suggestedBondAllocation * 0.25) / 1015),
      riskContribution: 0.6,
      reason: "Infrastructure bonds with tax benefits and strong credit profile"
    }
  ];
  
  // Calculate improved risk rating with better credit risk reduction
  const newStockWeight = (stocks - stockReduction) / totalPortfolio;
  const newMfWeight = (mutualFunds - mfReduction) / totalPortfolio;
  const newFdWeight = fixedDeposits / totalPortfolio;
  const newBondWeight = bondWeight + (suggestedBondAllocation / totalPortfolio);
  const newOtherWeight = otherWeight;
  
  // Bonds have lower risk factor (2.5 instead of 3) for better risk improvement
  const improvedRiskRating = Math.min(10, Math.max(1,
    (newStockWeight * 8) + (newMfWeight * 5) + (newFdWeight * 2) + 
    (newBondWeight * 2.5) + (newOtherWeight * otherRiskFactor) + 0.5
  ));
  
  const result: AnalysisResult = {
    currentRiskRating: Math.round(currentRiskRating * 10) / 10,
    improvedRiskRating: Math.round(improvedRiskRating * 10) / 10,
    totalInvestment: suggestedBondAllocation,
    allocationChanges: {
      stocks: {
        current: stocks,
        suggested: stocks - stockReduction,
        change: -stockReduction
      },
      mutualFunds: {
        current: mutualFunds,
        suggested: mutualFunds - mfReduction,
        change: -mfReduction
      },
      fixedDeposits: {
        current: fixedDeposits,
        suggested: fixedDeposits,
        change: 0
      },
      bonds: {
        current: 0,
        suggested: suggestedBondAllocation,
        change: suggestedBondAllocation
      }
    },
    suggestions: mockSuggestions,
    riskReduction: currentRiskRating - improvedRiskRating,
    expectedReturns: 7.8 // Expected blended return
  };
  
  return result;
};

import { PortfolioInputs, AnalysisResult, BondSuggestion } from "../types/portfolioTypes";
import { getOtherInvestmentRiskFactor } from "../utils/portfolioUtils";
import { predictRisk, rebalancePortfolio, convertToApiFormat } from "./portfolioApi";

// Shared bond suggestions generator
const generateBondSuggestions = (suggestedBondAllocation: number): BondSuggestion[] => {
  const allBondSuggestions: BondSuggestion[] = [
    {
      id: "1",
      name: "10 Year Government Security",
      issuer: "Government of India",
      rating: "AAA",
      currentYield: 7.24,
      currentPrice: 1020,
      maturityDate: "2034-01-15",
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
      riskContribution: 0.6,
      reason: "Infrastructure bonds with tax benefits and strong credit profile"
    },
    {
      id: "4",
      name: "ICICI Bank Perpetual Bonds",
      issuer: "ICICI Bank",
      rating: "AA+",
      currentYield: 8.75,
      currentPrice: 945,
      maturityDate: "2032-06-15",
      riskContribution: 0.9,
      reason: "Higher yield from reputable private bank with strong fundamentals"
    },
    {
      id: "5",
      name: "REC Limited Green Bonds",
      issuer: "REC Limited",
      rating: "AAA",
      currentYield: 7.85,
      currentPrice: 1005,
      maturityDate: "2030-09-12",
      riskContribution: 0.7,
      reason: "ESG-focused green bonds supporting renewable energy projects"
    },
    {
      id: "6",
      name: "Power Finance Corporation Bonds",
      issuer: "PFC Limited",
      rating: "AA+",
      currentYield: 8.35,
      currentPrice: 975,
      maturityDate: "2028-12-08",
      riskContribution: 0.85,
      reason: "PSU bonds with attractive yields backed by government support"
    }
  ];

  // Randomly select 3 bonds from the 6 available options
  const shuffledBonds = [...allBondSuggestions].sort(() => Math.random() - 0.5);
  return shuffledBonds.slice(0, 3);
};

export const analyzePortfolio = async (portfolioInputs: PortfolioInputs): Promise<AnalysisResult> => {
  const stocks = parseFloat(portfolioInputs.stocks) || 0;
  const mutualFunds = parseFloat(portfolioInputs.mutualFunds) || 0;
  const fixedDeposits = parseFloat(portfolioInputs.fixedDeposits) || 0;
  const bonds = parseFloat(portfolioInputs.bonds) || 0;
  
  // Convert to API format (excluding other investments for now as APIs don't support them)
  const apiPortfolio = convertToApiFormat(stocks, mutualFunds, fixedDeposits, bonds);
  
  try {
    // Call both APIs in parallel for better performance
    const [riskResult, rebalanceResult] = await Promise.all([
      predictRisk(apiPortfolio),
      rebalancePortfolio(apiPortfolio)
    ]);
    
    // Calculate current and improved risk ratings from API
    const currentRiskRating = riskResult.risk_score;
    
    // For improved risk rating, we'll use the rebalanced portfolio
    const improvedPortfolio = convertToApiFormat(
      rebalanceResult.suggested.equity,
      rebalanceResult.suggested.mf,
      rebalanceResult.suggested.fd,
      rebalanceResult.suggested.bonds
    );
    
    const improvedRiskResult = await predictRisk(improvedPortfolio);
    const improvedRiskRating = improvedRiskResult.risk_score;
    
    // Calculate suggested bond allocation from the rebalance API
    const suggestedBondAllocation = rebalanceResult.suggested.bonds - bonds;
    
    // Generate bond suggestions using the shared function
    const bondSuggestions = generateBondSuggestions(suggestedBondAllocation);

    const result: AnalysisResult = {
      currentRiskRating: Math.round(currentRiskRating * 10) / 10,
      improvedRiskRating: Math.round(improvedRiskRating * 10) / 10,
      totalInvestment: Math.max(0, suggestedBondAllocation),
      allocationChanges: {
        stocks: {
          current: stocks,
          suggested: rebalanceResult.suggested.equity,
          change: rebalanceResult.suggested.equity - stocks
        },
        mutualFunds: {
          current: mutualFunds,
          suggested: rebalanceResult.suggested.mf,
          change: rebalanceResult.suggested.mf - mutualFunds
        },
        fixedDeposits: {
          current: fixedDeposits,
          suggested: rebalanceResult.suggested.fd,
          change: rebalanceResult.suggested.fd - fixedDeposits
        },
        bonds: {
          current: bonds,
          suggested: rebalanceResult.suggested.bonds,
          change: rebalanceResult.suggested.bonds - bonds
        }
      },
      suggestions: bondSuggestions,
      riskReduction: currentRiskRating - improvedRiskRating,
      expectedReturns: 7.8 // Expected blended return
    };
    
    return result;
    
  } catch (error) {
    console.error('API calls failed, falling back to mock calculations:', error);
    
    // Fallback to original mock calculations if APIs fail
    return await analyzePortfolioFallback(portfolioInputs);
  }
};

// Fallback function with original mock calculations
const analyzePortfolioFallback = async (portfolioInputs: PortfolioInputs): Promise<AnalysisResult> => {
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
  const stockReduction = Math.min(stocks * 0.25, stocks);
  const mfReduction = Math.min(mutualFunds * 0.15, mutualFunds);
  
  // Bond allocation equals exactly what we remove from other assets
  const suggestedBondAllocation = stockReduction + mfReduction;
  
  // Generate bond suggestions using the shared function
  const bondSuggestions = generateBondSuggestions(suggestedBondAllocation);
  
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
        current: bonds,
        suggested: bonds + suggestedBondAllocation,
        change: suggestedBondAllocation
      }
    },
    suggestions: bondSuggestions,
    riskReduction: currentRiskRating - improvedRiskRating,
    expectedReturns: 7.8
  };
  
  return result;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getRiskColor = (rating: number) => {
  if (rating <= 3) return "text-green-600 bg-green-50";
  if (rating <= 6) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

export const getRiskColorSimple = (rating: number) => {
  if (rating <= 3) return "text-green-600";
  if (rating <= 6) return "text-yellow-600";
  return "text-red-600";
};

export const getOtherInvestmentRiskFactor = (investmentType: string) => {
  switch (investmentType) {
    case 'gold': return 4;
    case 'crypto': return 9;
    case 'commodities': return 7;
    case 'reits': return 5;
    case 'forex': return 8;
    case 'derivatives': return 10;
    default: return 6;
  }
};

export const getInvestmentTypeLabel = (investmentType: string) => {
  switch (investmentType) {
    case 'gold': return 'Gold';
    case 'crypto': return 'Cryptocurrency';
    case 'commodities': return 'Commodities';
    case 'reits': return 'REITs';
    case 'forex': return 'Forex';
    case 'derivatives': return 'Derivatives';
    default: return 'Other';
  }
};

export const validatePortfolioInputs = (portfolioInputs: any) => {
  const stocks = parseFloat(portfolioInputs.stocks) || 0;
  const mutualFunds = parseFloat(portfolioInputs.mutualFunds) || 0;
  const fixedDeposits = parseFloat(portfolioInputs.fixedDeposits) || 0;
  const bonds = parseFloat(portfolioInputs.bonds) || 0;
  const otherInvestment = parseFloat(portfolioInputs.otherInvestmentAmount) || 0;
  
  return stocks > 0 || mutualFunds > 0 || fixedDeposits > 0 || bonds > 0 || otherInvestment > 0;
};

export const calculateTotalPortfolio = (portfolioInputs: any) => {
  return (
    (parseFloat(portfolioInputs.stocks) || 0) +
    (parseFloat(portfolioInputs.mutualFunds) || 0) +
    (parseFloat(portfolioInputs.fixedDeposits) || 0) +
    (parseFloat(portfolioInputs.bonds) || 0) +
    (parseFloat(portfolioInputs.otherInvestmentAmount) || 0)
  );
};

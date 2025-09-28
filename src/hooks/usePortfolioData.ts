import { useState, useEffect } from "react";
import { PortfolioHolding } from "@/lib/mockData";
import { BondStateManager } from "@/lib/bondStateManager";

export function usePortfolioData() {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [availableBonds, setAvailableBonds] = useState<PortfolioHolding[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState({
    totalValue: 0,
    totalInvested: 0,
    totalGain: 0,
    gainPercentage: 0,
    monthlyIncome: 0,
    ytdReturn: 0,
    avgYield: 0
  });

  const loadBondData = async () => {
    // Make data loading async to prevent blocking
    await new Promise(resolve => setTimeout(resolve, 0));
    
    if (typeof window === 'undefined') return;
    
    const heldBonds = BondStateManager.getHeldBonds();
    const availableBonds = BondStateManager.getAvailableBonds();
    const summary = BondStateManager.getPortfolioSummary();

    setHoldings(heldBonds);
    setAvailableBonds(availableBonds);
    setPortfolioSummary(summary);
  };

  useEffect(() => {
    loadBondData();

    // Listen for storage changes to update when transactions occur in other tabs
    const handleStorageChange = () => {
      loadBondData();
    };

    // Listen for custom bond state change events
    const handleBondStateChange = () => {
      loadBondData();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('bondStateChanged', handleBondStateChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('bondStateChanged', handleBondStateChange);
      };
    }
  }, []);

  return {
    holdings,
    availableBonds,
    portfolioSummary,
    loadBondData
  };
}

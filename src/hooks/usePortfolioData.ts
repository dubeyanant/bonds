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

  const loadBondData = () => {
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

    window.addEventListener('storage', handleStorageChange);

    // Listen for custom bond state change events
    const handleBondStateChange = () => {
      loadBondData();
    };

    window.addEventListener('bondStateChanged', handleBondStateChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bondStateChanged', handleBondStateChange);
    };
  }, []);

  return {
    holdings,
    availableBonds,
    portfolioSummary,
    loadBondData
  };
}

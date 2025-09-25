import {
  RiskPredictionRequest,
  RiskPredictionResponse,
  RebalanceRequest,
  RebalanceResponse,
} from "../types/portfolioTypes";

// Use relative URL for API calls - Next.js will proxy to the backend
const API_BASE_URL = "/api/portfolio";

/**
 * Call the risk prediction API
 * @param portfolio Portfolio allocation data
 * @returns Risk score and label
 */
export const predictRisk = async (
  portfolio: RiskPredictionRequest
): Promise<RiskPredictionResponse> => {
  try {
    console.log("🔍 [Risk Prediction API] Request:", {
      url: `${API_BASE_URL}/predict_risk`,
      method: "POST",
      payload: portfolio
    });

    const response = await fetch(`${API_BASE_URL}/predict_risk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolio),
    });

    console.log("📡 [Risk Prediction API] Response status:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Risk prediction API failed: ${response.status} ${response.statusText}`);
    }

    const data: RiskPredictionResponse = await response.json();
    console.log("✅ [Risk Prediction API] Response data:", data);
    return data;
  } catch (error) {
    console.error("❌ [Risk Prediction API] Error:", error);
    throw error;
  }
};

/**
 * Call the portfolio rebalancing API
 * @param portfolio Portfolio allocation data
 * @returns Rebalancing recommendations
 */
export const rebalancePortfolio = async (
  portfolio: RebalanceRequest
): Promise<RebalanceResponse> => {
  try {
    console.log("⚖️ [Portfolio Rebalance API] Request:", {
      url: `${API_BASE_URL}/rebalance`,
      method: "POST",
      payload: portfolio
    });

    const response = await fetch(`${API_BASE_URL}/rebalance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolio),
    });

    console.log("📡 [Portfolio Rebalance API] Response status:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Portfolio rebalance API failed: ${response.status} ${response.statusText}`);
    }

    const data: RebalanceResponse = await response.json();
    console.log("✅ [Portfolio Rebalance API] Response data:", data);
    return data;
  } catch (error) {
    console.error("❌ [Portfolio Rebalance API] Error:", error);
    throw error;
  }
};

/**
 * Convert portfolio inputs to API request format
 * @param stocks Stock investment amount
 * @param mutualFunds Mutual fund investment amount
 * @param fixedDeposits Fixed deposit amount
 * @param bonds Bond investment amount
 * @returns API request object
 */
export const convertToApiFormat = (
  stocks: number,
  mutualFunds: number,
  fixedDeposits: number,
  bonds: number
): RiskPredictionRequest => {
  return {
    equity: stocks,
    mf: mutualFunds,
    fd: fixedDeposits,
    bonds: bonds,
  };
};

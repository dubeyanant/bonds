import {
  RiskPredictionRequest,
  RiskPredictionResponse,
  RebalanceRequest,
  RebalanceResponse,
} from "../types/portfolioTypes";

const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Call the risk prediction API
 * @param portfolio Portfolio allocation data
 * @returns Risk score and label
 */
export const predictRisk = async (
  portfolio: RiskPredictionRequest
): Promise<RiskPredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict_risk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolio),
    });

    if (!response.ok) {
      throw new Error(`Risk prediction API failed: ${response.status} ${response.statusText}`);
    }

    const data: RiskPredictionResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling risk prediction API:", error);
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
    const response = await fetch(`${API_BASE_URL}/rebalance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolio),
    });

    if (!response.ok) {
      throw new Error(`Portfolio rebalance API failed: ${response.status} ${response.statusText}`);
    }

    const data: RebalanceResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling portfolio rebalance API:", error);
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

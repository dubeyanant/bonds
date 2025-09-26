/**
 * Utility functions for Buy/Sell component calculations and formatting
 */

export interface CalculationResult {
	totalValue: number;
	returns: number;
	returnPercentage: number;
}

/**
 * Calculate remaining months from maturity date
 */
export const calculateRemainingMonths = (maturityDate: string): number => {
	if (maturityDate === "Perpetual") return 360; // Default for perpetual bonds

	const today = new Date();
	const maturity = new Date(maturityDate);

	const yearDiff = maturity.getFullYear() - today.getFullYear();
	const monthDiff = maturity.getMonth() - today.getMonth();

	let totalMonths = yearDiff * 12 + monthDiff;

	// Adjust for day of month
	if (maturity.getDate() < today.getDate()) {
		totalMonths--;
	}

	return Math.max(totalMonths, 0); // Ensure non-negative
};

/**
 * Generate valuation periods based on transaction type and remaining months
 */
export const generateValuationPeriods = (
	transactionType: "buy" | "sell",
	remainingMonths: number,
) => {
	if (transactionType === "sell") {
		// For selling, only show "Sell Now" (3 months) and "On Maturity"
		return [3, remainingMonths];
	}

	const periods = [];
	const maxDuration = Math.min(remainingMonths, 36);
	for (let i = 3; i <= maxDuration; i += 3) {
		periods.push(i);
	}
	// Add remaining months if it's not already included
	if (remainingMonths > 3 && remainingMonths % 3 !== 0) {
		periods.push(remainingMonths);
	}
	return periods.sort((a, b) => a - b);
};

/**
 * Calculate returns for given period and units
 */
export const calculateReturns = (
	months: number,
	unitsCount: number,
	currentPrice: number,
	currentYTM: number,
	remainingMonths: number,
): CalculationResult => {
	if (!unitsCount || unitsCount <= 0) {
		return { totalValue: 0, returns: 0, returnPercentage: 0 };
	}

	const principal = unitsCount * currentPrice;
	// New formula: returninterestforthatmonth = (currentyield/remainingmonths) * monthscalculatedfor
	const interestForPeriod = (currentYTM / remainingMonths) * months;
	const returns = (principal * interestForPeriod) / 100;
	const totalValue = principal + returns;
	const returnPercentage = (returns / principal) * 100;

	return {
		totalValue: totalValue,
		returns: returns,
		returnPercentage: returnPercentage,
	};
};

/**
 * Format currency in Indian Rupees
 */
export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(amount);
};

/**
 * Validate form data for buy/sell transactions
 */
export const validateTransactionForm = (
	units: string,
	minUnits: number,
	maxUnits: number,
): { [key: string]: string } => {
	const errors: { [key: string]: string } = {};

	// Units validation
	if (!units) {
		errors.units = "Please enter number of units";
	} else {
		const unitsNum = parseInt(units);
		if (isNaN(unitsNum) || unitsNum <= 0) {
			errors.units = "Units must be a positive number";
		} else if (unitsNum < minUnits) {
			errors.units = `Minimum ${minUnits} unit required`;
		} else if (unitsNum > maxUnits) {
			errors.units = `Maximum ${maxUnits} units available`;
		}
	}

	return errors;
};

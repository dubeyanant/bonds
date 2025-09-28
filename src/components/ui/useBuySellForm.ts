import { Bond } from "@/lib/mockData";
/**
 * Custom hooks for Buy/Sell form state management
 */
import { useState } from "react";
import {
	calculateRemainingMonths,
	generateValuationPeriods,
	validateTransactionForm,
} from "./buySellUtils";

export interface UseBuySellFormProps {
	bondData: Bond;
	transactionType: "buy" | "sell";
}

export const useBuySellForm = ({
	bondData,
	transactionType,
}: UseBuySellFormProps) => {
	const [units, setUnits] = useState<string>("1");
	const [selectedValuation, setSelectedValuation] = useState<number>(3);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isLoading, setIsLoading] = useState(false);

	// Calculate derived values
	const remainingMonths = calculateRemainingMonths(bondData.maturityDate);
	const availableUnits =
		transactionType === "buy"
			? bondData.maxUnitsAvailable
			: bondData.heldQuantity;
	const minUnits = 1;
	const maxUnits = availableUnits;
	const valuationPeriods = generateValuationPeriods(
		transactionType,
		remainingMonths,
	);
	const unitsCount = parseInt(units) || 0;
	const totalAmount = unitsCount * bondData.currentPrice;

	const validateForm = () => {
		const newErrors = validateTransactionForm(units, minUnits, maxUnits);
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (onOrderPlaced: (quantity: number) => void) => {
		return async () => {
			if (!validateForm()) {
				return;
			}

			setIsLoading(true);

			// Simulate API call
			setTimeout(() => {
				setIsLoading(false);
				onOrderPlaced(parseInt(units));
			}, 500);
		};
	};

	const incrementUnits = () => {
		const currentUnits = parseInt(units) || 0;
		if (currentUnits < maxUnits) {
			setUnits((currentUnits + 1).toString());
		}
	};

	const decrementUnits = () => {
		const currentUnits = parseInt(units) || 0;
		if (currentUnits > minUnits) {
			setUnits((currentUnits - 1).toString());
		}
	};

	return {
		// State
		units,
		setUnits,
		selectedValuation,
		setSelectedValuation,
		errors,
		isLoading,

		// Derived values
		remainingMonths,
		availableUnits,
		minUnits,
		maxUnits,
		valuationPeriods,
		unitsCount,
		totalAmount,

		// Actions
		validateForm,
		handleSubmit,
		incrementUnits,
		decrementUnits,
	};
};

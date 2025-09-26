import { Bond } from "@/lib/mockData";
import {
	AlertTriangle,
	Calculator,
	CheckCircle,
	Minus,
	Plus,
} from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "./button";
import { formatCurrency } from "./buySellUtils";
/**
 * TransactionForm component - handles the transaction form for buy/sell
 */
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Label } from "./label";
import { Separator } from "./separator";

interface TransactionFormProps {
	bondData: Bond;
	transactionType: "buy" | "sell";
	units: string;
	setUnits: (units: string) => void;
	errors: { [key: string]: string };
	isLoading: boolean;
	availableUnits: number;
	minUnits: number;
	maxUnits: number;
	unitsCount: number;
	totalAmount: number;
	onSubmit: (e: React.FormEvent) => void;
	onIncrement: () => void;
	onDecrement: () => void;
}

export function TransactionForm({
	bondData,
	transactionType,
	units,
	setUnits,
	errors,
	isLoading,
	availableUnits,
	minUnits,
	maxUnits,
	unitsCount,
	totalAmount,
	onSubmit,
	onIncrement,
	onDecrement,
}: TransactionFormProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Calculator className="h-5 w-5 text-green-600" />
					Transaction Details
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit} className="space-y-6">
					{/* Units Selection with Plus/Minus */}
					<div className="space-y-2">
						<Label>
							Number of Units to{" "}
							{transactionType === "buy" ? "Purchase" : "Sell"} *
						</Label>
						<div className="flex items-center gap-3">
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="h-10 w-10 p-0"
								onClick={onDecrement}
								disabled={parseInt(units) <= minUnits}
							>
								<Minus className="h-4 w-4" />
							</Button>

							<div className="flex-1 text-center">
								<div className="text-2xl font-bold text-gray-900">
									{units || 0}
								</div>
								<div className="text-xs text-gray-500">
									units
								</div>
							</div>

							<Button
								type="button"
								variant="outline"
								size="sm"
								className="h-10 w-10 p-0"
								onClick={onIncrement}
								disabled={parseInt(units) >= maxUnits}
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>

						{errors.units && (
							<p className="text-sm text-red-600 flex items-center gap-1">
								<AlertTriangle className="h-4 w-4" />
								{errors.units}
							</p>
						)}
						<p className="text-sm text-gray-500">
							Available: {availableUnits} units • Min: {minUnits}{" "}
							unit
						</p>
					</div>

					{/* Transaction Summary */}
					{unitsCount > 0 && (
						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<h4 className="font-medium text-blue-800 mb-3">
								Transaction Summary
							</h4>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-blue-700">
										Units:
									</span>
									<span className="font-medium">
										{unitsCount}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-blue-700">
										Price per unit:
									</span>
									<span className="font-medium">
										₹{bondData.currentPrice}
									</span>
								</div>
								<Separator />
								<div className="flex justify-between font-medium">
									<span className="text-blue-700">
										{transactionType === "buy"
											? "Total Amount:"
											: "Current Price:"}
									</span>
									<span className="text-lg">
										{formatCurrency(totalAmount)}
									</span>
								</div>
							</div>
						</div>
					)}

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full"
						size="lg"
						disabled={isLoading || !units}
					>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<LoadingSpinner size="md" />
								Processing Order...
							</div>
						) : (
							<>
								<CheckCircle className="h-4 w-4 mr-2" />
								Place{" "}
								{transactionType === "buy" ? "Buy" : "Sell"}{" "}
								Order
							</>
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

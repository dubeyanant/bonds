import { Bond } from "@/lib/mockData";
import { AlertTriangle, Calendar, Info, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "./alert";
import { calculateReturns, formatCurrency } from "./buySellUtils";
/**
 * ProjectedReturnsCard component - displays projected returns and valuation periods
 */
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface ProjectedReturnsCardProps {
	bondData: Bond;
	transactionType: "buy" | "sell";
	unitsCount: number;
	totalAmount: number;
	selectedValuation: number;
	setSelectedValuation: (months: number) => void;
	valuationPeriods: number[];
	remainingMonths: number;
}

export function ProjectedReturnsCard({
	bondData,
	transactionType,
	unitsCount,
	totalAmount,
	selectedValuation,
	setSelectedValuation,
	valuationPeriods,
	remainingMonths,
}: ProjectedReturnsCardProps) {
	return (
		<div className="space-y-6">
			{/* Projected Returns Card */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5 text-purple-600" />
						Projected Returns
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-600 mb-4">
						Select a time period to see projected returns based on
						current YTM. Your selected duration will be used for the
						transaction.
					</p>

					{/* Selected Period Details */}
					{unitsCount > 0 && (
						<div className="space-y-4 mb-3">
							<div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
								<div className="flex items-center gap-2 mb-2">
									<Calendar className="h-4 w-4 text-green-600" />
									<span className="font-medium text-green-800">
										{selectedValuation} Month Projection
										(Selected Duration)
									</span>
								</div>

								{(() => {
									const calc = calculateReturns(
										selectedValuation,
										unitsCount,
										bondData.currentPrice,
										bondData.currentYTM,
										remainingMonths,
									);
									return (
										<div className="space-y-2 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600">
													Initial Investment:
												</span>
												<span className="font-medium">
													{formatCurrency(
														totalAmount,
													)}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">
													Expected Returns:
												</span>
												<span className="font-medium text-green-600">
													+
													{formatCurrency(
														calc.returns,
													)}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">
													Total Value:
												</span>
												<span className="font-medium text-lg">
													{formatCurrency(
														calc.totalValue,
													)}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600">
													Return %:
												</span>
												<span className="font-medium text-green-600">
													+
													{calc.returnPercentage.toFixed(
														2,
													)}
													%
												</span>
											</div>
										</div>
									);
								})()}
							</div>
						</div>
					)}

					{/* All Periods Comparison */}
					{unitsCount > 0 && (
						<div className="space-y-3">
							{valuationPeriods.map(months => {
								const calc = calculateReturns(
									months,
									unitsCount,
									bondData.currentPrice,
									bondData.currentYTM,
									remainingMonths,
								);
								const isThreeMonths = months === 3;
								const isMaturity = months === remainingMonths;

								let cardLabel = `${months} Months`;
								if (transactionType === "sell") {
									if (isThreeMonths) {
										cardLabel = "Sell Now";
									} else if (isMaturity) {
										cardLabel = `On Maturity (${months} months)`;
									}
								}

								return (
									<div
										key={months}
										className={`p-3 rounded-lg border transition-colors ${
											isMaturity &&
											transactionType === "sell"
												? "cursor-not-allowed border-orange-300 bg-orange-100"
												: `cursor-pointer ${
														selectedValuation ===
														months
															? "border-blue-500 bg-blue-50"
															: "border-gray-200 hover:bg-gray-50"
													}`
										}`}
										onClick={() => {
											if (
												!(
													isMaturity &&
													transactionType === "sell"
												)
											) {
												setSelectedValuation(months);
											}
										}}
									>
										<div className="flex justify-between items-center">
											<div>
												<div className="font-medium">
													{cardLabel}
												</div>
												<div className="text-xs text-gray-500">
													{transactionType ===
														"sell" && isThreeMonths
														? `Price: ₹${bondData.currentPrice + calc.returns / unitsCount} (incl. interest)`
														: `${calc.returnPercentage.toFixed(2)}% return`}
												</div>
											</div>
											<div className="text-right">
												<div className="font-medium text-green-600">
													+
													{formatCurrency(
														calc.returns,
													)}
												</div>
												<div className="text-xs text-gray-500">
													{formatCurrency(
														calc.totalValue,
													)}{" "}
													total
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}

					{unitsCount === 0 && (
						<div className="text-center py-4">
							<Info className="h-8 w-8 text-gray-400 mx-auto mb-2" />
							<p className="text-sm text-gray-500">
								Enter number of units to see projections
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Risk Disclaimer */}
			<Alert>
				<AlertTriangle className="h-4 w-4" />
				<AlertDescription className="text-xs">
					<strong>Disclaimer:</strong> Projected returns are estimates
					based on current yield and assume reinvestment of coupons.
					Actual returns may vary due to market conditions, interest
					rate changes, and credit risk.
				</AlertDescription>
			</Alert>
		</div>
	);
}

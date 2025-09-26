import { Bond } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";
import { BondDetailsCard } from "./ui/BondDetailsCard";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import { ProjectedReturnsCard } from "./ui/ProjectedReturnsCard";
import { TransactionForm } from "./ui/TransactionForm";
/**
 * Refactored BuySell component - broken down into smaller, manageable components
 */
import { Button } from "./ui/button";
import { useBuySellForm } from "./ui/useBuySellForm";

interface BuySellProps {
	bondData: Bond;
	transactionType: "buy" | "sell";
	onBack: () => void;
	onOrderPlaced: (quantity: number) => void;
}

export function BuySell({
	bondData,
	transactionType,
	onBack,
	onOrderPlaced,
}: BuySellProps) {
	const {
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
		handleSubmit: handleFormSubmit,
		incrementUnits,
		decrementUnits,
	} = useBuySellForm({ bondData, transactionType });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleFormSubmit(onOrderPlaced)();
	};

	return (
		<ErrorBoundary>
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-8 max-w-6xl">
					{/* Header */}
					<div className="flex items-center gap-4 mb-6">
						<Button variant="outline" onClick={onBack}>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Portfolio
						</Button>
						<div>
							<h1 className="capitalize">
								{transactionType} Bond
							</h1>
							<p className="text-gray-600">
								{transactionType === "buy"
									? "Purchase"
									: "Sell"}{" "}
								{bondData.name}
							</p>
						</div>
					</div>

					<div className="grid lg:grid-cols-3 gap-6">
						{/* Left Column - Bond Info & Form */}
						<div className="lg:col-span-2 space-y-6">
							{/* Bond Information */}
							<BondDetailsCard
								bondData={bondData}
								transactionType={transactionType}
								availableUnits={availableUnits}
								remainingMonths={remainingMonths}
							/>

							{/* Transaction Form */}
							<TransactionForm
								bondData={bondData}
								transactionType={transactionType}
								units={units}
								setUnits={setUnits}
								errors={errors}
								isLoading={isLoading}
								availableUnits={availableUnits}
								minUnits={minUnits}
								maxUnits={maxUnits}
								unitsCount={unitsCount}
								totalAmount={totalAmount}
								onSubmit={handleSubmit}
								onIncrement={incrementUnits}
								onDecrement={decrementUnits}
							/>
						</div>

						{/* Right Column - Projected Returns */}
						<ProjectedReturnsCard
							bondData={bondData}
							transactionType={transactionType}
							unitsCount={unitsCount}
							totalAmount={totalAmount}
							selectedValuation={selectedValuation}
							setSelectedValuation={setSelectedValuation}
							valuationPeriods={valuationPeriods}
							remainingMonths={remainingMonths}
						/>
					</div>
				</div>
			</div>
		</ErrorBoundary>
	);
}

import { Bond } from "@/lib/mockData";
import { Building } from "lucide-react";
/**
 * BondDetailsCard component - displays bond information in the buy/sell flow
 */
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Label } from "./label";

interface BondDetailsCardProps {
	bondData: Bond;
	transactionType: "buy" | "sell";
	availableUnits: number;
	remainingMonths: number;
}

export function BondDetailsCard({
	bondData,
	transactionType,
	availableUnits,
	remainingMonths,
}: BondDetailsCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Building className="h-5 w-5 text-blue-600" />
					Bond Details
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid md:grid-cols-2 gap-4">
					<div className="space-y-3">
						<div>
							<Label className="text-sm text-gray-600">
								Bond Name
							</Label>
							<p className="font-medium">{bondData.name}</p>
						</div>
						<div>
							<Label className="text-sm text-gray-600">
								Issuer
							</Label>
							<p className="font-medium">{bondData.issuer}</p>
						</div>
						<div>
							<Label className="text-sm text-gray-600">
								Credit Rating
							</Label>
							<p className="font-medium">{bondData.rating}</p>
						</div>
					</div>
					<div className="space-y-3">
						<div>
							<Label className="text-sm text-gray-600">
								{transactionType === "buy"
									? "Current Price"
									: "Avg Buy Price"}
							</Label>
							<p className="font-medium">
								₹{bondData.currentPrice}
							</p>
						</div>
						<div>
							<Label className="text-sm text-gray-600">
								Current YTM
							</Label>
							<p className="font-medium text-green-600">
								{bondData.currentYTM}%
							</p>
						</div>
						<div>
							<Label className="text-sm text-gray-600">
								{transactionType === "buy"
									? "Max Available"
									: "Held Units"}
							</Label>
							<p className="font-medium">
								{availableUnits} units
							</p>
						</div>
					</div>
				</div>

				{/* Additional Info Row */}
				<div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
					<div className="space-y-3">
						<div>
							<Label className="text-sm text-gray-600">
								Remaining Months
							</Label>
							<p className="font-medium">
								{remainingMonths} months
							</p>
						</div>
					</div>
					<div className="space-y-3">
						<div>
							<Label className="text-sm text-gray-600">
								Maturity Date
							</Label>
							<p className="font-medium">
								{bondData.maturityDate}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

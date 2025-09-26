import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, PieChart, IndianRupee } from "lucide-react";

interface PortfolioSummaryProps {
  portfolioSummary: {
    totalValue: number;
    totalInvested: number;
    totalGain: number;
    gainPercentage: number;
    monthlyIncome: number;
    ytdReturn: number;
    avgYield: number;
  };
}

export function PortfolioSummary({ portfolioSummary }: PortfolioSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">
              Total Value
            </span>
          </div>
          <div className="text-2xl font-bold">
            {formatCurrency((portfolioSummary.totalInvested * 10.22 / 100) + portfolioSummary.totalInvested)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">
              Total Gain/Loss
            </span>
          </div>
          <div className={`text-2xl font-bold text-green-600`}>
            {formatCurrency(portfolioSummary.totalInvested * 10.22 / 100)}
          </div>
          <div className="text-sm text-gray-500">
            Invested:{" "}
            {formatCurrency(portfolioSummary.totalInvested)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-600">
              Total Yield
            </span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            +10.22%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

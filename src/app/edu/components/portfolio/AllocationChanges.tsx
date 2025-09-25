import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Shield, 
  Building, 
  AlertTriangle 
} from "lucide-react";
import { AnalysisResult } from "../types/portfolioTypes";
import { formatCurrency } from "../utils/portfolioUtils";

interface AllocationChangesProps {
  analysisResult: AnalysisResult;
}

export function AllocationChanges({ analysisResult }: AllocationChangesProps) {
  const getAssetIcon = (key: string) => {
    switch (key) {
      case 'stocks': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'mutualFunds': return <PieChart className="h-4 w-4 text-blue-600" />;
      case 'fixedDeposits': return <Shield className="h-4 w-4 text-green-600" />;
      default: return <Building className="h-4 w-4 text-orange-600" />;
    }
  };

  const getAssetColor = (key: string) => {
    switch (key) {
      case 'stocks': return 'bg-red-100';
      case 'mutualFunds': return 'bg-blue-100';
      case 'fixedDeposits': return 'bg-green-100';
      default: return 'bg-orange-100';
    }
  };

  const getAssetLabel = (key: string) => {
    switch (key) {
      case 'mutualFunds': return 'Mutual Funds';
      case 'fixedDeposits': return 'Fixed Deposits';
      default: return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          Recommended Portfolio Rebalancing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(analysisResult.allocationChanges).map(([key, allocation]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getAssetColor(key)}`}>
                  {getAssetIcon(key)}
                </div>
                <div>
                  <div className="font-medium capitalize">
                    {getAssetLabel(key)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(allocation.current)} → {formatCurrency(allocation.suggested)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {allocation.change !== 0 && (
                  <div className={`font-medium ${allocation.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {allocation.change > 0 ? '+' : ''}{formatCurrency(allocation.change)}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  {allocation.change === 0 ? 'No change' : allocation.change > 0 ? 'Add' : 'Reduce'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Timeline */}
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-sm font-medium text-purple-800 mb-3">Recommended Implementation Timeline</div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-700">1</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-purple-800">Week 1-2: Research & Planning</div>
                <div className="text-xs text-purple-600">Review suggested bonds, compare ratings, and set up investment accounts</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-700">2</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-purple-800">Week 3-6: Gradual Rebalancing</div>
                <div className="text-xs text-purple-600">Move 25-30% of the recommended amount each week to minimize timing risk</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-medium text-purple-700">3</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-purple-800">Month 2-3: Complete Transition</div>
                <div className="text-xs text-purple-600">Finalize bond purchases and monitor portfolio balance</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Rebalancing Strategy:</strong> Consider gradually moving funds from stocks and mutual funds 
              to bonds over 2-3 months to minimize market timing risk. This approach helps reduce volatility 
              while maintaining growth potential.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

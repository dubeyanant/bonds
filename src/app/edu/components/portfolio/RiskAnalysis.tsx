import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, TrendingDown } from "lucide-react";
import { AnalysisResult } from "../types/portfolioTypes";
import { getRiskColorSimple } from "../utils/portfolioUtils";

interface RiskAnalysisProps {
  analysisResult: AnalysisResult;
}

export function RiskAnalysis({ analysisResult }: RiskAnalysisProps) {
  return (
    <Card className="sticky top-8 w-72 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-green-600" />
          Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Risk Comparison */}
        <div className="grid grid-cols-2 gap-3">
          {/* Current Risk Rating */}
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Current Risk</div>
            <div className={`text-2xl font-bold ${getRiskColorSimple(analysisResult.currentRiskRating)}`}>
              {analysisResult.currentRiskRating}/10
            </div>
          </div>
          
          {/* Improved Risk Rating */}
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Improved Risk</div>
            <div className={`text-2xl font-bold ${getRiskColorSimple(analysisResult.improvedRiskRating)}`}>
              {analysisResult.improvedRiskRating}/10
            </div>
          </div>
        </div>

        {/* Risk Reduction Summary */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xs text-gray-600 mb-1">Risk Reduction</div>
          <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
            <TrendingDown className="h-4 w-4" />
            -{analysisResult.riskReduction.toFixed(1)} points
          </div>
        </div>

        {/* Optimization Benefits */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800 text-sm">Key Benefits</span>
          </div>
          <ul className="text-blue-700 text-xs space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Reduces volatility through diversification</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Adds steady income from bonds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Better risk-adjusted performance</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

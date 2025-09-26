import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Building, ArrowRight } from "lucide-react";
import { AnalysisResult } from "../types/portfolioTypes";
import { formatCurrency } from "../utils/portfolioUtils";

interface BondSuggestionsProps {
  analysisResult: AnalysisResult;
}

export function BondSuggestions({ analysisResult }: BondSuggestionsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Recommended Bond Investments
          </CardTitle>
          <div className="text-right">
            <div className="text-sm text-gray-600">Total Bond Investment</div>
            <div className="font-bold text-green-600">{formatCurrency(analysisResult.totalInvestment)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysisResult.suggestions.map((bond) => (
            <Card key={bond.id} className="border border-gray-200">
              <CardContent className="pt-4">
                <div className="grid lg:grid-cols-12 gap-4 items-center">
                  {/* Bond Info */}
                  <div className="lg:col-span-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Building className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{bond.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{bond.issuer}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">{bond.rating}</Badge>
                          <span className="text-sm text-gray-500">
                            Yield: {bond.currentYield}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div className="lg:col-span-4">
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-500">Suggested Investment</div>
                        <div className="font-bold text-lg text-green-600">
                          {formatCurrency(bond.suggestedAmount)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Units: </span>
                          <span className="font-medium">{bond.units}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price: </span>
                          <span className="font-medium">₹{bond.currentPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Contribution */}
                  <div className="lg:col-span-3">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Risk Contribution</div>
                      <div className="font-medium">{bond.riskContribution}/10</div>
                      <Progress value={bond.riskContribution * 10} className="h-2 mt-1" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <strong>Why this bond:</strong> {bond.reason}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

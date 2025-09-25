import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Building, ArrowRight } from "lucide-react";
import { AnalysisResult } from "../types/portfolioTypes";
import { formatCurrency } from "../utils/portfolioUtils";

interface BondSuggestionsProps {
  analysisResult: AnalysisResult;
}

export function BondSuggestions({ analysisResult }: BondSuggestionsProps) {
  const [showDetails, setShowDetails] = useState(false);

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

        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide' : 'Show'} Detailed Analysis
            <ArrowRight className={`h-4 w-4 ml-1 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
          </Button>
        </div>

        {showDetails && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-3">Detailed Portfolio Analysis</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <div className="font-medium mb-2">Risk Metrics:</div>
                <ul className="space-y-1">
                  <li>• Current portfolio Sharpe ratio: 1.2</li>
                  <li>• Improved Sharpe ratio: 1.6</li>
                  <li>• Volatility reduction: 15%</li>
                  <li>• Maximum drawdown: -12% → -8%</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-2">Return Analysis:</div>
                <ul className="space-y-1">
                  <li>• Expected annual return: 7.8%</li>
                  <li>• Monthly income from bonds: ₹{((analysisResult.totalInvestment * 0.075) / 12).toLocaleString()}</li>
                  <li>• Tax-efficient income stream</li>
                  <li>• Inflation-protected growth</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

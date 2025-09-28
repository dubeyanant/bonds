import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Building } from "lucide-react";
import { AnalysisResult } from "../types/portfolioTypes";

interface BondSuggestionsProps {
  analysisResult: AnalysisResult;
}

export function BondSuggestions({ analysisResult }: BondSuggestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Recommended Bond Investments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysisResult.suggestions.map((bond) => (
            <Card key={bond.id} className="border border-gray-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  {/* Bond Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="bg-yellow-50 p-2 rounded-md">
                      <Building className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-base">{bond.name}</h4>
                      <p className="text-xs text-gray-500">{bond.issuer}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">{bond.rating}</Badge>
                        <span className="text-xs text-green-600 font-medium">
                          {bond.currentYield}% Yield
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bond Details */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-green-600">
                      ₹{bond.currentPrice}/unit
                    </div>
                    <div className="text-xs text-gray-500">
                      Maturity: {new Date(bond.maturityDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-gray-600">
                  <strong className="text-blue-800">Recommendation:</strong> {bond.reason}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

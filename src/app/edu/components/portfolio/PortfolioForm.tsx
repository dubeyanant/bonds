import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Brain, Edit3, X } from "lucide-react";
import { PortfolioInputs } from "../types/portfolioTypes";
import { formatCurrency, getInvestmentTypeLabel, validatePortfolioInputs, calculateTotalPortfolio } from "../utils/portfolioUtils";
import { useState } from "react";

interface PortfolioFormProps {
  portfolioInputs: PortfolioInputs;
  onInputChange: (field: keyof PortfolioInputs, value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function PortfolioForm({ portfolioInputs, onInputChange, onAnalyze, isAnalyzing }: PortfolioFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalPortfolio = calculateTotalPortfolio(portfolioInputs);

  return (
    <>
      {/* Compact summary view */}
      {!isExpanded ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-800">Current Portfolio</span>
                </div>
                
                {totalPortfolio > 0 && (
                  <>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-blue-600">{formatCurrency(totalPortfolio)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {portfolioInputs.stocks && (
                          <span className="text-gray-600">Stocks: {formatCurrency(Number(portfolioInputs.stocks))}</span>
                        )}
                        {portfolioInputs.mutualFunds && (
                          <span className="text-gray-600">MF: {formatCurrency(Number(portfolioInputs.mutualFunds))}</span>
                        )}
                        {portfolioInputs.fixedDeposits && (
                          <span className="text-gray-600">FDs: {formatCurrency(Number(portfolioInputs.fixedDeposits))}</span>
                        )}
                        {portfolioInputs.bonds && (
                          <span className="text-gray-600">Bonds: {formatCurrency(Number(portfolioInputs.bonds))}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {validatePortfolioInputs(portfolioInputs) && (
                  <Button 
                    onClick={onAnalyze}
                    disabled={isAnalyzing}
                    className="h-9 px-4 text-sm"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Brain className="h-4 w-4" />
                        Analyze Portfolio
                      </div>
                    )}
                  </Button>
                )}
                
                <Button 
                  onClick={() => setIsExpanded(true)}
                  variant="outline"
                  className="h-9 px-4 text-sm"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Expanded form view */
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  Edit Portfolio
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stocks">Stocks Investment (₹)</Label>
                  <Input
                    id="stocks"
                    type="number"
                    min="0"
                    placeholder="Enter amount in stocks"
                    value={portfolioInputs.stocks}
                    onChange={(e) => onInputChange('stocks', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mutualFunds">Mutual Funds Investment (₹)</Label>
                  <Input
                    id="mutualFunds"
                    type="number"
                    min="0"
                    placeholder="Enter amount in mutual funds"
                    value={portfolioInputs.mutualFunds}
                    onChange={(e) => onInputChange('mutualFunds', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fixedDeposits">Fixed Deposits (₹)</Label>
                  <Input
                    id="fixedDeposits"
                    type="number"
                    min="0"
                    placeholder="Enter amount in FDs"
                    value={portfolioInputs.fixedDeposits}
                    onChange={(e) => onInputChange('fixedDeposits', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bonds">Bonds Investment (₹)</Label>
                  <Input
                    id="bonds"
                    type="number"
                    min="0"
                    placeholder="Enter amount in bonds"
                    value={portfolioInputs.bonds}
                    onChange={(e) => onInputChange('bonds', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="otherInvestmentType">Other Investment Type</Label>
                  <Select 
                    value={portfolioInputs.otherInvestmentType} 
                    onValueChange={(value) => onInputChange('otherInvestmentType', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select investment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="commodities">Commodities</SelectItem>
                      <SelectItem value="reits">REITs</SelectItem>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="derivatives">Derivatives</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {portfolioInputs.otherInvestmentType && (
                  <div>
                    <Label htmlFor="otherInvestmentAmount">
                      {getInvestmentTypeLabel(portfolioInputs.otherInvestmentType)} Investment (₹)
                    </Label>
                    <Input
                      id="otherInvestmentAmount"
                      type="number"
                      min="0"
                      placeholder={`Enter amount in ${portfolioInputs.otherInvestmentType}`}
                      value={portfolioInputs.otherInvestmentAmount}
                      onChange={(e) => onInputChange('otherInvestmentAmount', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}

                {/* Total Portfolio Value */}
                {totalPortfolio > 0 && (
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-1">Total Portfolio Value</div>
                    <div className="font-bold text-lg text-blue-600">
                      {formatCurrency(totalPortfolio)}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => {
                      onAnalyze();
                      setIsExpanded(false);
                    }}
                    disabled={!validatePortfolioInputs(portfolioInputs) || isAnalyzing}
                    className="flex-1"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing Portfolio...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Analyze & Get Suggestions
                      </div>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setIsExpanded(false)}
                    className="px-6"
                    size="lg"
                  >
                    Close
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Our AI analyzes your portfolio allocation and suggests optimal bond investments
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

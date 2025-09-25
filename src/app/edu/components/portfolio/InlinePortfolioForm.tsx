import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Brain } from "lucide-react";
import { PortfolioInputs } from "../types/portfolioTypes";
import { formatCurrency, getInvestmentTypeLabel, validatePortfolioInputs, calculateTotalPortfolio } from "../utils/portfolioUtils";

interface InlinePortfolioFormProps {
  portfolioInputs: PortfolioInputs;
  onInputChange: (field: keyof PortfolioInputs, value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function InlinePortfolioForm({ portfolioInputs, onInputChange, onAnalyze, isAnalyzing }: InlinePortfolioFormProps) {
  const totalPortfolio = calculateTotalPortfolio(portfolioInputs);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-6 w-6 text-blue-600" />
          Enter Your Portfolio
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add your current investments to get personalized AI recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <Button 
          onClick={onAnalyze}
          disabled={!validatePortfolioInputs(portfolioInputs) || isAnalyzing}
          className="w-full"
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
              Analyze & Get AI Suggestions
            </div>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Enter at least one investment amount to get started
        </div>
      </CardContent>
    </Card>
  );
}

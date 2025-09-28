import { useState } from "react";

// Import types
import { PortfolioInputs, AnalysisResult } from "./types/portfolioTypes";

// Import components
import { PortfolioForm } from "./portfolio/PortfolioForm";
import { EmptyState } from "./portfolio/EmptyState";
import { RiskAnalysis } from "./portfolio/RiskAnalysis";
import { AllocationChanges } from "./portfolio/AllocationChanges";
import { BondSuggestions } from "./portfolio/BondSuggestions";
import { InlinePortfolioForm } from "./portfolio/InlinePortfolioForm";
import { AIFeaturesInfo } from "./portfolio/AIFeaturesInfo";

// Import services
import { analyzePortfolio } from "./services/portfolioAnalyzer";

export function PortfolioSuggestion() {
  const [portfolioInputs, setPortfolioInputs] = useState<PortfolioInputs>({
    stocks: "",
    mutualFunds: "",
    fixedDeposits: "",
    bonds: "",
    otherInvestmentType: "",
    otherInvestmentAmount: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleInputChange = (field: keyof PortfolioInputs, value: string) => {
    setPortfolioInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzePortfolio(portfolioInputs);
      setAnalysisResult(result);
      // Scroll to top after the new content is rendered
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 flex items-center gap-2">
            AI Portfolio Recommendations
          </h1>
          <p className="text-gray-600">
            Get personalized bond recommendations to optimize your portfolio risk and returns
          </p>
        </div>

        {/* Conditional Layout Based on Analysis State */}
        {!analysisResult ? (
          /* Initial State: Two-column layout with inline form and AI features */
          <div className="grid lg:grid-cols-8 gap-8">
            <div className="lg:col-span-5">
              <InlinePortfolioForm
                portfolioInputs={portfolioInputs}
                onInputChange={handleInputChange}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>
            <div className="lg:col-span-3">
              <AIFeaturesInfo />
            </div>
          </div>
        ) : (
          /* Portfolio Data Entered: Show compact form and results */
          <>
            {/* Portfolio Summary Bar - positioned above content */}
            <PortfolioForm
              portfolioInputs={portfolioInputs}
              onInputChange={handleInputChange}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />

            {/* Analysis Results with Conditional Side Card Layout */}
            {!analysisResult ? (
              <EmptyState />
            ) : (
              <div className="space-y-6">
                {/* Portfolio Rebalancing with Risk Analysis Side Card */}
                <div className="flex gap-6">
                  {/* Allocation Changes - Main Content */}
                  <div className="flex-1">
                    <AllocationChanges analysisResult={analysisResult} />
                  </div>
                  
                  {/* Risk Analysis Side Card - Only sticks beside AllocationChanges */}
                  <div className="flex-shrink-0">
                    <RiskAnalysis analysisResult={analysisResult} />
                  </div>
                </div>
                
                {/* Bond Suggestions - Full Width */}
                <div className="w-full">
                  <BondSuggestions analysisResult={analysisResult} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

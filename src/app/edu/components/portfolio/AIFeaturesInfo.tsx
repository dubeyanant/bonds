import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, BarChart3, TrendingUp, CheckCircle } from "lucide-react";

export function AIFeaturesInfo() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-6 w-6 text-purple-600" />
          What Our AI Will Analyze
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get comprehensive portfolio insights powered by artificial intelligence
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Portfolio Analysis */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Portfolio Analysis</h4>
            <p className="text-sm text-gray-600">
              Analyze your current asset allocation across different investments
            </p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="flex items-start gap-3">
          <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
            <Target className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Risk Rating</h4>
            <p className="text-sm text-gray-600">
              Calculate your portfolio's risk level and compare it with optimized allocations for better returns
            </p>
          </div>
        </div>

        {/* Rebalancing Suggestions */}
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Portfolio Rebalancing</h4>
            <p className="text-sm text-gray-600">
              Get specific recommendations to optimize your asset allocation for improved risk-return profile
            </p>
          </div>
        </div>

        {/* Bond Recommendations */}
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Bond Suggestions</h4>
            <p className="text-sm text-gray-600">
              Receive personalized bond investment recommendations based on your portfolio
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Ready to Get Started?</span>
          </div>
          <p className="text-sm text-blue-700">
            Enter your portfolio details in the form to receive AI-powered insights and bond recommendations tailored just for you.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

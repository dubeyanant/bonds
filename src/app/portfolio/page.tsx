"use client"

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  Building,
  IndianRupee,
} from "lucide-react";
import { portfolioSummary, portfolioHoldings as defaultHoldings, newBonds, PortfolioHolding } from "@/lib/mockData";

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(defaultHoldings);

  useEffect(() => {
    // Load holdings from localStorage and merge with default data
    const savedHoldings = localStorage.getItem('portfolioHoldings');
    if (savedHoldings) {
      try {
        const parsedHoldings = JSON.parse(savedHoldings);
        setHoldings(parsedHoldings);
      } catch (error) {
        console.error('Error parsing saved holdings:', error);
        setHoldings(defaultHoldings);
      }
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculatePercentageSold = (totalUnits: number, maxUnitsAvailable: number) => {
    const soldUnits = totalUnits - maxUnitsAvailable;
    return Math.round((soldUnits / totalUnits) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-16 lg:px-40 py-8">
        {/* Portfolio Summary */}
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
                {formatCurrency(portfolioSummary.totalValue)}
              </div>
              <div
                className={`text-sm flex items-center gap-1 ${portfolioSummary.gainPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {portfolioSummary.gainPercentage >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {portfolioSummary.gainPercentage >= 0
                  ? "+"
                  : ""}
                {portfolioSummary.gainPercentage}%
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
              <div
                className={`text-2xl font-bold ${portfolioSummary.totalGain >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {portfolioSummary.totalGain >= 0 ? "+" : ""}
                {formatCurrency(portfolioSummary.totalGain)}
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
                <PieChart className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-600">
                  YTD Return
                </span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                +{portfolioSummary.ytdReturn}%
              </div>
              <div className="text-sm text-gray-500">
                Since Jan 2024
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="newbonds">New Bonds</TabsTrigger>
          </TabsList>

          {/* Holdings Tab */}
          <TabsContent value="holdings" className="space-y-4">
            {holdings.map((holding) => (
              <Card key={holding.id}>
                <CardContent className="pt-6">
                  <div className="grid lg:grid-cols-12 gap-4 items-center">
                    {/* Bond Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">
                            {holding.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {holding.issuer}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {holding.type}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {holding.rating}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Investment */}
                    <div className="lg:col-span-2">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          Held Quantity
                        </div>
                        <div className="font-medium">
                          {holding.heldQuantity} units
                        </div>
                        <div className="text-sm text-gray-500">
                          Invested: {formatCurrency(holding.investedAmount)}
                        </div>
                      </div>
                    </div>

                    {/* Yield & Maturity */}
                    <div className="lg:col-span-3">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          Current YTM
                        </div>
                        <div className="font-medium text-green-600">
                          {holding.yieldCurrent}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Maturity: {formatDate(holding.maturityDate)}
                        </div>
                      </div>
                    </div>

                    {/* Next Coupon */}
                    <div className="lg:col-span-3">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          Next Coupon
                        </div>
                        <div className="font-medium">
                          {formatDate(holding.nextCoupon)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.location.href = `/buy-sell?bondId=${holding.id}&type=sell`;
                      }}
                    >
                      Sell
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        window.location.href = `/buy-sell?bondId=${holding.id}&type=buy`;
                      }}
                    >
                      Buy More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* New Bonds Tab */}
          <TabsContent value="newbonds" className="space-y-4">
            {newBonds.map((bond) => (
              <Card key={bond.id}>
                <CardContent className="pt-6">
                  <div>
                    <div className="flex justify-between px-4 pb-4 items-center">
                      {/* Bond Info */}
                      <div className="lg:col-span-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Building className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">
                              {bond.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {bond.issuer}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {bond.type}
                              </Badge>
                              <Badge className={`${bond.rating === 'AAA' ? 'bg-green-100 text-green-800' :
                                  bond.rating === 'AA+' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {bond.rating}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Yield & Coupon */}
                      <div className="lg:col-span-2">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-500">
                            Current YTM
                          </div>
                          <div className="font-medium text-green-600">
                            {bond.yieldCurrent}%
                          </div>
                          <div className="text-sm text-gray-500">
                            Coupon: {bond.couponRate}%
                          </div>
                        </div>
                      </div>

                      {/* Maturity */}
                      <div className="lg:col-span-2">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-500">
                            Maturity
                          </div>
                          <div className="font-medium">
                            {bond.maturityDate === "Perpetual" ? "Perpetual" : formatDate(bond.maturityDate)}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="lg:col-span-3">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-500">
                            Status
                          </div>
                          <div className="font-medium text-orange-600">
                            {calculatePercentageSold(bond.totalUnits, bond.maxUnitsAvailable)}% Sold
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <div className="lg:col-span-2">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          window.location.href = `/buy-sell?bondId=${bond.id}&type=buy`;
                        }}
                      >
                        Buy Bond
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

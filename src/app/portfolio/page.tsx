"use client"

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

export default function PortfolioPage() {
  const portfolioSummary = {
    totalValue: 850000,
    totalInvested: 800000,
    totalGain: 50000,
    gainPercentage: 6.25,
    monthlyIncome: 5680,
    ytdReturn: 8.2,
    avgYield: 7.8,
  };

  const holdings = [
    {
      id: "1",
      name: "HDFC Bank Bond Series XV",
      issuer: "HDFC Bank",
      type: "Corporate",
      rating: "AAA",
      heldQuantity: 50,
      investedAmount: 49000,
      maturityDate: "2029-03-20",
      nextCoupon: "2024-09-20",
      yieldCurrent: 8.38,
    },
    {
      id: "2",
      name: "10 Year Government Security",
      issuer: "Government of India",
      type: "Government",
      rating: "AAA",
      heldQuantity: 100,
      investedAmount: 100000,
      maturityDate: "2034-01-15",
      nextCoupon: "2024-10-15",
      yieldCurrent: 7.35,
    },
    {
      id: "3",
      name: "Reliance Industries Bond",
      issuer: "Reliance Industries",
      type: "Corporate",
      rating: "AAA",
      heldQuantity: 25,
      investedAmount: 25250,
      maturityDate: "2026-06-15",
      nextCoupon: "2024-12-15",
      yieldCurrent: 8.26,
    },
  ];

  const newBonds = [
    {
      id: "nb1",
      name: "State Bank of India Bond 2029",
      issuer: "State Bank of India",
      type: "Corporate",
      rating: "AAA",
      maturityDate: "2029-12-15",
      couponRate: 8.5,
      yieldCurrent: 8.55,
      sold: "94% Sold",
    },
    {
      id: "nb2",
      name: "15 Year Government Security",
      issuer: "Government of India",
      type: "Government",
      rating: "AAA",
      maturityDate: "2039-06-20",
      couponRate: 7.8,
      yieldCurrent: 7.68,
      sold: "67% Sold",
    },
    {
      id: "nb3",
      name: "Tata Steel Bond Series II",
      issuer: "Tata Steel Limited",
      type: "Corporate",
      rating: "AA+",
      maturityDate: "2027-09-10",
      couponRate: 8.8,
      yieldCurrent: 9.02,
      sold: "82% Sold",
    },
    {
      id: "nb4",
      name: "ICICI Bank Perpetual Bond",
      issuer: "ICICI Bank",
      type: "Corporate",
      rating: "AAA",
      maturityDate: "Perpetual",
      couponRate: 9.2,
      yieldCurrent: 8.98,
      sold: "45% Sold",
    },
    {
      id: "nb5",
      name: "Mahindra Finance NCD",
      issuer: "Mahindra & Mahindra Financial Services",
      type: "Corporate",
      rating: "AA",
      maturityDate: "2026-03-25",
      couponRate: 9.5,
      yieldCurrent: 9.89,
      sold: "78% Sold",
    },
  ];

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
                          Current Yield
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
              
                    <Button variant="outline" size="sm">
                      Sell
                    </Button>
                    <Button size="sm">Buy More</Button>
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
                  <div className="grid lg:grid-cols-12 gap-4 items-center">
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
                            <Badge className={`${
                              bond.rating === 'AAA' ? 'bg-green-100 text-green-800' :
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
                          Current Yield
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
                    <div className="lg:col-span-3">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          Maturity
                        </div>
                        <div className="font-medium">
                          {bond.maturityDate === "Perpetual" ? "Perpetual" : formatDate(bond.maturityDate)}
                        </div>
                      </div>
                    </div>

                    {/* Sold Status */}
                    <div className="lg:col-span-1">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">
                          Status
                        </div>
                        <div className="font-medium text-orange-600">
                          {bond.sold}
                        </div>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <div className="lg:col-span-2">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          alert(`Buying ${bond.name} - Status: ${bond.sold}`);
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

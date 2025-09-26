"use client"

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  User,
  ArrowLeft,
} from "lucide-react";
import { PortfolioHolding } from "@/lib/mockData";
import { BondStateManager } from "@/lib/bondStateManager";

export default function ExploreBondsPage() {
  const [availableBonds, setAvailableBonds] = useState<PortfolioHolding[]>([]);

  const loadBondData = () => {
    const availableBonds = BondStateManager.getAvailableBonds();
    setAvailableBonds(availableBonds);
  };

  useEffect(() => {
    loadBondData();

    // Listen for storage changes to update when transactions occur in other tabs
    const handleStorageChange = () => {
      loadBondData();
    };

    window.addEventListener('storage', handleStorageChange);

    // Listen for custom bond state change events
    const handleBondStateChange = () => {
      loadBondData();
    };

    window.addEventListener('bondStateChanged', handleBondStateChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bondStateChanged', handleBondStateChange);
    };
  }, []);

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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">anyStockBroker</h1>
            <div className="flex items-center gap-6">
              <div className="bg-gray-100 p-2 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Hemant Sahu</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-16 lg:px-40 py-8">
        {/* Back Button and Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Available Bonds</h2>
          <p className="text-gray-600">Discover and invest in high-quality bonds from trusted issuers</p>
        </div>

        {/* Available Bonds */}
        <div className="space-y-4">
          {availableBonds.map((bond) => (
            <Card key={bond.id}>
              <CardContent className="pt-6">
                <div>
                  <div className="flex justify-between items-center">
                    {/* Bond Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Building className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1 text-sm">
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
                                bond.rating.startsWith('A') ? 'bg-yellow-100 text-yellow-800' :
                                  bond.rating.startsWith('B') ? 'bg-orange-100 text-orange-800' :
                                    bond.rating.startsWith('C') ? 'bg-red-100 text-red-800' :
                                      bond.rating === 'D' ? 'bg-gray-800 text-white' :
                                        'bg-gray-100 text-gray-800'
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
                          {bond.currentYTM}%
                        </div>
                        <div className="text-sm text-gray-500">
                          Coupon: {bond.couponRate}%
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

                  {/* Timeline and Buy Button */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    {/* Bond Timeline */}
                    <div className="w-64 mr-6">
                      <div className="mb-1">
                        <span className="text-xs font-medium text-gray-700">Bond Timeline</span>
                      </div>
                      <div className="relative">
                        {/* Timeline Bar Container */}
                        <div className="h-1.5 bg-gray-200 rounded-full relative overflow-hidden shadow-inner">
                          {/* Elapsed Time (Darker) */}
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${(() => {
                                const issueDateStr = (bond as any).issueDate || "2024-01-01";
                                const issueDate = new Date(issueDateStr);
                                const maturityDate = new Date(bond.maturityDate === "Perpetual" ? "2050-12-31" : bond.maturityDate);
                                const currentDate = new Date();

                                if (isNaN(issueDate.getTime()) || isNaN(maturityDate.getTime())) {
                                  return 50; // fallback to 50% if dates are invalid
                                }

                                const totalDuration = maturityDate.getTime() - issueDate.getTime();
                                const elapsedDuration = currentDate.getTime() - issueDate.getTime();
                                const progress = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));
                                return progress;
                              })()}%`
                            }}
                          />
                          {/* Remaining Time (Lighter background already set) */}
                        </div>

                        {/* Current Position Marker */}
                        <div
                          className="absolute top-0 transform -translate-x-1/2 -translate-y-0.5"
                          style={{
                            left: `${(() => {
                              const issueDateStr = (bond as any).issueDate || "2024-01-01";
                              const issueDate = new Date(issueDateStr);
                              const maturityDate = new Date(bond.maturityDate === "Perpetual" ? "2050-12-31" : bond.maturityDate);
                              const currentDate = new Date();

                              if (isNaN(issueDate.getTime()) || isNaN(maturityDate.getTime())) {
                                return 50; // fallback to 50% if dates are invalid
                              }

                              const totalDuration = maturityDate.getTime() - issueDate.getTime();
                              const elapsedDuration = currentDate.getTime() - issueDate.getTime();
                              const progress = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));
                              return progress;
                            })()}%`
                          }}
                        >
                          <div className="w-2.5 h-2.5 bg-white border-2 border-red-500 rounded-full shadow-md"></div>
                          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <span className="text-xs font-medium text-red-600 bg-white px-1 py-0.5 rounded shadow-sm border">Today</span>
                          </div>
                        </div>

                        {/* Timeline Labels */}
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <div className="flex flex-col items-start">
                            <span className="font-medium text-gray-600">Issue</span>
                            <span className="text-gray-500">{formatDate((bond as any).issueDate || "2024-01-01")}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-medium text-gray-600">Maturity</span>
                            <span className="text-gray-500">{bond.maturityDate === "Perpetual" ? "Perpetual" : formatDate(bond.maturityDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <Button
                      size="sm"
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
        </div>
      </div>
    </div>
  );
}

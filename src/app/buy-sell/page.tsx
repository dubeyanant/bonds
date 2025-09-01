"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BuySell } from "@/components/buySell";

interface BondData {
  id: string;
  name: string;
  issuer: string;
  type: string;
  rating: string;
  currentPrice: number;
  currentYTM: number;
  quantity: number;
  maxUnitsAvailable: number;
  totalUnits: number; // Total units issued (default 100)
  faceValue: number;
  maturityDate: string;
  remainingMonths?: number; // Optional - will be calculated from maturityDate
  couponRate: number;
}

export default function BuySellPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bondData, setBondData] = useState<BondData | null>(null);
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    // Get bond data from URL parameters
    const bondId = searchParams.get('bondId');
    const type = searchParams.get('type') as 'buy' | 'sell';
    
    if (!bondId || !type) {
      router.push('/portfolio');
      return;
    }

    setTransactionType(type);

    // Mock bond data - in a real app, you'd fetch this from an API
    const mockBondData: { [key: string]: BondData } = {
      "1": {
        id: "1",
        name: "HDFC Bank Bond Series XV",
        issuer: "HDFC Bank",
        type: "Corporate",
        rating: "AAA",
        currentPrice: 980,
        currentYTM: 8.38,
        quantity: 50,
        maxUnitsAvailable: 50,
        totalUnits: 100,
        faceValue: 1000,
        maturityDate: "2025-11-20",
        couponRate: 8.25,
      },
      "2": {
        id: "2",
        name: "10 Year Government Security",
        issuer: "Government of India",
        type: "Government",
        rating: "AAA",
        currentPrice: 1000,
        currentYTM: 7.35,
        quantity: 100,
        maxUnitsAvailable: 100,
        totalUnits: 100,
        faceValue: 1000,
        maturityDate: "2026-01-15",
        couponRate: 7.35,
      },
      "3": {
        id: "3",
        name: "Reliance Industries Bond",
        issuer: "Reliance Industries",
        type: "Corporate",
        rating: "AAA",
        currentPrice: 1010,
        currentYTM: 8.26,
        quantity: 25,
        maxUnitsAvailable: 30,
        totalUnits: 100,
        faceValue: 1000,
        maturityDate: "2026-06-15",
        couponRate: 8.50,
      },
      "nb1": {
        id: "nb1",
        name: "State Bank of India Bond 2029",
        issuer: "State Bank of India",
        type: "Corporate",
        rating: "AAA",
        currentPrice: 995,
        currentYTM: 8.55,
        quantity: 0,
        maxUnitsAvailable: 75,
        totalUnits: 100,
        faceValue: 1000,
        maturityDate: "2025-12-15",
        couponRate: 8.50,
      },
      "nb2": {
        id: "nb2",
        name: "15 Year Government Security",
        issuer: "Government of India",
        type: "Government",
        rating: "AAA",
        currentPrice: 1005,
        currentYTM: 7.68,
        quantity: 0,
        maxUnitsAvailable: 20,
        totalUnits: 100,
        faceValue: 1000,
        maturityDate: "2026-06-20",
        couponRate: 7.80,
      },
      "nb3": {
        id: "nb3",
        name: "Tata Steel Bond Series II",
        issuer: "Tata Steel Limited",
        type: "Corporate",
        rating: "AA+",
        currentPrice: 975,
        currentYTM: 9.02,
        quantity: 0,
        maxUnitsAvailable: 4,
        totalUnits: 100,
        faceValue: 1000,
        maturityDate: "2026-09-10",
        couponRate: 8.80,
      },
      "nb4": {
        id: "nb4",
        name: "Mahindra Finance NCD",
        issuer: "Mahindra & Mahindra Financial Services",
        type: "Corporate",
        rating: "AA",
        currentPrice: 960,
        currentYTM: 9.89,
        quantity: 0,
        maxUnitsAvailable: 35,
        totalUnits: 100,
        faceValue: 1000,
        maturityDate: "2026-03-25",
        couponRate: 9.50,
      },
    };

    const bond = mockBondData[bondId];
    if (bond) {
      setBondData(bond);
    } else {
      router.push('/portfolio');
    }
  }, [searchParams, router]);

  const handleBack = () => {
    router.push('/portfolio');
  };

  const handleOrderPlaced = () => {
    // Show success message and redirect back to portfolio
    alert(`${transactionType === 'buy' ? 'Buy' : 'Sell'} order placed successfully!`);
    router.push('/portfolio');
  };

  if (!bondData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bond details...</p>
        </div>
      </div>
    );
  }

  return (
    <BuySell
      bondData={bondData}
      transactionType={transactionType}
      onBack={handleBack}
      onOrderPlaced={handleOrderPlaced}
    />
  );
}

"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BuySell } from "@/components/buySell";
import { BondData, mockBondData } from "@/lib/mockData";

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

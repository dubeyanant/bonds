"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { BondStateManager } from "@/lib/bondStateManager";
import { Bond } from "@/lib/mockData";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { HoldingsTab } from "@/components/portfolio/HoldingsTab";
import { OrderBookTab } from "@/components/portfolio/OrderBookTab";

export default function PortfolioPage() {
  const { holdings, portfolioSummary } = usePortfolioData();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allBonds, setAllBonds] = useState<Bond[]>([]);
  
  // Get the tab from URL parameter, default to 'holdings' if not provided
  const activeTab = searchParams.get('tab') || 'holdings';

  // Redirect to holdings tab if no tab parameter is present
  useEffect(() => {
    if (!searchParams.get('tab')) {
      router.replace('/portfolio?tab=holdings');
    }
  }, [searchParams, router]);

  // Handle tab changes by updating the URL smoothly
  const handleTabChange = (value: string) => {
    router.push(`/portfolio?tab=${value}`);
  };

  // Initialize bond data and listen for changes
  useEffect(() => {
    // Initialize allBonds data asynchronously to prevent SSR issues
    const initializeBondData = async () => {
      if (typeof window !== 'undefined') {
        // Use setTimeout to make this async and non-blocking
        await new Promise(resolve => setTimeout(resolve, 0));
        setAllBonds(BondStateManager.getBondState());
      }
    };
    
    initializeBondData();

    const handleBondStateChange = () => {
      if (typeof window !== 'undefined') {
        setAllBonds(BondStateManager.getBondState());
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('bondStateChanged', handleBondStateChange);
      return () => window.removeEventListener('bondStateChanged', handleBondStateChange);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PortfolioHeader />
      
      <div className="container mx-auto px-4 md:px-16 lg:px-40 py-8">
        <PortfolioSummary portfolioSummary={portfolioSummary} />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="space-y-4">
            <HoldingsTab holdings={holdings} />
          </TabsContent>

          <TabsContent value="orderbook" className="space-y-6">
            <OrderBookTab allBonds={allBonds} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { allBonds } from "@/lib/mockData";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { PortfolioHeader } from "@/components/portfolio/PortfolioHeader";
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { HoldingsTab } from "@/components/portfolio/HoldingsTab";
import { OrderBookTab } from "@/components/portfolio/OrderBookTab";

export default function PortfolioPage() {
  const { holdings, portfolioSummary } = usePortfolioData();

  return (
    <div className="min-h-screen bg-gray-50">
      <PortfolioHeader />
      
      <div className="container mx-auto px-4 md:px-16 lg:px-40 py-8">
        <PortfolioSummary portfolioSummary={portfolioSummary} />

        <Tabs defaultValue="holdings" className="space-y-6">
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

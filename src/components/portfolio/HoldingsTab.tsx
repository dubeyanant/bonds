import { PortfolioHolding } from "@/lib/mockData";
import { BondCard } from "./BondCard";

interface HoldingsTabProps {
  holdings: PortfolioHolding[];
}

export function HoldingsTab({ holdings }: HoldingsTabProps) {
  const handleBondAction = (bondId: string, action: string) => {
    window.location.href = `/buy-sell?bondId=${bondId}&type=${action}`;
  };

  return (
    <div className="space-y-4">
      {holdings.map((holding) => (
        <BondCard
          key={holding.id}
          bond={holding}
          type="holding"
          onAction={handleBondAction}
        />
      ))}
    </div>
  );
}

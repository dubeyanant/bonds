import { PortfolioHolding } from "@/lib/mockData";
import { BondCard } from "./BondCard";

interface OrderBookTabProps {
  allBonds: PortfolioHolding[];
}

export function OrderBookTab({ allBonds }: OrderBookTabProps) {
  const executedOrders = allBonds.filter(bond => (bond as any).status === 'executed');
  const acceptedOrders = allBonds.filter(bond => (bond as any).status === 'accepted');

  return (
    <div className="space-y-6">
      {/* Executed Orders Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          Executed Orders
        </h3>
        <div className="space-y-4">
          {executedOrders.map((bond) => (
            <BondCard
              key={bond.id}
              bond={bond}
              type="executed"
            />
          ))}
        </div>
      </div>

      {/* Accepted Orders Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          Accepted Orders
        </h3>
        <div className="space-y-4">
          {acceptedOrders.map((bond) => (
            <BondCard
              key={bond.id}
              bond={bond}
              type="accepted"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

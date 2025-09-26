import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";
import { PortfolioHolding } from "@/lib/mockData";

interface BondCardProps {
  bond: PortfolioHolding;
  type: 'holding' | 'executed' | 'accepted';
  onAction?: (bondId: string, action: string) => void;
}

export function BondCard({ bond, type, onAction }: BondCardProps) {
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

  const getRatingBadgeStyle = (rating: string) => {
    if (rating === 'AAA') return 'bg-green-100 text-green-800';
    if (rating === 'AA+') return 'bg-blue-100 text-blue-800';
    if (rating.startsWith('A')) return 'bg-yellow-100 text-yellow-800';
    if (rating.startsWith('B')) return 'bg-orange-100 text-orange-800';
    if (rating.startsWith('C')) return 'bg-red-100 text-red-800';
    if (rating === 'D') return 'bg-gray-800 text-white';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = () => {
    switch (type) {
      case 'executed':
        return <Badge className="bg-green-100 text-green-800">Executed</Badge>;
      case 'accepted':
        return <Badge className="bg-blue-100 text-blue-800">Accepted</Badge>;
      default:
        return null;
    }
  };

  const getIconStyle = () => {
    switch (type) {
      case 'executed':
        return "bg-green-100 text-green-600";
      case 'accepted':
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4 justify-between items-center">
          {/* Bond Info */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${getIconStyle()}`}>
                <Building className="h-5 w-5" />
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
                  <Badge className={getRatingBadgeStyle(bond.rating)}>
                    {bond.rating}
                  </Badge>
                  {getStatusBadge()}
                </div>
              </div>
            </div>
          </div>

          {/* Details based on type */}
          {type === 'holding' && (
            <>
              {/* Quantity & Investment */}
              <div className="lg:col-span-2">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">
                    Held Quantity
                  </div>
                  <div className="font-medium">
                    {bond.heldQuantity} units
                  </div>
                  <div className="text-sm text-gray-500">
                    Invested: {formatCurrency(bond.investedAmount)}
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
                    {bond.currentYTM}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Maturity: {formatDate(bond.maturityDate)}
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
                    {formatDate(bond.nextCoupon)}
                  </div>
                </div>
              </div>
            </>
          )}

          {(type === 'executed' || type === 'accepted') && (
            <>
              {/* Order Details */}
              <div className="lg:col-span-2">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">
                    {type === 'executed' ? 'Units Held' : 'Available Units'}
                  </div>
                  <div className="font-medium">
                    {type === 'executed' ? bond.heldQuantity : bond.maxUnitsAvailable} units
                  </div>
                  <div className="text-sm text-gray-500">
                    Price: ₹{bond.currentPrice}
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
                    {bond.currentYTM}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Maturity: {formatDate(bond.maturityDate)}
                  </div>
                </div>
              </div>

              {/* Issue Date */}
              <div className="lg:col-span-3">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">
                    Issue Date
                  </div>
                  <div className="font-medium">
                    {formatDate((bond as any).issueDate)}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons for Holdings */}
        {type === 'holding' && (
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAction?.(bond.id, 'sell')}
            >
              Sell
            </Button>
            <Button
              size="sm"
              disabled={bond.heldQuantity >= 100}
              onClick={() => onAction?.(bond.id, 'buy')}
            >
              Buy More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Building, 
  Calendar, 
  TrendingUp, 
  Shield 
} from "lucide-react";
import { Bond } from "./types/bond";
import { getRatingColor, getRiskColor, formatCurrency } from "./utils/bondUtils";

interface BondCardProps {
  bond: Bond;
  onBondClick: (bond: Bond) => void;
}

export function BondCard({ bond, onBondClick }: BondCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-12 gap-4 items-center">
          {/* Bond Info */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{bond.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{bond.issuer}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{bond.type}</Badge>
                  <Badge className={getRatingColor(bond.rating)}>
                    {bond.rating}
                  </Badge>
                  {bond.isWatchlisted && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Yield & Price */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Current Yield</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-green-600">
                    {bond.currentYield}%
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="font-medium">
                  ₹{bond.currentPrice}
                  <span className="text-sm text-gray-500 ml-1">
                    (Face: ₹{bond.faceValue})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Maturity & Risk */}
          <div className="lg:col-span-3">
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Maturity</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(bond.maturityDate).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="text-sm text-gray-500">{bond.tenure}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Risk Level</div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className={getRiskColor(bond.riskLevel)}>
                    {bond.riskLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Info */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Min. Investment</div>
                <div className="font-medium">{formatCurrency(bond.minInvestment)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Coupon Rate</div>
                <div className="font-medium">{bond.couponRate}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4 pt-4 border-t">
          <Button 
            size="sm"
            onClick={() => onBondClick(bond)}
            disabled={bond.id !== "1"}
          >
            {bond.id === "1" ? "View Details" : "Coming Soon"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

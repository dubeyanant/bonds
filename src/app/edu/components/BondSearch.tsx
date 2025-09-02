import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, Filter, Star, ArrowUpDown, Building, Calendar, TrendingUp, Shield } from "lucide-react";

interface Bond {
  id: string;
  name: string;
  issuer: string;
  type: "Government" | "Corporate" | "Municipal";
  rating: string;
  ratingAgency: string;
  currentYield: number;
  faceValue: number;
  currentPrice: number;
  maturityDate: string;
  tenure: string;
  couponRate: number;
  minInvestment: number;
  isWatchlisted: boolean;
  riskLevel: "Low" | "Medium" | "High";
}

export function BondSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    bondType: "all",
    rating: "all", 
    yieldRange: [0, 15],
    maturityPeriod: "all",
    issuer: ""
  });
  const [sortBy, setSortBy] = useState("yield");

  const sampleBonds: Bond[] = [
    {
      id: "1",
      name: "10 Year Government Security",
      issuer: "Government of India",
      type: "Government",
      rating: "AAA",
      ratingAgency: "Sovereign",
      currentYield: 7.24,
      faceValue: 1000,
      currentPrice: 1020,
      maturityDate: "2034-01-15",
      tenure: "10 years",
      couponRate: 7.5,
      minInvestment: 10000,
      isWatchlisted: false,
      riskLevel: "Low"
    },
    {
      id: "2", 
      name: "HDFC Bank Bond Series XV",
      issuer: "HDFC Bank",
      type: "Corporate",
      rating: "AAA",
      ratingAgency: "CRISIL",
      currentYield: 8.45,
      faceValue: 1000,
      currentPrice: 980,
      maturityDate: "2029-03-20",
      tenure: "5 years",
      couponRate: 8.25,
      minInvestment: 25000,
      isWatchlisted: true,
      riskLevel: "Low"
    },
    {
      id: "3",
      name: "Tata Motors Finance Bond",
      issuer: "Tata Motors Finance",
      type: "Corporate", 
      rating: "AA+",
      ratingAgency: "ICRA",
      currentYield: 9.15,
      faceValue: 1000,
      currentPrice: 965,
      maturityDate: "2027-08-10",
      tenure: "3 years",
      couponRate: 9.0,
      minInvestment: 50000,
      isWatchlisted: false,
      riskLevel: "Medium"
    },
    {
      id: "4",
      name: "Maharashtra State Development Loan",
      issuer: "Government of Maharashtra",
      type: "Municipal",
      rating: "AA+",
      ratingAgency: "CARE",
      currentYield: 7.85,
      faceValue: 1000,
      currentPrice: 995,
      maturityDate: "2032-12-05",
      tenure: "8 years",
      couponRate: 7.8,
      minInvestment: 15000,
      isWatchlisted: false,
      riskLevel: "Low"
    },
    {
      id: "5",
      name: "Reliance Industries Bond",
      issuer: "Reliance Industries",
      type: "Corporate",
      rating: "AAA",
      ratingAgency: "CRISIL",
      currentYield: 8.25,
      faceValue: 1000,
      currentPrice: 1005,
      maturityDate: "2026-06-15",
      tenure: "2 years",
      couponRate: 8.3,
      minInvestment: 100000,
      isWatchlisted: true,
      riskLevel: "Low"
    },
    {
      id: "6",
      name: "NABARD Rural Infrastructure Bond",
      issuer: "NABARD",
      type: "Government",
      rating: "AAA",
      ratingAgency: "Sovereign",
      currentYield: 7.65,
      faceValue: 1000,
      currentPrice: 1015,
      maturityDate: "2031-04-30",
      tenure: "7 years",
      couponRate: 7.75,
      minInvestment: 20000,
      isWatchlisted: false,
      riskLevel: "Low"
    }
  ];

  const getRatingColor = (rating: string) => {
    if (rating === "AAA") return "bg-green-100 text-green-800";
    if (rating.startsWith("AA")) return "bg-blue-100 text-blue-800";
    if (rating.startsWith("A")) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getRiskColor = (risk: string) => {
    if (risk === "Low") return "text-green-600";
    if (risk === "Medium") return "text-yellow-600";
    return "text-red-600";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Bond Search & Discovery</h1>
          <p className="text-gray-600">
            Find the perfect bonds for your investment portfolio from government securities to corporate bonds
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Main Search */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search bonds by name, issuer, or ISIN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label>Bond Type</Label>
                    <Select value={filters.bondType} onValueChange={(value) => setFilters({...filters, bondType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="municipal">Municipal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Credit Rating</Label>
                    <Select value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="aaa">AAA</SelectItem>
                        <SelectItem value="aa">AA+ to AA-</SelectItem>
                        <SelectItem value="a">A+ to A-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Maturity Period</Label>
                    <Select value={filters.maturityPeriod} onValueChange={(value) => setFilters({...filters, maturityPeriod: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Periods</SelectItem>
                        <SelectItem value="short">0-3 years</SelectItem>
                        <SelectItem value="medium">3-7 years</SelectItem>
                        <SelectItem value="long">7+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yield">Highest Yield</SelectItem>
                        <SelectItem value="rating">Credit Rating</SelectItem>
                        <SelectItem value="maturity">Maturity Date</SelectItem>
                        <SelectItem value="issuer">Issuer Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <Label>Yield Range (%)</Label>
                    <div className="px-3 pt-2">
                      <Slider
                        value={filters.yieldRange}
                        onValueChange={(value) => setFilters({...filters, yieldRange: value})}
                        max={15}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{filters.yieldRange[0]}%</span>
                        <span>{filters.yieldRange[1]}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-gray-600">{sampleBonds.length} bonds found</span>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort by Yield
          </Button>
        </div>

        {/* Bond Results Grid */}
        <div className="grid gap-4">
          {sampleBonds.map((bond) => (
            <Card key={bond.id} className="hover:shadow-md transition-shadow cursor-pointer">
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
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Add to Watchlist
                  </Button>
                  <Button size="sm">
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Bonds
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Award, Target, Landmark } from "lucide-react";
import { EnhancedBondDetail } from "./EnhancedBondDetail";
import { BondCard } from "./BondCard";
import { TabHeader } from "./TabHeader";
import { Bond } from "./types/bond";
import { sampleBonds } from "./data/sampleBonds";
import { getFilteredBonds } from "./utils/bondFilters";


export function BondSearch() {
  const [activeTab, setActiveTab] = useState<string>("short-tenure");
  const [selectedBond, setSelectedBond] = useState<Bond | null>(null);
  const [showBondDetail, setShowBondDetail] = useState(false);


  const handleBondClick = (bond: Bond) => {
    if (bond.id === "2") { // HDFC Bank Bond Series XV
      setSelectedBond(bond);
      setShowBondDetail(true);
    }
  };

  const handleBackFromDetail = () => {
    setShowBondDetail(false);
    setSelectedBond(null);
  };


  if (showBondDetail && selectedBond) {
    return (
      <EnhancedBondDetail 
        onBack={handleBackFromDetail}
        onBuyAction={() => console.log('Buy action for', selectedBond.name)}
      />
    );
  }

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

        {/* Bond Categories Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-24 bg-white border border-gray-200 rounded-xl p-2 shadow-sm gap-2">
          <TabsTrigger 
              value="high-rated" 
              className="flex flex-col items-center justify-center h-20 space-y-2 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <Award className="h-4 w-4" />
              </div>
              <span>High Rated</span>
            </TabsTrigger>
            <TabsTrigger 
              value="short-tenure" 
              className="flex flex-col items-center justify-center h-20 space-y-2 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <Clock className="h-4 w-4" />
              </div>
              <span>Short Tenure</span>
            </TabsTrigger>
            <TabsTrigger 
              value="high-returns" 
              className="flex flex-col items-center justify-center h-20 space-y-2 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600">
                <Target className="h-4 w-4" />
              </div>
              <span>High Returns</span>
            </TabsTrigger>
            <TabsTrigger 
              value="government-bonds" 
              className="flex flex-col items-center justify-center h-20 space-y-2 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-md hover:bg-gray-50"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
                <Landmark className="h-4 w-4" />
              </div>
              <span>Government Bonds</span>
            </TabsTrigger>
          </TabsList>

          {/* Short Tenure Tab */}
          <TabsContent value="short-tenure" className="space-y-8">
            <TabHeader
              icon={<Clock className="h-6 w-6" />}
              title="Short Tenure Bonds"
              description="Bonds with maturity period of 3 years or less"
              count={getFilteredBonds(sampleBonds, 'short-tenure').length + 8}
              colorScheme="blue"
              sortLabel="Sort by Yield"
            />
            <div className="grid gap-4">
              {getFilteredBonds(sampleBonds, 'short-tenure').map(bond => (
                <BondCard key={bond.id} bond={bond} onBondClick={handleBondClick} />
              ))}
            </div>
          </TabsContent>

          {/* High Rated Tab */}
          <TabsContent value="high-rated" className="space-y-8">
            <TabHeader
              icon={<Award className="h-6 w-6" />}
              title="High Rated Bonds"
              description="AAA rated bonds with highest credit quality"
              count={getFilteredBonds(sampleBonds, 'high-rated').length + 4}
              colorScheme="green"
              sortLabel="Sort by Yield"
            />
            <div className="grid gap-4">
              {getFilteredBonds(sampleBonds, 'high-rated').map(bond => (
                <BondCard key={bond.id} bond={bond} onBondClick={handleBondClick} />
              ))}
            </div>
          </TabsContent>

          {/* High Returns Tab */}
          <TabsContent value="high-returns" className="space-y-8">
            <TabHeader
              icon={<Target className="h-6 w-6" />}
              title="High Returns Bonds"
              description="Bonds offering yields of 8% and above"
              count={getFilteredBonds(sampleBonds, 'high-returns').length + 7}
              colorScheme="orange"
              sortLabel="Sort by Yield"
            />
            <div className="grid gap-4">
              {getFilteredBonds(sampleBonds, 'high-returns').map(bond => (
                <BondCard key={bond.id} bond={bond} onBondClick={handleBondClick} />
              ))}
            </div>
          </TabsContent>

          {/* Government Bonds Tab */}
          <TabsContent value="government-bonds" className="space-y-8">
            <TabHeader
              icon={<Landmark className="h-6 w-6" />}
              title="Government Bonds"
              description="Sovereign and government-backed securities"
              count={getFilteredBonds(sampleBonds, 'government-bonds').length + 5}
              colorScheme="purple"
              sortLabel="Sort by Yield"
            />
            <div className="grid gap-4">
              {getFilteredBonds(sampleBonds, 'government-bonds').map(bond => (
                <BondCard key={bond.id} bond={bond} onBondClick={handleBondClick} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

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

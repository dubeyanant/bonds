"use client"

import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export function PortfolioHeader() {
  const router = useRouter();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">anyStockBroker</h1>
          <div className="flex items-center gap-6">
            <button
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
              onClick={() => router.push('/explore-bonds')}
            >
              Explore Bonds
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 p-2 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Anant Dubey</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EducationalHub } from "./EducationalHub";
import { BondSearch } from "./BondSearch";
import { QuizSystem } from "./QuizSystem";
import { PortfolioSuggestion } from "./PortfolioSuggestion";
import { Navigation } from "./Navigation";

export default function EduPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeView, setActiveView] = useState("education");

  // Update activeView when URL parameters change
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['education', 'quiz', 'search', 'suggestions'].includes(tab)) {
      setActiveView(tab);
    }
  }, [searchParams]);

  // Handle view change with URL update
  const handleViewChange = (view: string) => {
    setActiveView(view);
    router.push(`/edu?tab=${view}`, { scroll: false });
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "search":
        return <BondSearch />;
      case "education":
        return <EducationalHub />;
      case "quiz":
        return <QuizSystem />;
      case "suggestions":
        return <PortfolioSuggestion />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeView={activeView} onViewChange={handleViewChange} />
      {renderActiveView()}
    </div>
  );
}

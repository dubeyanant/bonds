import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="h-96 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p>Enter your portfolio details and click "Analyze" to get AI-powered bond suggestions</p>
      </div>
    </Card>
  );
}

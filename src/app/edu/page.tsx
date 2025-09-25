import { Suspense } from "react";
import EduPageClient from "./components/EduPageClient";

export default function EduPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading Educational Hub...</p>
        </div>
      </div>
    }>
      <EduPageClient />
    </Suspense>
  );
}

"use client"

import { useState } from "react";
import { Login } from "@/components/login";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to BondAcademy Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You have successfully logged in to your bond portfolio.
          </p>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <Login onLogin={handleLogin} />;
}

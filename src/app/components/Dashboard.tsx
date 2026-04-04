import { useState } from "react";
import { LogOut, TrendingUp } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import DashboardOverview from "./DashboardOverview";
import TransactionsSection from "./TransactionsSection";
import InsightsSection from "./InsightsSection";
import ThemeToggle from "./ThemeToggle";

export default function Dashboard() {
  const { user, logout } = useApp();
  const [activeTab, setActiveTab] = useState<
    "overview" | "transactions" | "insights"
  >("overview");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <img
                className="h-10 w-fit sm:h-15"
                src="https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png"
                alt=""
              />
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-100 dark:hover:text-white hover:bg-red-500 dark:hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-t-lg transition-all duration-300 ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`px-6 py-3 rounded-t-lg transition-all duration-300 ${
                activeTab === "transactions"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("insights")}
              className={`px-6 py-3 rounded-t-lg transition-all duration-300 ${
                activeTab === "insights"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Insights
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && <DashboardOverview />}
        {activeTab === "transactions" && <TransactionsSection />}
        {activeTab === "insights" && <InsightsSection />}
      </main>
    </div>
  );
}

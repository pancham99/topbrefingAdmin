import { useState } from "react";
import { analyticsData } from "../../data/dashboardData";

const tabs = ["news", "users", "views"];

const UnifiedAnalyticsGraph = () => {
  const [activeTab, setActiveTab] = useState("news");

  const maxValue = Math.max(
    ...analyticsData[activeTab].map((d) => d.value)
  );

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 mt-6">
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-5">
        <h2 className="font-semibold text-lg">Analytics Overview</h2>

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-sm capitalize transition
                ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Graph */}
      <div className="flex items-end gap-4 h-56">
        {analyticsData[activeTab].map((item, index) => {
          const height = (item.value / maxValue) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="text-xs mb-1 text-gray-300">
                {item.value.toLocaleString()}
              </div>

              <div className="w-full bg-white/20 rounded-lg h-full flex items-end overflow-hidden">
                <div
                  className={`${item.color} w-full rounded-lg transition-all duration-700`}
                  style={{ height: `${height}%` }}
                />
              </div>

              <span className="text-xs mt-2 text-gray-300">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnifiedAnalyticsGraph;

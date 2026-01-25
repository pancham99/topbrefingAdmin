import { summaryCards, pageViewsGraph, topPages } from "../../data/dashboardData";

const GoogleStyleAnalytics = () => {
  const maxValue = Math.max(...pageViewsGraph);

  return (
    <div className="bg-[#f8fafc] rounded-xl p-5">
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-4 border hover:shadow-md transition">
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-semibold">{item.value}</h2>
            <span className="text-sm text-green-600">{item.change}</span>
          </div>
        ))}
      </div>

      {/* Page Views Graph */}
      <div className="bg-white rounded-lg p-4 border mb-6">
        <h3 className="font-semibold mb-4">Page Views (Last 7 Days)</h3>

        <div className="flex items-end gap-3 h-48">
          {pageViewsGraph.map((val, i) => (
            <div key={i} className="flex-1">
              <div
                className="bg-blue-500 rounded-md transition-all duration-500 hover:bg-blue-600"
                style={{ height: `${(val / maxValue) * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-white rounded-lg p-4 border">
        <h3 className="font-semibold mb-4">Top News Pages</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-2">Page Title</th>
                <th className="p-2">Views</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{item.page}</td>
                  <td className="p-2">{item.views}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                        ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Unpublished"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default GoogleStyleAnalytics;

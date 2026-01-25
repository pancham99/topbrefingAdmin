import { viewsData } from "../../data/dashboardData";

const ViewsChart = () => {
  return (
    <div className="bg-white backdrop-blur-xl border rounded-2xl shadow-xl p-4 col-span-2">
      <h2 className="font-semibold mb-4">Weekly Views</h2>

      <div className="flex items-end h-52 gap-2">
        {viewsData.map((value, i) => (
          <div key={i} className="flex-1">
            <div
              className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-lg transition-all duration-500 hover:opacity-80"
              style={{ height: `${value}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewsChart;

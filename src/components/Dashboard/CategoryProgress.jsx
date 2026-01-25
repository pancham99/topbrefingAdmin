import { categories } from "../../data/dashboardData";

const CategoryProgress = () => {
  return (
    <div className="bg-white backdrop-blur-xl border shadow-xl rounded-xl p-4">
      <h2 className="font-semibold mb-4">Top Categories</h2>

      <div className="space-y-4">
        {categories.map((cat, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{cat.name}</span>
              <span>{cat.value}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700"
                style={{ width: `${cat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProgress;

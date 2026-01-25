import { stats } from "../../data/dashboardData";
import StatCard from "./StatCard";

const StatGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default StatGrid;

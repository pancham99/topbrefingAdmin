import CategoryProgress from "../../components/Dashboard/CategoryProgress";
import LatestNews from "../../components/Dashboard/LatestNews";
import StatGrid from "../../components/Dashboard/StatGrid";
import ViewsChart from "../../components/Dashboard/ViewsChart";



const Dashboard = () => {
  return (
 <div className="min-h-screen ">
      <StatGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <ViewsChart />
        <CategoryProgress />
      </div>
      

      <div className="mt-6">
        <LatestNews />
      </div>
    </div>
  );
};

export default Dashboard;

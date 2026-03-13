
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

import SkeletonBox from './SkeletonBox';

const COLORS = {
  active: "#4CAF50",
  pending: "#FFC107",
  deactive: "#F44336"
};

const DashboardGraph = ({ loading, item }) => {
  const pendingNews = item?.pendingNews;;
  const activeNews = item?.activeNews;
  const deactiveNews = item?.deactiveNews;

  const activeWriter = item?.activeWriter;
  const deactiveWriter = item?.deactiveWriter;

  const newsData = [
    { name: "Active News", value: activeNews, color: COLORS.active },
    { name: "Pending News", value: pendingNews, color: COLORS.pending },
    { name: "Deactive News", value: deactiveNews, color: COLORS.deactive },
  ];

  const writerData = [
    { name: "Active Writer", value: activeWriter, color: COLORS.active },
    { name: "Deactive Writer", value: deactiveWriter, color: COLORS.deactive },
  ];

  return (


    <>

      {
        loading ? <SkeletonBox /> : <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* News Chart */}
          <div className="bg-white p-5 rounded  shadow-md border">
            <h2 className="text-xl font-bold mb-5">News Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={newsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {newsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Writer Chart */}
          <div className="bg-white p-5 rounded shadow-md border">
            <h2 className="text-xl font-bold mb-5">Writers Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={writerData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {writerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      }


    </>
  );
};

export default DashboardGraph;

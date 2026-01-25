import { latestNews } from "../../data/dashboardData";

const LatestNews = () => {
  return (
    <div className="bg-white border backdrop-blur-xl rounded-xl p-4">
      <h2 className="font-semibold mb-4">Latest Published News</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-300 border-b border-white/10">
              <th className="p-2">Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Views</th>
            </tr>
          </thead>
          <tbody>
            {latestNews.map((item, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestNews;

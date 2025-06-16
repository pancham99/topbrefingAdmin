import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { base_url } from '../../config/config';

const COLORS = {
  active: "#4CAF50",
  pending: "#FFC107",
  deactive: "#F44336"
};

const DashboardGraph = () => {
  const { store } = useContext(storeContext);
  const [all_news, set_all_news] = useState([]);
  const [all_writes, set_all_writes] = useState([]);

  const get_news = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: { 'Authorization': `Bearer ${store.token}` }
      });
      set_all_news(data.news);
    } catch (error) {
      console.log(error.message);
    }
  };

  const get_writes = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/writers`, {
        headers: { 'Authorization': `Bearer ${store.token}` }
      });
      set_all_writes(data.writers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    get_news();
    get_writes();
  }, []);

  const pendingNews = all_news.filter(news => news.status === "pending").length;
  const activeNews = all_news.filter(news => news.status === "active").length;
  const deactiveNews = all_news.filter(news => news.status === "deactive").length;

  const activeWriter = all_writes.filter(writer => writer.status === "active").length;
  const deactiveWriter = all_writes.filter(writer => writer.status === "deactive").length;

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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-10">
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
  );
};

export default DashboardGraph;

import { useContext, useEffect, useState } from 'react';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import axios from 'axios';
import NewContent from '../components/NewContent';
import {
  HiOutlineNewspaper,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from 'react-icons/hi2';

/* ─── stat card ─────────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, color, loading }) => {
  const colorMap = {
    blue:   { bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-100',  icon: 'bg-blue-100'   },
    green:  { bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-100', icon: 'bg-green-100'  },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100',icon: 'bg-yellow-100' },
    red:    { bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-100',   icon: 'bg-red-100'    },
  };
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 flex items-center gap-4`}>
      <div className={`${c.icon} ${c.text} p-3 rounded-xl shrink-0`}>
        <Icon size={22} />
      </div>
      <div>
        {loading ? (
          <>
            <div className="h-7 w-12 bg-gray-200 animate-pulse rounded mb-1" />
            <div className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
          </>
        ) : (
          <>
            <p className={`text-2xl font-bold ${c.text}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const WriterIndex = () => {
  const { store } = useContext(storeContext);
  const [all_news, set_all_news] = useState([]);
  const [loading, setLoading] = useState(true);

  const get_news = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      set_all_news(data.news);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { get_news(); }, []);

  const pendingNews  = all_news.filter((n) => n.status === 'pending');
  const activeNews   = all_news.filter((n) => n.status === 'active');
  const deactiveNews = all_news.filter((n) => n.status === 'deactive');

  const stats = [
    { label: 'Total News',   value: all_news.length,    icon: HiOutlineNewspaper,   color: 'blue'   },
    { label: 'Active',       value: activeNews.length,  icon: HiOutlineCheckCircle, color: 'green'  },
    { label: 'Pending',      value: pendingNews.length, icon: HiOutlineClock,       color: 'yellow' },
    { label: 'Deactive',     value: deactiveNews.length,icon: HiOutlineXCircle,     color: 'red'    },
  ];

  return (
    <div className="space-y-6">

      {/* page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Overview of your articles</p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} loading={loading} />
        ))}
      </div>

      {/* news table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">My Articles</h2>
        </div>
        <NewContent />
      </div>
    </div>
  );
};

export default WriterIndex;

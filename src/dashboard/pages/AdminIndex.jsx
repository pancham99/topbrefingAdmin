import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import axios from 'axios';
import DashboardGraph from '../components/DashboardGraph';
import {
  HiOutlineNewspaper,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineUsers,
  HiOutlineUserPlus,
  HiOutlineUserMinus,
} from 'react-icons/hi2';

/* ─── stat card ─────────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, color, to, loading }) => {
  const colorMap = {
    blue:   { bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-100',   icon: 'bg-blue-100'   },
    green:  { bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-100',  icon: 'bg-green-100'  },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-100', icon: 'bg-yellow-100' },
    red:    { bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-100',    icon: 'bg-red-100'    },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', icon: 'bg-purple-100' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', icon: 'bg-indigo-100' },
    slate:  { bg: 'bg-slate-50',  text: 'text-slate-600',  border: 'border-slate-100',  icon: 'bg-slate-100'  },
  };
  const c = colorMap[color] ?? colorMap.blue;

  const inner = (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 flex items-center gap-4 
                     hover:shadow-md transition-shadow duration-200 h-full`}>
      <div className={`${c.icon} ${c.text} p-3 rounded-xl shrink-0`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        {loading ? (
          <>
            <div className="h-7 w-16 bg-gray-200 animate-pulse rounded mb-1" />
            <div className="h-3 w-24 bg-gray-200 animate-pulse rounded" />
          </>
        ) : (
          <>
            <p className={`text-2xl font-bold ${c.text}`}>{value ?? '—'}</p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{label}</p>
          </>
        )}
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="block">{inner}</Link>
  ) : (
    <div>{inner}</div>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const AdminIndex = () => {
  const { store } = useContext(storeContext);
  const [loading, setLoading] = useState(true);
  const [total, setTotalNews] = useState({});

  const get_total = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/api/dashboard`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setTotalNews(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { get_total(); }, []);

  const stats = [
    { label: 'Total News',      value: total?.totalNews,      icon: HiOutlineNewspaper,  color: 'blue'   },
    { label: 'Active News',     value: total?.activeNews,     icon: HiOutlineCheckCircle,color: 'green'  },
    { label: 'Pending News',    value: total?.pendingNews,    icon: HiOutlineClock,      color: 'yellow' },
    { label: 'Deactive News',   value: total?.deactiveNews,   icon: HiOutlineXCircle,    color: 'red',   to: '/dashboard/deactive' },
    { label: 'Total Writers',   value: total?.totalWriter,    icon: HiOutlineUsers,      color: 'purple' },
    { label: 'Active Writers',  value: total?.activeWriter,   icon: HiOutlineUserPlus,   color: 'indigo' },
    { label: 'Deactive Writers',value: total?.deactiveWriter, icon: HiOutlineUserMinus,  color: 'slate'  },
  ];

  return (
    <div className="space-y-6">

      {/* page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Overview of your news portal</p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} loading={loading} />
        ))}
      </div>

      {/* charts */}
      <DashboardGraph item={total} loading={loading} />
    </div>
  );
};

export default AdminIndex;

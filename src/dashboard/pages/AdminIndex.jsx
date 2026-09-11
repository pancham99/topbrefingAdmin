import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DashboardGraph from '../components/DashboardGraph';
import { useGetDashboardStats } from '../../hooks/api/useDashboardQueries';
import { useGetNews } from '../../hooks/api/useNewsQueries';
import storeContext from '../../context/storeContext';
import moment from 'moment-timezone';
import {
  HiOutlineNewspaper,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineUsers,
  HiOutlineUserPlus,
  HiOutlineUserMinus,
  HiOutlinePlusCircle,
  HiOutlineArrowRight,
  HiOutlineMegaphone,
  HiOutlineFilm,
  HiOutlineBell,
  HiOutlineEye,
  HiOutlineSparkles,
} from 'react-icons/hi2';

/* ─── Stat Card Component ─────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, color, to, loading, subtext }) => {
  const colorMap = {
    blue:   { bg: 'bg-blue-50/70 hover:bg-blue-50',     text: 'text-blue-700',   border: 'border-2 border-blue-200',   iconBg: 'bg-blue-600 shadow-blue-500/30',   shadow: 'shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20' },
    green:  { bg: 'bg-emerald-50/70 hover:bg-emerald-50',text: 'text-emerald-700',border: 'border-2 border-emerald-200',iconBg: 'bg-emerald-600 shadow-emerald-500/30',shadow: 'shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20' },
    yellow: { bg: 'bg-amber-50/70 hover:bg-amber-50',   text: 'text-amber-700',  border: 'border-2 border-amber-200',  iconBg: 'bg-amber-500 shadow-amber-500/30',  shadow: 'shadow-md shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20' },
    red:    { bg: 'bg-rose-50/70 hover:bg-rose-50',     text: 'text-rose-700',   border: 'border-2 border-rose-200',   iconBg: 'bg-rose-600 shadow-rose-500/30',   shadow: 'shadow-md shadow-rose-500/10 hover:shadow-lg hover:shadow-rose-500/20' },
    purple: { bg: 'bg-purple-50/70 hover:bg-purple-50', text: 'text-purple-700', border: 'border-2 border-purple-200', iconBg: 'bg-purple-600 shadow-purple-500/30', shadow: 'shadow-md shadow-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20' },
    indigo: { bg: 'bg-indigo-50/70 hover:bg-indigo-50', text: 'text-indigo-700', border: 'border-2 border-indigo-200', iconBg: 'bg-indigo-600 shadow-indigo-500/30', shadow: 'shadow-md shadow-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/20' },
    slate:  { bg: 'bg-slate-50/70 hover:bg-slate-50',   text: 'text-slate-700',  border: 'border-2 border-slate-200',  iconBg: 'bg-slate-700 shadow-slate-500/30',  shadow: 'shadow-md shadow-slate-500/10 hover:shadow-lg hover:shadow-slate-500/20' },
  };
  const c = colorMap[color] ?? colorMap.blue;

  const content = (
    <div className={`rounded-2xl ${c.border} ${c.bg} ${c.shadow} p-5 flex flex-col justify-between
                     hover:-translate-y-1 transition-all duration-300 h-full bg-white`}>
      {/* Header: Label & Icon */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
          {label}
        </span>
        <div className={`${c.iconBg} text-white p-2.5 rounded-xl shrink-0 shadow-md`}>
          <Icon size={18} />
        </div>
      </div>

      {/* Main Value */}
      {loading ? (
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-md my-1" />
      ) : (
        <div className="my-1">
          <p className={`text-3xl font-black ${c.text} tracking-tight`}>
            {value ?? '0'}
          </p>
        </div>
      )}

      {/* Subtext info footer */}
      {subtext && (
        <p className="text-[11px] font-semibold text-gray-400 pt-2 border-t border-gray-200/80 truncate">
          {subtext}
        </p>
      )}
    </div>
  );

  return to ? (
    <Link to={to} className="block group h-full">{content}</Link>
  ) : (
    <div className="group h-full">{content}</div>
  );
};

/* ═══════════════════════════════════════════════════════════════════ */
const AdminIndex = () => {
  const { store } = useContext(storeContext);
  const { data: total, isLoading: loading } = useGetDashboardStats();
  const { data: recentNewsData, isLoading: recentLoading } = useGetNews('limit=5');

  const recentNews = recentNewsData?.news?.slice(0, 5) || [];
  const userName = store?.userInfo?.name || 'Admin';

  const newsStats = [
    {
      label: 'Total News',
      value: total?.totalNews,
      icon: HiOutlineNewspaper,
      color: 'blue',
      subtext: total?.totalNews ? `${Math.round(((total?.activeNews || 0) / total.totalNews) * 100)}% Active Rate` : 'No data'
    },
    {
      label: 'Active News',
      value: total?.activeNews,
      icon: HiOutlineCheckCircle,
      color: 'green',
      subtext: 'Published on portal'
    },
    {
      label: 'Pending News',
      value: total?.pendingNews,
      icon: HiOutlineClock,
      color: 'yellow',
      subtext: 'Awaiting review'
    },
    {
      label: 'Deactive News',
      value: total?.deactiveNews,
      icon: HiOutlineXCircle,
      color: 'red',
      to: '/dashboard/deactive',
      subtext: 'Hidden articles'
    },
  ];

  const writerStats = [
    {
      label: 'Total Writers',
      value: total?.totalWriter,
      icon: HiOutlineUsers,
      color: 'purple',
      subtext: total?.totalWriter ? `${total?.activeWriter || 0} active members` : 'No writers'
    },
    {
      label: 'Active Writers',
      value: total?.activeWriter,
      icon: HiOutlineUserPlus,
      color: 'indigo',
      subtext: 'Contributing writers'
    },
    {
      label: 'Deactive Writers',
      value: total?.deactiveWriter,
      icon: HiOutlineUserMinus,
      color: 'slate',
      subtext: 'Inactive profiles'
    },
  ];

  const quickLinks = [
    // { label: 'Create News Article', path: '/dashboard/create-news', icon: HiOutlinePlusCircle, color: 'bg-purple-600 text-white' },
    { label: 'Manage All Articles', path: '/dashboard/news', icon: HiOutlineNewspaper, color: 'bg-blue-600 text-white' },
    { label: 'Writer Management', path: '/dashboard/writers', icon: HiOutlineUsers, color: 'bg-indigo-600 text-white' },
    { label: 'Advertisements', path: '/dashboard/advertisement', icon: HiOutlineMegaphone, color: 'bg-emerald-600 text-white' },
    { label: 'Banners Portal', path: '/dashboard/banner', icon: HiOutlineSparkles, color: 'bg-amber-600 text-white' },
    { label: 'Video Management', path: '/dashboard/video', icon: HiOutlineFilm, color: 'bg-rose-600 text-white' },
    { label: 'Push Subscribers', path: '/dashboard/subscribe', icon: HiOutlineBell, color: 'bg-cyan-600 text-white' },
  ];

  return (
    <div className="space-y-8">
      {/* ─── Hero Welcome Banner ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-900 text-white p-6 sm:p-8 shadow-2xl border-2 border-purple-500/30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-purple-200 font-medium shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
              Portal Live & Synced · {moment().format('dddd, MMMM D, YYYY')}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Welcome Back, <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-200 bg-clip-text text-transparent">{userName}</span>
            </h1>
            {/* <p className="text-sm text-purple-200/80 max-w-xl">
              Here is your news portal status, content metrics, and overall team activity overview.
            </p> */}
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* <Link
              to="/dashboard/create-news"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/40 transition-all hover:scale-105 active:scale-95 border border-purple-400/30"
            >
              <HiOutlinePlusCircle size={20} />
              <span>Create News</span>
            </Link> */}
            <Link
              to="/dashboard/writer/add"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md text-sm font-semibold transition-all hover:scale-105 shadow-sm"
            >
              <HiOutlineUserPlus size={18} />
              <span>Add Writer</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Metric Cards Grid ─── */}
      <div className="space-y-6">
        {/* Article Metrics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-800 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-sm" />
              Article Metrics
            </h2>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">News Performance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {newsStats.map((s) => (
              <StatCard key={s.label} {...s} loading={loading} />
            ))}
          </div>
        </div>

        {/* Writer Team Metrics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-800 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block shadow-sm" />
              Team & Writers
            </h2>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Journalists Overview</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {writerStats.map((s) => (
              <StatCard key={s.label} {...s} loading={loading} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Analytics Charts ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">Portal Analytics & Distribution</h2>
          <span className="text-xs font-semibold text-gray-400">Content Breakdown</span>
        </div>
        <DashboardGraph item={total} loading={loading} />
      </div>

      {/* ─── Two-Column Section: Recent Activity & Quick Access ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Recent News Articles Table (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-800">Recent News Articles</h2>
              <p className="text-xs text-gray-400 mt-0.5">Latest published articles on TopBriefing</p>
            </div>
            <Link
              to="/dashboard/news"
              className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline"
            >
              <span>View All News</span>
              <HiOutlineArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                  <th className="py-2.5 px-3">Article</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs text-gray-700">
                {recentLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-3 px-3">
                        <div className="h-4 bg-gray-200 rounded w-48 mb-1" />
                        <div className="h-3 bg-gray-200 rounded w-24" />
                      </td>
                      <td className="py-3 px-3"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                      <td className="py-3 px-3"><div className="h-4 bg-gray-200 rounded w-20" /></td>
                      <td className="py-3 px-3"><div className="h-4 bg-gray-200 rounded w-14" /></td>
                      <td className="py-3 px-3 text-right"><div className="h-6 bg-gray-200 rounded w-8 ml-auto" /></td>
                    </tr>
                  ))
                ) : recentNews.length > 0 ? (
                  recentNews.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3 max-w-[260px]">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-gray-200 shadow-sm"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 truncate" title={item.title}>
                              {item.title}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate">by {item.writerName || 'Admin'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                          {item.category || 'General'}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-gray-500">
                        {moment.utc(item.createdAt).tz('Asia/Kolkata').format('DD MMM YYYY')}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          item.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          item.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          to={`/dashboard/news/details/${item._id}`}
                          className="p-1.5 inline-flex items-center justify-center rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors border border-purple-100 shadow-sm"
                          title="View Details"
                        >
                          <HiOutlineEye size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-400">No recent articles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Management Shortcuts Hub (1/3) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">Management Shortcuts</h2>
            <p className="text-xs text-gray-400 mt-0.5">Quick access to admin sections</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-purple-300 bg-gray-50/50 hover:bg-purple-50/50 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${link.color} shadow-sm group-hover:scale-105 transition-transform`}>
                    <link.icon size={18} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 group-hover:text-purple-700 transition-colors">
                    {link.label}
                  </span>
                </div>
                <HiOutlineArrowRight size={14} className="text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminIndex;

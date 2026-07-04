import {
  useContext, useState, useEffect, useCallback, useMemo,
} from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdVisibility } from 'react-icons/md';
import { HiOutlineSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import moment from 'moment-timezone';

import FillterStatus from './fillter/FillterStatus';
import FillterCategory from './fillter/FillterCategory';
import FillterWriters from './fillter/FillterWriters';
import FilterDate from './fillter/FilterDate';
import FilterType from './fillter/FilterType';
import Pagination from './Pagination';

import {
  fetchNews, fetchWriters, deleteNews,
  updateNewsStatus, updateNewsType,
} from '../../services/newsService';

/* ─── status badge ───────────────────────────────────────────── */
const StatusBadge = ({ status, onClick, isAdmin }) => {
  const map = {
    active: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    deactive: 'bg-red-100 text-red-600 border-red-200',
  };
  return (
    <span
      onClick={isAdmin ? onClick : undefined}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border
        ${map[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}
        ${isAdmin ? 'cursor-pointer hover:opacity-80 transition' : ''}`}
    >
      {status}
    </span>
  );
};

/* ─── type badge ─────────────────────────────────────────────── */
const TypeBadge = ({ type }) => {
  const map = {
    breaking: 'bg-red-50 text-red-600',
    trending: 'bg-orange-50 text-orange-600',
    featured: 'bg-blue-50 text-blue-600',
    popular: 'bg-purple-50 text-purple-600',
    none: 'bg-gray-100 text-gray-400',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${map[type] ?? map.none}`}>
      {type}
    </span>
  );
};

/* ─── table row skeleton ─────────────────────────────────────── */
const RowSkeleton = () => (
  <>
    {Array.from({ length: 8 }).map((_, i) => (
      <tr key={i} className="border-b border-gray-50 animate-pulse">
        {Array.from({ length: 9 }).map((__, j) => (
          <td key={j} className="px-4 py-3">
            <div className="h-3 bg-gray-200 rounded w-full" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

/* ══════════════════════════════════════════════════════════════ */
const NewContent = () => {
  const { store } = useContext(storeContext);

  const [news, setNews] = useState([]);
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [parPage, setPerPage] = useState(20);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState('');

  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [writer, setWriter] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const query = useMemo(() => new URLSearchParams({
    page, limit: parPage, status, category,
    writerName: writer, search: debouncedSearch,
    startDate, endDate, type,
  }).toString(), [page, parPage, status, category, writer, debouncedSearch, startDate, endDate, type]);

  const getNews = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await fetchNews(query, store.token);
      setNews(data.news);
      setPages(data.pages);
      setTotal(data.total);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  }, [query, store.token]);

  const getWriters = useCallback(async () => {
    try {
      const { data } = await fetchWriters(store.token);
      setWriters(data.writers);
    } catch (e) { console.log(e); }
  }, [store.token]);

  useEffect(() => { getNews(); }, [getNews]);
  useEffect(() => { getWriters(); }, [getWriters]);

  const formatTime = (date) =>
    new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      .format(new Date(date));

  const getCurrentType = (n) => {
    if (n.isBreaking) return 'breaking';
    if (n.isTrending) return 'trending';
    if (n.isFeatured) return 'featured';
    if (n.isPopular) return 'popular';
    return 'none';
  };

  const handleDelete = async (id) => {
    try {
      await deleteNews(id, store.token);
      toast.success('News deleted');
      setNews((prev) => prev.filter((n) => n._id !== id));
    } catch { toast.error('Delete failed'); }
  };

  const handleStatus = async (status, id) => {
    try {
      const { data } = await updateNewsStatus(id, status, store.token);
      toast.success(data.message);
      setNews((prev) => prev.map((n) => n._id === id ? { ...n, status } : n));
    } catch { toast.error('Status update failed'); }
  };

  const handleType = async (type, id) => {
    const payload = { isBreaking: false, isTrending: false, isFeatured: false, isPopular: false };
    if (type === 'breaking') payload.isBreaking = true;
    if (type === 'trending') payload.isTrending = true;
    if (type === 'featured') payload.isFeatured = true;
    if (type === 'popular') payload.isPopular = true;
    try {
      const { data } = await updateNewsType(id, payload, store.token);
      toast.success(data.message);
      setNews((prev) => prev.map((n) => n._id === id ? { ...n, ...payload } : n));
    } catch { toast.error('Type update failed'); }
  };

  const isAdmin = store?.userInfo?.role === 'admin';

  return (
    <div className="space-y-0">

      {/* ── search + filters bar ── */}
      <div className="px-4 pt-4 pb-2 space-y-3">
        {/* search */}
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 bg-gray-50 placeholder-gray-400 transition"
          />
        </div>

        {/* filter row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 py-4 overflow-x-auto">
          <FillterStatus setStatus={setStatus} />
          <FillterCategory setCategory={setCategory} />
          <FilterType setType={setType} />
          <FillterWriters writers={writers} setWriter={setWriter} />
          <FilterDate value={startDate} onChange={setStartDate} placeholder="Start Date" />
          <FilterDate value={endDate} onChange={setEndDate} placeholder="End Date" />
        </div>
      </div>

      {/* ── table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">

          <thead>
            <tr className="bg-gray-50 border-y border-gray-100">
              {['#', 'Article', 'Image', 'Category', 'Date', 'Status', 'Type', 'Actions']
                .map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <RowSkeleton />
            ) : news.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center text-gray-400 text-sm">
                  No News found.
                </td>
              </tr>
            ) : (
              news.map((n, i) => (
                <tr key={n._id} className="hover:bg-gray-50/60 transition-colors">

                  {/* # */}
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">
                    {(page - 1) * parPage + i + 1}
                  </td>

                  {/* title */}
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="text-sm font-medium text-gray-800 truncate" title={n.title}>
                      {n.title?.slice(0, 40)}{n.title?.length > 40 ? '…' : ''}
                    </p>
                    {n.writerName && (
                      <p className="text-xs text-gray-400 mt-0.5">by {n.writerName}</p>
                    )}
                  </td>

                  {/* image */}
                  <td className="px-4 py-3">
                    <img
                      src={n.image}
                      loading="lazy"
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg border border-gray-100"
                    />
                  </td>

                  {/* category */}
                  <td className="px-4 py-3">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium whitespace-nowrap">
                      {n.category || '—'}
                    </span>
                  </td>

                  {/* date */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-xs text-gray-700">
                      {moment.utc(n?.createdAt).tz('Asia/Kolkata').format('DD MMM YYYY')}
                    </p>
                    <p className="text-[10px] text-gray-400">{formatTime(n.createdAt)}</p>
                  </td>

                  {/* status */}
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={n.status}
                      isAdmin={isAdmin}
                      onClick={() =>
                        handleStatus(n.status === 'active' ? 'deactive' : 'active', n._id)
                      }
                    />
                  </td>

                  {/* type */}
                  <td className="px-4 py-3">
                    <select
                      className="border border-gray-200 bg-white rounded-lg px-2 py-1 text-xs
                                 focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer
                                 text-gray-700"
                      value={getCurrentType(n)}
                      onChange={(e) => handleType(e.target.value, n._id)}
                    >
                      <option value="none">None</option>
                      <option value="breaking">Breaking</option>
                      <option value="trending">Trending</option>
                      <option value="featured">Featured</option>
                      <option value="popular">Popular</option>
                    </select>
                  </td>

                  {/* actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* View details — available to everyone */}
                      <Link
                        to={`/dashboard/news/details/${n._id}`}
                        className="p-1.5 rounded-lg text-purple-400 hover:text-purple-600 hover:bg-purple-50 transition"
                        title="View Details"
                      >
                        <MdVisibility size={17} />
                      </Link>

                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(n._id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <MdDelete size={17} />
                        </button>
                      )}
                      {!isAdmin && (
                        <Link
                          to={`/dashboard/news/edit/${n._id}`}
                          className="p-1.5 rounded-lg text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </Link>
                      )}
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── pagination ── */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          {total ? `${total} articles total` : ''}
        </p>
        <Pagination
          parPage={parPage}
          page={page}
          pages={pages}
          setPerPage={setPerPage}
          setPage={setPage}
          totalItem={total}
        />
      </div>

    </div>
  );
};

export default NewContent;

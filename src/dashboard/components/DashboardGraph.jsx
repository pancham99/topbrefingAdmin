import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

/* ─── colour palette ─────────────────────────────────────────── */
const COLORS = {
  active:   '#10b981',   // emerald-500
  pending:  '#f59e0b',   // amber-500
  deactive: '#ef4444',   // red-500
  writer:   '#6366f1',   // indigo-500
};

/* ─── custom tooltip ─────────────────────────────────────────── */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="bg-gray-900/95 backdrop-blur-md text-white border border-gray-700/50 rounded-xl p-3 shadow-xl text-xs space-y-1">
      <p className="font-semibold text-gray-200">{data.name}</p>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.payload.fill || data.color || '#6366f1' }} />
        <span className="text-gray-300">Total Count:</span>
        <span className="font-bold text-white text-sm">{data.value}</span>
      </div>
    </div>
  );
};

/* ─── skeleton ───────────────────────────────────────────────── */
const ChartSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-4 p-6">
    <div className="h-5 w-36 bg-gray-200 rounded-md" />
    <div className="flex items-end gap-3 h-52 pt-4">
      {[60, 85, 40, 70, 55].map((h, i) => (
        <div key={i} className="flex-1 bg-gray-200 rounded-t-lg" style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
);

/* ─── chart card wrapper ─────────────────────────────────────── */
const ChartCard = ({ title, subtitle, children, badge }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col justify-between">
    <div className="px-6 py-5 border-b border-gray-100/80 flex items-center justify-between">
      <div>
        <h3 className="text-base font-bold text-gray-800 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5 font-medium">{subtitle}</p>}
      </div>
      {badge && (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-100">
          {badge}
        </span>
      )}
    </div>
    <div className="p-6 flex-1 flex flex-col justify-between">{children}</div>
  </div>
);

/* ─── render custom legend ───────────────────────────────────── */
const LegendDot = ({ color, label, value, percent }) => (
  <div className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-2.5">
      <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: color }} />
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-gray-800">{value ?? 0}</span>
      {percent !== undefined && (
        <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
          {percent}%
        </span>
      )}
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════ */
const DashboardGraph = ({ loading, item }) => {
  const { pendingNews = 0, activeNews = 0, deactiveNews = 0,
          activeWriter = 0, deactiveWriter = 0, totalNews = 0, totalWriter = 0 } = item || {};

  const newsData = [
    { name: 'Active',   value: activeNews,   color: COLORS.active   },
    { name: 'Pending',  value: pendingNews,  color: COLORS.pending  },
    { name: 'Deactive', value: deactiveNews, color: COLORS.deactive },
  ];

  const writerData = [
    { name: 'Active Writers',   value: activeWriter,   color: COLORS.writer  },
    { name: 'Deactive Writers', value: deactiveWriter, color: COLORS.deactive },
  ];

  const barData = [
    { name: 'Active',   Articles: activeNews,   fill: COLORS.active   },
    { name: 'Pending',  Articles: pendingNews,  fill: COLORS.pending  },
    { name: 'Deactive', Articles: deactiveNews, fill: COLORS.deactive },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((k) => (
          <div key={k} className="bg-white rounded-2xl border border-gray-100 shadow-sm"><ChartSkeleton /></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {/* News Status Donut Chart */}
      <ChartCard title="News Status" subtitle="Article publication distribution" badge={`${totalNews} Articles`}>
        <div className="relative">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={newsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                cornerPadding={4}
              >
                {newsData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-gray-800">{totalNews}</span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-gray-100">
          {newsData.map((d) => {
            const pct = totalNews > 0 ? Math.round((d.value / totalNews) * 100) : 0;
            return <LegendDot key={d.name} color={d.color} label={d.name} value={d.value} percent={pct} />;
          })}
        </div>
      </ChartCard>

      {/* Writers Status Donut Chart */}
      <ChartCard title="Writers Status" subtitle="Journalists & contributors" badge={`${totalWriter} Writers`}>
        <div className="relative">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={writerData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
              >
                {writerData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-gray-800">{totalWriter}</span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Team</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-gray-100">
          {writerData.map((d) => {
            const pct = totalWriter > 0 ? Math.round((d.value / totalWriter) * 100) : 0;
            return <LegendDot key={d.name} color={d.color} label={d.name} value={d.value} percent={pct} />;
          })}
        </div>
      </ChartCard>

      {/* News Breakdown Bar Chart */}
      <ChartCard title="Content Volume" subtitle="Status breakdown bar visual" badge="Live Data">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData} barSize={42} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 8 }} />
            <Bar dataKey="Articles" radius={[8, 8, 0, 0]}>
              {barData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Real-time status analysis of articles in database.
          </p>
        </div>
      </ChartCard>

    </div>
  );
};

export default DashboardGraph;

import {
  PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

/* ─── colour palette ─────────────────────────────────────────── */
const COLORS = {
  active:   '#22c55e',   // green-500
  pending:  '#f59e0b',   // amber-500
  deactive: '#ef4444',   // red-500
  writer:   '#6366f1',   // indigo-500
};

/* ─── custom tooltip ─────────────────────────────────────────── */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-semibold text-gray-700">{payload[0].name}</p>
      <p className="text-gray-500">Count: <span className="font-bold text-gray-800">{payload[0].value}</span></p>
    </div>
  );
};

/* ─── skeleton ───────────────────────────────────────────────── */
const ChartSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-4 p-5">
    <div className="h-5 w-32 bg-gray-200 rounded" />
    <div className="flex items-end gap-3 h-48">
      {[60, 85, 40, 70, 55].map((h, i) => (
        <div key={i} className="flex-1 bg-gray-200 rounded-t" style={{ height: `${h}%` }} />
      ))}
    </div>
  </div>
);

/* ─── chart card wrapper ─────────────────────────────────────── */
const ChartCard = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <div className="px-5 py-4 border-b border-gray-100">
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

/* ─── render custom legend ───────────────────────────────────── */
const LegendDot = ({ color, label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-semibold text-gray-800">{value ?? 0}</span>
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
    { name: 'Active',   News: activeNews,   fill: COLORS.active   },
    { name: 'Pending',  News: pendingNews,  fill: COLORS.pending  },
    { name: 'Deactive', News: deactiveNews, fill: COLORS.deactive },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
        {[1, 2, 3].map((k) => (
          <div key={k} className="bg-white rounded-xl border border-gray-200"><ChartSkeleton /></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">

      {/* News Pie */}
      <ChartCard title="News Status" subtitle={`${totalNews} total articles`}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={newsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {newsData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 mt-2">
          {newsData.map((d) => (
            <LegendDot key={d.name} color={d.color} label={d.name} value={d.value} />
          ))}
        </div>
      </ChartCard>

      {/* Writers Pie */}
      <ChartCard title="Writers Status" subtitle={`${totalWriter} total writers`}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={writerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {writerData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 mt-2">
          {writerData.map((d) => (
            <LegendDot key={d.name} color={d.color} label={d.name} value={d.value} />
          ))}
        </div>
      </ChartCard>

      {/* News Bar */}
      <ChartCard title="News Breakdown" subtitle="By status distribution">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="News" radius={[6, 6, 0, 0]}>
              {barData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
};

export default DashboardGraph;

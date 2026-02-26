import { useState } from "react";
import {
  MdDownload, MdMoreHoriz, MdTrendingUp,
} from "react-icons/md";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────
const streamTimeData = [
  { date: "Aug 01", streams: 280000 },
  { date: "Aug 05", streams: 420000 },
  { date: "Aug 10", streams: 510000 },
  { date: "Aug 15", streams: 620000 },
  { date: "Aug 20", streams: 750000 },
  { date: "Aug 25", streams: 820000 },
  { date: "Aug 28", streams: 980000 },
];

const ageData = [
  { age: "18-24", value: 35 },
  { age: "25-34", value: 45 },
  { age: "35-44", value: 28 },
  { age: "45-54", value: 15 },
  { age: "55+", value: 8 },
];

const genderData = [
  { name: "Female", value: 55, color: "#14b8a6" },
  { name: "Male", value: 35, color: "#1e293b" },
  { name: "Other", value: 10, color: "#94a3b8" },
];

const geoData = [
  { country: "🇺🇸 United States", pct: 45, color: "#14b8a6" },
  { country: "🇬🇧 United Kingdom", pct: 22, color: "#14b8a6" },
  { country: "🇩🇪 Germany", pct: 12, color: "#14b8a6" },
];

const statCards = [
  { label: "Total Streams", value: "24.5M", change: "+12%", up: true },
  { label: "Unique Listeners", value: "8.2M", change: "+5%", up: true },
  { label: "Playlist Adds", value: "156K", change: "+8%", up: true },
  { label: "Follower Growth", value: "+12.4K", change: "+2.1%", up: true },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg">
        <p className="font-bold">{(payload[0].value / 1000).toFixed(0)}k Streams</p>
        <p className="text-gray-400">{label}</p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [demoPlatform, setDemoPlatform] = useState("All Platforms");

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Performance Overview</h1>
          <p className="text-gray-500 text-sm mt-1">
            Detailed insights for your latest releases and audience engagement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            Last 28 Days ▾
          </button>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            Platform: All ▾
          </button>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            Latest Album ▾
          </button>
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-teal-200 transition">
            <MdDownload /> Export
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <span className="text-xs font-bold text-teal-500 flex items-center gap-0.5 mb-0.5">
                <MdTrendingUp /> {s.change}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">vs. previous 28 days</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Streams Over Time */}
        <div className="col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Streams Over Time</h2>
              <p className="text-xs text-gray-400">Daily stream count for all platforms</p>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
                <MdDownload className="text-base" />
              </button>
              <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition">
                <MdMoreHoriz className="text-base" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={streamTimeData}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="streams" stroke="#14b8a6" strokeWidth={2.5}
                fill="url(#tealGrad)" dot={false} activeDot={{ r: 5, fill: "#14b8a6" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic Insights */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Geographic Insights</h2>
              <p className="text-xs text-gray-400">Top listener locations</p>
            </div>
            <button className="text-xs text-teal-500 font-bold hover:underline">View Full Map</button>
          </div>
          {/* World map placeholder */}
          <div className="w-full h-32 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #14b8a6 1px, transparent 1px), radial-gradient(circle at 70% 40%, #14b8a6 1px, transparent 1px), radial-gradient(circle at 55% 60%, #14b8a6 1px, transparent 1px)",
                backgroundSize: "100% 100%" }} />
            <p className="text-slate-400 text-xs">World Map</p>
          </div>
          <div className="flex flex-col gap-3">
            {geoData.map((g) => (
              <div key={g.country}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{g.country}</span>
                  <span className="font-bold text-gray-900">{g.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Demographics */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">Audience Demographics</h2>
            <p className="text-xs text-gray-400">Breakdown by age and gender</p>
          </div>
          <div className="flex gap-2">
            {["All Platforms", "Spotify Only"].map((p) => (
              <button
                key={p}
                onClick={() => setDemoPlatform(p)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition ${
                  demoPlatform === p
                    ? "bg-teal-100 text-teal-700"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 items-center">
          {/* Age Bar Chart */}
          <div className="col-span-2">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={ageData} barSize={32}>
                <XAxis dataKey="age" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(v) => [`${v}%`, "Listeners"]}
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
                />
                <Bar dataKey="value" fill="#e2faf7" radius={[6, 6, 0, 0]}>
                  {ageData.map((_, i) => (
                    <Cell key={i} fill={i === 1 ? "#14b8a6" : "#e2faf7"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 text-center mt-1">Age Distribution</p>
          </div>

          {/* Gender Donut */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={genderData} cx="50%" cy="50%" innerRadius={50} outerRadius={72}
                    dataKey="value" startAngle={90} endAngle={-270}>
                    {genderData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-xs text-gray-400">Majority</p>
                <p className="text-base font-bold text-gray-900">Female</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              {genderData.map((g) => (
                <div key={g.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                  <span className="text-xs text-gray-600">{g.name}</span>
                  <span className="text-xs font-bold text-gray-800 ml-auto">{g.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
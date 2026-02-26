import { useState } from "react";
import {
  MdBarChart, MdNotifications, MdSettings, MdRocketLaunch,
  MdMoreHoriz, MdTrendingUp, MdTrendingDown,
  MdPlayCircle, MdOpenInNew, MdSearch,
} from "react-icons/md";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

// ── Sub-page imports ──────────────────────────────────────────
import MyReleases from "./MyReleases";
import Analytics from "./Analytics";
import Earnings from "./Earnings";
import Boost from "./Boost";
import Profile from "./Profile";
import ArtistSettings from "./ArtistSettings";

// ── Mock Data (Dashboard home only) ──────────────────────────
const streamData = [
  { day: "Mon", streams: 18000 },
  { day: "Tue", streams: 29000 },
  { day: "Wed", streams: 22000 },
  { day: "Thu", streams: 42500 },
  { day: "Fri", streams: 35000 },
  { day: "Sat", streams: 51000 },
  { day: "Sun", streams: 47000 },
];

const platformData = [
  { name: "Spotify", value: 60, color: "#1DB954" },
  { name: "Apple", value: 20, color: "#fc3c44" },
  { name: "Amazon", value: 12, color: "#FF9900" },
  { name: "Other", value: 8, color: "#94a3b8" },
];

const topSongs = [
  { title: "Midnight Dreams", album: "Neon Nights", streams: "245k", change: "+12%", up: true, color: "#6366f1" },
  { title: "Skyline", album: "Single", streams: "180k", change: "+8%", up: true, color: "#f59e0b" },
  { title: "Deep Focus", album: "Flow State", streams: "98k", change: "-2%", up: false, color: "#10b981" },
  { title: "Neon Nights", album: "EP: Unplugged", streams: "54k", change: "+24%", up: true, color: "#ec4899" },
];

const audienceData = [
  { city: "London, UK", pct: 24 },
  { city: "New York, USA", pct: 18 },
  { city: "Berlin, DE", pct: 12 },
  { city: "Sydney, AU", pct: 8 },
];

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ label, value, trend, up }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
        {up !== undefined && (
          up ? <MdTrendingUp className="text-emerald-500 text-lg" />
             : <MdTrendingDown className="text-red-400 text-lg" />
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-xs font-semibold ${up ? "text-emerald-500" : "text-red-400"}`}>
        {trend} <span className="text-gray-400 font-normal">from last month</span>
      </p>
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg">
        <p className="font-bold">{(payload[0].value / 1000).toFixed(1)}k Streams</p>
        <p className="text-gray-400">{label}</p>
      </div>
    );
  }
  return null;
};

// ── Dashboard Home ────────────────────────────────────────────
function DashboardHome() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Streams" value="1.2M" trend="+12.5%" up={true} />
        <StatCard label="Monthly Listeners" value="450K" trend="+5.2%" up={true} />
        <StatCard label="Est. Earnings" value="$3,420" trend="+8.1%" up={true} />
        <StatCard label="Active Releases" value="12" trend="+2 new this month" up={true} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Streams Over Time</h2>
              <p className="text-xs text-gray-400">Daily stream counts across all platforms</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition">
              <MdMoreHoriz className="text-xl" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={streamData}>
              <defs>
                <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="streams" stroke="#2563eb" strokeWidth={2.5}
                fill="url(#streamGrad)" dot={false} activeDot={{ r: 5, fill: "#2563eb" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-1">Platform Distribution</h2>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={platformData} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  dataKey="value" startAngle={90} endAngle={-270}>
                  {platformData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-2 mb-3">
              <p className="text-2xl font-bold text-gray-900">60%</p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Spotify</p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full">
              {platformData.map((p) => (
                <div key={p.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-xs text-gray-500">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Top Performing Songs</h2>
            <button className="text-xs text-blue-600 font-semibold hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-3">
            {topSongs.map((song) => (
              <div key={song.title} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: song.color + "22" }}>
                  <MdPlayCircle style={{ color: song.color }} className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">{song.title}</p>
                  <p className="text-xs text-gray-400 truncate">{song.album}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-gray-800">{song.streams}</p>
                  <p className={`text-xs font-semibold ${song.up ? "text-emerald-500" : "text-red-400"}`}>{song.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Audience</h2>
            <button className="text-xs text-blue-600 font-semibold hover:underline">Top Cities</button>
          </div>
          <div className="flex flex-col gap-4">
            {audienceData.map((a) => (
              <div key={a.city}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{a.city}</span>
                  <span className="font-bold text-gray-800">{a.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-700"
                    style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2 flex items-center gap-1">
              <MdRocketLaunch /> Boost Your Reach
            </p>
            <h3 className="text-lg font-bold text-white mb-2">Promote your new release</h3>
            <p className="text-sm text-blue-100">Reach thousands of new listeners with targeted ad campaigns.</p>
          </div>
          <div className="mt-6">
            <div className="bg-white/10 rounded-xl p-3 mb-4">
              <div className="flex justify-between text-xs text-blue-100 mb-1">
                <span>Daily Budget</span>
                <span className="font-bold text-white">$50.00</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full">
                <div className="h-full w-1/4 bg-white rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-blue-200 mt-1">
                <span>$10</span><span>$200</span>
              </div>
            </div>
            <button className="w-full bg-white text-blue-600 font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition">
              Start Campaign <MdOpenInNew />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Shell ────────────────────────────────────────────────
export default function ArtistDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":   return <DashboardHome />;
      case "My Releases": return <MyReleases />;
      case "Analytics":   return <Analytics />;
      case "Earnings":    return <Earnings />;
      case "Boost":       return <Boost />;
      case "Profile":     return <Profile />;
      case "Settings":    return <ArtistSettings />;
      default:            return <DashboardHome />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* ── Top Navbar ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm flex items-center px-8 py-3 gap-4 flex-shrink-0 z-20">
        {/* Brand */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MdBarChart className="text-white text-lg" />
          </div>
          <span className="text-sm font-bold text-gray-900 whitespace-nowrap">Artist Dashboard</span>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {["Dashboard", "My Releases", "Analytics", "Earnings"].map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 ${
                activePage === item
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              placeholder="Search..."
              className="w-44 pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
            <MdNotifications className="text-gray-500 text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button
            onClick={() => setActivePage("Profile")}
            className={`w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold transition hover:ring-2 hover:ring-blue-300 ${activePage === "Profile" ? "ring-2 ring-blue-400" : ""}`}
          >
            AR
          </button>
          <button
            onClick={() => setActivePage("Settings")}
            className={`p-2 rounded-xl transition ${
              activePage === "Settings" ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            }`}
          >
            <MdSettings className="text-xl" />
          </button>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
import { useState } from "react";
import {
  MdBarChart, MdNotifications, MdSettings,
  MdMoreHoriz, MdTrendingUp, MdTrendingDown,
  MdVisibility, MdCheck, MdSchedule, MdFilterList,
  MdDownload, MdSearch,
} from "react-icons/md";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from "recharts";

// ── Sub-page imports ──────────────────────────────────────────
import AllArtists from "./AllArtists";
import DistributorReleases from "./DistributorReleases";
import RevenueCommissions from "./RevenueCommissions";
import BoostCampaigns from "./BoostCampaigns";
import Reports from "./Reports";

// ── Mock Data (Dashboard home only — from existing DistributorDashboard) ──
const multiArtistData = [
  { week: "Week 1", lunaRay: 80000, theEchoes: 45000, velvetBox: 20000 },
  { week: "Week 2", lunaRay: 120000, theEchoes: 80000, velvetBox: 50000 },
  { week: "Week 3", lunaRay: 250000, theEchoes: 150000, velvetBox: 90000 },
  { week: "Week 4", lunaRay: 420000, theEchoes: 210000, velvetBox: 130000 },
];

const revenueData = [
  { name: "Spotify",     value: 45, color: "#1DB954" },
  { name: "Apple Music", value: 30, color: "#fc3c44" },
  { name: "YouTube",     value: 15, color: "#FF0000" },
  { name: "Others",      value: 10, color: "#94a3b8" },
];

const artists = [
  { name: "Luna Ray",   genre: "Indie Pop",    status: "Active",  streams: "2.4M",  revenue: "$12,450", trend: "+18%", up: true  },
  { name: "The Echoes", genre: "Alternative",  status: "Active",  streams: "1.1M",  revenue: "$8,230",  trend: "+6%",  up: true  },
  { name: "Velvet Box", genre: "R&B",          status: "Pending", streams: "680k",  revenue: "$4,100",  trend: "-3%",  up: false },
  { name: "Nova Drift", genre: "Electronic",   status: "Active",  streams: "430k",  revenue: "$2,890",  trend: "+22%", up: true  },
];

const catalogItems = [
  { title: "Neon Nights (EP)", artist: "Velvet Box + 4", status: "Pending" },
  { title: "Summer Tide",      artist: "The Echoes + 2", status: "Review"  },
];

// ── Tooltip ───────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {(p.value / 1000).toFixed(0)}k
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ label, value, badge, badgeColor }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider leading-tight">
          {label}
        </span>
        {badge && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

// ── Dashboard Home ────────────────────────────────────────────
function DashboardHome() {
  return (
    <div className="p-8 flex flex-col gap-6">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-400">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          {["Filter Artists", "Last 30 Days", "Q3 2023", "Year to Date"].map((b) => (
            <button
              key={b}
              className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
            >
              {b === "Filter Artists" && <MdFilterList />}
              {b}
            </button>
          ))}
          <button className="flex items-center gap-1.5 bg-indigo-600 text-white rounded-xl px-4 py-2 text-xs font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition">
            <MdDownload /> Export
          </button>
        </div>
      </div>

      {/* ── Stat Cards + Catalog Management ── */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4 grid grid-cols-4 gap-4">
          <StatCard label="Commission Earned" value="$42,850"  badge="+12.5%" badgeColor="bg-emerald-100 text-emerald-600" />
          <StatCard label="Active Artists"    value="124"      badge="+4 New" badgeColor="bg-blue-100 text-blue-600"       />
          <StatCard label="Total Releases"    value="856"      badge="Stable" badgeColor="bg-gray-100 text-gray-500"        />
          <StatCard label="Global Streams"    value="12.5M"    badge="+8.2%" badgeColor="bg-emerald-100 text-emerald-600"  />
        </div>

        {/* Catalog Management Panel */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-gray-900">Catalog Management</h3>
            <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
              3
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {catalogItems.map((c) => (
              <div key={c.title} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{c.title}</p>
                    <p className="text-xs text-gray-400 truncate">{c.artist}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="flex-1 bg-indigo-600 text-white text-xs font-bold py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-indigo-700 transition">
                    <MdCheck className="text-sm" /> Approve
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-600 text-xs font-semibold py-1 rounded-lg hover:bg-gray-200 transition">
                    Review
                  </button>
                </div>
              </div>
            ))}
            <button className="text-xs text-indigo-600 font-semibold text-right hover:underline mt-1">
              View All Requests →
            </button>
          </div>
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Multi-Artist Line Chart */}
        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-base font-bold text-gray-900">Multi-Artist Performance</h2>
              <p className="text-xs text-gray-400">Top performing artists by streams — last 30 days</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition">
              <MdMoreHoriz className="text-xl" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={multiArtistData}>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="lunaRay"   name="Luna Ray"   stroke="#4f46e5" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="theEchoes" name="The Echoes" stroke="#a855f7" strokeWidth={2.5} dot={false} strokeDasharray="5 3" activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="velvetBox" name="Velvet Box" stroke="#14b8a6" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Insights Donut */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-4">Revenue Insights</h2>
          <div className="flex flex-col items-center">
            <div className="relative">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%" cy="50%"
                    innerRadius={48} outerRadius={72}
                    dataKey="value"
                    startAngle={90} endAngle={-270}
                  >
                    {revenueData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-lg font-bold text-gray-900">$42k</p>
                <p className="text-xs text-gray-400">Total Net</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full mt-3">
              {revenueData.map((r) => (
                <div key={r.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color }} />
                    <span className="text-xs text-gray-600">{r.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Artist Leaderboard ── */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Artist Leaderboard</h2>
          <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="text-left pb-3 font-semibold">Artist Name</th>
              <th className="text-left pb-3 font-semibold">Status</th>
              <th className="text-right pb-3 font-semibold">Total Streams</th>
              <th className="text-right pb-3 font-semibold">Revenue (Gross)</th>
              <th className="text-right pb-3 font-semibold">Trend</th>
              <th className="text-right pb-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((a, i) => (
              <tr key={a.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: ["#6366f1","#a855f7","#14b8a6","#f59e0b"][i] }}
                    >
                      {a.name.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.genre}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    a.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {a.status === "Active"
                      ? <span className="flex items-center gap-1"><MdCheck className="text-sm" />{a.status}</span>
                      : <span className="flex items-center gap-1"><MdSchedule className="text-sm" />{a.status}</span>
                    }
                  </span>
                </td>
                <td className="py-3.5 text-right text-sm font-bold text-gray-800">{a.streams}</td>
                <td className="py-3.5 text-right text-sm font-bold text-gray-800">{a.revenue}</td>
                <td className="py-3.5 text-right">
                  <span className={`text-xs font-bold flex items-center justify-end gap-1 ${
                    a.up ? "text-emerald-500" : "text-red-400"
                  }`}>
                    {a.up ? <MdTrendingUp /> : <MdTrendingDown />} {a.trend}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
                    <MdVisibility className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// ── Main Shell ────────────────────────────────────────────────
export default function DistributorDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":  return <DashboardHome />;
      case "Artists":    return <AllArtists />;
      case "Releases":   return <DistributorReleases />;
      case "Finance":    return <RevenueCommissions />;
      case "Boost":      return <BoostCampaigns />;
      case "Reports":    return <Reports />;
      default:           return <DashboardHome />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">

      {/* ── Top Navbar ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm flex items-center px-8 py-3 gap-4 flex-shrink-0 z-20">

        {/* Brand */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <MdBarChart className="text-white text-lg" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">DistroControl</p>
            <p className="text-xs text-gray-400 leading-none">Admin Console</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {[
            { label: "Dashboard", page: "Dashboard" },
            { label: "Artists",   page: "Artists"   },
            { label: "Releases",  page: "Releases"  },
            { label: "Finance",   page: "Finance"   },
            { label: "Boost",     page: "Boost"     },
            { label: "Reports",   page: "Reports"   },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-4 py-2 text-sm font-semibold transition-all border-b-2 ${
                activePage === page
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              placeholder="Search artists, tracks..."
              className="w-52 pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="relative p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
            <MdNotifications className="text-gray-500 text-xl" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-indigo-300 transition">
            JA
          </div>
          <button
            className="p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition"
            onClick={() => setActivePage("Dashboard")}
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
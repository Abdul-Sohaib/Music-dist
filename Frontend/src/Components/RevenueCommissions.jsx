import { useState } from "react";
import {
  MdCalendarToday, MdDownload, MdSearch, MdFilterList, MdMoreVert,
  MdTrendingUp,
} from "react-icons/md";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────
const commissionData = [
  { platform: "Spotify", gross: 520000, commission: 78000 },
  { platform: "Apple", gross: 310000, commission: 46500 },
  { platform: "YouTube", gross: 180000, commission: 27000 },
  { platform: "Amazon", gross: 140000, commission: 21000 },
  { platform: "Tidal", gross: 95000, commission: 14250 },
];

const artistRevenue = [
  { name: "Luna Ray", initials: "LR", color: "#6366f1", gross: "$45,230.00", commission: "15%", net: "$38,445.50", status: "Paid" },
  { name: "The Echoes", initials: "TE", color: "#f59e0b", gross: "$28,900.00", commission: "20%", net: "$23,120.00", status: "Pending" },
  { name: "Velvet Box", initials: "VB", color: "#14b8a6", gross: "$12,450.00", commission: "10%", net: "$11,205.00", status: "Paid" },
  { name: "Nova Drift", initials: "ND", color: "#ec4899", gross: "$8,320.00", commission: "15%", net: "$7,072.00", status: "Processing" },
];

const statusBadge = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-xl shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-indigo-300">Commission: ${(payload[1]?.value || 0).toLocaleString()}</p>
        <p className="text-indigo-100">Gross: ${(payload[0]?.value || 0).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function RevenueCommissions() {
  const [view, setView] = useState("Graph");
  const [artistSearch, setArtistSearch] = useState("");

  const filteredArtists = artistRevenue.filter((a) =>
    a.name.toLowerCase().includes(artistSearch.toLowerCase())
  );

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Revenue & Commissions</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track gross earnings, monitor commission splits across streaming platforms, and generate detailed financial statements.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            <MdCalendarToday /> This Year
          </button>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            <MdDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Gross Revenue", value: "$1,245,000", change: "12.5%", icon: "$" },
          { label: "Commission Earned", value: "$186,750", change: "5.2%", icon: "%" },
          { label: "Net Profit", value: "$1,058,250", change: "14.1%", icon: "◎" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
              <span className="text-5xl font-extrabold text-gray-100 absolute right-4 top-3 select-none">
                {s.icon}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-gray-900 mb-2">{s.value}</p>
            <p className="text-xs text-emerald-500 font-bold flex items-center gap-1">
              <MdTrendingUp /> {s.change} <span className="text-gray-400 font-normal">vs last period</span>
            </p>
          </div>
        ))}
      </div>

      {/* Commission Breakdown Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Commission Breakdown</h2>
            <p className="text-xs text-gray-400">Revenue distribution across top streaming platforms.</p>
          </div>
          <div className="flex gap-1 border border-gray-200 rounded-xl overflow-hidden">
            {["Graph", "List"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-sm font-semibold transition ${
                  view === v ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {view === "Graph" ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={commissionData} barSize={48} barCategoryGap="30%">
              <XAxis dataKey="platform" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="gross" stackId="a" fill="#e0e7ff" radius={[0, 0, 0, 0]} />
              <Bar dataKey="commission" stackId="a" fill="#4f46e5" radius={[6, 6, 0, 0]}>
                {commissionData.map((_, i) => (
                  <Cell key={i} fill="#4f46e5" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="text-left pb-3 font-semibold">Platform</th>
                <th className="text-right pb-3 font-semibold">Gross Revenue</th>
                <th className="text-right pb-3 font-semibold">Commission</th>
              </tr>
            </thead>
            <tbody>
              {commissionData.map((c) => (
                <tr key={c.platform} className="border-b border-gray-50">
                  <td className="py-3 text-sm font-semibold text-gray-700">{c.platform}</td>
                  <td className="py-3 text-right text-sm text-gray-700">${c.gross.toLocaleString()}</td>
                  <td className="py-3 text-right text-sm font-bold text-indigo-600">${c.commission.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detailed Revenue Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Detailed Revenue</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              <input
                value={artistSearch}
                onChange={(e) => setArtistSearch(e.target.value)}
                placeholder="Search artist..."
                className="w-44 pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
              <MdFilterList /> Filter
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="text-left pb-3 font-semibold">Artist Name</th>
              <th className="text-right pb-3 font-semibold">Gross Revenue</th>
              <th className="text-right pb-3 font-semibold">Commission %</th>
              <th className="text-right pb-3 font-semibold">Net Earnings</th>
              <th className="text-right pb-3 font-semibold">Status</th>
              <th className="text-right pb-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredArtists.map((a) => (
              <tr key={a.name} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: a.color }}
                    >
                      {a.initials}
                    </div>
                    <p className="text-sm font-bold text-gray-800">{a.name}</p>
                  </div>
                </td>
                <td className="py-4 text-right text-sm text-gray-700">{a.gross}</td>
                <td className="py-4 text-right text-sm font-semibold text-gray-700">{a.commission}</td>
                <td className="py-4 text-right text-sm font-extrabold text-indigo-600">{a.net}</td>
                <td className="py-4 text-right">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusBadge[a.status]}`}>
                    {a.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
                    <MdMoreVert />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing <span className="font-bold text-gray-700">1</span> to{" "}
            <span className="font-bold text-gray-700">{filteredArtists.length}</span> of{" "}
            <span className="font-bold text-gray-700">48</span> results
          </p>
          <div className="flex gap-2">
            <button className="border border-gray-200 text-sm font-medium text-gray-600 px-4 py-1.5 rounded-xl hover:bg-gray-50 transition">Previous</button>
            <button className="border border-gray-200 text-sm font-medium text-gray-600 px-4 py-1.5 rounded-xl hover:bg-gray-50 transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
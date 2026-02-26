import { useState } from "react";
import {
  MdAdd, MdSearch, MdFilterList, MdTrendingUp, MdMoreVert,
  MdClose, MdEmail, MdPhone, MdLocationOn,
} from "react-icons/md";
import {
  BarChart, Bar, XAxis, ResponsiveContainer, Cell,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────
const artists = [
  { id: 1, name: "Luna Ray", initials: "LR", color: "#6366f1", email: "contact@lunaray.com", plan: "Pro", planColor: "indigo", releases: 12, streams: "4.2M", status: "Active", memberSince: "2021", revenue: "$12,450", revenueChange: "+12.5%", streamsChange: "+5.2%", phone: "+1 (555) 012-3456", location: "Los Angeles, CA", releases_list: [ { title: "Neon Nights (EP)", date: "Oct 24, 2023", streams: "124K" }, { title: "Digital Dreams", date: "Sep 12, 2023", streams: "89K" }, { title: "Silence & Sound", date: "Aug 05, 2023", streams: "210K" } ], perf: [30,18,40,55,35,45,50,38,60,42,55,65] },
  { id: 2, name: "The Echoes", initials: "TE", color: "#f59e0b", email: "mgmt@theechoes.com", plan: "Basic", planColor: "gray", releases: 3, streams: "850K", status: "Active", memberSince: "2022", revenue: "$8,230", revenueChange: "+6.0%", streamsChange: "+3.1%", phone: "+1 (555) 234-5678", location: "New York, NY", releases_list: [ { title: "Summer Tide", date: "Sep 01, 2023", streams: "420K" }, { title: "Open Waters", date: "Jul 14, 2023", streams: "430K" } ], perf: [20,35,25,40,30,45,38,50,42,35,40,48] },
  { id: 3, name: "Velvet Box", initials: "VB", color: "#14b8a6", email: "info@velvetbox.io", plan: "Pro", planColor: "indigo", releases: 28, streams: "12.5M", status: "Active", memberSince: "2020", revenue: "$42,850", revenueChange: "+18.2%", streamsChange: "+8.5%", phone: "+1 (555) 345-6789", location: "Nashville, TN", releases_list: [ { title: "Midnight Drive", date: "Oct 10, 2023", streams: "520K" }, { title: "Resonance", date: "Aug 22, 2023", streams: "310K" } ], perf: [45,60,55,70,65,80,75,85,78,90,88,95] },
  { id: 4, name: "Nova Drift", initials: "ND", color: "#ec4899", email: "team@novadrift.net", plan: "Enterprise", planColor: "purple", releases: 45, streams: "22M", status: "Active", memberSince: "2019", revenue: "$98,200", revenueChange: "+22.4%", streamsChange: "+14.1%", phone: "+1 (555) 456-7890", location: "Miami, FL", releases_list: [ { title: "Aurora Nights", date: "Oct 18, 2023", streams: "1.2M" } ], perf: [60,75,70,85,80,90,88,95,92,98,96,100] },
  { id: 5, name: "Echo Park", initials: "EP", color: "#94a3b8", email: "band@echopark.com", plan: "Free", planColor: "gray", releases: 1, streams: "12K", status: "Pending", memberSince: "2023", revenue: "$340", revenueChange: "+2.1%", streamsChange: "+1.0%", phone: "+1 (555) 567-8901", location: "Austin, TX", releases_list: [ { title: "First Light", date: "Sep 30, 2023", streams: "12K" } ], perf: [5,8,6,10,9,12,10,14,12,15,13,16] },
];

const planBadge = {
  Pro: "bg-indigo-100 text-indigo-700",
  Basic: "bg-gray-100 text-gray-600",
  Enterprise: "bg-purple-100 text-purple-700",
  Free: "bg-gray-100 text-gray-500",
};

const statusFilters = ["All Status", "Active", "Pending", "Suspended"];

export default function AllArtists() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selected, setSelected] = useState(artists[0]);

  const filtered = artists.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All Status" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const perfData = (selected?.perf || []).map((v, i) => ({ i, v }));

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Left: Table ── */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">All Artists</h1>
            <p className="text-gray-500 text-sm mt-1">Manage artist accounts, verification, and performance data.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-indigo-200 transition">
            <MdAdd className="text-lg" /> Add New Artist
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by artist name, email, or ISRC..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            <MdFilterList /> Filter
          </button>
          <div className="flex items-center gap-1">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  statusFilter === f
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-semibold">Artist</th>
                <th className="text-left px-5 py-3 font-semibold">Email</th>
                <th className="text-left px-5 py-3 font-semibold">Plan</th>
                <th className="text-right px-5 py-3 font-semibold">Releases</th>
                <th className="text-right px-5 py-3 font-semibold">Streams</th>
                <th className="text-right px-5 py-3 font-semibold">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className={`border-b border-gray-50 cursor-pointer transition ${
                    selected?.id === a.id ? "bg-indigo-50" : "hover:bg-gray-50/60"
                  }`}
                >
                  <td className="px-5 py-4">
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
                  <td className="px-5 py-4 text-sm text-gray-500">{a.email}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${planBadge[a.plan]}`}>
                      {a.plan}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-gray-700">{a.releases}</td>
                  <td className="px-5 py-4 text-right text-sm font-bold text-gray-800">{a.streams}</td>
                  <td className="px-5 py-4 text-right text-sm font-bold text-gray-800">{a.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing <span className="font-bold text-gray-700">1</span> to{" "}
            <span className="font-bold text-gray-700">{filtered.length}</span> of{" "}
            <span className="font-bold text-gray-700">128</span> results
          </div>
        </div>
      </div>

      {/* ── Right: Detail Panel ── */}
      {selected && (
        <div className="w-80 bg-white border-l border-gray-100 flex flex-col overflow-y-auto flex-shrink-0">
          <div className="p-6">
            {/* Status + actions */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                selected.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                {selected.status}
              </span>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600 transition">
                  <MdMoreVert />
                </button>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition">
                  <MdClose />
                </button>
              </div>
            </div>

            {/* Artist info */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: selected.color }}>
                  {selected.initials}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                  <p className="text-xs text-gray-400">
                    {selected.plan} Plan • Member since {selected.memberSince}
                  </p>
                </div>
              </div>
            </div>

            {/* Revenue + Streams */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Revenue</p>
                <p className="text-xl font-extrabold text-gray-900">{selected.revenue}</p>
                <p className="text-xs text-emerald-500 font-bold flex items-center gap-0.5 mt-0.5">
                  <MdTrendingUp /> {selected.revenueChange}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Streams</p>
                <p className="text-xl font-extrabold text-gray-900">{selected.streams}</p>
                <p className="text-xs text-emerald-500 font-bold flex items-center gap-0.5 mt-0.5">
                  <MdTrendingUp /> {selected.streamsChange}
                </p>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-gray-800">Performance (30 Days)</p>
                <button className="text-xs text-indigo-600 font-semibold hover:underline">Streams</button>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={perfData} barSize={8}>
                    <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                      {perfData.map((_, i) => (
                        <Cell key={i} fill={i === perfData.length - 1 ? "#6366f1" : "#c7d2fe"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Releases */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-800">Recent Releases</p>
                <button className="text-xs text-indigo-600 font-semibold hover:underline">View All</button>
              </div>
              <div className="flex flex-col gap-2">
                {selected.releases_list.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{r.title}</p>
                      <p className="text-xs text-gray-400">Released {r.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-gray-800">{r.streams}</p>
                      <p className="text-xs text-gray-400">Streams</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-sm font-bold text-gray-800 mb-3">Contact Information</p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: <MdEmail className="text-gray-400" />, label: "Email Address", value: selected.email },
                  { icon: <MdPhone className="text-gray-400" />, label: "Phone Number", value: selected.phone },
                  { icon: <MdLocationOn className="text-gray-400" />, label: "Location", value: selected.location },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{c.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
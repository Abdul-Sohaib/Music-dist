import { useState } from "react";
import {
  MdDownload, MdAdd, MdTrendingUp, MdLightbulb,
  MdMoreHoriz, MdChevronLeft, MdChevronRight,
} from "react-icons/md";

// ── Mock Data ─────────────────────────────────────────────────
const campaigns = [
  { name: "Summer Vibes Promo", sub: "Spotify • Jul 12 – Jul 26", artist: "Luna Eclipse", initials: "LE", color: "#6366f1", status: "Active", budget: "$1,200", roi: "+312%", roiUp: true },
  { name: "Midnight Album Launch", sub: "Multi-Platform • Jun 01 – Jun 30", artist: "Midnight Echo", initials: "ME", color: "#14b8a6", status: "Completed", budget: "$5,000", roi: "+180%", roiUp: true },
  { name: "Debut Single Push", sub: "TikTok • Aug 01 – Aug 15", artist: "Neon Waves", initials: "NW", color: "#f59e0b", status: "Scheduled", budget: "$800", roi: "—", roiUp: null },
  { name: "Acoustic Sessions", sub: "YouTube • Jul 01 – Jul 14", artist: "The Resonators", initials: "TR", color: "#ec4899", status: "Completed", budget: "$2,400", roi: "+145%", roiUp: true },
];

const statusBadge = {
  Active: "bg-emerald-100 text-emerald-700",
  Completed: "bg-gray-100 text-gray-600",
  Scheduled: "bg-amber-100 text-amber-700",
};

export default function BoostCampaigns() {
  const [artist, setArtist] = useState("");
  const [release, setRelease] = useState("");
  const [platform, setPlatform] = useState("Spotify");
  const [duration, setDuration] = useState("7 Days");
  const [budget, setBudget] = useState(500);

  const budgetPct = ((budget - 100) / (5000 - 100)) * 100;

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Boost Campaigns</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage promotional budgets and track performance across your roster.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            <MdDownload /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 transition">
            <MdAdd /> Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left: Quick Boost Form */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <h2 className="text-base font-bold text-gray-900">Quick Boost</h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Target Artist</label>
                <div className="relative">
                  <select value={artist} onChange={(e) => setArtist(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select an artist...</option>
                    <option>Luna Ray</option>
                    <option>The Echoes</option>
                    <option>Velvet Box</option>
                    <option>Nova Drift</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Release / Track</label>
                <div className="relative">
                  <select value={release} onChange={(e) => setRelease(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select release...</option>
                    <option>Neon Nights (EP)</option>
                    <option>Digital Dreams</option>
                    <option>Midnight Drive</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Platform</label>
                  <div className="relative">
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)}
                      className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Spotify</option>
                      <option>Apple Music</option>
                      <option>YouTube</option>
                      <option>TikTok</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Duration</label>
                  <div className="relative">
                    <select value={duration} onChange={(e) => setDuration(e.target.value)}
                      className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>7 Days</option>
                      <option>14 Days</option>
                      <option>30 Days</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Budget</label>
                  <span className="text-base font-extrabold text-gray-900">${budget.toLocaleString()}.00</span>
                </div>
                <input
                  type="range" min={100} max={5000} step={100} value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${budgetPct}%, #e5e7eb ${budgetPct}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$100</span><span>$5,000</span>
                </div>
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm py-3.5 rounded-xl transition shadow-lg">
                Launch Campaign
              </button>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <MdLightbulb className="text-teal-500 text-lg" />
              <p className="text-sm font-bold text-gray-800">Pro Tip</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Campaigns running for at least 14 days see a 25% higher retention rate on new listeners.
            </p>
          </div>
        </div>

        {/* Right: Stats + Recent Campaigns */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "💳", label: "Total Spend", value: "$12,450", change: "↑ 15%" },
              { icon: "📊", label: "Streams Boosted", value: "1.2M", change: "↑ 22%" },
              { icon: "📈", label: "Avg. ROI", value: "245%", change: "↑ 5%" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-lg">
                    {s.icon}
                  </div>
                  <span className="text-xs text-emerald-500 font-bold">{s.change}</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Campaigns Table */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Recent Campaigns</h2>
              <button className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="text-left pb-3 font-semibold">Campaign Name</th>
                  <th className="text-left pb-3 font-semibold">Artist</th>
                  <th className="text-left pb-3 font-semibold">Status</th>
                  <th className="text-right pb-3 font-semibold">Budget</th>
                  <th className="text-right pb-3 font-semibold">ROI</th>
                  <th className="text-right pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                    <td className="py-4">
                      <p className="text-sm font-bold text-gray-800">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.sub}</p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                          style={{ background: c.color }}>
                          {c.initials}
                        </div>
                        <span className="text-sm text-gray-700">{c.artist}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusBadge[c.status]}`}>
                        {c.status === "Active" && "• "}{c.status}
                      </span>
                    </td>
                    <td className="py-4 text-right text-sm font-semibold text-gray-700">{c.budget}</td>
                    <td className="py-4 text-right">
                      <span className={`text-sm font-extrabold ${c.roiUp === null ? "text-gray-400" : "text-emerald-600"}`}>
                        {c.roi}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
                        <MdMoreHoriz />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">Showing 4 of 12 campaigns</p>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition">
                  <MdChevronLeft className="text-base" />
                </button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition">
                  <MdChevronRight className="text-base" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
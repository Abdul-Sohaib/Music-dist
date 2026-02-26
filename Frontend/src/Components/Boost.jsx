import { useState } from "react";
import { MdRocketLaunch, MdTrendingUp, MdTrendingDown, MdLightbulb } from "react-icons/md";

// ── Mock Data ─────────────────────────────────────────────────
const campaigns = [
  { title: "Summer Vibes EP", sub: "Global • Spotify", status: "Active", streamsGained: "+12,450", roi: "320%", roiUp: true, color: "from-orange-400 to-pink-500" },
  { title: "Ocean Drive", sub: "USA • Apple Music", status: "Active", streamsGained: "+4,200", roi: "185%", roiUp: true, color: "from-blue-400 to-cyan-500" },
  { title: "Neon Nights", sub: "UK • Spotify", status: "Paused", streamsGained: "+890", roi: "--", roiUp: null, color: "from-purple-500 to-pink-600" },
];

export default function Boost() {
  const [budget, setBudget] = useState(50);
  const [song, setSong] = useState("");
  const [location, setLocation] = useState("United States");

  const budgetPct = ((budget - 10) / (500 - 10)) * 100;

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-500 text-sm mt-1">
            Launch targeted ads to boost your streams and grow your fanbase.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-teal-200 transition">
          <MdRocketLaunch /> Launch Campaign
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left: Settings + Active Campaigns */}
        <div className="col-span-2 flex flex-col gap-5">
          {/* Campaign Settings */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
              <MdTrendingUp className="text-teal-500" /> Campaign Settings
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Select Song</label>
                <div className="relative">
                  <select
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <option value="">Choose a track...</option>
                    <option>Midnight Dreams</option>
                    <option>Neon Nights</option>
                    <option>Skyline</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Target Location</label>
                <div className="relative">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🌐</span>
                </div>
              </div>
            </div>

            {/* Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  Daily Budget <span className="w-4 h-4 bg-gray-200 rounded-full text-gray-400 text-xs flex items-center justify-center cursor-help">i</span>
                </label>
                <span className="text-teal-500 font-extrabold text-base">${budget}.00</span>
              </div>
              <input
                type="range" min={10} max={500} value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${budgetPct}%, #e5e7eb ${budgetPct}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$10</span><span>$250</span><span>$500</span>
              </div>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Active Campaigns</h2>
              <button className="text-xs text-teal-500 font-bold hover:underline">View All</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="text-left pb-3 font-semibold">Campaign Name</th>
                  <th className="text-left pb-3 font-semibold">Status</th>
                  <th className="text-right pb-3 font-semibold">Streams Gained</th>
                  <th className="text-right pb-3 font-semibold">ROI</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.color} flex-shrink-0`} />
                        <div>
                          <p className="text-sm font-bold text-gray-800">{c.title}</p>
                          <p className="text-xs text-gray-400">{c.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        c.status === "Active"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-sm font-bold text-gray-800">{c.streamsGained}</td>
                    <td className="py-3.5 text-right">
                      <span className={`text-sm font-extrabold ${
                        c.roiUp === null ? "text-gray-400" : "text-teal-500"
                      }`}>
                        {c.roi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Performance Overview */}
        <div className="flex flex-col gap-4">
          <p className="text-base font-bold text-gray-900">Performance Overview</p>

          {[
            { label: "TOTAL ROI", value: "320%", badge: "↑ 12%", sub: "Compared to last month", up: true, icon: "📈" },
            { label: "AVG COST / STREAM", value: "$0.04", badge: "↓ 2%", sub: "Lower is better", up: false, icon: "📷" },
          ].map((p) => (
            <div key={p.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{p.label}</p>
                <span className="text-2xl opacity-20">{p.icon}</span>
              </div>
              <div className="flex items-end gap-2 mt-2">
                <p className="text-3xl font-extrabold text-gray-900">{p.value}</p>
                <span className={`text-xs font-bold flex items-center gap-0.5 mb-1 ${p.up ? "text-teal-500" : "text-red-400"}`}>
                  {p.up ? <MdTrendingUp /> : <MdTrendingDown />} {p.badge}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{p.sub}</p>
            </div>
          ))}

          {/* Total Spend */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Spend</p>
              <span className="text-2xl opacity-20">💙</span>
            </div>
            <p className="text-3xl font-extrabold text-gray-900 mt-2">$1,240</p>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">65% of monthly budget used</p>
          </div>

          {/* Pro Tip */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <MdLightbulb className="text-teal-500 text-lg" />
              <p className="text-sm font-bold text-gray-800">Pro Tip</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Campaigns targeting specific cities perform 25% better than country-wide campaigns. Try narrowing your location!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
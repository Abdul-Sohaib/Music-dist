import { useState } from "react";
import {
  MdDownload, MdTrendingUp, MdTrendingDown,
} from "react-icons/md";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Mock Data ─────────────────────────────────────────────────
const monthlyData = [
  { month: "Jan", earnings: 3200 },
  { month: "Feb", earnings: 4100 },
  { month: "Mar", earnings: 3800 },
  { month: "Apr", earnings: 5200 },
  { month: "May", earnings: 4800 },
  { month: "Jun", earnings: 6100 },
];

const transactions = [
  { title: "Midnight Dreams", album: "Album: Neon Nights", platform: "Spotify", platformColor: "#1DB954", streams: 125403, split: "100%", splitColor: "blue", date: "May 24, 2023", revenue: "$450.23" },
  { title: "Echoes of Rain", album: "Single", platform: "Apple Music", platformColor: "#fc3c44", streams: 89200, split: "50%", splitColor: "purple", date: "May 23, 2023", revenue: "$320.50" },
  { title: "Urban Solitude", album: "Album: Late Night", platform: "SoundCloud", platformColor: "#FF5500", streams: 45100, split: "100%", splitColor: "blue", date: "May 22, 2023", revenue: "$112.00" },
  { title: "Velocity", album: "Single", platform: "YouTube", platformColor: "#FF0000", streams: 210550, split: "100%", splitColor: "blue", date: "May 21, 2023", revenue: "$580.15" },
];

const platformIconBg = {
  Spotify: "#1DB954",
  "Apple Music": "#fc3c44",
  SoundCloud: "#FF5500",
  YouTube: "#FF0000",
};

export default function Earnings() {
  const [payoutMethod, setPayoutMethod] = useState("chase");
  const [amount] = useState("2,450.50");

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Earnings & Payouts</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your royalties, track revenue, and withdraw funds.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
          <MdDownload /> Export Report
        </button>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
              <span className="text-teal-500 text-xl">$</span>
            </div>
            <span className="text-xs text-teal-500 font-bold flex items-center gap-0.5">
              <MdTrendingUp /> +12%
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Lifetime Earnings</p>
          <p className="text-2xl font-extrabold text-gray-900">$45,280.00</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-3 right-3 text-xs text-teal-400 font-bold flex items-center gap-0.5">
            <MdTrendingUp /> +5%
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
            <span className="text-white text-xl">◎</span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Current Balance</p>
          <p className="text-2xl font-extrabold text-white">$2,450.50</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <span className="text-orange-400 text-xl">⋯</span>
            </div>
            <span className="text-xs text-teal-500 font-bold flex items-center gap-0.5">
              <MdTrendingUp /> +2%
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Pending Royalties</p>
          <p className="text-2xl font-extrabold text-gray-900">$320.00</p>
        </div>
      </div>

      {/* Charts + Withdraw */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monthly Earnings Chart */}
        <div className="col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Monthly Earnings</h2>
              <p className="text-xs text-gray-400">Last 6 months performance</p>
            </div>
            <button className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 font-medium hover:bg-gray-50 transition">
              Last 6 Months ▾
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barSize={36}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [`$${v.toLocaleString()}`, "Earnings"]}
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }}
              />
              <Bar dataKey="earnings" radius={[8, 8, 0, 0]}>
                {monthlyData.map((_, i) => (
                  <Cell key={i} fill={i === 5 ? "#14b8a6" : "#e2faf7"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Withdraw Panel */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Withdraw Funds</h2>
            <p className="text-xs text-gray-400">Transfer earnings to your bank</p>
          </div>

          {/* Amount */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount</p>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
              <span className="text-sm text-gray-400 font-semibold">$</span>
              <input
                defaultValue={amount}
                className="flex-1 bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Payout Methods */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Payout Method</p>
            <div className="flex flex-col gap-2">
              {[
                { id: "chase", name: "Chase Bank **** 8821", sub: "ACH Transfer • 1-3 Days", icon: "🏦" },
                { id: "paypal", name: "PayPal", sub: "Instant • 1% Fee", icon: "🅿" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayoutMethod(m.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition ${
                    payoutMethod === m.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                    payoutMethod === m.id ? "bg-teal-100" : "bg-gray-100"
                  }`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.sub}</p>
                  </div>
                  <div className={`ml-auto w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    payoutMethod === m.id
                      ? "border-teal-500 bg-teal-500"
                      : "border-gray-300"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-teal-100">
            Withdraw Now →
          </button>
        </div>
      </div>

      {/* Revenue Breakdown Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Revenue Breakdown</h2>
            <p className="text-xs text-gray-400">Detailed earnings by song and platform</p>
          </div>
          <div className="flex gap-2">
            <button className="border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition">
              Filter
            </button>
            <button className="border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition">
              Sort By
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="text-left pb-3 font-semibold">Track</th>
              <th className="text-left pb-3 font-semibold">Platform</th>
              <th className="text-right pb-3 font-semibold">Streams</th>
              <th className="text-right pb-3 font-semibold">Split</th>
              <th className="text-right pb-3 font-semibold">Date</th>
              <th className="text-right pb-3 font-semibold">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{t.title}</p>
                      <p className="text-xs text-gray-400">{t.album}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: platformIconBg[t.platform] }}>
                      {t.platform[0]}
                    </span>
                    <span className="text-sm text-gray-700">{t.platform}</span>
                  </div>
                </td>
                <td className="py-4 text-right text-sm text-gray-700">{t.streams.toLocaleString()}</td>
                <td className="py-4 text-right">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    t.splitColor === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  }`}>
                    {t.split}
                  </span>
                </td>
                <td className="py-4 text-right text-sm text-gray-500">{t.date}</td>
                <td className="py-4 text-right text-sm font-bold text-gray-900">{t.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="w-full text-center text-sm text-gray-500 hover:text-gray-700 font-medium mt-4 transition">
          View All Transactions →
        </button>
      </div>
    </div>
  );
}
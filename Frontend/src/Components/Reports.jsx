import { useState } from "react";
import {
  MdFilterList, MdDownload, MdBolt,
} from "react-icons/md";

// ── Mock Data ─────────────────────────────────────────────────
const reportHistory = [
  { id: 1, name: "Q3 Royalty Statement", dateRange: "Jul 1 – Sep 30, 2023", artist: "All Artists", generatedOn: "Oct 15, 2023", format: "CSV", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", icon: "📊" },
  { id: 2, name: "Monthly Streams – Luna Ray", dateRange: "Sep 1 – Sep 30, 2023", artist: "Luna Ray", generatedOn: "Oct 02, 2023", format: "PDF", iconBg: "bg-blue-100", iconColor: "text-blue-600", icon: "📈" },
  { id: 3, name: "Performance Summary", dateRange: "Jan 1 – Jun 30, 2023", artist: "The Echoes", generatedOn: "Jul 05, 2023", format: "CSV", iconBg: "bg-amber-100", iconColor: "text-amber-600", icon: "📉" },
  { id: 4, name: "Annual Tax Export", dateRange: "Jan 1 – Dec 31, 2022", artist: "All Artists", generatedOn: "Jan 15, 2023", format: "PDF", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", icon: "💳" },
];

export default function Reports() {
  const [startDate, setStartDate] = useState("2023-10-01");
  const [endDate, setEndDate] = useState("2023-10-31");
  const [artist, setArtist] = useState("All Artists");
  const [format, setFormat] = useState("CSV");

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto bg-gray-50 min-h-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Reports & Exports</h1>
        <p className="text-gray-500 text-sm mt-1">
          Generate detailed performance and royalty reports across your catalog.
        </p>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
            📋
          </div>
          <h2 className="text-base font-bold text-gray-900">Report Generator</h2>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Start Date */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* End Date */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Artist */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Artist</label>
            <div className="relative">
              <select
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Artists</option>
                <option>Luna Ray</option>
                <option>The Echoes</option>
                <option>Velvet Box</option>
                <option>Nova Drift</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
            </div>
          </div>
          {/* Format */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-2 block">Format</label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              {["PDF", "CSV"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-3 text-sm font-bold transition ${
                    format === f
                      ? "bg-teal-500 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-teal-200 transition">
            <MdBolt /> Generate Report
          </button>
        </div>
      </div>

      {/* Report History */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Generated Reports History</h2>
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            <MdFilterList /> Filter
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="text-left pb-3 font-semibold">Report Name</th>
              <th className="text-left pb-3 font-semibold">Date Range</th>
              <th className="text-left pb-3 font-semibold">Artist</th>
              <th className="text-left pb-3 font-semibold">Generated On</th>
              <th className="text-left pb-3 font-semibold">Format</th>
              <th className="text-right pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportHistory.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${r.iconBg}`}>
                      {r.icon}
                    </div>
                    <p className="text-sm font-bold text-gray-800">{r.name}</p>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-500">{r.dateRange}</td>
                <td className="py-4 text-sm text-gray-700">{r.artist}</td>
                <td className="py-4 text-sm text-gray-500">{r.generatedOn}</td>
                <td className="py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    r.format === "CSV"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {r.format}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
                    <MdDownload className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing <span className="font-bold text-gray-700">1</span> to{" "}
            <span className="font-bold text-gray-700">4</span> of{" "}
            <span className="font-bold text-gray-700">24</span> results
          </p>
          <div className="flex gap-2">
            <button className="border border-gray-200 text-sm font-medium text-gray-500 px-4 py-1.5 rounded-xl cursor-not-allowed opacity-50">Previous</button>
            <button className="border border-gray-200 text-sm font-medium text-gray-700 px-4 py-1.5 rounded-xl hover:bg-gray-50 transition">Next</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-gray-400">© 2024 MusicDist Inc. All rights reserved.</p>
        <div className="flex gap-4">
          {["Support", "Privacy", "Terms"].map((l) => (
            <button key={l} className="text-xs text-gray-400 hover:text-gray-700 transition">{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
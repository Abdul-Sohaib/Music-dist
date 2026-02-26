import { useState } from "react";
import {
  MdUpload, MdSearch, MdTune, MdSort, MdChevronLeft,
  MdChevronRight, MdClose, MdShare, MdMoreVert,
  MdBarChart,
} from "react-icons/md";

// ── Mock Data ─────────────────────────────────────────────────
const releases = [
  {
    id: 1,
    title: "Midnight Dreams",
    upc: "8493810293",
    type: "Album",
    date: "Oct 24, 2023",
    platforms: ["S", "A", "M", "+4"],
    streams: "1.2M",
    status: "Live",
    statusColor: "emerald",
    cover: "from-teal-400 to-cyan-600",
    tracks: [
      { name: "Dreamscape Intro", streams: "1,204,500", duration: "2:45" },
      { name: "Midnight Runner", streams: "840,200", duration: "3:12" },
      { name: "Neon Lights (feat. Luna)", streams: "2,100,500", duration: "3:45" },
      { name: "City Rain", streams: "430,100", duration: "4:02" },
    ],
    totalStreams: "1.2M",
    royalties: "$4,230.50",
    totalDuration: "42:15",
    distribution: [
      { platform: "Spotify", status: "Delivered", color: "emerald" },
      { platform: "Apple Music", status: "Delivered", color: "emerald" },
      { platform: "Amazon Music", status: "Delivered", color: "emerald" },
      { platform: "TikTok", status: "Processing", color: "amber" },
    ],
  },
  {
    id: 2,
    title: "Neon Nights",
    upc: "8493810245",
    type: "Single",
    date: "Sep 15, 2023",
    platforms: ["S", "A"],
    streams: "850k",
    status: "Live",
    statusColor: "emerald",
    cover: "from-purple-500 to-pink-600",
    tracks: [{ name: "Neon Nights", streams: "850,000", duration: "3:28" }],
    totalStreams: "850k",
    royalties: "$2,100.00",
    totalDuration: "3:28",
    distribution: [
      { platform: "Spotify", status: "Delivered", color: "emerald" },
      { platform: "Apple Music", status: "Delivered", color: "emerald" },
    ],
  },
  {
    id: 3,
    title: "Unplugged Sessions",
    upc: "8493810112",
    type: "EP",
    date: "Aug 01, 2023",
    platforms: [],
    streams: "—",
    status: "Pending",
    statusColor: "amber",
    cover: "from-amber-400 to-orange-500",
    tracks: [{ name: "Acoustic Intro", streams: "—", duration: "2:10" }],
    totalStreams: "—",
    royalties: "—",
    totalDuration: "18:42",
    distribution: [{ platform: "Spotify", status: "Pending", color: "amber" }],
  },
  {
    id: 4,
    title: "Firestorm",
    upc: "8493810777",
    type: "Single",
    date: "Jul 10, 2023",
    platforms: [],
    streams: "120k",
    status: "Rejected",
    statusColor: "red",
    cover: "from-red-500 to-orange-600",
    tracks: [{ name: "Firestorm", streams: "120,000", duration: "3:55" }],
    totalStreams: "120k",
    royalties: "$340.00",
    totalDuration: "3:55",
    distribution: [{ platform: "Spotify", status: "Rejected", color: "red" }],
  },
  {
    id: 5,
    title: "Skyline",
    upc: "8493810999",
    type: "Single",
    date: "Jun 05, 2023",
    platforms: ["S", "A", "M"],
    streams: "2.5M",
    status: "Live",
    statusColor: "emerald",
    cover: "from-blue-400 to-indigo-600",
    tracks: [{ name: "Skyline", streams: "2,500,000", duration: "4:12" }],
    totalStreams: "2.5M",
    royalties: "$7,800.00",
    totalDuration: "4:12",
    distribution: [
      { platform: "Spotify", status: "Delivered", color: "emerald" },
      { platform: "Apple Music", status: "Delivered", color: "emerald" },
      { platform: "Amazon Music", status: "Delivered", color: "emerald" },
    ],
  },
];

const platformColors = { S: "#1DB954", A: "#fc3c44", M: "#FF9900" };

const statusBadge = {
  Live: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-red-100 text-red-600",
};

export default function MyReleases() {
  const [selected, setSelected] = useState(releases[0]);
  const [search, setSearch] = useState("");

  const filtered = releases.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.upc.includes(search)
  );

  return (
    <div className="flex h-full">
      {/* ── Left: Table ── */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Releases</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your catalog across all streaming platforms.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-blue-200 transition">
            <MdUpload className="text-lg" /> Upload New Release
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, artist, or ISRC..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            <MdTune /> All Types
          </button>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            <MdSort /> Sort
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-widest">
                <th className="text-left px-5 py-3 font-semibold">Cover</th>
                <th className="text-left px-5 py-3 font-semibold">Release Title</th>
                <th className="text-left px-5 py-3 font-semibold">Type</th>
                <th className="text-left px-5 py-3 font-semibold">Release Date</th>
                <th className="text-left px-5 py-3 font-semibold">Platforms</th>
                <th className="text-left px-5 py-3 font-semibold">Streams</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`border-b border-gray-50 cursor-pointer transition hover:bg-blue-50/40 ${
                    selected?.id === r.id ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.cover} flex-shrink-0`} />
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-bold text-gray-800">{r.title}</p>
                    <p className="text-xs text-gray-400">UPC: {r.upc}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                      {r.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{r.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      {r.platforms.map((p, i) =>
                        p.startsWith("+") ? (
                          <span key={i} className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">
                            {p}
                          </span>
                        ) : (
                          <span
                            key={i}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: platformColors[p] || "#94a3b8" }}
                          >
                            {p}
                          </span>
                        )
                      )}
                      {r.platforms.length === 0 && (
                        <span className="text-xs text-gray-300">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-800">{r.streams}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusBadge[r.status]}`}>
                      • {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">Showing 1-5 of 24 releases</p>
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition">
                <MdChevronLeft />
              </button>
              <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition">
                <MdChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Detail Panel ── */}
      {selected && (
        <div className="w-80 bg-white border-l border-gray-100 flex flex-col overflow-y-auto flex-shrink-0">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900">Release Details</h2>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition">
              <MdClose className="text-xl" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-5">
            {/* Cover Art */}
            <div className={`w-full h-44 rounded-2xl bg-gradient-to-br ${selected.cover}`} />

            {/* Title */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">{selected.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {selected.type} • {selected.tracks.length} Tracks • {selected.date.split(", ")[1]}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-blue-700 transition">
                <MdBarChart className="text-base" /> View Analytics
              </button>
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                <MdShare />
              </button>
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                <MdMoreVert />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Total Streams</p>
                <p className="text-lg font-bold text-gray-900">{selected.totalStreams}</p>
                <p className="text-xs text-emerald-500 font-semibold">↑ 12%</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Royalties</p>
                <p className="text-lg font-bold text-gray-900">{selected.royalties}</p>
              </div>
            </div>

            {/* Tracklist */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-gray-800">Tracklist</h4>
                <span className="text-xs text-gray-400">Total: {selected.totalDuration}</span>
              </div>
              <div className="flex flex-col gap-2">
                {selected.tracks.map((t, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.streams} streams</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{t.duration}</span>
                  </div>
                ))}
              </div>
              {selected.tracks.length > 4 && (
                <button className="text-xs text-blue-600 font-semibold mt-3 hover:underline w-full text-center">
                  View all {selected.tracks.length} tracks
                </button>
              )}
            </div>

            {/* Distribution Status */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Distribution Status
              </h4>
              <div className="flex flex-col gap-2">
                {selected.distribution.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${d.color}-500`} />
                      <span className="text-sm text-gray-700">{d.platform}</span>
                    </div>
                    <span className={`text-xs font-semibold text-${d.color}-600`}>
                      {d.status}
                    </span>
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
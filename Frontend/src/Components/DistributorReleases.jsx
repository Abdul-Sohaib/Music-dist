import { useState } from "react";
import {
  MdSearch, MdClose, MdCheckCircle, MdWarning,
  MdPlayArrow, MdCheck, MdCancel,
} from "react-icons/md";

// ── Mock Data ─────────────────────────────────────────────────
const releases = [
  {
    id: 1,
    title: "Neon Nights",
    upc: "192837465",
    artist: "The Synthwave Boys",
    submitted: "Oct 24, 2023",
    status: "Pending Review",
    genres: ["Electronic", "Pop"],
    cover: "from-indigo-500 to-purple-700",
    metadata: [
      { label: "Audio Format", detail: "44.1kHz / 16-bit WAV (Lossless)", ok: true },
      { label: "Artwork Specs", detail: "3000×3000px RGB JPG", ok: true },
      { label: "ISRC Code", detail: "Duplicate ISRC detected in system for track 2.", ok: false, warn: true },
    ],
    tracks: [
      { num: "01", name: "Midnight Drive", duration: "03:42", flagged: false },
      { num: "02", name: "Neon Tears", duration: "04:15", flagged: true, flag: "Flagged for explicit language", explicit: true },
      { num: "03", name: "Retro Sunset", duration: "02:58", flagged: false },
    ],
  },
  {
    id: 2,
    title: "Acoustic Sessions",
    upc: "847362519",
    artist: "Sarah Jenkins",
    submitted: "Oct 23, 2023",
    status: "Pending Review",
    genres: ["Folk", "Acoustic"],
    cover: "from-green-400 to-teal-600",
    metadata: [
      { label: "Audio Format", detail: "44.1kHz / 24-bit WAV", ok: true },
      { label: "Artwork Specs", detail: "3000×3000px RGB JPG", ok: true },
      { label: "ISRC Code", detail: "All ISRC codes valid.", ok: true },
    ],
    tracks: [
      { num: "01", name: "Morning Light", duration: "03:10", flagged: false },
      { num: "02", name: "River Song", duration: "04:02", flagged: false },
    ],
  },
  {
    id: 3,
    title: "Urban Flow",
    upc: "736452918",
    artist: "DJ Mike",
    submitted: "Oct 23, 2023",
    status: "Approved",
    genres: ["Hip-Hop", "R&B"],
    cover: "from-amber-400 to-orange-500",
    metadata: [
      { label: "Audio Format", detail: "44.1kHz / 16-bit WAV", ok: true },
      { label: "Artwork Specs", detail: "3000×3000px RGB JPG", ok: true },
      { label: "ISRC Code", detail: "All codes valid.", ok: true },
    ],
    tracks: [
      { num: "01", name: "City Lights", duration: "03:45", flagged: false },
    ],
  },
  {
    id: 4,
    title: "Classical Moods",
    upc: "283746192",
    artist: "Orchestra X",
    submitted: "Oct 22, 2023",
    status: "Rejected",
    genres: ["Classical"],
    cover: "from-slate-400 to-blue-600",
    metadata: [
      { label: "Audio Format", detail: "MP3 — Not accepted format", ok: false, warn: false },
      { label: "Artwork Specs", detail: "Resolution too low", ok: false, warn: false },
      { label: "ISRC Code", detail: "Missing ISRC codes", ok: false, warn: false },
    ],
    tracks: [
      { num: "01", name: "Sonata No. 1", duration: "08:22", flagged: false },
    ],
  },
];

const statusFilters = ["All Status", "Pending", "Approved", "Rejected"];

const statusStyle = {
  "Pending Review": "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-600",
};

export default function DistributorReleases() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [selected, setSelected] = useState(releases[0]);
  const [note, setNote] = useState("");

  const pendingCount = releases.filter((r) => r.status === "Pending Review").length;

  const filtered = releases.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.artist.toLowerCase().includes(search.toLowerCase()) ||
      r.upc.includes(search);
    const matchStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Pending" && r.status === "Pending Review") ||
      r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Left: Table ── */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Release Moderation</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve pending music releases.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="relative max-w-xs flex-1">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by UPC, Title, or Artist"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50">
              All Status ▾
            </button>
            {statusFilters.slice(1).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  statusFilter === f
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f}
                {f === "Pending" && (
                  <span className="bg-white text-indigo-600 text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-semibold">Cover Art</th>
                <th className="text-left px-5 py-3 font-semibold">Release Title</th>
                <th className="text-left px-5 py-3 font-semibold">Artist</th>
                <th className="text-left px-5 py-3 font-semibold">Submitted Date</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`border-b border-gray-50 cursor-pointer transition ${
                    selected?.id === r.id
                      ? "bg-indigo-50 border-l-4 border-l-indigo-600"
                      : "hover:bg-gray-50/60"
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.cover} flex-shrink-0`} />
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-gray-800">{r.title}</p>
                    <p className="text-xs text-gray-400">UPC: {r.upc}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">{r.artist}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{r.submitted}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[r.status]}`}>
                      • {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Showing 1-{filtered.length} of 24 releases</span>
            <div className="flex gap-2">
              <button className="border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition font-medium">Prev</button>
              <button className="border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition font-medium">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Detail Panel ── */}
      {selected && (
        <div className="w-96 bg-white border-l border-gray-100 flex flex-col overflow-y-auto flex-shrink-0">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyle[selected.status]}`}>
                {selected.status === "Pending Review" ? "🟡" : selected.status === "Approved" ? "🟢" : "🔴"} {selected.status}
              </span>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition">
                <MdClose />
              </button>
            </div>

            {/* Release info */}
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selected.cover} flex-shrink-0`} />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selected.title}</h2>
                <p className="text-sm text-gray-500">{selected.artist}</p>
                <div className="flex gap-1.5 mt-1.5">
                  {selected.genres.map((g) => (
                    <span key={g} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metadata Validation */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Metadata Validation</p>
            <div className="flex flex-col gap-2 mb-5">
              {selected.metadata.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    m.ok ? "bg-emerald-50" : m.warn ? "bg-amber-50" : "bg-red-50"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {m.ok ? (
                      <MdCheckCircle className="text-emerald-500 text-lg" />
                    ) : m.warn ? (
                      <MdWarning className="text-amber-500 text-lg" />
                    ) : (
                      <MdCancel className="text-red-500 text-lg" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{m.label}</p>
                    <p className="text-xs text-gray-500">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tracklist */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tracklist</p>
            <div className="flex flex-col gap-2 mb-5">
              {selected.tracks.map((t, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl ${t.flagged ? "bg-red-50 border border-red-100" : "bg-gray-50"}`}
                >
                  <span className="text-xs text-gray-400 w-5 font-mono">{t.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-gray-800">{t.name}</p>
                      {t.explicit && (
                        <span className="text-xs bg-gray-800 text-white px-1 rounded font-bold">E</span>
                      )}
                    </div>
                    {t.flagged && (
                      <p className="text-xs text-red-500 font-semibold">• {t.flag}</p>
                    )}
                    {!t.flagged && <p className="text-xs text-gray-400">{t.duration}</p>}
                  </div>
                  <span className="text-xs text-gray-400">{t.duration}</span>
                  <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 hover:bg-indigo-100 transition">
                    <MdPlayArrow className="text-gray-600 text-sm" />
                  </button>
                </div>
              ))}
            </div>

            {/* Review Notes */}
            <p className="text-sm font-bold text-gray-800 mb-2">Review Notes (Optional)</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add comments for the label..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-4"
            />

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-red-200 text-red-500 font-bold text-sm py-3 rounded-xl hover:bg-red-50 transition">
                <MdCancel /> Reject
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold text-sm py-3 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
                <MdCheck /> Approve Release
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
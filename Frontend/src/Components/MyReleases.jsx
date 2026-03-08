import { useState, useRef } from "react";
import {
  MdUpload, MdSearch, MdTune, MdSort, MdChevronLeft,
  MdChevronRight, MdClose, MdShare, MdMoreVert,
  MdBarChart, MdMusicNote, MdImage, MdDescription,
  MdLink, MdCheckCircle, MdError, MdCloudUpload,
  MdAudiotrack, MdArticle, MdArrowBack,
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
    platformEarnings: [
      { platform: "Spotify", icon: "S", color: "#1DB954", bg: "bg-green-50", earnings: "$1,840.20", streams: "680,400", pct: 43 },
      { platform: "Apple Music", icon: "A", color: "#fc3c44", bg: "bg-red-50", earnings: "$1,420.10", streams: "380,200", pct: 34 },
      { platform: "Amazon Music", icon: "M", color: "#FF9900", bg: "bg-amber-50", earnings: "$720.50", streams: "120,900", pct: 17 },
      { platform: "TikTok", icon: "T", color: "#010101", bg: "bg-gray-50", earnings: "$249.70", streams: "18,000", pct: 6 },
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
    platformEarnings: [
      { platform: "Spotify", icon: "S", color: "#1DB954", bg: "bg-green-50", earnings: "$1,260.00", streams: "510,000", pct: 60 },
      { platform: "Apple Music", icon: "A", color: "#fc3c44", bg: "bg-red-50", earnings: "$840.00", streams: "340,000", pct: 40 },
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
    platformEarnings: [],
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
    platformEarnings: [
      { platform: "Spotify", icon: "S", color: "#1DB954", bg: "bg-green-50", earnings: "$340.00", streams: "120,000", pct: 100 },
    ],
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
    platformEarnings: [
      { platform: "Spotify", icon: "S", color: "#1DB954", bg: "bg-green-50", earnings: "$3,900.00", streams: "1,250,000", pct: 50 },
      { platform: "Apple Music", icon: "A", color: "#fc3c44", bg: "bg-red-50", earnings: "$2,340.00", streams: "750,000", pct: 30 },
      { platform: "Amazon Music", icon: "M", color: "#FF9900", bg: "bg-amber-50", earnings: "$1,560.00", streams: "500,000", pct: 20 },
    ],
  },
];

const connectedPlatforms = [
  { id: "spotify", name: "Spotify", icon: "S", color: "#1DB954", connected: true },
  { id: "apple", name: "Apple Music", icon: "A", color: "#fc3c44", connected: true },
  { id: "amazon", name: "Amazon Music", icon: "M", color: "#FF9900", connected: false },
  { id: "tiktok", name: "TikTok", icon: "T", color: "#010101", connected: false },
  { id: "youtube", name: "YouTube Music", icon: "Y", color: "#FF0000", connected: false },
  { id: "deezer", name: "Deezer", icon: "D", color: "#A238FF", connected: false },
];

const platformColors = { S: "#1DB954", A: "#fc3c44", M: "#FF9900" };

const statusBadge = {
  Live: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-red-100 text-red-600",
};

// ── Upload Release Modal ───────────────────────────────────────
function UploadReleaseModal({ onClose }) {
  const [form, setForm] = useState({
    songName: "", title: "", description: "", thumbnail: null, songFile: null, lyricsFile: null,
  });
  const [platforms, setPlatforms] = useState(
    connectedPlatforms.filter(p => p.connected).map(p => p.id)
  );
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const thumbRef = useRef();
  const songRef = useRef();
  const lyricsRef = useRef();

  const handleField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleThumb = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleField("thumbnail", file);
    const reader = new FileReader();
    reader.onload = (ev) => setThumbnailPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const togglePlatform = (id) => {
    setPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!form.songName || !form.title) return;
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto mx-4 flex flex-col">
        {step === 2 ? (
          // ── Success State ──
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
              <MdCheckCircle className="text-4xl text-emerald-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Release Submitted!</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs">
              <span className="font-semibold text-gray-700">"{form.title}"</span> has been submitted for distribution. You'll be notified once it goes live.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition"
            >
              Back to Releases
            </button>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                  <MdUpload className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900">Upload New Release</h2>
                  <p className="text-xs text-gray-400">Fill in the details to distribute your music</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                <MdClose className="text-xl" />
              </button>
            </div>

            <div className="px-7 py-6 flex flex-col gap-7">
              {/* Thumbnail Upload */}
              <div className="flex items-start gap-5">
                <button
                  onClick={() => thumbRef.current.click()}
                  className="flex-shrink-0 w-28 h-28 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 flex flex-col items-center justify-center gap-1.5 transition group overflow-hidden"
                >
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="cover" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <MdImage className="text-2xl text-gray-300 group-hover:text-blue-400 transition" />
                      <span className="text-xs text-gray-400 group-hover:text-blue-500 transition font-medium">Cover Art</span>
                    </>
                  )}
                </button>
                <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={handleThumb} />
                <div className="flex-1 flex flex-col gap-3">
                  {/* Song Name */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Song Name *</label>
                    <input
                      value={form.songName}
                      onChange={e => handleField("songName", e.target.value)}
                      placeholder="e.g. Midnight Dreams"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                    />
                  </div>
                  {/* Release Title */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Release Title *</label>
                    <input
                      value={form.title}
                      onChange={e => handleField("title", e.target.value)}
                      placeholder="e.g. Midnight Dreams - Single"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => handleField("description", e.target.value)}
                  placeholder="Tell your audience about this release..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition resize-none"
                />
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-2 gap-4">
                {/* Song File */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Song File</label>
                  <button
                    onClick={() => songRef.current.click()}
                    className={`w-full rounded-xl border-2 border-dashed px-4 py-4 flex items-center gap-3 transition group ${
                      form.songFile
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${form.songFile ? "bg-emerald-100" : "bg-white border border-gray-200"}`}>
                      {form.songFile
                        ? <MdCheckCircle className="text-emerald-500 text-lg" />
                        : <MdAudiotrack className="text-gray-400 text-lg group-hover:text-blue-500" />
                      }
                    </div>
                    <div className="text-left min-w-0">
                      <p className={`text-xs font-bold truncate ${form.songFile ? "text-emerald-700" : "text-gray-500 group-hover:text-blue-600"}`}>
                        {form.songFile ? form.songFile.name : "Upload Audio"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">MP3, WAV, FLAC</p>
                    </div>
                  </button>
                  <input ref={songRef} type="file" accept="audio/*" className="hidden" onChange={e => handleField("songFile", e.target.files[0])} />
                </div>

                {/* Lyrics File */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Lyrics File</label>
                  <button
                    onClick={() => lyricsRef.current.click()}
                    className={`w-full rounded-xl border-2 border-dashed px-4 py-4 flex items-center gap-3 transition group ${
                      form.lyricsFile
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${form.lyricsFile ? "bg-emerald-100" : "bg-white border border-gray-200"}`}>
                      {form.lyricsFile
                        ? <MdCheckCircle className="text-emerald-500 text-lg" />
                        : <MdArticle className="text-gray-400 text-lg group-hover:text-blue-500" />
                      }
                    </div>
                    <div className="text-left min-w-0">
                      <p className={`text-xs font-bold truncate ${form.lyricsFile ? "text-emerald-700" : "text-gray-500 group-hover:text-blue-600"}`}>
                        {form.lyricsFile ? form.lyricsFile.name : "Upload Lyrics"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">TXT, PDF, LRC</p>
                    </div>
                  </button>
                  <input ref={lyricsRef} type="file" accept=".txt,.pdf,.lrc" className="hidden" onChange={e => handleField("lyricsFile", e.target.files[0])} />
                </div>
              </div>

              {/* Distribution Platforms */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Distribution Platforms</h4>
                  <span className="text-xs text-gray-400">{platforms.length} selected</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {connectedPlatforms.map(p => {
                    const isSelected = platforms.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 transition cursor-pointer ${
                          p.connected
                            ? isSelected
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-100 bg-white hover:border-gray-200"
                            : "border-gray-100 bg-gray-50 opacity-75"
                        }`}
                        onClick={() => p.connected && togglePlatform(p.id)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
                            style={{ background: p.color }}
                          >
                            {p.icon}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-gray-800">{p.name}</p>
                            {p.connected ? (
                              <p className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5">
                                <MdCheckCircle className="text-xs" /> Connected
                              </p>
                            ) : (
                              <p className="text-xs text-gray-400 font-medium">Not connected</p>
                            )}
                          </div>
                        </div>
                        {p.connected ? (
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); alert(`Connect ${p.name} in Settings`); }}
                            className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-0.5 flex-shrink-0"
                          >
                            <MdLink className="text-sm" /> Connect
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-7 py-5 border-t border-gray-100 flex items-center justify-between sticky bottom-0 bg-white rounded-b-3xl">
              <button onClick={onClose} className="text-sm text-gray-500 font-semibold hover:text-gray-700 transition">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.songName || !form.title}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-100 transition"
              >
                <MdCloudUpload className="text-base" />
                Submit for Distribution
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function MyReleases() {
  const [selected, setSelected] = useState(releases[0]);
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const filtered = releases.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.upc.includes(search)
  );

  return (
    <>
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
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md shadow-blue-200 transition"
            >
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

              {/* ── Platform Earnings ── */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Earnings by Platform
                </h4>
                {selected.platformEarnings && selected.platformEarnings.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {selected.platformEarnings.map((pe, i) => (
                      <div key={i} className={`${pe.bg} rounded-xl p-3`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
                              style={{ background: pe.color }}
                            >
                              {pe.icon}
                            </span>
                            <span className="text-xs font-bold text-gray-700">{pe.platform}</span>
                          </div>
                          <span className="text-sm font-extrabold text-gray-900">{pe.earnings}</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pe.pct}%`, background: pe.color }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-gray-400">{pe.streams} streams</span>
                          <span className="text-xs font-semibold" style={{ color: pe.color }}>{pe.pct}%</span>
                        </div>
                      </div>
                    ))}
                    {/* Total */}
                    <div className="flex items-center justify-between px-1 pt-1 border-t border-gray-100">
                      <span className="text-xs font-bold text-gray-500">Total Earnings</span>
                      <span className="text-sm font-extrabold text-gray-900">{selected.royalties}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-1.5">
                    <MdBarChart className="text-2xl text-gray-300" />
                    <p className="text-xs text-gray-400 font-medium">
                      {selected.status === "Pending" ? "Earnings will appear once the release goes live." : "No earnings data available."}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && <UploadReleaseModal onClose={() => setShowUpload(false)} />}
    </>
  );
}
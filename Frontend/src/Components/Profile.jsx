import { useState } from "react";
import { MdCameraAlt, MdLocationOn, MdEmail, MdPhone, MdAdd } from "react-icons/md";

const genres = ["Electronic", "Ambient", "Downtempo"];

export default function Profile() {
  const [form, setForm] = useState({
    name: "Alex Rivera",
    location: "San Francisco, CA",
    bio: "Creating soundscapes that bridge the gap between organic and synthetic textures. Pushing the limits of modern music production.",
    email: "contact@alexrivera.music",
    phone: "+1 (555) 123-4567",
  });
  const [activeGenre, setActiveGenre] = useState("Electronic");

  const bioLen = form.bio.length;

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto bg-gray-50 min-h-full">
      {/* Avatar + genres */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-300 to-blue-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            AR
          </div>
          <button className="absolute bottom-1 right-1 w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center shadow-md hover:bg-teal-600 transition">
            <MdCameraAlt className="text-white text-sm" />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{form.name}</h2>
          <p className="text-gray-400 text-sm">Electronic | Ambient | Downtempo</p>
        </div>
        <div className="flex items-center gap-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition ${
                activeGenre === g
                  ? "bg-teal-500 text-white shadow-md shadow-teal-200"
                  : "border border-gray-200 text-gray-600 hover:border-teal-400"
              }`}
            >
              {g}
            </button>
          ))}
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-teal-400 hover:text-teal-500 transition">
            <MdAdd />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left: Artist Details Form */}
        <div className="col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1">Artist Details</h2>
            <p className="text-xs text-gray-400 mb-5">Update your personal information and biography.</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Artist Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Location</label>
                <div className="relative">
                  <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 mb-2 block">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                maxLength={500}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
              />
              <p className="text-xs text-gray-400 text-right mt-1">{bioLen}/500 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Email Address</label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Phone Number</label>
                <div className="relative">
                  <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition shadow-md shadow-teal-100">
                Save Changes
              </button>
              <button className="border border-gray-200 text-gray-600 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Right: Branding + Connected Accounts */}
        <div className="flex flex-col gap-4">
          {/* Branding Assets */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              🎨 Branding Assets
            </h3>
            <p className="text-xs text-gray-400 mb-2">Profile Banner</p>
            <div className="w-full h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gradient-to-br from-teal-50 to-blue-50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-teal-400 transition mb-4">
              <span className="text-lg">☁️</span>
              <p className="text-xs text-gray-400">Click to upload banner</p>
              <p className="text-xs text-gray-300">1500x500px recommended</p>
            </div>

            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400">Profile Card Preview</p>
              <button className="text-xs text-teal-500 font-semibold hover:underline">View Public Page</button>
            </div>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <div className="h-16 bg-gradient-to-br from-teal-300 to-blue-400" />
              <div className="p-3 relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-300 to-blue-400 absolute -top-5 left-3 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  AR
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{form.name}</p>
                      <p className="text-xs text-gray-400">{form.location}</p>
                    </div>
                    <button className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">Follow</button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{form.bio}</p>
                  <div className="flex gap-1 mt-2">
                    {genres.slice(0, 2).map((g) => (
                      <span key={g} className="text-xs border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Connected Accounts</h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "Spotify", icon: "🎵", color: "#1DB954", connected: true },
                { name: "YouTube", icon: "▶", color: "#FF0000", connected: true },
              ].map((a) => (
                <div key={a.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: a.color }}>
                    {a.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-1">{a.name}</span>
                  <span className="text-xs text-gray-400">Connected</span>
                </div>
              ))}
              <button className="flex items-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-teal-400 hover:text-teal-500 transition w-full justify-center">
                <MdAdd /> Add Platform
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
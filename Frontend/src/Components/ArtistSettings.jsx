import { useState } from "react";
import { MdVisibility, MdDelete } from "react-icons/md";

const settingsTabs = ["Account", "Distribution", "Payouts", "Notifications"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Account");
  const [twoFA, setTwoFA] = useState(false);
  const [explicitDefault, setExplicitDefault] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [mobileAlerts, setMobileAlerts] = useState(true);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="p-8 flex flex-col gap-6 overflow-y-auto bg-gray-50 min-h-full">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your profile, distribution preferences, and security settings.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-3">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-300 to-blue-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              AR
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Alex Rivera</p>
              <p className="text-xs text-gray-400">Indie Artist</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm flex flex-col gap-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition w-full ${
                  activeTab === tab
                    ? "bg-teal-50 text-teal-700 font-bold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab === "Account" && "👤"} {tab === "Distribution" && "📦"}
                {tab === "Payouts" && "💳"} {tab === "Notifications" && "🔔"}
                {tab}
              </button>
            ))}
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-900 rounded-2xl p-4 text-white">
            <p className="text-sm font-bold mb-1">Pro Artist Plan</p>
            <p className="text-xs text-gray-400 mb-3">
              Your next billing date is{" "}
              <span className="text-teal-400 font-bold">Nov 24, 2024</span>
            </p>
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold py-2 rounded-xl transition">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Account Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-gray-900">Account Details</h2>
              <button className="text-sm text-teal-500 font-bold hover:underline">Edit details</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 mb-2 block">Email Address</label>
                <div className="relative">
                  <input
                    defaultValue="alex.rivera@artisthub.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 text-lg">✓</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 mb-2 block">Username</label>
                <input
                  defaultValue="@alexrivera_official"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  defaultValue="•••••••••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <MdVisibility />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Last changed 3 months ago</p>
            </div>
            {/* 2FA */}
            <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-800">Two-Factor Authentication</p>
                <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setTwoFA(!twoFA)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${twoFA ? "bg-teal-500" : "bg-gray-200"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${twoFA ? "left-7" : "left-1"}`} />
              </button>
            </div>
          </div>

          {/* Distribution Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-5">Distribution Preferences</h2>
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">Default Metadata Language</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-400">
                  <option>English (United States)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-800">Mark releases as Explicit by default</p>
                <p className="text-xs text-gray-400">Automatically tag new uploads with explicit content advisory</p>
              </div>
              <button
                onClick={() => setExplicitDefault(!explicitDefault)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${explicitDefault ? "bg-teal-500" : "bg-gray-200"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${explicitDefault ? "left-7" : "left-1"}`} />
              </button>
            </div>
            <div className="py-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-gray-800">Default Royalty Split</p>
                  <p className="text-xs text-gray-400">Apply this split template to all new singles</p>
                </div>
                <button className="text-xs text-teal-500 font-bold hover:underline">Manage Templates</button>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">AR</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Alex Rivera (You)</p>
                  <p className="text-xs text-gray-400">Owner</p>
                </div>
                <span className="ml-auto text-sm font-bold text-gray-900">100%</span>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-5">Notification Preferences</h2>
            {[
              { label: "Email Notifications", sub: "Receive weekly digests and major updates", state: emailNotif, set: setEmailNotif },
              { label: "Mobile Alerts", sub: "Get push notifications for new streams milestones", state: mobileAlerts, set: setMobileAlerts },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-bold text-gray-800">{n.label}</p>
                  <p className="text-xs text-gray-400">{n.sub}</p>
                </div>
                <button
                  onClick={() => n.set(!n.state)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${n.state ? "bg-teal-500" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${n.state ? "left-7" : "left-1"}`} />
                  {n.state && <span className="absolute right-1.5 top-1.5 w-3 h-3 rounded-full bg-white/40" />}
                </button>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
            <h2 className="text-base font-bold text-red-500 mb-5">Danger Zone</h2>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800">Delete Account</p>
                <p className="text-xs text-gray-400 mt-0.5 max-w-sm">
                  Once you delete your account, there is no going back. Please be certain. All your music will be taken down from stores.
                </p>
              </div>
              <button className="flex items-center gap-2 border border-red-200 text-red-500 font-bold text-sm px-4 py-2 rounded-xl hover:bg-red-50 transition flex-shrink-0">
                <MdDelete /> Delete Account
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center py-2">
            © 2024 MusicDist Inc. All rights reserved. •{" "}
            <button className="hover:underline">Privacy Policy</button> •{" "}
            <button className="hover:underline">Terms of Service</button> •{" "}
            <button className="hover:underline">Support</button>
          </p>
        </div>
      </div>
    </div>
  );
}
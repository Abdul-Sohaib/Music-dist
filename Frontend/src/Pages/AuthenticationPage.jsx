import { useState } from "react";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Logo from "../assets/MusicLogo.svg";
import Lines from "../assets/authlines.svg";
import Peoples from "../assets/peoplescontainer.svg";

export default function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex w-screen h-screen">
      {/* LEFT SECTION */}
      <div className="flex-1 relative flex flex-col bg-gradient-to-tr from-blue-100 to-white overflow-hidden">

        {/* Logo */}
        <div className="flex items-center gap-2 p-10 z-10">
          <img src={Logo} alt="Logo" className="w-6 h-6" />
          <h1 className="text-xl text-black font-bold font-text">Music Dist</h1>
        </div>

        {/* Background Lines */}
        <img
          src={Lines}
          alt="Lines"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full w-3/4 mx-auto">
          <h1 className="text-5xl text-black font-extrabold font-text">
            Distribute, Track, and Grow Your Music.
          </h1>
          <p className="text-lg text-gray-700 font-text mt-4">
            The professional platform trusted by labels and independent artists
            to reach global audiences and monetize creativity.
          </p>
        </div>

        <div className="flex items-center mt-auto z-10 ml-10 gap-2 pb-10">
          <img src={Peoples} alt="Peoples Container" className="w-20 h-20 object-contain" />
          <span className="text-blue-600 font-text text-sm font-semibold">Trusted by 10,000+ artists</span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-10">
        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10">
          {isLogin ? <Login /> : <Signup />}
        </div>

        {/* Toggle */}
        <p className="mt-6 text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>

        {/* Footer links */}
        <div className="mt-8 flex items-center gap-3 text-xs text-gray-400">
          <button className="hover:text-gray-600 transition">Privacy Policy</button>
          <span>•</span>
          <button className="hover:text-gray-600 transition">Terms of Service</button>
          <span>•</span>
          <button className="hover:text-gray-600 transition">Help Center</button>
        </div>
      </div>
    </div>
  );
}
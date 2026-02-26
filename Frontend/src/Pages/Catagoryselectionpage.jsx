import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import Logo from "../assets/MusicLogo.svg";
import Roleselection from "../Components/Roleselection";

// ─── Steps Config ──────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Role" },
  { id: 2, label: "Details" },
  { id: 3, label: "Payment" },
];

// ─── Stepper Component ──────────────────────────────────────
function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isDone = step.id < currentStep;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : isDone
                    ? "bg-blue-100 text-blue-600 border-2 border-blue-300"
                    : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                  }
                `}
              >
                {step.id}
              </div>
              <span className={`text-xs font-semibold ${
                isActive ? "text-blue-600" : isDone ? "text-blue-400" : "text-gray-400"
              }`}>
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className={`w-32 h-0.5 mx-2 mb-4 rounded-full transition-all duration-300 ${
                isDone ? "bg-blue-300" : "bg-gray-200"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function Catagoryselectionpage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleCancel = () => navigate("/");

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedRole) return;
      // ✅ Route to correct dashboard based on selected role
      if (selectedRole === "artist") {
        navigate("/dashboard/artist");
      } else if (selectedRole === "label") {
        navigate("/dashboard/distributor");
      }
      return;
    }
    // Future steps will go here
    setCurrentStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Roleselection
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
        );
      // case 2: return <Details role={selectedRole} />
      // case 3: return <Payment />
      default:
        return null;
    }
  };

  const isNextDisabled = currentStep === 1 && !selectedRole;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Navbar ── */}
      <nav className="bg-white shadow-xl flex items-center justify-between px-8 py-4 fixed w-full top-0 z-10">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-6 h-6" />
          <h1 className="text-xl text-black font-bold">Music Dist</h1>
        </div>
        <button
          onClick={handleCancel}
          className="text-sm text-gray-500 hover:text-gray-800 font-medium transition"
        >
          Cancel
        </button>
      </nav>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-10 px-4">
        <Stepper currentStep={currentStep} />

        {/* Card */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10">
          {renderStep()}

          {/* Footer Actions */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="text-sm text-gray-400 hover:text-gray-700 font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all
                ${isNextDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                }
              `}
            >
              Next Step
              <MdArrowForward className="text-lg" />
            </button>
          </div>
        </div>

        {/* Legal Footer */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          By creating an account, you agree to our{" "}
          <button className="underline hover:text-gray-700 transition">Terms of Service</button>{" "}
          and{" "}
          <button className="underline hover:text-gray-700 transition">Privacy Policy</button>.
        </p>
      </div>
    </div>
  );
}
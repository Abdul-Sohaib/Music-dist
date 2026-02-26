import { MdMic, MdAlbum } from "react-icons/md";

const roles = [
  {
    id: "artist",
    icon: <MdMic className="text-blue-600 text-2xl" />,
    title: "Artist",
    description:
      "Distribute your own music directly to stores & keep 100% of your royalties.",
  },
  {
    id: "label",
    icon: <MdAlbum className="text-blue-600 text-2xl" />,
    title: "Label / Distributor",
    description:
      "Manage multiple artists, split royalties automatically, and grow your network.",
  },
];

export default function Roleselection({ selectedRole, setSelectedRole }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create your account
        </h2>
        <p className="text-gray-500 text-sm">
          Choose the account type that best fits your distribution needs.
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-2 gap-5 flex-1">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`
                flex flex-col items-start gap-4 p-6 rounded-2xl border-2 text-left
                transition-all duration-200 cursor-pointer
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                    : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/40"
                }
              `}
            >
              {/* Icon Circle */}
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${isSelected ? "bg-blue-100" : "bg-blue-50"}
                `}
              >
                {role.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {role.description}
                </p>
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <div className="ml-auto mt-auto self-end">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        d="M1.5 5l2.5 2.5 4.5-4.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
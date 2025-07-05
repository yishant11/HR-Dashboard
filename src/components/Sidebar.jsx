import { NavLink } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";

function Sidebar({ onCloseSidebar }) {
  const { bookmarks } = useBookmarks();

  const navItems = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    {
      path: "/bookmarks",
      label: "Bookmarks",
      icon: "📌",
      badge: bookmarks.length,
    },
    { path: "/analytics", label: "Analytics", icon: "📊" },
  ];

  const handleNavClick = () => {
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 w-full h-full shadow-lg border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 sm:p-6">
        {/* Close button for mobile */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">
                HR
              </span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                HR Portal
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Performance Hub
              </p>
            </div>
          </div>

          {/* Close button - only visible on mobile */}
          <button
            onClick={onCloseSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="space-y-1 sm:space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`
              }
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="font-medium text-sm sm:text-base">
                  {item.label}
                </span>
              </div>
              {item.badge > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;

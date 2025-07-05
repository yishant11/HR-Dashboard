import { Link } from "react-router-dom";
import { useBookmarks } from "../hooks/useBookmarks";
import StarRating from "./StarRating";
import Badge from "./Badge";

function EmployeeCard({ employee }) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(employee.id);

  const handleBookmark = (e) => {
    e.preventDefault();
    if (bookmarked) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const handlePromote = (e) => {
    e.preventDefault();
    alert(`Promote ${employee.firstName} ${employee.lastName}?`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
          <img
            src={employee.image || "/placeholder.svg"}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm truncate">
              {employee.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-lg transition-colors flex-shrink-0  ${
            bookmarked
              ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-yellow-500"
          }`}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Age:
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
            {employee.age}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Department:
          </span>
          <Badge variant="secondary" size="sm">
            {employee.department}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Performance:
          </span>
          <StarRating rating={employee.rating} size="sm" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Link
          to={`/employee/${employee.id}`}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700  text-center py-2 px-2.5 sm:px-3 md:py-1.5 md:px-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <p className="text-white">View Details</p>
        </Link>
        <button
          onClick={handlePromote}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-2.5 sm:px-3 md:py-1.5 md:px-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          Promote
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;




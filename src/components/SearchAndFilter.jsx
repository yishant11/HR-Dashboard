import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];
const ratings = [1, 2, 3, 4, 5];

function SearchAndFilter() {
  const { searchTerm, filters, setSearchTerm, setFilters } = useSearch();
  const [showFilters, setShowFilters] = useState(false);

  const handleDepartmentChange = (dept) => {
    const newDepts = filters.departments.includes(dept)
      ? filters.departments.filter((d) => d !== dept)
      : [...filters.departments, dept];

    setFilters({ ...filters, departments: newDepts });
  };

  const handleRatingChange = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];

    setFilters({ ...filters, ratings: newRatings });
  };

  const clearFilters = () => {
    setFilters({ departments: [], ratings: [] });
    setSearchTerm("");
  };

  const activeFiltersCount =
    filters.departments.length + filters.ratings.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base"
            />
            <svg
              className="absolute left-2.5 sm:left-3 top-2 sm:top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm sm:text-base ${
              showFilters || activeFiltersCount > 0
                ? "bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            <span className="hidden sm:inline">Filters</span>
            <span className="sm:hidden">Filter</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full min-w-[18px] sm:min-w-[20px] text-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs sm:text-sm px-2"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 sm:mb-3">
                Departments
              </h4>
              <div className="space-y-1.5 sm:space-y-2 max-h-32 sm:max-h-none overflow-y-auto">
                {departments.map((dept) => (
                  <label key={dept} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.departments.includes(dept)}
                      onChange={() => handleDepartmentChange(dept)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {dept}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 sm:mb-3">
                Performance Rating
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                {ratings.map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.ratings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {rating} Star{rating !== 1 ? "s" : ""}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchAndFilter;

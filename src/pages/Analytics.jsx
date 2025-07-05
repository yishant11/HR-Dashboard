import { useMemo } from "react";
import { useHR } from "../context/HRContext";
import { useBookmarks } from "../hooks/useBookmarks";
import Chart from "../components/Chart";

function Analytics() {
  const { employees } = useHR();
  const { bookmarks } = useBookmarks();

  const departmentData = useMemo(() => {
    const deptStats = {};
    employees.forEach((emp) => {
      if (!deptStats[emp.department]) {
        deptStats[emp.department] = { total: 0, ratingSum: 0 };
      }
      deptStats[emp.department].total += 1;
      deptStats[emp.department].ratingSum += emp.rating;
    });

    return Object.entries(deptStats).map(([dept, stats]) => ({
      department: dept,
      averageRating: (stats.ratingSum / stats.total).toFixed(1),
      employeeCount: stats.total,
    }));
  }, [employees]);

  const ratingDistribution = useMemo(() => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    employees.forEach((emp) => {
      distribution[emp.rating] += 1;
    });

    return Object.entries(distribution).map(([rating, count]) => ({
      rating: `${rating} Star${rating !== "1" ? "s" : ""}`,
      count,
    }));
  }, [employees]);

  const bookmarkTrends = useMemo(() => {
    return [
      { month: "Jan", bookmarks: 5 },
      { month: "Feb", bookmarks: 8 },
      { month: "Mar", bookmarks: 12 },
      { month: "Apr", bookmarks: 15 },
      { month: "May", bookmarks: bookmarks.length },
    ];
  }, [bookmarks.length]);

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Insights and trends across your organization
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Employees
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {employees.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Bookmarked
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {bookmarks.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Avg Rating
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {(
                  employees.reduce((sum, emp) => sum + emp.rating, 0) /
                  employees.length
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                Departments
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {departmentData.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <Chart
          title="Department-wise Average Ratings"
          type="bar"
          data={departmentData}
          xKey="department"
          yKey="averageRating"
        />

        <Chart
          title="Performance Rating Distribution"
          type="doughnut"
          data={ratingDistribution}
          xKey="rating"
          yKey="count"
        />

        <Chart
          title="Bookmark Trends"
          type="line"
          data={bookmarkTrends}
          xKey="month"
          yKey="bookmarks"
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Department Breakdown
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {departmentData.map((dept) => (
              <div
                key={dept.department}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    {dept.department}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {dept.employeeCount} employees
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    {dept.averageRating}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    avg rating
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;

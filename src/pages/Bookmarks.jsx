import { useBookmarks } from "../hooks/useBookmarks";
import EmployeeCard from "../components/EmployeeCard";

function Bookmarks() {
  const { getBookmarkedEmployees } = useBookmarks();
  const bookmarkedEmployees = getBookmarkedEmployees();

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bookmarked Employees
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Your saved employees for quick access and management
        </p>
      </div>

      {bookmarkedEmployees.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-gray-500 text-base sm:text-lg mb-4">
            No bookmarked employees
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Start bookmarking employees from the dashboard to see them here
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {bookmarkedEmployees.length} Bookmarked Employee
              {bookmarkedEmployees.length !== 1 ? "s" : ""}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {bookmarkedEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Bookmarks;

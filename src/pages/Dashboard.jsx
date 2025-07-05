import { useSearch } from "../hooks/useSearch";
import { useHR } from "../context/HRContext";
import EmployeeCard from "../components/EmployeeCard";
import SearchAndFilter from "../components/SearchAndFilter";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const { loading, error } = useHR();
  const { filteredEmployees } = useSearch();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="text-red-500 text-base sm:text-lg mb-4">
          Error loading employees
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Employee Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage and track employee performance across your organization
        </p>
      </div>

      <SearchAndFilter />

      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          All Employees ({filteredEmployees.length})
        </h2>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-gray-500 text-base sm:text-lg mb-4">
            No employees found
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

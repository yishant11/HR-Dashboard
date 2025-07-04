import { useMemo } from "react";
import { useHR } from "../context/HRContext";

export function useSearch() {
  const { employees, searchTerm, filters, dispatch } = useHR();

  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filters
    if (filters.departments.length > 0) {
      filtered = filtered.filter((emp) =>
        filters.departments.includes(emp.department)
      );
    }

    // Apply rating filters
    if (filters.ratings.length > 0) {
      filtered = filtered.filter((emp) => filters.ratings.includes(emp.rating));
    }

    return filtered;
  }, [employees, searchTerm, filters]);

  const setSearchTerm = (term) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  const setFilters = (newFilters) => {
    dispatch({ type: "SET_FILTERS", payload: newFilters });
  };

  return {
    filteredEmployees,
    searchTerm,
    filters,
    setSearchTerm,
    setFilters,
  };
}

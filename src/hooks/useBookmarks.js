import { useHR } from "../context/HRContext";

export function useBookmarks() {
  const { bookmarks, employees, dispatch } = useHR();

  const addBookmark = (employeeId) => {
    if (!bookmarks.includes(employeeId)) {
      dispatch({ type: "ADD_BOOKMARK", payload: employeeId });
    }
  };

  const removeBookmark = (employeeId) => {
    dispatch({ type: "REMOVE_BOOKMARK", payload: employeeId });
  };

  const isBookmarked = (employeeId) => {
    return bookmarks.includes(employeeId);
  };

  const getBookmarkedEmployees = () => {
    return employees.filter((emp) => bookmarks.includes(emp.id));
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkedEmployees,
  };
}

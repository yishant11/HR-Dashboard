import { createContext, useContext, useReducer, useEffect } from "react";

const HRContext = createContext();

const initialState = {
  employees: [],
  bookmarks: JSON.parse(localStorage.getItem("bookmarks") || "[]"),
  loading: false,
  error: null,
  searchTerm: "",
  filters: {
    departments: [],
    ratings: [],
  },
};

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];

function hrReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "ADD_BOOKMARK":
      const newBookmarks = [...state.bookmarks, action.payload];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      return { ...state, bookmarks: newBookmarks };
    case "REMOVE_BOOKMARK":
      const filteredBookmarks = state.bookmarks.filter(
        (id) => id !== action.payload
      );
      localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
      return { ...state, bookmarks: filteredBookmarks };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id
            ? { ...emp, ...action.payload.updates }
            : emp
        ),
      };
    default:
      return state;
  }
}

export function HRProvider({ children }) {
  const [state, dispatch] = useReducer(hrReducer, initialState);

  const fetchEmployees = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch("https://dummyjson.com/users?limit=20");
      const data = await response.json();

      const enhancedEmployees = data.users.map((user) => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
        bio: `Experienced professional with ${
          Math.floor(Math.random() * 10) + 1
        } years in ${
          departments[Math.floor(Math.random() * departments.length)]
        }.`,
        projects: generateProjects(),
        feedback: generateFeedback(),
        performanceHistory: generatePerformanceHistory(),
      }));

      dispatch({ type: "SET_EMPLOYEES", payload: enhancedEmployees });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const generateProjects = () => {
    const projectNames = [
      "Project Alpha",
      "Beta Initiative",
      "Gamma Launch",
      "Delta Optimization",
    ];
    return Array.from(
      { length: Math.floor(Math.random() * 4) + 1 },
      (_, i) => ({
        id: i + 1,
        name: projectNames[Math.floor(Math.random() * projectNames.length)],
        status: ["Completed", "In Progress", "Planning"][
          Math.floor(Math.random() * 3)
        ],
        completion: Math.floor(Math.random() * 100),
      })
    );
  };

  const generateFeedback = () => {
    const feedbacks = [
      "Excellent team player with strong communication skills.",
      "Shows great initiative and problem-solving abilities.",
      "Consistently delivers high-quality work on time.",
      "Could improve on time management skills.",
    ];
    return Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, i) => ({
        id: i + 1,
        text: feedbacks[Math.floor(Math.random() * feedbacks.length)],
        date: new Date(
          Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
        ).toLocaleDateString(),
        author: "Manager",
      })
    );
  };

  const generatePerformanceHistory = () => {
    return Array.from({ length: 6 }, (_, i) => ({
      month: new Date(
        Date.now() - i * 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      rating: Math.floor(Math.random() * 5) + 1,
    })).reverse();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const value = {
    ...state,
    dispatch,
    fetchEmployees,
  };

  return <HRContext.Provider value={value}>{children}</HRContext.Provider>;
}

export const useHR = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error("useHR must be used within HRProvider");
  }
  return context;
};

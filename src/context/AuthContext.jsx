import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = () => {
      const authStatus = localStorage.getItem("authenticated");
      const userData = localStorage.getItem("userData");

      if (authStatus === "true" && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.username === "admin" &&
          credentials.password === "password"
        ) {
          const userData = {
            id: 1,
            username: "admin",
            name: "HR Administrator",
            email: "admin@company.com",
            role: "Administrator",
          };

          setIsAuthenticated(true);
          setUser(userData);
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("userData", JSON.stringify(userData));
          setIsLoading(false);
          resolve({ success: true, user: userData });
        } else {
          setIsLoading(false);
          reject({
            success: false,
            message: "Invalid credentials. Use admin/password",
          });
        }
      }, 1500); // Simulate network delay
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authenticated");
    localStorage.removeItem("userData");
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

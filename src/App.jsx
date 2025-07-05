import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HRProvider } from "./context/HRContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HRProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                </Route>
              </Routes>
            </div>
          </Router>
        </HRProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

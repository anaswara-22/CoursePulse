
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddFeedback from "./pages/AddFeedback";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.title =
      location.pathname === "/add"
        ? "Add Feedback | CoursePulse"
        : "Dashboard | CoursePulse";
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Navbar />

      <div className="content-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddFeedback />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

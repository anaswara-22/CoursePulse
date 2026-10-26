
import { NavLink } from "react-router-dom";
import {
  Activity,
  LayoutDashboard,
  MessageSquarePlus
} from "lucide-react";

export default function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">
          <Activity size={22} />
        </span>

        <span>
          CoursePulse
          <small>FEEDBACK STUDIO</small>
        </span>
      </div>

      <p className="nav-caption">WORKSPACE</p>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <MessageSquarePlus size={18} />
          Add Feedback
        </NavLink>
      </nav>

      <div className="sidebar-note">
        <span className="online-dot"></span>
        Feedback system
        <strong>Ready to use</strong>
      </div>

      <div className="sidebar-footer">
        A clearer view of every voice.
      </div>
    </aside>
  );
}


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, MessageSquare, Star, Plus,
  Pencil, Trash2, Search
} from "lucide-react";
import {
  getFeedback, updateFeedback, deleteFeedback
} from "../api";
import FeedbackForm from "../components/FeedbackForm";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  async function loadFeedback() {
    try {
      const response = await getFeedback();
      setItems(response.data);
    } catch (error) {
      console.error("Loading feedback failed:", error);
      alert("Could not load feedback. Check the backend connection.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  async function handleUpdate(data) {
    try {
      const response = await updateFeedback(editing._id, data);

      setItems((current) =>
        current.map((item) =>
          item._id === editing._id ? response.data : item
        )
      );

      setEditing(null);
      alert("Feedback updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Update failed.");
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(
      `Delete feedback for ${item.courseName}?`
    );

    if (!confirmed) return;

    try {
      await deleteFeedback(item._id);

      setItems((current) =>
        current.filter((row) => row._id !== item._id)
      );
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  const filtered = items.filter((item) =>
    `${item.courseName} ${item.comments}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const average = items.length
    ? items.reduce((sum, item) => sum + Number(item.rating), 0) / items.length
    : 0;

  return (
    <main className="main-content">
      <header className="topbar">
        <div>
          <p className="eyebrow">OVERVIEW / FEEDBACK</p>
          <h1>Feedback Dashboard</h1>
          <p className="subtitle">
            Listen, learn, and make every course better.
          </p>
        </div>

        <Link className="button primary" to="/add">
          <Plus size={17} /> Add Feedback
        </Link>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="stat-icon violet"><BookOpen /></span>
          <span className="stat-label">Courses</span>
          <strong>{new Set(items.map((i) => i.courseName)).size}</strong>
          <small>Courses with feedback</small>
        </article>

        <article className="stat-card">
          <span className="stat-icon blue"><MessageSquare /></span>
          <span className="stat-label">Feedback Entries</span>
          <strong>{items.length}</strong>
          <small>Responses received</small>
        </article>

        <article className="stat-card">
          <span className="stat-icon amber"><Star /></span>
          <span className="stat-label">Average Rating</span>
          <strong>{items.length ? average.toFixed(1) : "—"}<em>/5</em></strong>
          <small>Across all feedback</small>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Course Feedback</h2>
            <p>Review and manage submitted responses.</p>
          </div>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses or comments..."
              aria-label="Search feedback"
            />
          </div>
          <span className="results-count">{filtered.length} entries</span>
        </div>

        {loading ? (
          <div className="empty-state">Loading feedback...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <MessageSquare size={30} />
            <h3>No feedback yet</h3>
            <p>Add your first course feedback to see it here.</p>
            <Link className="button primary" to="/add">
              <Plus size={16} /> Add Feedback
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>COURSE</th>
                  <th>DURATION</th>
                  <th>COMMENTS</th>
                  <th>RATING</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="course-cell">
                        <span className="course-avatar">
                          {item.courseName.charAt(0).toUpperCase()}
                        </span>
                        <span>
                          <strong>{item.courseName}</strong>
                          <small>ID: {item._id.slice(-6).toUpperCase()}</small>
                        </span>
                      </div>
                    </td>

                    <td>{item.courseDuration || "Not specified"}</td>

                    <td>
                      <span className="comment-cell" title={item.comments}>
                        {item.comments}
                      </span>
                    </td>

                    <td>
                      <span className="rating-pill">
                        <Star size={14} fill="currentColor" />
                        {Number(item.rating).toFixed(1)} / 5
                      </span>
                    </td>

                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-button edit"
                          onClick={() => setEditing(item)}
                          title="Update"
                          aria-label={`Update ${item.courseName}`}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="icon-button delete"
                          onClick={() => handleDelete(item)}
                          title="Delete"
                          aria-label={`Delete ${item.courseName}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="page-footnote">
        CoursePulse · Feedback that helps courses grow
      </p>

      {editing && (
        <div className="modal-backdrop">
          <section className="modal-card" role="dialog" aria-modal="true">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">EDIT ENTRY</p>
                <h2>Update Feedback</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <FeedbackForm
              initialData={editing}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
            />
          </section>
        </div>
      )}
    </main>
  );
}

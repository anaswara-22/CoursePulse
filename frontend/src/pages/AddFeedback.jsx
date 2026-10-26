
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquareText } from "lucide-react";
import { addFeedback } from "../api";
import FeedbackForm from "../components/FeedbackForm";

export default function AddFeedback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    setLoading(true);
    setError("");

    try {
      await addFeedback(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Unable to save feedback. Check the backend connection."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main-content">
      <header className="topbar">
        <div>
          <p className="eyebrow">WORKSPACE / NEW ENTRY</p>
          <h1>Add Feedback</h1>
          <p className="subtitle">
            A few thoughtful words can make a course even better.
          </p>
        </div>

        <Link className="button secondary" to="/">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </header>

      {error && <div className="alert" role="alert">{error}</div>}

      <section className="form-layout">
        <div className="panel form-panel">
          <div className="panel-heading">
            <div>
              <h2>Feedback Details</h2>
              <p>Fields marked * are required.</p>
            </div>
            <span className="form-icon">
              <MessageSquareText size={22} />
            </span>
          </div>

          <FeedbackForm
            onSubmit={handleSubmit}
          />

          {loading && <p className="loading-note">Saving feedback...</p>}
        </div>

        <aside className="tip-card">
          <span className="tip-icon">
            <MessageSquareText size={21} />
          </span>
          <h3>Your feedback matters</h3>
          <p>
            Helpful feedback is specific, constructive,
            and focused on the learning experience.
          </p>

          <div className="tip-divider"></div>

          <strong>Quick tips</strong>
          <ul>
            <li>Share what helped you learn.</li>
            <li>Mention one thing that could improve.</li>
            <li>Choose a rating that reflects your experience.</li>
          </ul>
        </aside>
      </section>

      <p className="page-footnote">
        CoursePulse · Feedback that helps courses grow
      </p>
    </main>
  );
}

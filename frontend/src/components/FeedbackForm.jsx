
import { useState } from "react";
import { Star } from "lucide-react";

export default function FeedbackForm({ onSubmit, initialData, onCancel }) {
  const [courseName, setCourseName] = useState(
    initialData?.courseName || ""
  );
  const [courseDuration, setCourseDuration] = useState(
    initialData?.courseDuration || ""
  );
  const [comments, setComments] = useState(
    initialData?.comments || ""
  );
  const [rating, setRating] = useState(
    initialData?.rating || 0
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!courseName.trim() || !comments.trim() || rating === 0) {
      alert("Please fill in all required fields and select a rating.");
      return;
    }

    onSubmit({
      courseName: courseName.trim(),
      courseDuration: courseDuration.trim() || "Not specified",
      comments: comments.trim(),
      rating
    });
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <label className="field">
        Course Name *
        <input
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="e.g. Full Stack Development"
          required
        />
      </label>

      <label className="field">
        Course Duration
        <input
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
          placeholder="e.g. 12 weeks"
        />
      </label>

      <label className="field">
        Feedback Comments *
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Share your learning experience..."
          rows="5"
          required
        />
      </label>

      <fieldset className="rating-field">
        <legend>Overall Rating *</legend>
        <div className="star-picker">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              className={value <= rating ? "star chosen" : "star"}
              onClick={() => setRating(value)}
              aria-label={`${value} stars`}
            >
              <Star
                size={27}
                fill={value <= rating ? "currentColor" : "none"}
              />
            </button>
          ))}
          <span>{rating ? `${rating}/5` : "Choose a rating"}</span>
        </div>
      </fieldset>

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="button secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button type="submit" className="button primary">
          {initialData ? "Save Changes" : "Submit Feedback"}
        </button>
      </div>
    </form>
  );
}

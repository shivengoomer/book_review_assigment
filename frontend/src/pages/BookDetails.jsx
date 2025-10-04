import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/client.js";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Star } from "lucide-react";
import BackButton from "../components/BackButton";


function ReviewEditor({ bookId, onDone }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  function handleStarClick(idx) {
    setRating(idx + 1);
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post(`/reviews/${bookId}`, { rating, reviewText });
      onDone();
      setReviewText("");
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.error || "Save failed");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="label">Rating</label>
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleStarClick(idx)}
              aria-label={`Rate ${idx + 1} star${idx === 0 ? "" : "s"}`}
              className="focus:outline-none"
            >
              <Star
                size={24}
                fill={idx < rating ? "#facc15" : "none"}
                stroke={idx < rating ? "#facc15" : "#d1d5db"}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="label">Your review</label>
        <textarea
          className="input mt-1 h-28"
          placeholder="Share your thoughts"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      <button className="btn-primary">Submit</button>
    </form>
  );
}

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const { data } = await api.get(`/books/${id}`);
      setData(data);
    } catch (err) {
      setError("Failed to load");
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleDelete() {
    try {
      await api.delete(`/books/${id}`);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    }
  }

  if (!data) return <div className="p-6">Loading...</div>;
  const { book, reviews } = data;
  const canEdit = user && book.addedBy === user.id;

  const renderStars = (rating) =>
    [...Array(5)].map((_, idx) => (
      <Star
        key={idx}
        size={20}
        fill={idx < rating ? "#facc15" : "none"}
        stroke={idx < rating ? "#facc15" : "#d1d5db"}
      />
    ));

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column: Book Info + Add Review */}
      <div className="md:w-1/2 w-full flex flex-col gap-4">
        {/* Book Info */}
        <div className="card p-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {book.title}
          </h1>
          <div className="mt-1 text-gray-600">
            {book.author} • {book.genre} • {book.year}
          </div>
          {book.description && (
            <p className="mt-4 text-gray-800">{book.description}</p>
          )}
          <div className="flex gap-5 mt-4">
            {canEdit && (
              <Link
                className="btn-secondary font-bold rounded-2xl text-white bg-purple-700 px-3 py-1  hover:bg-purple-500"
                to={`/books/${id}/edit`}
              >
                Edit
              </Link>
            )}
            {canEdit && (
              <ProtectedRoute>
                <button
                  className="btn-danger font-bold rounded-2xl text-white bg-red-700 px-3 py-1  hover:bg-red-500 hover:cursor-pointer  "
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </ProtectedRoute>
            )}
          </div>
        </div>

        {/* Add Review Form */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
          <ProtectedRoute>
            <ReviewEditor bookId={id} onDone={load} />
          </ProtectedRoute>
        </div>
      </div>

      {/* Right Column: Average Rating + All User Reviews */}
      <div className="md:w-1/2 w-full flex flex-col gap-4">
        {/* Average Rating */}
        <div className="card p-6 flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold">Average Rating</h2>
          <div className="flex items-center gap-2 mt-1">
            {renderStars(Math.round(book.averageRating || 0))}
            <span className="text-sm text-gray-700">
              {book.averageRating?.toFixed?.(1) ?? book.averageRating} (
              {book.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* User Reviews */}
        <div className="space-y-4">
          <h2 className="text-3xl text-center mt-4 font-bold">User Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div
                key={r._id}
                className="card p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/30 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">{renderStars(r.rating)}</div>
                  <span className="text-sm text-gray-600">
                    {r.userId?.name || "User"}
                  </span>
                </div>
                {r.reviewText && (
                  <p className="mt-2 text-gray-800">{r.reviewText}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth(); // get logged-in user from context
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // prevent fetch if user is not logged in
    console.log("user details :", user);

    async function fetchData() {
      try {
        const [booksRes, reviewsRes] = await Promise.all([
          api.get(`/users/${user.id}/books`),
          api.get(`/users/${user.id}/reviews`),
        ]);

        setBooks(booksRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (loading || !user) {
    return (
      <motion.div
        className="text-center py-20 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-8 space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold">Hi, {user.name}!</h1>

      {/* User Books */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Books</h2>
        {books.length === 0 ? (
          <p className="text-gray-500">You haven't added any books yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((b) => (
              <motion.div
                key={b._id}
                className="p-6 rounded-2xl bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  to={`/books/${b._id}`}
                  className="font-bold text-xl text-gray-900 hover:text-blue-600 transition"
                >
                  {b.title || "Untitled"}
                </Link>
                <p className="text-gray-700 mt-1">
                  {b.author || "Unknown Author"}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* User Reviews */}
      <section>
        <h2 className="text-3xl font-bold tracking-tighter mb-4">Your Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">You haven't written any reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <motion.div
                key={r._id}
                className="p-4 rounded-xl bg-white/20 backdrop-blur-lg shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
              >
                <Link
                  to={`/books/${r.bookId}`}
                  className="font-semibold text-2xl text-blue-600 hover:underline"
                >
                  {r.bookTitle || "Untitled Book"}
                </Link>
                <p className="text-gray-700 mt-1">{r.content}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Rating: {r.rating}/5
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}

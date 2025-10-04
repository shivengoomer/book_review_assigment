import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/client.js";

export default function BookList() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({ items: [], page: 1, totalPages: 1 });

  const page = Number(params.get("page") || "1");
  const search = params.get("search") || "";
  const pageSize = 5;

  useEffect(() => {
    api
      .get(
        `/books?page=${page}&limit=${pageSize}&search=${encodeURIComponent(
          search
        )}`
      )
      .then(({ data }) => setData(data));
  }, [page, search]);

  function goto(p) {
    setParams((prev) => {
      const newParams = {};
      if (search) newParams.search = search;
      newParams.page = String(p);
      return newParams;
    });
  }

  return (
    <motion.div
      className="space-y-8 px-6 py-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-end gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Search Bar */}
        {/* Add New Book Button */}
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="inline-block"
        >
          <Link
            to="/books/new"
            className="relative px-6 py-3 rounded-xl font-semibold text-white bg-emerald-500
      shadow-lg hover:shadow-cyan-500/40 transition-all duration-300
      hover:-translate-y-1 hover:brightness-110"
          >
            <span className="relative z-10">➕ Add New Book</span>
            <span className="absolute inset-0 rounded-xl  opacity-0 blur transition-all duration-500 group-hover:opacity-40"></span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Book List */}
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {data.items.map((b, index) => (
            <motion.li
              key={b._id}
              className="p-8 py-12 rounded-2xl backdrop-blur-lg bg-white/20 border border-white/20 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <Link
                to={`/books/${b._id}`}
                className="text-2xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
              >
                {b.title || (
                  <span className="italic text-gray-400">Untitled</span>
                )}
              </Link>
              <div className="mt-3 text-lg text-gray-700">
                {b.author || <span className="italic">Unknown Author</span>} •{" "}
                {b.genre || <span className="italic">Unknown Genre</span>} •{" "}
                {b.year || <span className="italic">Year?</span>}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700">
                  {b.genre || "Genre"}
                </span>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
                  {b.year || "Year"}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Pagination */}
      <motion.div
        className="flex items-center justify-between mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="text-gray-600 font-medium">
          Page {data.page} of {data.totalPages}
        </span>
        <div className="flex gap-3">
          <motion.button
            disabled={data.page <= 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goto(data.page - 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Prev
          </motion.button>
          <motion.button
            disabled={data.page >= data.totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => goto(data.page + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </div>
        <div>
          <span className="inline-block rounded-full bg-cyan-600 text-white text-sm font-medium px-3 py-2">
            © Shiven Goomer{" "}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

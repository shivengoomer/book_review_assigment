import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "./context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("!bye");
  };

  return (
    <motion.header
      className="sticky top-2 z-50 mx-50 mb-10  rounded-3xl backdrop-blur-xl bg-white/30 border border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.2),0_-5px_15px_rgba(0,0,0,0.1)]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
    >
      <div className="container-app flex items-center justify-between px-6 py-1.5 mt-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition"
          >
            Book<span className="text-blue-600">Reviews</span>
          </Link>
        </motion.div>

        {/* User Actions */}
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="font-semibold text-gray-800 hover:text-blue-600 transition"
              >
                <span className="hidden sm:inline text-sm font-medium text-gray-800">
                  Hi, {user.name}
                </span>
              </Link>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-full bg-white/40 border border-white/40 shadow-md hover:bg-white/60 text-gray-800 font-medium transition"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-full bg-white/40 border border-white/40 shadow-md hover:bg-white/60 text-gray-800 font-medium transition"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition font-medium"
                >
                  Signup
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

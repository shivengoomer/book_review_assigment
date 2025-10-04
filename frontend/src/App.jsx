import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import BookForm from "./pages/BookForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./Navbar";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <motion.main
          className="container-app py-6 min-h-[calc(100vh-4rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/:id/edit" element={<BookForm />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                  <Profile />
              }
            />
          </Routes>
        </motion.main>
      </BrowserRouter>
    </AuthProvider>
  );
}

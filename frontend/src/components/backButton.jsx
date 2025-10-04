// components/BackButton.jsx
import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide button on home page
  if (location.pathname === "/") return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed bg-[#e28221] text-white font-semibold hover:cursor-pointer top-4 left-4 btn btn-secondary z-50"
    >
      ← Back
    </button>
  );
}

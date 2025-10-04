// components/BackButton.jsx
import { useNavigate } from "react-router-dom";

export default function BackButton({ text = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-secondary mb-4"
    >
      {text}
    </button>
  );
}

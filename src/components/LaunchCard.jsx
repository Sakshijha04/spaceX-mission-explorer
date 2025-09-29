// src/components/LaunchCard.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const LaunchCard = ({ launch }) => {
    console.log(`Rendering LaunchCard: ${launch.name}`);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useAppContext();

  if (!launch) return null; // safety fallback

  const {
    name = "Untitled Mission",
    date_utc,
    rocketName = "Unknown Rocket",
    id,
    upcoming,
  } = launch;

  const dateStr = date_utc
    ? new Date(date_utc).toLocaleDateString()
    : "Unknown Date";

  const badges = [];
  if (upcoming) badges.push("TBD");
  if (date_utc) badges.push(new Date(date_utc).getFullYear());

  return (
    <div
      tabIndex={0} // makes card focusable
      className="relative bg-white p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {/* Favorite star */}
      <button
        className="absolute top-2 right-2 text-yellow-500 text-lg"
        onClick={() => toggleFavorite(id)}
        aria-label={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite(id) ? "★" : "☆"}
      </button>

      {/* Title & metadata */}
      <h2 className="font-bold text-lg">{name}</h2>
      <p className="text-sm text-gray-500 mt-1">
        {dateStr} • {rocketName}
      </p>

      {/* Badges */}
      <div className="flex space-x-2 mt-2">
        {badges.map((badge, idx) => (
          <span
            key={idx}
            className="rounded-full px-2 py-0.5 text-xs border text-gray-600"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* View Details */}
      <button
        onClick={() => navigate(`/missions/${id}`)}
        className="mt-3 text-blue-500 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        View Details
      </button>
    </div>
  );
};

// ✅ Memoize LaunchCard to prevent unnecessary re-renders
export default React.memo(LaunchCard);

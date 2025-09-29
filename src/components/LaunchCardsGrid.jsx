// src/components/LaunchCardsGrid.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const LaunchCardsGrid = () => {
  const { launches, toggleFavorite, isFavorite } = useAppContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {launches.map((launch) => (
        <div
          key={launch.id}
          className="relative bg-white p-4 rounded-md shadow hover:shadow-lg transition-shadow"
        >
          {/* Favorite star */}
          <button
            className="absolute top-2 right-2 text-yellow-500"
            onClick={() => toggleFavorite(launch.id)}
            aria-label="Toggle favorite"
          >
            {isFavorite(launch.id) ? "★" : "☆"}
          </button>

          {/* Title */}
          <h2 className="font-bold text-lg">{launch.name}</h2>

          {/* Metadata */}
          <p className="text-sm text-gray-500 mb-2">
            {new Date(launch.date_utc).toLocaleDateString()} • {launch.rocket_name}
          </p>

          {/* Badges */}
          <div className="flex space-x-2 mb-2">
            {!launch.success && (
              <span className="rounded-full px-2 py-0.5 text-xs border">TBD</span>
            )}
            <span className="rounded-full px-2 py-0.5 text-xs border">
              {new Date(launch.date_utc).getFullYear()}
            </span>
          </div>

          {/* Details link */}
          <Link
            to={`/missions/${launch.id}`}
            className="text-blue-500 hover:underline text-sm"
          >
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LaunchCardsGrid;

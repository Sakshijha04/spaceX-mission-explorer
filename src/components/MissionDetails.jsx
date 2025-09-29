
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { getLaunches } from "../api";

const MissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { launches } = useAppContext();

  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to get launch from context first
    const contextLaunch = launches.find((l) => l.id === id);
    if (contextLaunch) {
      setLaunch(contextLaunch);
    } else {
      // Fetch from API if not found in context (refresh scenario)
      const fetchLaunch = async () => {
        setLoading(true);
        try {
          const allLaunches = await getLaunches();
          const foundLaunch = allLaunches.find((l) => l.id === id);
          setLaunch(foundLaunch || null);
        } catch (error) {
          console.error("Error fetching launch:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLaunch();
    }
  }, [id, launches]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700 animate-pulse">
          Loading mission details...
        </p>
      </div>
    );
  }

  if (!launch) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Launch not found.</p>
      </div>
    );
  }

  const {
    name,
    date_utc,
    rocketName,
    details,
    links,
    success,
    upcoming,
  } = launch;

  const dateStr = date_utc
    ? new Date(date_utc).toLocaleDateString()
    : "Unknown Date";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Heading */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          🚀 Mission Details 🚀
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        {/* Mission patch image */}
        {links?.patch ? (
          <img
            src={links.patch}
            alt={`${name} mission patch`}
            className="w-full md:w-40 h-40 object-contain rounded-md shadow-md mb-4 md:mb-0"
          />
        ) : (
          <div className="w-full md:w-40 h-40 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md mb-4 md:mb-0">
            No Image
          </div>
        )}

        {/* Mission info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">
            {dateStr} • {rocketName || "Unknown Rocket"}
          </p>

          {/* Mission details/description */}
          <p className="mb-4">{details || "No additional details available."}</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {success === false && (
              <span className="rounded-full px-2 py-0.5 text-xs border border-red-500 text-red-500">
                Failed
              </span>
            )}
            {success === true && (
              <span className="rounded-full px-2 py-0.5 text-xs border border-green-500 text-green-500">
                Success
              </span>
            )}
            {upcoming && (
              <span className="rounded-full px-2 py-0.5 text-xs border border-yellow-500 text-yellow-500">
                Upcoming
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {links?.wikipedia && (
              <a
                href={links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Wikipedia
              </a>
            )}
            {links?.webcast && (
              <a
                href={links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Webcast
              </a>
            )}
            {links?.article && (
              <a
                href={links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Article
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600"
      >
        ← Back
      </button>
    </div>
  );
};

export default MissionDetail;

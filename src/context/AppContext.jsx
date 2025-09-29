
import React, { createContext, useContext, useEffect, useState } from "react";
import { getLaunchesWithRocketNames } from "../api";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Data from API
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Shared UI state
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showSuccessful, setShowSuccessful] = useState(false);

  // For details modal
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  // Fetch launches once when provider mounts
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getLaunchesWithRocketNames();
        if (!cancelled) setLaunches(data);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to fetch launches");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Persist favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Helpers
  const toggleFavorite = (id) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const isFavorite = (id) => favorites.includes(id);

  const toggleShowFavorites = () => setShowFavorites((s) => !s);
  const openLaunch = (launch) => setSelectedLaunch(launch);
  const closeLaunch = () => setSelectedLaunch(null);

  return (
    <AppContext.Provider
      value={{
        launches,
        loading,
        error,
        favorites,
        toggleFavorite,
        isFavorite,
        showFavorites,
        toggleShowFavorites,
        selectedLaunch,
        openLaunch,
        closeLaunch,
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        showSuccessful,
        setShowSuccessful,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};

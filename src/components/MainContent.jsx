
import React, { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import LaunchCard from "./LaunchCard";
import Pagination from "./Pagination";
import Filters from "./Filters";

const MainContent = () => {
  const {
    launches,
    searchQuery,
    selectedYear,
    showSuccessful,
    showFavorites,
    isFavorite,
  } = useAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 6;

  // ✅ Memoize filtered launches
  const filteredLaunches = useMemo(() => {
    return launches.filter((launch) => {
      if (showFavorites && !isFavorite(launch.id)) return false;
      if (showSuccessful && !launch.success) return false;
      if (selectedYear !== "All" && new Date(launch.date_utc).getFullYear() !== +selectedYear) return false;
      if (searchQuery && !launch.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [launches, searchQuery, selectedYear, showSuccessful, showFavorites, isFavorite]);

  // Pagination calculations
  const totalLaunches = filteredLaunches.length;
  const totalPages = Math.ceil(totalLaunches / launchesPerPage);
  const startIdx = (currentPage - 1) * launchesPerPage;
  const currentLaunches = filteredLaunches.slice(startIdx, startIdx + launchesPerPage);

  return (
    <main className="w-full bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Filters />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {currentLaunches.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No launches match the selected filters.
            </p>
          ) : (
            currentLaunches.map((launch) => (
              <LaunchCard key={launch.id} launch={launch} />
            ))
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNum) => {
            if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
          }}
        />
      </div>
    </main>
  );
};

export default MainContent;

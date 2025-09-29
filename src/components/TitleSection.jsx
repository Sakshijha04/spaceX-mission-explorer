import React from "react";

const TitleSection = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-bold">
        Atmosly · SpaceX Mission Explorer
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mt-1">
        Fetch real data from the SpaceX public API. Filter, explore, and favorite launches.
      </p>
    </div>
  );
};

export default TitleSection;

// src/api.js

// ✅ Fetch all launches
export const getLaunches = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/launches");
  if (!response.ok) {
    throw new Error("Failed to fetch launches");
  }
  return response.json(); // returns array of launches
};

// ✅ Fetch all rockets
export const getRockets = async () => {
  const response = await fetch("https://api.spacexdata.com/v4/rockets");
  if (!response.ok) {
    throw new Error("Failed to fetch rockets");
  }
  return response.json(); // returns array of rockets
};

// ✅ Fetch launches with rocket names mapped
export const getLaunchesWithRocketNames = async () => {
  const [launches, rockets] = await Promise.all([getLaunches(), getRockets()]);

  // create lookup dictionary: { rocketId: rocketName }
  const rocketMap = {};
  rockets.forEach(rocket => {
    rocketMap[rocket.id] = rocket.name;
  });

  // map each launch to include rocketName
  const launchesWithNames = launches.map(launch => ({
    id: launch.id, // unique identifier
    name: launch.name, // mission name
    date_utc: launch.date_utc, // full UTC date
    year: new Date(launch.date_utc).getFullYear(), // extracted year
    success: launch.success, // mission success/failure
    rocketId: launch.rocket, // original rocket ID
    rocketName: rocketMap[launch.rocket] || "Unknown", // mapped rocket name
    details: launch.details, // mission description
    links: {
      patch: launch.links?.patch?.small || null, // mission patch image
      wikipedia: launch.links?.wikipedia || null, // wikipedia link
      webcast: launch.links?.webcast || null, // webcast link
      article: launch.links?.article || null // article link
    }
  }));
  
  return launchesWithNames; // ✅ clean JSON data for frontend
};

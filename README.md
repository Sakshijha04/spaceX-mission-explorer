# SpaceX Mission Explorer

A React-based web application to explore SpaceX missions with mission details, filtering, and favorites functionality.

---

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Known Limitations](#known-limitations)
5. [Running Tests](#running-tests)
6. [Future Enhancements](#future-enhancements)

---

## Setup Instructions

1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd <repository-folder>
    ```
2. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack
 1. Frontend: React
 2. Styling: Tailwind CSS
 3. State Management: React Context API
 4. Routing: React Router
 5. Testing: Vitest + React Testing Library (RTL)

## Features
 1. Explore all SpaceX missions
 2. Filter missions by success
 3. Mark missions as favorites
 4. View detailed mission information
 5. Optional enhancements: dark mode, virtualized lists, analytics logging

## Known Limitations
 1. No backend; all data is fetched from the public SpaceX API
 2. No offline support
 3. Dark mode and analytics are planned but not implemented

## Running Tests:
```bash
 npm run test
```

## Future Enhancements:
 1. Dark Mode: Add a toggle for users to switch between light and dark themes using Tailwind CSS.
 2. Virtualized Lists: Optimize mission list rendering for performance with large datasets.
 3. Analytics Logging: Track user interactions such as favorite toggles, mission clicks, and filters for insights.
 4. Polish & UI Improvements: Enhance animations, loading states, and accessibility.







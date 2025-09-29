import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainContent from "../components/MainContent";
import { MemoryRouter } from "react-router-dom";
import * as AppContextModule from "../context/AppContext";

const toggleFavoriteMock = vi.fn();
const isFavoriteMock = vi.fn((id) => id === "2");

const launchesMock = [
  { id: "1", name: "Falcon 1", date_utc: "2006-03-24T22:30:00.000Z", rocketName: "Falcon Rocket", success: true, upcoming: false },
  { id: "2", name: "Falcon 2", date_utc: "2007-03-21T22:30:00.000Z", rocketName: "Falcon Rocket", success: false, upcoming: false },
];

vi.spyOn(AppContextModule, "useAppContext").mockImplementation(() => ({
  launches: launchesMock,
  toggleFavorite: toggleFavoriteMock,
  isFavorite: isFavoriteMock,
  showFavorites: false,
  showSuccessful: false,
  searchQuery: "",
  selectedYear: "All",
  setSearchQuery: vi.fn(),
  setSelectedYear: vi.fn(),
  setShowSuccessful: vi.fn(),
}));

describe("MainContent rendering & filtering", () => {
  it("renders all launches initially", () => {
    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
    expect(screen.getByText("Falcon 2")).toBeInTheDocument();
  });

  it("filters by successful launches", () => {
    // Create a fresh mock with showSuccessful=true
    vi.spyOn(AppContextModule, "useAppContext").mockImplementation(() => ({
      launches: launchesMock,
      toggleFavorite: toggleFavoriteMock,
      isFavorite: isFavoriteMock,
      showFavorites: false,
      showSuccessful: true,
      searchQuery: "",
      selectedYear: "All",
      setSearchQuery: vi.fn(),
      setSelectedYear: vi.fn(),
      setShowSuccessful: vi.fn(),
    }));

    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    expect(screen.getByText("Falcon 1")).toBeInTheDocument();
    expect(screen.queryByText("Falcon 2")).not.toBeInTheDocument();
  });

  it("toggles favorite on click", () => {
    render(
      <MemoryRouter>
        <MainContent />
      </MemoryRouter>
    );

    const starBtn = screen.getAllByRole("button", { name: /add to favorites/i })[0];
    fireEvent.click(starBtn);

    expect(toggleFavoriteMock).toHaveBeenCalledWith("1");
  });
});

// src/__tests__/Favourites.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LaunchCard from "../components/LaunchCard";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock the context hook using Vitest
import * as AppContextModule from "../context/AppContext";

const toggleFavoriteMock = vi.fn();
const isFavoriteMock = vi.fn().mockReturnValue(false);

vi.spyOn(AppContextModule, "useAppContext").mockImplementation(() => ({
  toggleFavorite: toggleFavoriteMock,
  isFavorite: isFavoriteMock,
}));

const launchMock = {
  id: "1",
  name: "Falcon 1",
  date_utc: "2006-03-24T22:30:00.000Z",
  rocketName: "Falcon Rocket",
  upcoming: false,
};

describe("LaunchCard favorite toggle", () => {
  it("renders launch name and toggles favorite", () => {
    render(
      <MemoryRouter>
        <LaunchCard launch={launchMock} />
      </MemoryRouter>
    );

    expect(screen.getByText("Falcon 1")).toBeInTheDocument();

    const starBtn = screen.getByRole("button", { name: /add to favorites/i });
    fireEvent.click(starBtn);

    expect(toggleFavoriteMock).toHaveBeenCalledWith("1");
  });
});

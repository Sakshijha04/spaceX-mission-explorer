import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MissionDetail from "../components/MissionDetails";
import * as AppContextModule from "../context/AppContext";
import { vi } from "vitest";

// ✅ Mock the context hook
const mockLaunches = [
  { id: "1", name: "Falcon 1", success: true, details: "First flight" },
  { id: "2", name: "Falcon 2", success: false, details: "Second flight" },
];

vi.spyOn(AppContextModule, "useAppContext").mockImplementation(() => ({
  launches: mockLaunches,
  loading: false,
  error: null,
}));

describe("MissionDetail component", () => {
  test("renders mission details correctly for valid id", async () => {
    render(
      <MemoryRouter initialEntries={["/mission/1"]}>
        <Routes>
          <Route path="/mission/:id" element={<MissionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Check guaranteed data
    expect(await screen.findByText(/Falcon 1/i)).toBeInTheDocument();
    expect(screen.getByText(/First flight/i)).toBeInTheDocument();
  });

  test("renders mission details correctly for another valid id", async () => {
    render(
      <MemoryRouter initialEntries={["/mission/2"]}>
        <Routes>
          <Route path="/mission/:id" element={<MissionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Check guaranteed data
    expect(await screen.findByText(/Falcon 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Second flight/i)).toBeInTheDocument();
  });
});

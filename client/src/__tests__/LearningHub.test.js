import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LearningHub from "../Components/Pages/learninghub/LearningHub";

// Mock child components correctly
jest.mock("../Components/Pages/learninghub/HeroSection", () => ({
  __esModule: true,
  default: () => <div>Mock HeroSection</div>,
}));

jest.mock("../Components/Pages/learninghub/ContentGrid", () => ({
  __esModule: true,
  default: () => <div>Mock ContentGrid</div>,
}));

jest.mock("../Components/Pages/memberportal/memberportalnav", () => ({
  __esModule: true,
  default: () => <nav>Mock Navbar</nav>,
}));

describe("LearningHub Component", () => {
  test("renders Navbar, HeroSection, and ContentGrid", () => {
    render(<LearningHub />);

    // Use regex matcher to avoid whitespace or nested element issues
    expect(screen.getByText(/Mock Navbar/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock HeroSection/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock ContentGrid/i)).toBeInTheDocument();
  });
});

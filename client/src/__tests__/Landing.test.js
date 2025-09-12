import React from "react";
import { it, expect, describe, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Landing from "../Components/Pages/Landing";
import "@testing-library/jest-dom";

// Mock static assets
jest.mock("../../assets/leo.png", () => "test-image-stub");

// Mock children
jest.mock("../Components/Elements/ImageSlider.jsx", () => () => <div data-testid="image-slider" />);
jest.mock("../Components/Elements/StatSection.jsx", () => () => <div data-testid="stats-section" />);
jest.mock("../Components/Elements/Stat.jsx", () => () => <div data-testid="awards" />);
jest.mock("../Components/Elements/Content.jsx", () => () => <div data-testid="content" />);
jest.mock("../Components/Elements/EventCardSlider.jsx", () => () => (
  <>
    <div data-testid="event-cards" />
    <div data-testid="event-cards" />
    <div data-testid="event-cards" />
  </>
));

describe("Landing Page", () => {
  it("renders Landing and all child components", () => {
    render(<Landing />);

    // ✅ Check all mocks render
    expect(screen.getByTestId("image-slider")).toBeInTheDocument();
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("awards")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();

    // ✅ Fix: getAllByTestId since multiple event cards exist
    const eventCards = screen.getAllByTestId("event-cards");
    expect(eventCards).toHaveLength(3);
  });
});

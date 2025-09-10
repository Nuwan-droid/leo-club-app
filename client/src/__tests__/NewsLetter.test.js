import React from "react";
import { render, screen } from "@testing-library/react";
import NewsLetter from "../Components/Pages/NewsLetter";

// Mock child components to isolate testing
jest.mock("../Components/Elements/EventCardSlider", () => () => <div data-testid="event-card-slider" />);
jest.mock("../Components/Elements/EventCard", () => () => <div data-testid="event-card" />);
jest.mock("../Components/Pages/memberportal/memberportalnav", () => () => <div data-testid="member-portal-nav" />);
jest.mock("../Components/Pages/memberportal/Whatsapp", () => () => <div data-testid="whatsapp" />);

describe("NewsLetter Component", () => {
  it("renders all child components correctly", () => {
    render(<NewsLetter />);

    // Check MemberPortalNav is rendered
    expect(screen.getByTestId("member-portal-nav")).toBeInTheDocument();

    // Check Whatsapp is rendered
    expect(screen.getByTestId("whatsapp")).toBeInTheDocument();

    // Check EventCardSlider is rendered
    expect(screen.getByTestId("event-card-slider")).toBeInTheDocument();
  });
});

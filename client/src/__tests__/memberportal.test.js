// __tests__/MemberPortal.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import MemberPortal from "../Components/Pages/memberportal/memberportal.jsx";

// 🔹 Mock child components to simplify testing
jest.mock("../Components/Pages/memberportal/profile_section", () => () => <div>Mock ProfileSection</div>);
jest.mock("../Components/Pages/memberportal/contribution", () => () => <div>Mock ContributionSection</div>);
jest.mock("../Components/Pages/memberportal/eventVolunteering", () => () => <div>Mock EventVolunteeringSection</div>);
jest.mock("../Components/Pages/memberportal/quicklinks", () => () => <div>Mock QuickLinks</div>);
jest.mock("../Components/Pages/memberportal/memberportalnav", () => () => <nav>Mock MemberPortalNav</nav>);

describe("MemberPortal", () => {
  test("renders without crashing", () => {
    render(<MemberPortal />);
    expect(screen.getByText("Mock MemberPortalNav")).toBeInTheDocument();
  });

  test("renders ProfileSection, ContributionSection, EventVolunteeringSection, and QuickLinks", () => {
    render(<MemberPortal />);
    expect(screen.getByText("Mock ProfileSection")).toBeInTheDocument();
    expect(screen.getByText("Mock ContributionSection")).toBeInTheDocument();
    expect(screen.getByText("Mock EventVolunteeringSection")).toBeInTheDocument();
    expect(screen.getByText("Mock QuickLinks")).toBeInTheDocument();
  });

  test("applies animation classes and delays correctly", () => {
    render(<MemberPortal />);
    const profileSectionWrapper = screen.getByText("Mock ProfileSection").parentElement;
    const contributionWrapper = screen.getByText("Mock ContributionSection").parentElement;
    const eventWrapper = screen.getByText("Mock EventVolunteeringSection").parentElement;
    const quickLinksWrapper = screen.getByText("Mock QuickLinks").parentElement;

    expect(profileSectionWrapper).toHaveClass("animate-fadeInUp");
    expect(profileSectionWrapper).toHaveStyle("animation-delay: 200ms");

    expect(contributionWrapper).toHaveClass("animate-fadeInUp");
    expect(contributionWrapper).toHaveStyle("animation-delay: 300ms");

    expect(eventWrapper).toHaveClass("animate-fadeInUp");
    expect(eventWrapper).toHaveStyle("animation-delay: 400ms");

    expect(quickLinksWrapper).toHaveClass("animate-fadeInUp");
    expect(quickLinksWrapper).toHaveStyle("animation-delay: 500ms");
  });
});

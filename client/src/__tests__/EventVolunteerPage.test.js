import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventVolunteerPage from "../Components/Pages/event_volunteer/EventVolunteerPage";

// Mock child components
jest.mock("../Components/Pages/event_volunteer/EventDetailsPopup", () => {
  return function MockEventDetailsPopup({ event, onClose }) {
    if (!event) return null;
    return (
      <div>
        Mock EventDetailsPopup
        <button onClick={onClose}>Close Event</button>
      </div>
    );
  };
});

jest.mock("../Components/Pages/event_volunteer/RequestEventPopup", () => {
  return function MockRequestEventPopup({ onClose }) {
    return (
      <div>
        Mock RequestEventPopup
        <button onClick={onClose}>Close Request</button>
      </div>
    );
  };
});

jest.mock("../Components/Pages/memberportal/memberportalnav", () => {
  return function MockNavbar() {
    return <nav>Mock Navbar</nav>;
  };
});

jest.mock("../Components/Pages/event_volunteer/BasicDateCalendar", () => {
  return function MockCalendar() {
    return <div>Mock Calendar</div>;
  };
});

describe("../Components/Pages/event_volunteer/EventVolunteerPage", () => {
  test("renders navbar, hero, events, and calendar", () => {
    render(<EventVolunteerPage />);

    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Upcoming Events")).toBeInTheDocument();
    expect(screen.getByText("Past Events")).toBeInTheDocument();
    expect(screen.getByText("Mock Calendar")).toBeInTheDocument();
  });

  test("renders upcoming and past events", () => {
    render(<EventVolunteerPage />);

    expect(screen.getByText("Seeds for Hope")).toBeInTheDocument();
    expect(screen.getByText("Snehaloka")).toBeInTheDocument();
    expect(screen.getByText("Degree Vistas")).toBeInTheDocument();
  });

  test("opens and closes EventDetailsPopup when clicking an event", async () => {
    render(<EventVolunteerPage />);

    // Click upcoming event
    fireEvent.click(screen.getByText("Seeds for Hope"));
    expect(screen.getByText("Mock EventDetailsPopup")).toBeInTheDocument();

    // Close popup
    fireEvent.click(screen.getByText("Close Event"));
    await waitFor(() => {
      expect(screen.queryByText("Mock EventDetailsPopup")).not.toBeInTheDocument();
    });
  });

  test("opens and closes RequestEventPopup when clicking request button", async () => {
    render(<EventVolunteerPage />);

    // Click request button (use regex to handle spacing issues)
    fireEvent.click(screen.getByText(/\+ Request for New\s+Event/i));
    expect(screen.getByText("Mock RequestEventPopup")).toBeInTheDocument();

    // Close popup
    fireEvent.click(screen.getByText("Close Request"));
    await waitFor(() => {
      expect(screen.queryByText("Mock RequestEventPopup")).not.toBeInTheDocument();
    });
  });
});

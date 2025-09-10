// src/__tests__/eventCalendar.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventCalendar from "../Components/Pages/EventCalendar";
import useCalendarLogic from "../Components/Elements/EventCalendar/useCalendarLogic";

// -------------------
// Mock child components
// -------------------
jest.mock("../Components/Elements/EventCalendar/CalendarHeader", () => ({
  __esModule: true,
  default: ({ currentMonth, currentYear, onPrevious, onNext }) => (
    <div data-testid="calendar-header">
      <span>{currentMonth}/{currentYear}</span>
      <button onClick={onPrevious}>Prev</button>
      <button onClick={onNext}>Next</button>
    </div>
  ),
}));

jest.mock("../Components/Elements/EventCalendar/CalendarGrid", () => ({
  __esModule: true,
  default: ({ weeks, monthName }) => (
    <div data-testid="calendar-grid">
      Grid for {monthName}, {weeks.length} weeks
    </div>
  ),
}));

jest.mock("../Components/Elements/EventCalendar/EventNotes", () => ({
  __esModule: true,
  default: ({ events }) => (
    <div data-testid="event-notes">Notes: {events.length} events</div>
  ),
}));

// -------------------
// Mock the hook properly
// -------------------
jest.mock("../Components/Elements/EventCalendar/useCalendarLogic", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("EventCalendar component", () => {
  let mockGoToPreviousMonth, mockGoToNextMonth;

  beforeEach(() => {
    mockGoToPreviousMonth = jest.fn();
    mockGoToNextMonth = jest.fn();

    useCalendarLogic.mockReturnValue({
      year: 2025,
      month: 9,
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      events: [{ id: 1, title: "Test Event" }],
      weeks: [[], [], [], []],
      goToPreviousMonth: mockGoToPreviousMonth,
      goToNextMonth: mockGoToNextMonth,
      getEventsForDate: jest.fn(),
      isToday: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders sidebar, header, and grid correctly", () => {
    render(<EventCalendar />);

    expect(screen.getByTestId("event-notes")).toHaveTextContent("1 events");
    expect(screen.getByTestId("calendar-header")).toHaveTextContent("9/2025");
    expect(screen.getByTestId("calendar-grid")).toHaveTextContent("September");
  });

  it("calls goToPreviousMonth when Prev is clicked", () => {
    render(<EventCalendar />);
    fireEvent.click(screen.getByText("Prev"));
    expect(mockGoToPreviousMonth).toHaveBeenCalledTimes(1);
  });

  it("calls goToNextMonth when Next is clicked", () => {
    render(<EventCalendar />);
    fireEvent.click(screen.getByText("Next"));
    expect(mockGoToNextMonth).toHaveBeenCalledTimes(1);
  });

  it("falls back to December if month index is out of range", () => {
    useCalendarLogic.mockReturnValueOnce({
      year: 2025,
      month: 15, // invalid index
      months: [],
      events: [],
      weeks: [[]],
      goToPreviousMonth: jest.fn(),
      goToNextMonth: jest.fn(),
      getEventsForDate: jest.fn(),
      isToday: jest.fn(),
    });

    render(<EventCalendar />);
    expect(screen.getByTestId("calendar-grid")).toHaveTextContent("December");
  });
});

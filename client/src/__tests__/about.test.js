import { render, screen, waitFor, within } from "@testing-library/react";
import About from "../Components/Pages/About";
import axios from "axios";
import { jest, beforeAll, afterAll, describe, it, expect } from '@jest/globals';

jest.mock("axios");

// Silence console output during tests
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

describe("About component", () => {

  it("renders loading state initially", () => {
    render(<About />);
    expect(screen.getByText(/Loading executive members/i)).toBeInTheDocument();
  });

  it("renders president and other members after successful API call", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          {
            _id: "1",
            first_name: "John",
            last_name: "Doe",
            position: "President",
            image_path: "president.png",
          },
          {
            _id: "2",
            first_name: "Jane",
            last_name: "Smith",
            position: "Vice President",
            image_path: "vp.png",
          },
          {
            _id: "3",
            first_name: "Alice",
            last_name: "Brown",
            position: "Secretary",
            image_path: "secretary.png",
          },
        ],
      },
    });

    render(<About />);

    await waitFor(() => {
      // President card
      const presidentCard = screen.getByText(/John Doe/i).closest('div');
      expect(within(presidentCard).getByText(
        (content, element) => element.tagName.toLowerCase() === 'p' && content === 'President'
      )).toBeInTheDocument();

      // Vice President card
      const vpCard = screen.getByText(/Jane Smith/i).closest('div');
      expect(within(vpCard).getByText(
        (content, element) => element.tagName.toLowerCase() === 'p' && content === 'Vice President'
      )).toBeInTheDocument();

      // Secretary card
      const secCard = screen.getByText(/Alice Brown/i).closest('div');
      expect(within(secCard).getByText(
        (content, element) => element.tagName.toLowerCase() === 'p' && content === 'Secretary'
      )).toBeInTheDocument();
    });
  });

  it("renders error message when API fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    render(<About />);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to fetch executive members/i)
      ).toBeInTheDocument();
    });
  });

  it("handles case when no president is found", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        success: true,
        data: [
          {
            _id: "2",
            first_name: "Jane",
            last_name: "Smith",
            position: "Vice President",
            image_path: "vp.png",
          },
        ],
      },
    });

    render(<About />);

    await waitFor(() => {
      const vpCard = screen.getByText(/Jane Smith/i).closest('div');
      expect(within(vpCard).getByText(
        (content, element) => element.tagName.toLowerCase() === 'p' && content === 'Vice President'
      )).toBeInTheDocument();
    });

    // Ensure no President card exists
    const allPresidents = screen.queryAllByText(
      (content, element) => element.tagName.toLowerCase() === 'p' && content === 'President'
    );
    expect(allPresidents.length).toBe(0);
  });
});

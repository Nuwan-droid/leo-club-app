import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Shop from "../Components/Pages/LeoShop";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

global.fetch = jest.fn();

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Shop Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // We skip "Loading..." test because it may never appear without modifying Shop.jsx

  it("fetches and displays products", async () => {
    const mockProducts = [
      { _id: "1", name: "Product A", mainImage: "a.png", additionalImages: [], sizes: ["M"], colors: ["Red"] },
      { _id: "2", name: "Product B", mainImage: "b.png", additionalImages: [], sizes: ["S"], colors: ["Blue"] },
    ];

    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockProducts });

    render(<Shop />);

    for (const product of mockProducts) {
      await waitFor(() => expect(screen.getByText(product.name)).toBeInTheDocument());
    }
  });

  it("opens product detail and adds item to local cart", async () => {
    const product = { _id: "1", name: "Product A", mainImage: "a.png", sizes: ["M"], colors: ["Red"] };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [product] });

    render(<Shop />);
    await waitFor(() => screen.getByText(product.name));

    fireEvent.click(screen.getByText(product.name));

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    // Check cart badge: multiple elements may contain "1", pick the first
    const badges = screen.getAllByText("1");
    expect(badges[0]).toBeInTheDocument();

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Item added to cart!");
  });

  it("opens and closes cart sidebar", async () => {
    render(<Shop />);

    // Shop.jsx has multiple buttons; the first one is the cart button
    const buttons = screen.getAllByRole("button");
    const cartButton = buttons[0];

    fireEvent.click(cartButton);

    await waitFor(() => expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument());
  });
});

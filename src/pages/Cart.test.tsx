import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { useCartStore } from "../store/useCartStore";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

jest.mock("../store/useCartStore");
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Cart Component", () => {
  const mockNavigate = jest.fn();
  const mockClearCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockUpdateQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        cart: mockCartItems,
        clearCart: mockClearCart,
        removeFromCart: mockRemoveFromCart,
        updateQuantity: mockUpdateQuantity,
      })
    );
  });

  let mockCartItems: any[] = [];

  const renderCart = () =>
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

  // Test 1
  test("renders empty cart message", () => {
    mockCartItems = [];

    renderCart();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /continue shopping/i })
    ).toHaveAttribute("href", "/");
  });

  // Test 2 - Render items
  test("renders cart items correctly", () => {
    mockCartItems = [
      {
        id: "1",
        title: "Milk",
        price: 10,
        discountedPrice: 8,
        quantity: 2,
        image: "milk.png",
      },
    ];

    renderCart();

    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("2 × 8 kr")).toBeInTheDocument();
    expect(screen.getByText("16 kr")).toBeInTheDocument();
  });
});

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

  type MockCartItem = {
    id: string;
    title: string;
    price: number;
    discountedPrice: number;
    quantity: number;
    image?: string;
  };

  let mockCartItems: MockCartItem[] = [];

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

  // Test 2
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
    expect(screen.getByText("2 × 8.00 kr")).toBeInTheDocument();
    expect(screen.getByText("16.00 kr")).toBeInTheDocument();
  });

  // Test 3
  test("removes item when trash button is clicked", () => {
    mockCartItems = [
      { id: "1", title: "Milk", price: 10, discountedPrice: 8, quantity: 1 },
    ];

    renderCart();

    const trashButton = screen.getByRole("button", { name: "" });
    fireEvent.click(trashButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith("1");
    expect(toast.success).toHaveBeenCalledWith("Removed from cart", {
      className: "toast-success",
    });
  });

  // Test 4
  test("updates quantity when + or - buttons are clicked", () => {
    mockCartItems = [
      { id: "1", title: "Milk", price: 10, discountedPrice: 8, quantity: 2 },
    ];

    renderCart();

    const plusButton = screen.getByText("+");
    const minusButton = screen.getByText("-");

    fireEvent.click(plusButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith("1", 3);

    fireEvent.click(minusButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith("1", 1);
  });

  // Test 5
  test("clears cart when 'Clear Cart' is clicked", () => {
    mockCartItems = [
      { id: "1", title: "Milk", price: 10, discountedPrice: 8, quantity: 1 },
    ];

    renderCart();

    const clearButton = screen.getByRole("button", { name: /clear cart/i });
    fireEvent.click(clearButton);

    expect(mockClearCart).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Cart cleared!", {
      className: "toast-success",
    });
  });

  // Test 6
  test("navigates to checkout and clears cart", () => {
    mockCartItems = [
      { id: "1", title: "Milk", price: 10, discountedPrice: 8, quantity: 1 },
    ];

    renderCart();

    const checkoutBtn = screen.getByRole("button", {
      name: /continue to checkout/i,
    });

    fireEvent.click(checkoutBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/checkout-success");
    expect(mockClearCart).toHaveBeenCalled();
  });
});

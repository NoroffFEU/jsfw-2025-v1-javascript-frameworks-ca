import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

jest.mock("../store/useCartStore", () => ({
  useCartStore: (selector: (state: { cartCount: () => number }) => unknown) =>
    selector({ cartCount: () => 3 }),
}));

describe("Header Component", () => {
  // Test 1
  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Shopella")).toBeInTheDocument();
  });

  // Test 2
  test("displays cart count when > 0", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getAllByText("3")[0]).toHaveClass("cart-count");
  });
});

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

describe("Cart Component", () => {
  let mockCartItems: any[] = [];

  const renderCart = () =>
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
});

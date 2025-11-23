import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { useApi } from "../hooks/useApi";
import { useCartStore } from "../store/useCartStore";
import { toast } from "react-toastify";

jest.mock("../hooks/useApi");
jest.mock("../store/useCartStore");
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

const mockedUseApi = useApi as jest.MockedFunction<typeof useApi>;
const mockedUseCartStore = useCartStore as jest.MockedFunction<any>;

describe("ProductDetail Component", () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseCartStore.mockReturnValue({ addToCart: mockAddToCart });
  });

  const mockProduct = {
    id: "1",
    title: "Milk",
    price: 10,
    discountedPrice: 8,
    rating: 4,
    description: "Fresh milk",
    image: { url: "milk.png", alt: "Milk" },
    tags: ["dairy", "fresh"],
    reviews: [
      { username: "Alice", rating: 5, description: "Great!" },
      { username: "Bob", rating: 3, description: "Okay" },
    ],
  };

  const renderProductDetail = () =>
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );
});

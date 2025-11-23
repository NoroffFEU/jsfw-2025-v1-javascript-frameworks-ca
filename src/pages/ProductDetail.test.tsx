import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  test("renders loading state", () => {
    mockedUseApi.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    renderProductDetail();
    expect(screen.getByText(/loading product/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    mockedUseApi.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    renderProductDetail();
    expect(screen.getByText(/error loading product/i)).toBeInTheDocument();
  });

  test("renders product details", () => {
    mockedUseApi.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });
    renderProductDetail();

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProduct.discountedPrice} kr`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockProduct.price} kr`)).toBeInTheDocument();
    expect(screen.getByText(/-20% OFF/i)).toBeInTheDocument();
    expect(screen.getByText(/4\/5/)).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByText(/Bob/)).toBeInTheDocument();
    expect(screen.getByText("#dairy")).toBeInTheDocument();
    expect(screen.getByText("#fresh")).toBeInTheDocument();
  });

  test("add to cart button works", async () => {
    mockedUseApi.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });
    renderProductDetail();

    fireEvent.click(screen.getByText(/add to cart/i));

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalled();
    });

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: mockProduct.id,
      title: mockProduct.title,
      price: mockProduct.price,
      discountedPrice: mockProduct.discountedPrice,
      quantity: 1,
      image: mockProduct.image.url,
    });

    expect(toast.success).toHaveBeenCalledWith("Added to cart!", {
      className: "toast-success",
    });
  });
});

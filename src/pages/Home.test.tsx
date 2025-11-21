import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { useApi } from "../hooks/useApi";

jest.mock("../hooks/useApi");

const mockedUseApi = useApi as jest.MockedFunction<typeof useApi>;

describe("Home Component", () => {
  const mockProducts = [
    {
      id: "1",
      title: "Milk",
      price: 10,
      discountedPrice: 8,
      rating: 4,
      image: { url: "milk.png", alt: "Milk" },
    },
    {
      id: "2",
      title: "Bread",
      price: 5,
      rating: 3,
      image: { url: "bread.png", alt: "Bread" },
    },
  ];

  beforeEach(() => {
    mockedUseApi.mockReturnValue({
      data: mockProducts,
      isLoading: false,
      isError: false,
    });
  });

  const renderHome = () =>
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

  test("renders product titles", () => {
    renderHome();
    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.getByText("Bread")).toBeInTheDocument();
  });

  test("clicking a product renders a Link element", () => {
    renderHome();

    const milkLink = screen.getByRole("link", { name: /milk/i });
    expect(milkLink).toHaveAttribute("href", "/product/1");
  });

  test("search filters products", () => {
    renderHome();

    const input = screen.getByPlaceholderText("Search products...");
    fireEvent.change(input, { target: { value: "Milk" } });

    expect(screen.getByText("Milk")).toBeInTheDocument();
    expect(screen.queryByText("Bread")).not.toBeInTheDocument();
  });

  test("clear search button clears input", () => {
    renderHome();

    const input = screen.getByPlaceholderText("Search products...");
    fireEvent.change(input, { target: { value: "Milk" } });

    const clearBtn = screen.getByRole("button");
    fireEvent.click(clearBtn);

    expect(input).toHaveValue("");
  });

  test("sorts products by price: low to high", () => {
    renderHome();

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "price-asc" } });

    const titles = screen
      .getAllByRole("heading", { level: 5 })
      .map((el) => el.textContent);

    expect(titles).toEqual(["Bread", "Milk"]);
  });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
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
});

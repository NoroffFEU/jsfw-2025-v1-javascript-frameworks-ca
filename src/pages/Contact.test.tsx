import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "../pages/Contact";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Contact Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields", () => {
    render(<Contact />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please complete all required fields",
        {
          className: "toast-error",
        }
      );
    });

    expect(
      screen.getByText(/Full name must be at least 3 characters long./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Subject must be at least 3 characters long./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Message must be at least 10 characters long./i)
    ).toBeInTheDocument();
  });

  test("submits successfully when fields are valid", async () => {
    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "Test Subject" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Hello world!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Message sent successfully!", {
        className: "toast-success",
      });
    });

    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
    expect(screen.getByLabelText(/subject/i)).toHaveValue("");
    expect(screen.getByLabelText(/email/i)).toHaveValue("");
    expect(screen.getByLabelText(/message/i)).toHaveValue("");
  });
});

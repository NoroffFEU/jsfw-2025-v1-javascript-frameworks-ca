import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useCartStore } from "../store/useCartStore";
import "../styles/success.css";
import { toast } from "react-toastify";

/**
 * CheckoutSuccess Component
 *
 * Displays a confirmation screen after a successful checkout.
 * Clears the user's cart and shows a success toast notification.
 * Includes a checkmark icon, confirmation message, and a button
 * to navigate back to the home page.
 *
 * @component
 * @returns {JSX.Element} Checkout success confirmation view
 */
const CheckoutSuccess = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  // Clear cart
  useEffect(() => {
    clearCart();
    toast.success("Order placed!", {
      className: "toast-success",
    });
  }, [clearCart]);

  return (
    <div className="glass-container checkout-success d-flex flex-column justify-content-center align-items-center text-center">
      <FaCheckCircle className="icon-success mb-3" />
      <h1 className="fw-bold mb-3">Checkout Successful!</h1>
      <p className="mb-4">
        Thank you for your purchase. Your order has been placed successfully!
      </p>
      <button className="navigate-btn px-5 py-2" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CheckoutSuccess;

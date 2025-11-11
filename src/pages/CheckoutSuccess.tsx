import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/cart.css";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-success d-flex flex-column justify-content-center align-items-center text-center">
      <FaCheckCircle className="text-success mb-3" />
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

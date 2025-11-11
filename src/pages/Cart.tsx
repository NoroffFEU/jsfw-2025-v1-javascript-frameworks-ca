import { useCartStore } from "../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate("/checkout-success");
  };

  if (cart.length === 0) {
    return (
      <div className="container glass-container empty-box text-center mt-2">
        <h1 className="fs-4 mb-5">Your cart is empty.</h1>
        <Link to="/" className="navigate-btn empty-btn text-decoration-none">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Your Cart</h1>
    </div>
  );
};

export default Cart;

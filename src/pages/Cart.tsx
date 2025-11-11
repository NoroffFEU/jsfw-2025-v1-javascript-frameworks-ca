import { useCartStore } from "../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate("/checkout-success");
  };

  if (cart.length === 0) {
    return (
      <div className="container glass-container py-5 text-center">
        <h1 className="fs-3 mb-4">Your cart is empty.</h1>
        <Link to="/" className="navigate-btn px-5 py-2 text-decoration-none">
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

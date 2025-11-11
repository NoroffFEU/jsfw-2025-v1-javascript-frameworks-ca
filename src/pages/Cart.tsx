import { useCartStore } from "../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
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
    <div className="container glass-container mt-2 py-4 px-4">
      <h1 className="fw-bold mb-4">Shopping Bag</h1>

      <div>
        {cart.map((item) => (
          <div
            key={item.id}
            className="cart-items d-flex align-items-center justify-content-between mb-3 p-3"
          >
            <div className="d-flex align-items-center gap-3">
              <img
                src={
                  item.image ||
                  "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"
                }
                alt={item.title}
                className="img-fluid cart-img"
              />
              <div>
                <h2 className="mb-1 fs-5">{item.title}</h2>
                <p className="mb-0 text-muted small">
                  {item.quantity} × {item.discountedPrice || item.price} kr
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-4">
              <div className="d-flex gap-2">
                <span className="fw-bold text-error">
                  {(item.discountedPrice || item.price) * item.quantity} kr
                </span>
                <span className="text-muted text-decoration-line-through">
                  {item.price} kr
                </span>
              </div>
              <button
                className="trash-btn mb-1"
                onClick={() => removeFromCart(item.id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="clear-btn fw-bold" onClick={clearCart}>
          Clear Cart
        </button>
        <h3 className="mb-0 fs-4">Total: {totalPrice.toFixed(2)} kr</h3>
      </div>

      <button className="checkout-btn mt-4 fw-bold" onClick={handleCheckout}>
        Continue to Checkout
      </button>
    </div>
  );
};

export default Cart;

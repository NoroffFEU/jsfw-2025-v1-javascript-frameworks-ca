import { useCartStore } from "../store/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "../styles/cart.css";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalPrice = cart.reduce(
    (sum, i) => sum + (i.discountedPrice || i.price) * i.quantity,
    0
  );

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout-success");
    clearCart();
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
            className="cart-items d-flex flex-column flex-sm-row align-items-md-center justify-content-between mb-3 p-3"
          >
            <div className="d-flex align-items-center gap-3">
              <Link
                to={`/product/${item.id}`}
                className="text-decoration-none text-black d-flex align-items-center gap-3"
              >
                <img
                  src={
                    item.image ||
                    "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"
                  }
                  alt={item.title}
                  className="cart-img"
                />
                <div>
                  <h2 className="mb-1 fs-5">{item.title}</h2>
                  <p className="mb-0 text-muted">
                    {item.quantity} × {item.discountedPrice || item.price} kr
                  </p>
                </div>
              </Link>
            </div>

            <div className="d-flex flex-column align-items-end w-md-auto gap-2">
              <div className="d-flex gap-2 align-items-center">
                <span className="fw-bold text-error">
                  {(item.discountedPrice || item.price) * item.quantity} kr
                </span>
                <span className="text-muted text-decoration-line-through">
                  {item.price * item.quantity} kr
                </span>
                <button
                  className="trash-btn mb-1"
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.success("Removed from cart", {
                      className: "toast-success",
                    });
                  }}
                >
                  <FaTrashAlt />
                </button>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="quantity-input"
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                />
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="clear-btn fw-bold"
          onClick={() => {
            clearCart();
            toast.success("Cart cleared!", {
              className: "toast-success",
            });
          }}
        >
          Clear Cart
        </button>
        <h3 className="mb-0 fs-4">Total: {totalPrice.toFixed(2)} kr</h3>
      </div>

      <div className="d-flex justify-content-end">
        <button className="checkout-btn mt-4 fw-bold" onClick={handleCheckout}>
          Continue to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

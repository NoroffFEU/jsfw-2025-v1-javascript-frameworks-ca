import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Product } from "../interfaces/product";
import { FaStar } from "react-icons/fa";
import "../styles/products.css";

/**
 * ProductDetail Component
 *
 * Displays detailed information about a single product fetched from the API.
 * Includes title, description, price (with discount if applicable),
 * rating, reviews, tags and an "Add to Cart" button.
 *
 * @component
 * @returns {JSX.Element} Product detail view
 */
const ProductDetail = () => {
  // Extract product ID from URL parameters
  const { id } = useParams<{ id: string }>();

  // Fetch product data from API with useApi hook
  const {
    data: product,
    isLoading,
    isError,
  } = useApi<Product>(`https://v2.api.noroff.dev/online-shop/${id}`);

  // Handle loading and error states
  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Error loading product.</p>;
  if (!product) return <p>Product not found.</p>;

  /**
   * Calculates the discount percentage based on the original price
   * and discounted price. Returns 0 if there's no valid discount.
   */
  const discount =
    product.discountedPrice && product.discountedPrice < product.price
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Image */}
        <div className="col-md-6">
          <img
            src={
              product.image?.url ||
              "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"
            }
            alt={product.image?.alt || product.title}
            className="img-fluid image-detail"
          />
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-4">
              {product.tags.map((tag) => (
                <span key={tag} className="tags text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="col-md-6">
          <div className="mt-4 d-flex align-items-center justify-content-between">
            <h2 className="fw-bold">{product.title}</h2>
            {/* Rating */}
            <div className="d-flex align-items-center fw-bold mb-2 rating">
              <FaStar className="text-warning me-1" />
              <span>{product.rating ?? "N/A"}/5</span>
            </div>
          </div>
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="badge error-color mb-2 mt-2">
              -{discount}% OFF
            </span>
          )}

          {/* Product Price (with discount if applicable) */}
          <div className="mb-3">
            {product.discountedPrice &&
            product.discountedPrice < product.price ? (
              <>
                <span className="fs-4 fw-bold text-error me-2">
                  {product.discountedPrice} kr
                </span>
                <span className="text-muted text-decoration-line-through">
                  {product.price} kr
                </span>
              </>
            ) : (
              <span className="fs-4 fw-bold">{product.price} kr</span>
            )}
          </div>

          {/* Description */}
          <p>{product.description}</p>

          {/* Add to Cart */}
          <button className="add-btn mt-2 px-4 py-2">Add to Cart</button>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-5">
              <h5 className="fw-bold mb-2">Reviews</h5>
              {product.reviews.map((r, i) => (
                <div key={i} className="mb-2 reviews-box">
                  <strong>{r.username || "Anonymous"}</strong>
                  <div className="d-flex align-items-center small mt-1 fw-bold">
                    <FaStar className="me-1 text-warning" /> {r.rating}/5
                  </div>
                  <p className="mb-0">{r.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

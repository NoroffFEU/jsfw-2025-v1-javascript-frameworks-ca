import { useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";
import { Product } from "../interfaces/product";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/home.css";

/**
 * Home Page Component
 *
 * Fetches and displays a list of products from the Noroff Online Shop API.
 * Each product card shows the image, title, price, discount, and rating.
 *
 * @component
 * @returns {JSX.Element} A responsive grid of product cards
 */
const Home = () => {
  // Fetch products using the useApi hook
  const {
    data: products = [],
    isLoading,
    isError,
  } = useApi<Product[]>("https://v2.api.noroff.dev/online-shop");

  // Search and sorting states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc"
  >("default");

  /**
   * Calculates the discount percentage based on the original price
   * and discounted price. Returns 0 if there's no valid discount.
   */
  const calculateDiscount = (price: number, discountedPrice: number) => {
    if (!discountedPrice || discountedPrice >= price) return 0;
    return Math.round(((price - discountedPrice) / price) * 100);
  };

  /**
   * Filter products based on search term
   */
  const filteredProducts = useMemo(() => {
    return (products ?? []).filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  /**
   * Sort filtered products based on price or name
   */
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => {
          const priceA = a.discountedPrice ?? a.price;
          const priceB = b.discountedPrice ?? b.price;
          return priceA - priceB;
        });

      case "price-desc":
        return sorted.sort((a, b) => {
          const priceA = a.discountedPrice ?? a.price;
          const priceB = b.discountedPrice ?? b.price;
          return priceB - priceA;
        });

      case "name-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));

      case "name-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));

      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Handle loading and error states
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products</p>;

  // Make sure products is an array before rendering
  if (!products || !Array.isArray(products)) {
    return <p>No products found.</p>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4 fw-bold text-center">All Products</h1>
      {/* Search & Sort Controls */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-4 gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select w-50"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Product grid layout */}
      {sortedProducts.length === 0 ? (
        <p className="text-center text-muted mt-4">No results found.</p>
      ) : (
        <div className="row g-4">
          {sortedProducts.map((p) => {
            const discount = calculateDiscount(p.price, p.discountedPrice ?? 0);

            return (
              <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <Link
                  to={`/product/${p.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="product-card card h-100 border-0 shadow-sm position-relative">
                    {discount > 0 && (
                      <div className="discount-badge position-absolute end-0 top-0 m-2">
                        -{discount}%
                      </div>
                    )}
                    <img
                      src={
                        p.image?.url ||
                        "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"
                      }
                      alt={p.image?.alt || p.title}
                      className="card-img-top product-img"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-2">{p.title}</h5>
                      <p className="product-price mb-1">
                        {p.discountedPrice && p.discountedPrice < p.price ? (
                          <>
                            <span className="text-error fw-bold me-2">
                              {p.discountedPrice} kr
                            </span>
                            <span className="text-decoration-line-through text-muted">
                              {p.price} kr
                            </span>
                          </>
                        ) : (
                          <span className="fw-bold">{p.price} kr</span>
                        )}
                      </p>
                      <div className="d-flex align-items-center gap-1 mt-2">
                        <FaStar className="text-warning" />
                        <span className="text-muted small">
                          {p.rating ?? "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;

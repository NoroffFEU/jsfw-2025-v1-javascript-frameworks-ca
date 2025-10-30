import { useApi } from "../hooks/useApi";
import { Product } from "../interfaces/product";
import { FaStar } from "react-icons/fa";
import "../styles/home.css";

const Home = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useApi<Product[]>("https://v2.api.noroff.dev/online-shop");

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products</p>;

  if (!products || !Array.isArray(products)) {
    return <p>No products found.</p>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4 fw-bold text-center">All Products</h1>

      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="product-card card h-100 border-0 shadow-sm">
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

                <div>
                  <p className="product-price mb-1">
                    {p.discountedPrice && p.discountedPrice < p.price ? (
                      <>
                        <span className="text-decoration-line-through text-muted me-2">
                          {p.price} kr
                        </span>
                        <span className="text-danger fw-bold">
                          {p.discountedPrice} kr
                        </span>
                      </>
                    ) : (
                      <span className="fw-bold">{p.price} kr</span>
                    )}
                  </p>

                  <div className="d-flex align-items-center gap-1 mt-2">
                    <FaStar />
                    <span className="text-muted small">
                      {p.rating ?? "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

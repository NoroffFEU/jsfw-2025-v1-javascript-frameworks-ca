import { useApi } from "../hooks/useApi";
import { Product } from "../interfaces/product";

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useApi<Product[]>("https://api.noroff.dev/api/v1/online-shop");

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="container-fluid">
      <h1>All Products</h1>
      <div className="row">
        {products?.map((p) => (
          <div key={p.id} className="col-md-3 mb-4">
            <div className="card p-3 text-start shadow-sm">
              <img
                src={
                  p.image?.url ||
                  "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"
                }
                alt={p.image?.alt || p.title}
                className="img-fluid mb-3 rounded"
              />

              <h5>{p.title}</h5>
              <p>{p.price} kr</p>
              <p>{p.discountedPrice} kr</p>
              <p>{p.rating}</p>
              <p>{p.tags}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

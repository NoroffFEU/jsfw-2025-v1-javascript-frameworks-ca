import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Product } from "../interfaces/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
  } = useApi<Product>(`https://v2.api.noroff.dev/online-shop/${id}`);

  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Error loading product.</p>;
  if (!product) return <p>Product not found.</p>;

  const discount =
    product.discountedPrice && product.discountedPrice < product.price
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  return <div className="container"></div>;
};

export default ProductDetail;

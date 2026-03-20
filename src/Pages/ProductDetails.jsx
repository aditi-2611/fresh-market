import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`https://fresh-market-backend.onrender.com/api/products/{id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product");
        }

        setProduct(data.product);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <h2>Loading product...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="container product-detail">
      <div className="detail-left">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="detail-right">
        <h2>{product.name}</h2>
        <p className="detail-price">₹{product.price}</p>

        <p>
          {product.description ||
            "Fresh and high-quality product delivered directly to your home. 100% natural and premium quality."}
        </p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

import { useParams } from "react-router-dom";
import products from "../Data/products";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = products.find(item => item.id === parseInt(id));

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
          Fresh and high-quality product delivered directly to your home.
          100% natural and premium quality.
        </p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

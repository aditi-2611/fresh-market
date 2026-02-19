import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    // Reset button after 1.5 seconds
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <span className="badge">10% Off</span>

      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      
      <div className="product-info">
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h4>{product.name}</h4>
        </Link>

        <div className="rating">
          ⭐⭐⭐⭐☆
          <span>(4.3)</span>
        </div>

        <div className="price-add">
          <p className="price">₹{product.price}</p>

          <button
            onClick={handleAddToCart}
            className={added ? "added-btn" : ""}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

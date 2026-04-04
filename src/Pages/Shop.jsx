import { useState, useContext, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { CartContext } from "../Context/CartContext";

function Shop() {
  const { searchQuery } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["All", "Fruits", "Dairy", "Bakery"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let url = "http://localhost:5000/api/products";
        const params = new URLSearchParams();

        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (sortOption === "low") {
          params.append("sort", "asc");
        } else if (sortOption === "high") {
          params.append("sort", "desc");
        }

        // 🔥 BACKEND SEARCH
        if (searchQuery.trim()) {
          params.append("search", searchQuery);
        }

        const finalUrl = params.toString()
          ? `${url}?${params.toString()}`
          : url;

        const response = await fetch(finalUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortOption, searchQuery]);

  return (
    <div className="container">
      <h2>Shop Products</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Shop;
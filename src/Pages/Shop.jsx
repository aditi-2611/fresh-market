import { useState, useContext } from "react";
import products from "../Data/products";
import ProductCard from "../Components/ProductCard";
import { CartContext } from "../Context/CartContext";

function Shop() {
  const { searchQuery } = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const categories = ["All", "Fruits", "Dairy", "Bakery"];

  let filteredProducts = products;

  // 🔎 SEARCH FILTER
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 🏷 CATEGORY FILTER
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  // 💰 SORTING
  if (sortOption === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOption === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="container">
      <h2>Shop Products</h2>

      {/* Filters */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
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

      <div className="product-grid">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Shop;

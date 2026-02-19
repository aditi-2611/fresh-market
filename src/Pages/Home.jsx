import products from "../Data/products";
import ProductCard from "../Components/ProductCard";

function Home() {
  return (
    <div className="container">

      <div className="hero">
  <div className="hero-left">
    <h1>Free Shipping on orders over ₹100</h1>
    <p>Fresh groceries delivered to your doorstep.</p>
    <button className="hero-btn">Shop Now</button>
  </div>

  <div className="hero-right">
    <img
      src="https://images.unsplash.com/photo-1610832958506-aa56368176cf"
      alt="groceries"
    />
  </div>
</div>

{/* Featured Categories */}
<h2 className="section-title">Featured Categories</h2>

<div className="category-grid">
  <div className="category-card">
    <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c" alt="Cleaning" />
    <p>Cleaning Essentials</p>
  </div>

  <div className="category-card">
    <img src="https://images.unsplash.com/photo-1601758003122-53c40e686a19" alt="Pet Care" />
    <p>Pet Care</p>
  </div>

  <div className="category-card">
    <img src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" alt="Fruits" />
    <p>Fruits & Vegetables</p>
  </div>

  <div className="category-card">
    <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Drinks" />
    <p>Beverages</p>
  </div>
</div>


      {/* PRODUCT GRID */}
      <h2 style={{ marginTop: "40px" }}>Popular Products</h2>

      <div className="product-grid">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

{/* Feature Section */}
<div className="features">
  <div className="feature-card">
    <div className="icon">⏱</div>
    <h4>10 Minute Grocery</h4>
    <p>Get your order delivered fast at your doorstep.</p>
  </div>

  <div className="feature-card">
    <div className="icon">💰</div>
    <h4>Best Prices & Offers</h4>
    <p>Save more with top discounts and cashback deals.</p>
  </div>

  <div className="feature-card">
    <div className="icon">📦</div>
    <h4>Wide Assortment</h4>
    <p>Choose from 5000+ products across all categories.</p>
  </div>

  <div className="feature-card">
    <div className="icon">🔄</div>
    <h4>Easy Returns</h4>
    <p>Not satisfied? Get a refund within hours.</p>
  </div>
</div>

    </div>
  );
}

export default Home;


import { useState, useEffect } from "react";

function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
.then((data) => setProducts(data.products));  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product Added Successfully ✅");

        setName("");
        setPrice("");
        setCategory("");
        setImage(null);

        setProducts([...products, data.product]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert("Deleted successfully");

        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };


 return (
  <div className="admin-container">
    
    <h1 className="admin-title">Admin Panel</h1>
    <p className="admin-subtitle">Welcome Admin 👩‍💻</p>




{/* ADD PRODUCT */}
<div className="admin-form-wrapper">

  <div className="admin-card">
    <h2>Add Product</h2>

    <form onSubmit={handleAddProduct}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="admin-input"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="admin-input"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="admin-input"
        required
      />

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setImage(file);
          setPreview(URL.createObjectURL(file));
        }}
      />

      {/* IMAGE PREVIEW */}
      {preview && (
        <img
          src={preview}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            marginTop: "10px",
            borderRadius: "8px"
          }}
        />
      )}

      <button className="admin-btn">Add Product</button>
    </form>
  </div>

</div>


    {/* PRODUCTS */}
    <h2 style={{ marginTop: "40px" }}>All Products</h2>

    <div className="product-grid">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <h3>{p.name}</h3>
          <p className="product-price">₹{p.price}</p>

          <button
            onClick={() => handleDelete(p.id)}
            className="delete-btn"
          >
            Delete ❌
          </button>
        </div>
      ))}
    </div>

  </div>
);

}
export default Admin;
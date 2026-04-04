import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* {item.image && (
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.name}
              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
            />
          )} */}

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p style={{ margin: "4px 0" }}>Price: ₹{item.price}</p>
            <p style={{ margin: "4px 0" }}>Quantity: {item.quantity}</p>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{ color: "red", marginLeft: "8px" }}
            >
              Remove
            </button>
          </div>

          <p style={{ fontWeight: "bold" }}>
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;
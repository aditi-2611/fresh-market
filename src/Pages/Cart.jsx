import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
            borderRadius: "8px"
          }}
        >
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>

          <button onClick={() => increaseQuantity(item.id)}>+</button>
          <button onClick={() => decreaseQuantity(item.id)}>-</button>
        </div>
      ))}

      <h2>Total: ₹{totalPrice}</h2>
    </div>
  );
}

export default Cart;

// import { createContext, useState } from "react";

// export const CartContext = createContext();

// function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");


//   const addToCart = (product) => {
//     const existingProduct = cart.find(item => item.id === product.id);

//     if (existingProduct) {
//       setCart(
//         cart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   const increaseQuantity = (id) => {
//     setCart(
//       cart.map(item =>
//         item.id === id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (id) => {
//     setCart(
//       cart
//         .map(item =>
//           item.id === id
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter(item => item.quantity > 0)
//     );
//   };

//   return (
//     <CartContext.Provider
//   value={{
//     cart,
//     addToCart,
//     increaseQuantity,
//     decreaseQuantity,
//     searchQuery,
//     setSearchQuery
//   }}
// >

//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;


import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ add this back
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${user.id}`);
      const data = await res.json();
      if (data.success) setCart(data.cart);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });
      const data = await res.json();
      if (data.success) setCart(data.cart);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const increaseQuantity = async (cartItemId) => {
    try {
      await fetch(`http://localhost:5000/api/cart/increase/${cartItemId}`, {
        method: "PUT",
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  const decreaseQuantity = async (cartItemId) => {
    try {
      await fetch(`http://localhost:5000/api/cart/decrease/${cartItemId}`, {
        method: "PUT",
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
        method: "DELETE",
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice,
        searchQuery,       // ✅ added back
        setSearchQuery,    // ✅ added back
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
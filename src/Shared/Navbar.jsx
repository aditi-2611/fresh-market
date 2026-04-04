import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

function Navbar() {
const { user, logout } = useContext(AuthContext);
const { searchQuery, setSearchQuery } = useContext(CartContext);
const navigate = useNavigate();

const handleLogout = () => {
logout();
navigate("/login");
};

const handleLogin = () => {
navigate("/login");
};

return ( <div className="navbar"> <div className="nav-container">

    {/* LOGO */}
    <h2 className="logo">
      <img
  src="https://thumbs.dreamstime.com/b/vegetables-shopping-cart-trolley-grocery-logo-icon-design-vector-171090350.jpg"
  alt="logo"
  style={{ width: "50px", height: "50px" }}
/>
      <span>FreshMart</span>
    </h2>

    {/* SEARCH BAR */}
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
    </div>

    {/* NAV LINKS */}
    <div className="nav-links">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "active-link" : ""
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) =>
          isActive ? "active-link" : ""
        }
      >
        Shop
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "active-link" : ""
        }
      >
        Cart
      </NavLink>

      {user ? (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="logout-btn">
          Login / Signup
        </button>
      )}
    </div>

  </div>
</div>

);
}

export default Navbar;

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-container">

        <h2 className="logo">FreshMart</h2>

        <div className="nav-links">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Home
          </NavLink>

          <NavLink 
            to="/shop"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Shop
          </NavLink>

          <NavLink 
            to="/cart"
            className={({ isActive }) => isActive ? "active-link" : ""}
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

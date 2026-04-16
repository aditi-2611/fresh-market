import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Login() {
const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const { setUser } = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  console.log("Login clicked");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

  const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user); // ✅ IMPORTANT

      alert("Login Successful");

      
    if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
    }

    } else {
      setError(data.message || "Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    setError("Server not reachable");
  }


};

return ( <div className="login-container"> <h2>Login</h2>


  <form onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Enter Password"
       value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    {error && (
      <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
    )}

    <button type="submit">Login</button>
  </form>

  <p>
    Don't have an account?{" "}
    <span onClick={() => navigate("/signup")}>Signup</span>
  </p>
</div>


);
}

export default Login;

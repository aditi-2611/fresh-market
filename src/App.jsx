

// import { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthContext } from "./Context/AuthContext";

// import Navbar from "./Shared/Navbar";
// import Footer from "./Shared/Footer";

// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import Home from "./Pages/Home";
// import Shop from "./Pages/Shop";
// import Cart from "./Pages/Cart";

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <>
//       {/* Show Navbar only if logged in */}
//       {user && <Navbar />}

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           path="/"
//           element={user ? <Home /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/shop"
//           element={user ? <Shop /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/cart"
//           element={user ? <Cart /> : <Navigate to="/login" />}
//         />
//       </Routes>

//       {/* Show Footer only if logged in */}
//       {user && <Footer />}
//     </>
//   );
// }

// export default App;

import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup /> }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/shop"
          element={user ? <Shop /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {user && <Footer />}
    </>
  );
}

export default App;

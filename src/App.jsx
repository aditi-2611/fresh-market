import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import About from "./Pages/About";
import HelpCenter from "./Pages/HelpCenter";
import Terms from "./Pages/Terms";
import Payments from "./Pages/Payments";
import Shipping from "./Pages/Shipping";
import Returns from "./Pages/Returns";
import FAQs from "./Pages/FAQs";
import Contact from "./Pages/Contact";
import WalletFAQs from "./Pages/WalletFAQs";

import Admin from "./Pages/Admin";




//import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />

     
      <Routes>
        
        <Route path="/about" element={<About />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wallet-faqs" element={<WalletFAQs />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/admin" element={<Admin />} />

      <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />


        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/shop" element={user ? <Shop /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />

        <Route path="*" element={<div style={{ padding: "40px" }}>Fallback page</div>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
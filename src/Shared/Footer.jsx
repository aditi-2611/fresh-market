import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Get to know us</h4>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/help-center" className="footer-link">Help Center</Link>
          <Link to="/terms" className="footer-link">Terms and condition</Link>
        </div>

        <div className="footer-column">
          <h4>For Consumers</h4>
          <Link to="/payments" className="footer-link">Payments</Link>
          <Link to="/shipping" className="footer-link">Shipping</Link>
          <Link to="/returns" className="footer-link">Product Returns</Link>
        </div>

        <div className="footer-column">
          <h4>Help</h4>
          <Link to="/faqs" className="footer-link">FAQs</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
          <Link to="/wallet-faqs" className="footer-link">FC Wallet FAQs</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 FreshCart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
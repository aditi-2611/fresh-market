import React from "react";

function Shipping() {
  return (
    <div className="policy-container">
      <div className="policy-box">
        <h1>Shipping Policy</h1>

        <p>
          Fresh Market ensures timely and safe delivery of your groceries.
        </p>

        <h2>Delivery Time</h2>
        <p>
          Orders are delivered within the selected time slot. Same-day delivery is available in most areas.
        </p>

        <h2>Delivery Charges</h2>
        <ul>
          <li>Free delivery on orders above ₹500</li>
          <li>₹30 delivery charge for orders below ₹500</li>
        </ul>

        <h2>Order Tracking</h2>
        <p>
          You can track your order from your account dashboard.
        </p>

        <h2>Service Areas</h2>
        <p>
          We currently deliver in selected cities and are expanding rapidly.
        </p>
      </div>
    </div>
  );
}

export default Shipping;
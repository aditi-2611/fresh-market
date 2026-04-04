import React from "react";

function Returns() {
  return (
    <div className="policy-container">
      <div className="policy-box">
        <h1>Return & Refund Policy</h1>

        <p>
          Customer satisfaction is our priority. If you are not happy with your order, we are here to help.
        </p>

        <h2>Return Policy</h2>
        <ul>
          <li>Products can be returned within 48 hours of delivery</li>
          <li>Items must be unused and in original condition</li>
        </ul>

        <h2>Non-Returnable Items</h2>
        <ul>
          <li>Perishable goods like fruits & vegetables</li>
          <li>Opened or used items</li>
        </ul>

        <h2>Refund Process</h2>
        <p>
          Refunds are processed within 3–7 working days to your original payment method.
        </p>

        <h2>Damaged Products</h2>
        <p>
          If you receive damaged items, contact us immediately for replacement or refund.
        </p>
      </div>
    </div>
  );
}

export default Returns;
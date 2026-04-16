import React from "react";

function Help() {
  return (
    <div className="help-container">
      <div className="help-box">
        <h1>Help Center</h1>
        <p>How can we help you?</p>

        <div className="help-section">
          <h3> Orders</h3>
          <p>Track, cancel or modify your orders easily.</p>
        </div>

        <div className="help-section">
          <h3> Payments</h3>
          <p>Get help with payment methods, refunds, and transactions.</p>
        </div>

        <div className="help-section">
          <h3> Delivery</h3>
          <p>Know about delivery time, slots, and charges.</p>
        </div>

        <div className="help-section">
          <h3> Contact Support</h3>
          <p>Reach out to our support team anytime.</p>
        </div>
      </div>
    </div>
  );
}

export default Help;
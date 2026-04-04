import React from "react";

function Payment() {
  return (
    <div className="policy-container">
      <div className="policy-box">
        <h1>Payment Policy</h1>

        <p>
          At Fresh Market, we offer multiple secure payment options for your convenience.
        </p>

        <h2>Available Payment Methods</h2>
        <ul>
          <li>Cash on Delivery (COD)</li>
          <li>UPI (Google Pay, PhonePe, Paytm)</li>
          <li>Debit / Credit Cards</li>
          <li>Net Banking</li>
        </ul>

        <h2>Secure Payments</h2>
        <p>
          All transactions are encrypted and secure. We do not store your payment details.
        </p>

        <h2>Failed Transactions</h2>
        <p>
          If your payment fails but amount is deducted, it will be refunded within 3–5 working days.
        </p>
      </div>
    </div>
  );
}

export default Payment;
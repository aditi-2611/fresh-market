import React, { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register?",
      answer:
        "You can register by clicking on the Sign Up option and filling in your details."
    },
    {
      question: "Is registration free?",
      answer: "Yes, registration on Fresh Market is completely free."
    },
    {
      question: "What payment methods are available?",
      answer:
        "We support Cash on Delivery, UPI, Debit/Credit Cards, and Net Banking."
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery time depends on your selected slot. We provide same-day delivery in most areas."
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order before the cut-off time."
    },
    {
      question: "What if I receive a damaged product?",
      answer:
        "You can return or request a replacement within 48 hours of delivery."
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact us through the Contact page, email, or phone support."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;



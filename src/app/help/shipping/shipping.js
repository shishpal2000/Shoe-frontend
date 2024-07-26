"use client";

import { useState } from "react";
import style from "../../../styles/help.module.css";

const faqData = [
  {
    question: "1). FAST BUILDING?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "2). CAREFULLY PLANNED",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "3). PERFECT DESIGN",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "4). FAST BUILDING?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "5). CAREFULLY PLANNED",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "6). PERFECT DESIGN",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
];

const FaqItem = ({ question, answer, isActive, onClick }) => {
  return (
    <li className={style.faqItem}>
      <div
        className={`${style.question} ${isActive ? style.active : ""}`}
        onClick={onClick}
      >
        {question}
        <p></p>
      </div>
      {isActive && <div className={style.answer}>{answer}</div>}
    </li>
  );
};

const Shipping = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  return (
    <>
      <div className={style.helpMainContainer}>
        <div className="container">
          <div className={style.helpInnerItems}>
            <div className={style.helpTagBar}>
              <h2>
                Shipping Policy <sup>Flexible Ordering Experience</sup>
              </h2>
              <p>
                Familiarize yourself with our cancellation policy to make
                changes to your order with ease.
              </p>
            </div>

            <ul className={style.helpPointsContainer}>
              <li>
                <h4>LOREM IPSUM</h4>
                <p>
                  Orders can be canceled within 24 hours of placement for a full
                  refund.
                </p>
              </li>

              <li>
                <h4>LOREM IPSUM</h4>
                <p>
                  Visit our Order Management section to cancel your order
                  effortlessly.
                </p>
              </li>

              <li>
                <h4>LOREM IPSUM</h4>
                <p>
                  Refunds for canceled orders are processed within 5-7 business
                  days.
                </p>
              </li>
            </ul>

            <div className={style.helpTagBar}>
              <h2>
                Questions? We Have Answers. <sup>FAQ</sup>
              </h2>
              <p>
                Ease into the world of Klothink with clarity. Our FAQs cover a
                spectrum of topics, ensuring you have the information you need
                for a seamless shopping experience.
              </p>
            </div>

            <ul className={style.faqItems}>
              {faqData.map((item, index) => (
                <FaqItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isActive={index === activeIndex}
                  onClick={() => handleClick(index)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;

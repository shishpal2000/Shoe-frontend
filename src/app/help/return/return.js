"use client";

import { useState } from "react";
import style from "../../../styles/help.module.css";

const faqStageFirst = [
  {
    question: "Can I modify my order after placing it?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "How do I initiate a return?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "How can I unsubscribe from the newsletter?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "Do you offer exchanges for products?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
];

const faqStageSecond = [
  {
    question: "How can I place an order on Klothink?",
    answer:
      "Ordering is easy! Simply browse our website, add items to your cart, and proceed to checkout. Follow the prompts to enter your details and complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "What is your shipping policy?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
];

const faqStageThird = [
  {
    question: "Are there any additional fees for returns?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "How do I create an account on Klothink?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "Can I change my account information?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    question: "Are my personal details secure on Klothink?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
];

const FaqItem = ({ question, answer, isActive, onClick }) => {
  return (
    <li
      id={style.faqItem}
      className={`${style.question} ${isActive ? style.active : ""}`}
      onClick={onClick}
    >
      <div className={style.bar}>
        <h3>{question}</h3>
        <p></p>
      </div>
      {isActive && <div className={style.answer}>{answer}</div>}
    </li>
  );
};

const Return = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [activeIndex3, setActiveIndex3] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleClick2 = (index2) => {
    setActiveIndex2(index2 === activeIndex2 ? null : index2);
  };

  const handleClick3 = (index3) => {
    setActiveIndex3(index3 === activeIndex3 ? null : index3);
  };
  return (
    <>
      <div className={style.helpMainContainer}>
        <div className="container">
          <div className={style.helpInnerItems}>
            <div className={style.helpTagBar}>
              <h2>
                Return Policy <sup>Flexible Ordering Experience</sup>
              </h2>
              <p>
                Explore our hassle-free return policy designed to ensure your
                satisfaction with every purchase.
              </p>
            </div>

            <ul className={style.helpPointsContainer}>
              <li>
                <h4>Eligibility</h4>
                <p>
                  Items must be unused, with tags attached, and returned within
                  30 days of delivery.
                </p>
              </li>

              <li>
                <h4>Process</h4>
                <p>
                  Initiate returns through our Return Center for a smooth and
                  efficient process.
                </p>
              </li>

              <li>
                <h4>Refund</h4>
                <p>
                  Expect a refund to your original payment method within 7-10
                  business days .
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

            <div className={style.faqListContainer}>
              <ul className={style.faqItems}>
                {faqStageFirst.map((item, index) => (
                  <FaqItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isActive={index === activeIndex}
                    onClick={() => handleClick(index)}
                  />
                ))}
              </ul>

              <ul className={style.faqItems}>
                {faqStageSecond.map((item, index2) => (
                  <FaqItem
                    key={index2}
                    question={item.question}
                    answer={item.answer}
                    isActive={index2 === activeIndex2}
                    onClick={() => handleClick2(index2)}
                  />
                ))}
              </ul>

              <ul className={style.faqItems}>
                {faqStageThird.map((item, index3) => (
                  <FaqItem
                    key={index3}
                    question={item.question}
                    answer={item.answer}
                    isActive={index3 === activeIndex3}
                    onClick={() => handleClick3(index3)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Return;

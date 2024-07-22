"use client";
import { useState } from "react";
import "./filter.css";
import styles from "../../styles/productFilter.module.css";

const ProductFilter = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const categories = [
    {
      name: "Refine by",
      ulStyle: "refinedLink",
      subcategories: [
        { name: "Mens", type: "button" },
        { name: "casual", type: "button" },
      ],
    },
    {
      name: "size",
      ulStyle: "size",
      subcategories: [
        {
          name: "38",
          type: "button",
        },
        {
          name: "39",
          type: "button",
        },
        {
          name: "40",
          type: "button",
        },
        {
          name: "41",
          type: "button",
        },
        {
          name: "42",
          type: "button",
        },
        {
          name: "43",
          type: "button",
        },
        {
          name: "44",
          type: "button",
        },
        {
          name: "45",
          type: "button",
        },
      ],
    },
    {
      name: "colour",
      ulStyle: "colour",
      subcategories: [
        { color: "#4A69E2", type: "button" },
        { color: "#FFA52F", type: "button" },
        { color: "#232321", type: "button" },
        { color: "#234D41", type: "button" },
        { color: "#F08155", type: "button" },
        { color: "#C9CCC6", type: "button" },
        { color: "#677282", type: "button" },
        { color: "#925513", type: "button" },
      ],
    },

    {
      name: "Shoe Category",
      ulStyle: "Category",
      subcategories: [
        { val: "Casual shoes", type: "checkbox" },
        { val: "Runners", type: "checkbox" },
        { val: "Hiking", type: "checkbox" },
        { val: "Sneaker", type: "checkbox" },
        { val: "Basketball", type: "checkbox" },
        { val: "Golf", type: "checkbox" },
        { val: "Outdoor", type: "checkbox" },
      ],
    },

    {
      name: "gender",
      ulStyle: "gender",
      subcategories: [
        { val: "men", type: "checkbox" },
        { val: "women", type: "checkbox" },
      ],
    },

    {
      name: "price",
      subcategories: [],
    },
  ];

  return (
    <div className={styles.fliterMainContainer}>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Filters</h2>
        <div className={styles.fliterList}>
          {categories.map((category, index) => (
            <div key={index} className={styles.category}>
              <div
                className={styles.categoryHeader}
                onClick={() => toggleCategory(index)}
              >
                <p>
                  {category.icon} {category.name}
                </p>
                <figure className={styles.arrow}>
                  <img
                    src={openCategory === index ? "/up.svg" : "/down.svg"}
                    alt={openCategory === index ? "Collapse" : "Expand"}
                    className={styles.arrowIcon}
                  />
                </figure>
              </div>
              {openCategory === index && (
                <ul className={`${category.ulStyle}`}>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex} className={styles.subcategory}>
                      <input
                        style={{ backgroundColor: `${subcategory.color}` }}
                        type={subcategory.type}
                        value={subcategory.name}
                        id={`subcategory-${index}-${subIndex}`}
                      />
                      <label htmlFor={`subcategory-${index}-${subIndex}`}>
                        {subcategory.val}{" "}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

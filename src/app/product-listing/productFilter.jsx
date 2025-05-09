"use client";

import { useState } from "react";
import "./filter.css";
import styles from "../../styles/productFilter.module.css";

const ProductFilter = ({ filterOptions = {}, onFilterChange }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleFilterChange = (e, filterType) => {
    const { value, type, checked } = e.target;

    setSelectedFilters(prevFilters => {
      const newFilters = { ...prevFilters };

      if (type === 'checkbox') {
        if (checked) {
          if (!newFilters[filterType]) newFilters[filterType] = [];
          newFilters[filterType].push(value);
        } else {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        }
      } else {
        newFilters[filterType] = value; // For single select inputs (like radio buttons)
      }

      console.log('Updated filters:', newFilters); // Log updated filters
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const categories = [
    {
      name: "Refine by",
      ulStyle: "refinedLink",
      subcategories: filterOptions.parentCategories?.map(parent => ({
        id: parent._id,
        name: parent.name,
        type: "button"
      })) || [],
    },
    {
      name: "Size",
      ulStyle: "size",
      subcategories: filterOptions.sizes?.map(size => ({ name: size, type: "button" })) || [],
    },
    {
      name: "Colour",
      ulStyle: "colour",
      subcategories: filterOptions.colors?.map(color => ({ color, type: "button" })) || [],
    },
    {
      name: "Shoe Category",
      ulStyle: "refinedLink",
      subcategories: filterOptions.childCategories?.map(child => ({
        name: child.name,
        type: "button",
        image: child.image
      })) || [],
    },
    {
      name: "Gender",
      ulStyle: "gender",
      subcategories: filterOptions.genders?.map(gender => ({ val: gender, type: "checkbox" })) || [],
    },
    {
      name: "Price",
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
                <p>{category.name}</p>
                <figure className={styles.arrow}>
                  <img
                    src={openCategory === index ? "/up.svg" : "/down.svg"}
                    alt={openCategory === index ? "Collapse" : "Expand"}
                    className={styles.arrowIcon}
                  />
                </figure>
              </div>
              {openCategory === index && (
                <ul className={category.ulStyle || styles.defaultUlStyle}>
                  {category.subcategories.length > 0 ? (
                    category.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex} className={styles.subcategory}>
                        {subcategory.color ? (
                          <input
                            style={{ backgroundColor: subcategory.color }}
                            type={subcategory.type}
                            value={subcategory.name || subcategory.val}
                            id={`subcategory-${index}-${subIndex}`}
                            onChange={(e) => handleFilterChange(e, category.name.toLowerCase())}
                          />
                        ) : (
                          <input
                            type={subcategory.type}
                            value={subcategory.name || subcategory.val}
                            id={`subcategory-${index}-${subIndex}`}
                            onChange={handleFilterChange}
                          />
                        )}
                        <label htmlFor={`subcategory-${index}-${subIndex}`}>
                          {subcategory.val}
                        </label>
                      </li>
                    ))
                  ) : (
                    <li>No Data available</li>
                  )}
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

"use client";

import InnerBanner from "@/components/InnerPageBanner/InnerBanner";
import ProductList from "./productList";
import style from "../../styles/productListing.module.css";
import ProductFilter from "./productFilter";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductListing = () => {
  const [isActive, setIsActive] = useState(false);
  const [istrendActive, setTrendIsActive] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product/filters");
        setFilterOptions(response.data.data.filters);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product/get-all-products", {
          params: selectedFilters
        });
        setProducts(response.data.data || []); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log("Fetching products with filters:", selectedFilters);
    fetchProducts();
  }, [selectedFilters]);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const trendtoggleClass = () => {
    setTrendIsActive(!istrendActive);
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  return (
    <>
      <InnerBanner
        tag="Shoes"
        heading="Bestseller Shoe"
        bgImg="/productListingBg.png"
        descrip={`Shoes made with your comfort in mind so you can put all of your \n focus into your next session.`}
      />

      <div className={style.productListingMain}>
        <div className="container">
          <div className={style.topBar}>
            <div className={style.content}>
              <h2>Life Style Shoes</h2>
              <p>{products.length} items</p> {/* Ensure products is always an array */}
            </div>
            <div className={style.trendingDrop} onClick={trendtoggleClass}>
              Trending <img src="/down.svg" alt="" />
              <ul className={istrendActive ? style.activetrendDrop : style.trendDrop}>
                <li>9</li>
                <li>9</li>
                <li>9</li>
                <li>9</li>
                <li>9</li>
                <li>9</li>
              </ul>
            </div>
          </div>
          <div className={style.productListingItems}>
            <div className={style.phoneFilterButton} onClick={toggleClass}>
              <figure>
                <img src="/filter.png" alt="" />
              </figure>
            </div>
            <div className={isActive ? style.activeFliter : style.left}>
              <ProductFilter filterOptions={filterOptions} onFilterChange={handleFilterChange} />
            </div>
            <div className={style.right}>
              <ProductList products={products} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;

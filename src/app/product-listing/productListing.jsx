"use client";

import InnerBanner from "@/components/InnerPageBanner/InnerBanner";
import ProductList from "./productList";
import style from "../../styles/productListing.module.css";
import ProductFilter from "./productFilter";
import { useState } from "react";

const ProductListing = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
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
              <p>122 items</p>
            </div>
            <div className={style.trendingDrop}>
              Trending <img src="/down.svg" alt="" />
            </div>
          </div>
          <div className={style.productListingItems}>
            <div className={style.phoneFilterButton} onClick={toggleClass}>
              <figure>
                <img src="/filter.png" alt="" />
              </figure>
            </div>
            <div className={isActive ? style.activeFliter : style.left}>
              <ProductFilter />
            </div>
            <div className={style.right}>
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;

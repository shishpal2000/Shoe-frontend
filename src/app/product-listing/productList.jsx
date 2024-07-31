"use client";

import PRODUCTS_DATA from "./PRODUCTS_DATA";
import style from "../../styles/productList.module.css";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ProductList = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  return (
    <>
      <div className="productListMain">
        <div className={style.productListItems}>
          {PRODUCTS_DATA.map(
            ({ id, proName, realprice, offerPrice, tag, link }) => {
              return (
                <Link
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  href={link}
                  className={style.card}
                  key={id}
                >
                  <div className={style.tag}>{tag}</div>
                  <div className={style.proImg}>
                    <figure>
                      <img className={style.img1} src="/pro-1.png" alt="" />
                      <img className={style.img2} src="/pro-2.png" alt="" />
                    </figure>
                  </div>

                  <div className={style.proDetail}>
                    <p className={style.proName}>{proName}</p>

                    <div className={style.bar}>
                      <div className={style.price}>
                        <p className={style.realPrice}>
                          <del>{realprice}</del>
                        </p>
                        <p className={style.offerPrice}>{offerPrice}</p>
                      </div>
                      <div className={style.learnMore}>
                        <img src="learnMore.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;

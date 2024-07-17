"use client";

import PRODUCTS_DATA from "./PRODUCTS_DATA";
import style from "../../styles/productFilter.module.css";

const ProductList = () => {
  return (
    <>
      <div className="productListMain">
        <div className="container">
          <div className="productListItems">
            {PRODUCTS_DATA.map(({ id, proName, realprice, offerPrice }) => {
              return (
                <>
                  <div className="card" key={id}>
                    <div className="tag"></div>
                    <div className="proImg">
                      <figure>
                        <img src="/shoe-1.svg" alt="" />
                      </figure>

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
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

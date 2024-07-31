"use client";

import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import style from "../../styles/cart.module.css";
import Link from "next/link";
import Collection from "@/components/homePage/ShoeCollection/Collection";
import { useState } from "react";

const Cart = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const [isQunActive, setQunIsActive] = useState(false);

  const quntoggleClass = () => {
    setQunIsActive(!isQunActive);
  };
  return (
    <>
      <PageLinkBar currentPage="Cart" />

      <div className={style.cartMainContainer}>
        <div className="container">
          <div className={style.cartItemsContainer}>
            <div className={style.left}>
              <div className={style.cartDetail}>
                <h3>Your Cart</h3>
                <p className={style.cardLine}>
                  Items in your bag not reserved- check out now to make them
                  yours.
                </p>

                <div className={style.shortProDescrip}>
                  <div className={style.ProImg}>
                    <figure>
                      <img src="/cart.png" alt="" />
                    </figure>
                  </div>
                  <div className={style.descrip}>
                    <div className={style.descripItems}>
                      <h3>DROPSET TRAINER SHOES</h3>
                      <p>Men’s Road Running Shoes</p>
                      <p>Enamel Blue/ University White</p>

                      <ul className={style.selectOpt}>
                        <li>
                          <div
                            className={style.sizeDropdown}
                            onClick={toggleClass}
                          >
                            SIZE 10{" "}
                            <figure>
                              <img src="/down.svg" alt="" />
                            </figure>
                          </div>
                          <ul
                            className={
                              isActive ? style.activeSizeDrop : style.sizeDrop
                            }
                          >
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                          </ul>
                        </li>
                        <li>
                          <div
                            className={style.quantityDropdown}
                            onClick={quntoggleClass}
                          >
                            Quantity 1{" "}
                            <figure>
                              <img src="/down.svg" alt="" />
                            </figure>
                          </div>

                          <ul
                            className={
                              isQunActive
                                ? style.activeQuanDrop
                                : style.quanDrop
                            }
                          >
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                            <li>9</li>
                          </ul>
                        </li>
                      </ul>

                      <ul className={style.actionOpt}>
                        <li>
                          <Link href="">
                            <figure>
                              <img src="/wishlist.svg" alt="" />
                            </figure>
                          </Link>
                        </li>

                        <li>
                          <Link href="">
                            <figure>
                              <img src="/Bin.svg" alt="" />
                            </figure>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h3>$125.00</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.right}>
              <h3>Order Summary</h3>

              <ul>
                <li>
                  <div className={style.type}>1 ITEM</div>
                  <div className={style.val}>$125.00</div>
                </li>

                <li>
                  <div className={style.type}>Delivery</div>
                  <div className={style.val}>$6.99</div>
                </li>

                <li>
                  <div className={style.type}>Sales Tax</div>
                  <div className={style.val}>-</div>
                </li>

                <li>
                  <h3>Total</h3>
                  <h3>$136.99</h3>
                </li>
              </ul>

              <div className={style.checkoutBtn}>
                <Link href="/checkout">
                  <button>Checkout</button>
                </Link>
              </div>

              <p className={style.promo}>
                <Link href="">User a promo code</Link>
              </p>
            </div>
          </div>

          <div className={style.relatedProduct}>
            <h2>Related Products</h2>
            <Collection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

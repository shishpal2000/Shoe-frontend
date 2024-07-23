import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import style from "../../styles/checkout.module.css";
import Link from "next/link";

const Checkout = () => {
  return (
    <>
      <PageLinkBar currentPage="Checkout" />

      <div className={style.checkoutMainContaier}>
        <div className="container">
          <div className={style.checkoutInnerItems}>
            <div className={style.left}>
              <div className={style.checkoutLeft}>
                <p>
                  <Link href="/credential/log-in">
                    Login and Checkout faster
                  </Link>
                </p>

                <form>
                  <h2>Contact Details</h2>
                  <p>
                    We will use these details to keep you inform about your
                    delivery.
                  </p>

                  <ul>
                    <li>
                      <label>Email*</label>
                      <input type="email" placeholder="Emali" required />
                    </li>
                    <li></li>
                  </ul>

                  <div className={style.billingDetail}>
                    <h3>Billing Details</h3>
                    <ul>
                      <li>
                        <label>First Name*</label>
                        <input type="text" placeholder="First Name*" required />
                      </li>

                      <li>
                        <label>Last Name*</label>
                        <input type="text" placeholder="Last Name" required />
                      </li>

                      <li>
                        <label>Country / Region*</label>
                        <input
                          type="text"
                          placeholder="Country / Region"
                          required
                        />
                      </li>

                      <li>
                        <label>Company Name</label>
                        <input
                          type="text"
                          placeholder="Company (optional)"
                          required
                        />
                      </li>

                      <li>
                        <label>Street Address*</label>
                        <input
                          type="text"
                          placeholder="House number and street name"
                          required
                        />
                      </li>

                      <li>
                        <label>Apt, suite, unit</label>
                        <input
                          type="text"
                          placeholder="apartment, suite, unit, etc. (optional)"
                          required
                        />
                      </li>

                      <ul className={style.addressForm}>
                        <li>
                          <label>City*</label>
                          <input
                            type="text"
                            placeholder="Town / City"
                            required
                          />
                        </li>
                        <li>
                          <label>State*</label>
                          <input type="text" placeholder="State" required />
                        </li>
                        <li>
                          <label>Postal Code*</label>
                          <input
                            type="text"
                            placeholder="Postal Code"
                            required
                          />
                        </li>
                      </ul>

                      <li>
                        <label>Phone*</label>
                        <input type="text" placeholder="Phone" required />
                      </li>
                    </ul>

                    <ul className={style.safeInfor}>
                      <li>
                        <input type="checkbox" required />
                        <p>Save my information for a faster checkouts</p>
                      </li>
                    </ul>
                  </div>

                  <div className={style.shippingAddress}>
                    <h3>Shipping Address</h3>
                    <p>
                      Select the address that matches your card or payment
                      method.
                    </p>

                    <ul className={style.addressDropdown}>
                      <li>
                        <input type="radio" id="" name="Address" value="" />
                        <label htmlFor="">Same as Billing address</label>
                      </li>
                      <li>
                        <input type="radio" id="" name="Address" value="" />
                        <label htmlFor="">
                          Use a different shipping address
                        </label>
                      </li>
                    </ul>
                  </div>

                  <div className={style.shippingMethod}>
                    <h3>Shipping Method</h3>

                    <ul className={style.methodDetail}>
                      <li>
                        <p>Arrives by Monday, June 7</p>
                      </li>
                      <li>
                        <p>
                          Delivery Charges
                          <span>Additional fess may apply</span>
                        </p>
                        <p>$5.00</p>
                      </li>
                    </ul>
                  </div>

                  <li className={style.submitBtn}>
                    <input type="submit" value="Complete Order" />
                  </li>
                </form>
              </div>
            </div>

            <div className={style.right}>
              <div className={style.orderSummary}>
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
              </div>

              <div className={style.orderDetails}>
                <h3>Order Details</h3>

                <div className={style.orderDetailItems}>
                  <div className={style.proImg}>
                    <figure>
                      <img src="/cart.png" alt="" />
                    </figure>
                  </div>
                  <div className={style.proDetail}>
                    <h4>DROPSET TRAINER SHOES</h4>
                    <p>Men’s Road Running Shoes</p>
                    <p>Enamel Blue/ University White</p>

                    <ul className={style.quantity}>
                      <li>Size 10</li>
                      <li>Quantity 1</li>
                    </ul>

                    <h3>$130.00</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

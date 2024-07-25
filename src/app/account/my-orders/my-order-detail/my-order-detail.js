import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import style from "../../../../styles/myAccount.module.css";
import styles from "../../../../styles/myOrder.module.css";
const OrderTrackDetail = () => {
  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="My Orders" />
        <div className="container">
          <div className={style.myAccountInnerItems}>
            <div className={style.left}>
              <MyAccountSideBar />
            </div>
            <div className={style.right}>
              <div className={styles.myOrderDetailBar}>
                <h4>My Orders</h4>
                <div className={styles.orderDetail}>
                  <div className={styles.left}>
                    <h4>Order no: #123456789</h4>
                    <p>
                      <span>Order Date :</span> 2 June 2023 2:40 PM
                    </p>
                    <p>
                      <span>Estimated Delivery Date :</span> 8 June 2023
                    </p>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.trackTag}>
                      Track order{" "}
                      <figure>
                        <img src="/trackLoc.svg" alt="" />
                      </figure>
                    </div>
                    <p>
                      <span>Order Status :</span> Inprogress
                    </p>
                    <p>
                      <span>Payment Method :</span> Cash on delivery
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.orderTrackBar}>
                <ul>
                  <li>
                    <h3>Order Confirmed</h3>
                    <i></i>
                    <p>Wed, 11 th Jan</p>
                  </li>

                  <li>
                    <h3>Shipped</h3>
                    <i></i>
                    <p>Wed, 11 th Jan</p>
                  </li>

                  <li>
                    <h3>Out For Delivery</h3>
                    <i></i>
                    <p>Wed, 11 th Jan</p>
                  </li>

                  <li>
                    <h3>Delivered</h3>
                    <i></i>
                    <p>Expected by, Mon 16th</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTrackDetail;

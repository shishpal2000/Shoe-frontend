"use client";
import { useState, useEffect } from "react";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../styles/myAccount.module.css";
import styles from "../../../styles/myOrder.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import Link from "next/link";
import axios from "axios";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("orderActive");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          throw new Error("No authentication token or user ID found");
        }
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user-orders/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(response.data.orders);
        console.log(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const openPage = (pageName) => {
    setActiveTab(pageName);
  };

  const [isActive, setIsActive] = useState(false);
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const MyOrderList = orders.filter(order => order.orderStatus === "Processing");
  const MyCancelOrderList = orders.filter(order => order.orderStatus === "Pending");
  const MyCompleteOrderList = orders.filter(order => order.orderStatus === "Paid");

  return (
    <div className={style.myAccountMainContainer}>
      <MyAccoutPageLinkBar currentPage="My Orders" />
      <div className="container">
        <div className={style.myAccountInnerItems}>
          <div className={style.phoneFilterButton} onClick={toggleClass}>
            <figure>
              <img src="/user.svg" alt="" />
            </figure>
          </div>
          <div className={isActive ? style.activeFliter : style.left}>
            <MyAccountSideBar />
          </div>
          <div className={style.right}>
            <div>
              <div className={styles.tabOptContainer}>
                <h2>My Orders</h2>
                <div className={styles.tab}>
                  <button
                    className={styles.tablink}
                    style={{
                      backgroundColor: activeTab === "orderActive" ? "#f7f7fb" : "",
                      borderBottom: activeTab === "orderActive" ? "3px solid #000" : "",
                      fontWeight: activeTab === "orderActive" ? "600" : "",
                    }}
                    onClick={() => openPage("orderActive")}
                  >
                    Active
                  </button>
                  <button
                    className={styles.tablink}
                    style={{
                      backgroundColor: activeTab === "oderCancelled" ? "#f7f7fb" : "",
                      borderBottom: activeTab === "oderCancelled" ? "3px solid #000" : "",
                      fontWeight: activeTab === "oderCancelled" ? "600" : "",
                    }}
                    onClick={() => openPage("oderCancelled")}
                  >
                    Cancelled
                  </button>
                  <button
                    className={styles.tablink}
                    style={{
                      backgroundColor: activeTab === "orderCompleted" ? "#f7f7fb" : "",
                      borderBottom: activeTab === "orderCompleted" ? "3px solid #000" : "",
                      fontWeight: activeTab === "orderCompleted" ? "600" : "",
                    }}
                    onClick={() => openPage("orderCompleted")}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div
                id="orderActive"
                className={styles.tabcontent}
                style={{ display: activeTab === "orderActive" ? "block" : "none" }}
              >
                <ul className={styles.orderList}>
                  {MyOrderList.length > 0 ? (
                    MyOrderList.map(order => (
                      <li key={order.orderId}>
                        <div className={styles.orderDetail}>
                          <div className={styles.left}>
                            <h4>Order no: {order.orderNumber}</h4>
                            <p><span>Order Date :</span> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><span>Estimated Delivery Date :</span> {order.deliveryDate || "TBD"}</p>
                          </div>
                          <div className={styles.right} style={{ textAlign: "right" }}>
                            <p><span>Order Status :</span> {order.orderStatus}</p>
                            <p><span>Payment Method :</span> {order.paymentMethod || "Razorpay"}</p>
                          </div>
                        </div>
                        {order.cartItems.map(item => (
                          <div className={styles.productDetail} key={item.productName}>
                            <div className={styles.left}>
                              <figure>
                                <img src={item.productImage[0].url} alt={item.productName} />
                              </figure>
                              <div>
                                <h4>{item.productName}</h4>
                                <p><span>Colour :</span> {item.color || "N/A"}</p>
                                <p><span>Qty :</span> {item.quantity}</p>
                                <p><span>Total :</span> ${item.price}</p>
                              </div>
                            </div>
                            <div className={styles.right}>
                              <Link href={`/account/my-orders/${order.orderId}`}>View Detail</Link>
                            </div>
                          </div>
                        ))}
                      </li>
                    ))
                  ) : (
                    <p>No active orders found.</p>
                  )}
                </ul>
              </div>

              {/* Cancelled Orders */}
              <div
                id="oderCancelled"
                className={styles.tabcontent}
                style={{ display: activeTab === "oderCancelled" ? "block" : "none" }}
              >
                <ul className={styles.orderList}>
                  {MyCancelOrderList.length > 0 ? (
                    MyCancelOrderList.map(order => (
                      <li key={order.orderId}>
                        <div className={styles.orderDetail}>
                          <div className={styles.left}>
                            <h4>Order no: {order.orderNumber}</h4>
                            <p><span>Order Date :</span> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><span>Estimated Delivery Date :</span> {order.deliveryDate || "TBD"}</p>
                          </div>
                          <div className={styles.right} style={{ textAlign: "right" }}>
                            <p><span>Order Status :</span> {order.orderStatus}</p>
                            <p><span>Payment Method :</span> {order.paymentMethod || "Razorpay"}</p>
                          </div>
                        </div>
                        {order.cartItems.map(item => (
                          <div className={styles.productDetail} key={item.productName}>
                            <div className={styles.left}>
                              <figure>
                                <img src={item.productImage[0].url} alt={item.productName} />
                              </figure>
                              <div>
                                <h4>{item.productName}</h4>
                                <p><span>Colour :</span> {item.color || "N/A"}</p>
                                <p><span>Qty :</span> {item.quantity}</p>
                                <p><span>Total :</span> ${item.price}</p>
                              </div>
                            </div>
                            <div className={styles.right}>
                              <Link href={`/account/my-orders/my-order-detail/${order.orderId}`}>View Detail</Link>
                            </div>
                          </div>
                        ))}
                      </li>
                    ))
                  ) : (
                    <p>No cancelled orders found.</p>
                  )}
                </ul>
              </div>

              {/* Completed Orders */}
              <div
                id="orderCompleted"
                className={styles.tabcontent}
                style={{ display: activeTab === "orderCompleted" ? "block" : "none" }}
              >
                <ul className={styles.orderList}>
                  {MyCompleteOrderList.length > 0 ? (
                    MyCompleteOrderList.map(order => (
                      <li key={order.orderId}>
                        <div className={styles.orderDetail}>
                          <div className={styles.left}>
                            <h4>Order no: {order.orderNumber}</h4>
                            <p><span>Order Date :</span> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><span>Estimated Delivery Date :</span> {order.deliveryDate || "TBD"}</p>
                          </div>
                          <div className={styles.right} style={{ textAlign: "right" }}>
                            <p><span>Order Status :</span> {order.orderStatus}</p>
                            <p><span>Payment Method :</span> {order.paymentMethod || "Razorpay"}</p>
                          </div>
                        </div>
                        {order.cartItems.map(item => (
                          <div className={styles.productDetail} key={item.productName}>
                            <div className={styles.left}>
                              <figure>
                                <img src={item.productImage[0].url} alt={item.productName} />
                              </figure>
                              <div>
                                <h4>{item.productName}</h4>
                                <p><span>Colour :</span> {item.color || "N/A"}</p>
                                <p><span>Qty :</span> {item.quantity}</p>
                                <p><span>Total :</span> ${item.price}</p>
                              </div>
                            </div>
                            <div className={styles.right}>
                              <Link href={`/account/my-orders/${order.orderId}`}>View Detail</Link>
                            </div>
                          </div>
                        ))}
                      </li>
                    ))
                  ) : (
                    <p>No completed orders found.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

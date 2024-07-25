"use client";
import { useState } from "react";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../styles/myAccount.module.css";
import styles from "../../../styles/myOrder.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import Link from "next/link";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("orderActive");

  const openPage = (pageName) => {
    setActiveTab(pageName);
  };

  const MyOrderList = [
    {
      id: 1,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Inprogress",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },

    {
      id: 2,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Inprogress",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },

    {
      id: 3,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Inprogress",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },
  ];

  const MyCancelOrderList = [
    {
      id: 1,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Cancelled",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },

    {
      id: 2,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Cancelled",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },

    {
      id: 3,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Cancelled",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },
  ];

  const MyCompleteOrderList = [
    {
      id: 1,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Completed",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },

    {
      id: 2,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Completed",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },

    {
      id: 3,
      orderNo: "#123456789",
      timeDate: "2 June 2023 2:40 PM",
      deliveryDate: "8 June 2023",
      orderStatus: "Completed",
      paymentMethod: "Cash on delivery",
      proImg: "/pro-1-1.png",
      proName: "Black Printed T-shirt",
      color: "Pink",
      quantity: "1",
      price: `$23.00`,
    },
  ];

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
              <div>
                <div className={styles.tabOptContainer}>
                  <h2>My Orders</h2>
                  <div className={styles.tab}>
                    <button
                      className={styles.tablink}
                      style={{
                        backgroundColor:
                          activeTab === "orderActive" ? "#f7f7fb" : "",
                        borderBottom:
                          activeTab === "orderActive" ? "3px solid #000" : "",
                        fontWeight: activeTab === "orderActive" ? "600" : "",
                      }}
                      onClick={() => openPage("orderActive", "")}
                    >
                      Active
                    </button>
                    <button
                      className={styles.tablink}
                      style={{
                        backgroundColor:
                          activeTab === "oderCancelled" ? "#f7f7fb" : "",
                        borderBottom:
                          activeTab === "oderCancelled" ? "3px solid #000" : "",
                        fontWeight: activeTab === "oderCancelled" ? "600" : "",
                      }}
                      onClick={() => openPage("oderCancelled", "")}
                    >
                      Cancelled
                    </button>
                    <button
                      className={styles.tablink}
                      style={{
                        backgroundColor:
                          activeTab === "orderCompleted" ? "#f7f7fb" : "",
                        borderBottom:
                          activeTab === "orderCompleted"
                            ? "3px solid #000"
                            : "",
                        fontWeight: activeTab === "orderCompleted" ? "600" : "",
                      }}
                      onClick={() => openPage("orderCompleted", "")}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                <div
                  id="orderActive"
                  className={styles.tabcontent}
                  style={{
                    display: activeTab === "orderActive" ? "block" : "none",
                  }}
                >
                  <ul className={styles.orderList}>
                    {MyOrderList.map(
                      ({
                        id,
                        orderNo,
                        timeDate,
                        deliveryDate,
                        orderStatus,
                        paymentMethod,
                        proImg,
                        proName,
                        color,
                        quantity,
                        price,
                      }) => {
                        return (
                          <>
                            <li key={id}>
                              <div className={styles.orderDetail}>
                                <div className={styles.left}>
                                  <h4>Order no: {orderNo}</h4>
                                  <p>
                                    <span>Order Date :</span> {timeDate}
                                  </p>
                                  <p>
                                    <span>Estimated Delivery Date :</span>{" "}
                                    {deliveryDate}
                                  </p>
                                </div>
                                <div
                                  className={styles.right}
                                  style={{ textAlign: "right" }}
                                >
                                  <p>
                                    <span>Order Status :</span> {orderStatus}
                                  </p>
                                  <p>
                                    <span>Payment Method :</span>{" "}
                                    {paymentMethod}
                                  </p>
                                </div>
                              </div>
                              <div className={styles.productDetail}>
                                <div className={styles.left}>
                                  <figure>
                                    <img src={proImg} alt="" />
                                  </figure>
                                  <div>
                                    <h4>{proName}</h4>
                                    <p>
                                      <span>Colour :</span> {color}
                                    </p>
                                    <p>
                                      <span>Qty :</span> {quantity}
                                    </p>
                                    <p>
                                      <span>Total : {price}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className={styles.right}>
                                  <Link href="/account/my-orders/my-order-detail">
                                    View Detail
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </>
                        );
                      }
                    )}
                  </ul>
                </div>

                <div
                  id="oderCancelled"
                  className={styles.tabcontent}
                  style={{
                    display: activeTab === "oderCancelled" ? "block" : "none",
                  }}
                >
                  <ul className={styles.orderList}>
                    {MyCancelOrderList.map(
                      ({
                        id,
                        orderNo,
                        timeDate,
                        deliveryDate,
                        orderStatus,
                        paymentMethod,
                        proImg,
                        proName,
                        color,
                        quantity,
                        price,
                      }) => {
                        return (
                          <>
                            <li key={id}>
                              <div className={styles.orderDetail}>
                                <div className={styles.left}>
                                  <h4>Order no: {orderNo}</h4>
                                  <p>
                                    <span>Order Date :</span> {timeDate}
                                  </p>
                                  <p>
                                    <span>Estimated Delivery Date :</span>{" "}
                                    {deliveryDate}
                                  </p>
                                </div>
                                <div
                                  className={styles.right}
                                  style={{ textAlign: "right" }}
                                >
                                  <p style={{ color: "red" }}>
                                    <span>Order Status :</span> {orderStatus}
                                  </p>
                                  <p>
                                    <span>Payment Method :</span>{" "}
                                    {paymentMethod}
                                  </p>
                                </div>
                              </div>
                              <div className={styles.productDetail}>
                                <div className={styles.left}>
                                  <figure>
                                    <img src={proImg} alt="" />
                                  </figure>
                                  <div>
                                    <h4>{proName}</h4>
                                    <p>
                                      <span>Colour :</span> {color}
                                    </p>
                                    <p>
                                      <span>Qty :</span> {quantity}
                                    </p>
                                    <p>
                                      <span>Total : {price}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className={styles.right}>
                                  <Link href="/">View Detail</Link>
                                </div>
                              </div>
                            </li>
                          </>
                        );
                      }
                    )}
                  </ul>
                </div>

                <div
                  id="orderCompleted"
                  className={styles.tabcontent}
                  style={{
                    display: activeTab === "orderCompleted" ? "block" : "none",
                  }}
                >
                  <ul className={styles.orderList}>
                    {MyCompleteOrderList.map(
                      ({
                        id,
                        orderNo,
                        timeDate,
                        deliveryDate,
                        orderStatus,
                        paymentMethod,
                        proImg,
                        proName,
                        color,
                        quantity,
                        price,
                      }) => {
                        return (
                          <>
                            <li key={id}>
                              <div className={styles.orderDetail}>
                                <div className={styles.left}>
                                  <h4>Order no: {orderNo}</h4>
                                  <p>
                                    <span>Order Date :</span> {timeDate}
                                  </p>
                                  <p>
                                    <span>Estimated Delivery Date :</span>{" "}
                                    {deliveryDate}
                                  </p>
                                </div>
                                <div
                                  style={{ textAlign: "right" }}
                                  className={styles.right}
                                >
                                  <p style={{ color: "#34A853" }}>
                                    <span>Order Status :</span> {orderStatus}
                                  </p>
                                  <p>
                                    <span>Payment Method :</span>{" "}
                                    {paymentMethod}
                                  </p>
                                </div>
                              </div>
                              <div className={styles.productDetail}>
                                <div className={styles.left}>
                                  <figure>
                                    <img src={proImg} alt="" />
                                  </figure>
                                  <div>
                                    <h4>{proName}</h4>
                                    <p>
                                      <span>Colour :</span> {color}
                                    </p>
                                    <p>
                                      <span>Qty :</span> {quantity}
                                    </p>
                                    <p>
                                      <span>Total : {price}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className={styles.right}>
                                  <Link href="/">View Detail</Link>
                                </div>
                              </div>
                            </li>
                          </>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;

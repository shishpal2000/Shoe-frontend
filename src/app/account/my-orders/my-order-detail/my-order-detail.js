"use client";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import style from "../../../../styles/myAccount.module.css";
import styles from "../../../../styles/myOrder.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const OrderTrackDetail = () => {
  const router = useRouter();
  const { orderId } = router.query; // Get the orderId from the URL
  const [order, setOrder] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return; // Ensure orderId is defined
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          throw new Error("No authentication token or user ID found");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/get-order/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } } // Add token in headers
        );
        setOrder(response.data.order); // Assuming the API returns the specific order
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };


    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  return (
    <div className={style.myAccountMainContainer}>
      <MyAccoutPageLinkBar currentPage="Order Details" />
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
            <div className={styles.myOrderDetailBar}>
              <h4>Order Details</h4>
              <div className={styles.orderDetail}>
                <div className={styles.left}>
                  <h4>Order no: {order.orderNumber}</h4>
                  <p>
                    <span>Order Date :</span> {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span>Total Amount :</span> ${order.finalTotal}
                  </p>
                </div>
                <div className={styles.right}>
                  <p>
                    <span>Order Status :</span> {order.status}
                  </p>
                </div>
              </div>

              <div className={styles.orderTrackBar}>
                <ul>
                  {order.cartItems.map((item, idx) => (
                    <li key={idx}>
                      <h3>{item.productName}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackDetail;

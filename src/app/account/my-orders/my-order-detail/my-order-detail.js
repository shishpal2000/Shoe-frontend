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
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          throw new Error("No authentication token or user ID found");
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/get-order/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(response.data.order);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { orderNumber, createdAt, finalTotal, status, cartItems } = order;

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
                  <h4>Order no: {orderNumber}</h4>
                  <p>
                    <span>Order Date :</span> {new Date(createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span>Total Amount :</span> ${finalTotal}
                  </p>
                </div>
                <div className={styles.right}>
                  <p>
                    <span>Order Status :</span> {status}
                  </p>
                </div>
              </div>

              <div className={styles.orderTrackBar}>
                <ul>
                  {cartItems.map((item, idx) => (
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

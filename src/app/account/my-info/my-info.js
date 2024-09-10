"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import styles from "../../../styles/myInfo.module.css";
import Link from "next/link";
import CustomAlert from "@/components/CustomAlert/CustomAlert";

const MyInfo = () => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("No authentication token or user ID found");
        }

        const response = await axios.get("http://localhost:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (addressId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/address/delete-addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        setAlert({ message: "Address deleted successfully!", type: "success" });
        setUser((prevUser) => ({
          ...prevUser,
          addresses: prevUser.addresses.filter((address) => address._id !== addressId),
        }));
        setTimeout(() => {
          setAlert({ ...alert, message: "" });
        }, 3000);
      }
    } catch (error) {
      setAlert({ message: "Failed to delete address. Please try again.", type: "error" });
      setTimeout(() => {
        setAlert({ ...alert, message: "" });
      }, 3000);
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, message: "" });
  };

  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="My Info" />
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
              <div className={styles.myInfoContainer}>
                <h3>My Info</h3>
                <div className={styles.topBar}>
                  <p>
                    <b>Contact Details</b>
                  </p>
                  <p>
                    <Link href="/account/my-info/edit-my-info">change</Link>
                  </p>
                </div>

                <ul className={styles.infoBlanks}>
                  {user && (
                    <>
                      <li>
                        <h5>Your Name</h5>
                        <p>{user.firstName} {user.lastName}</p>
                      </li>
                      <li>
                        <h5>Email Address</h5>
                        <p>{user.email}</p>
                      </li>
                      <li>
                        <h5>Phone Number</h5>
                        <p>{user.phone}</p>
                      </li>
                      <li>
                        <h5>Password</h5>
                        <p className={styles.password}>........</p>
                      </li>
                    </>
                  )}
                </ul>

                <div className={styles.infoAddress}>
                  <div className={styles.topBar}>
                    <p>
                      <b>Address</b>
                    </p>
                    <p>
                      <Link href="/account/my-info/add-address">Add New</Link>
                    </p>
                  </div>
                  <ul className={styles.addressCardList}>
                    {user?.addresses?.map(({ _id, firstName, phone, streetAddress, city, state, postalCode, type, isDefaultBilling, isDefaultShipping }) => (
                      <li key={_id}>
                        <h4>{firstName}</h4>
                        <h5>{phone}</h5>
                        <p>{`${streetAddress}, ${city}, ${state}, ${postalCode}`}</p>
                        <ul className={styles.addresOpt}>
                          <li>{type}</li>
                          {isDefaultBilling}
                          {isDefaultShipping}
                        </ul>
                        <ul className={styles.addresEditOpt}>
                          <li>
                            <button onClick={() => handleDelete(_id)}>remove</button>
                          </li>
                          <li>|
                          </li>
                          <li>
                            <Link href={`/account/my-info/edit-address/${_id}`}>edit</Link>
                          </li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {alert.message && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default MyInfo;
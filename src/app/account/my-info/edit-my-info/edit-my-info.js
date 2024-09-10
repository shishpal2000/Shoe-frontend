"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import styles from "../../../../styles/myInfo.module.css";
import { useRouter } from 'next/navigation';
import CustomAlert from "@/components/CustomAlert/CustomAlert";

const EditInfo = () => {
  const [isActive, setIsActive] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const [alert, setAlert] = useState({ message: "", type: "" });
  const router = useRouter();

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUserInfo({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone
        });
      } catch (error) {
        setAlert({ message: "Failed to load user information", type: "error" });
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/api/user/profile", userInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.status === 200) {
        setAlert({ message: "Information updated successfully!", type: "success" });
        setTimeout(() => {
          router.push('/account/my-info');
        }, 3000); // Redirect after 3 seconds
      }
    } catch (error) {
      setAlert({ message: "Failed to update information. Please try again.", type: "error" });
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle alert close
  const handleAlertClose = () => {
    setAlert({ ...alert, message: "" });
  };

  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="Edit My Info" />
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
                  <p>Edit Contact Details</p>
                  <p></p>
                </div>
              </div>

              <div className={styles.editMyInfoForm}>
                <form onSubmit={handleSubmit}>
                  <ul>
                    <ul className={styles.nameGrid}>
                      <li>
                        <label>First Name*</label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={userInfo.firstName}
                          onChange={handleChange}
                          required
                        />
                      </li>
                      <li>
                        <label>Last Name*</label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={userInfo.lastName}
                          onChange={handleChange}
                          required
                        />
                      </li>
                    </ul>

                    <li>
                      <label>Email*</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userInfo.email}
                        onChange={handleChange}
                        required
                      />
                    </li>

                    <li>
                      <label>Phone Number*</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={userInfo.phone}
                        onChange={handleChange}
                        required
                      />
                    </li>
                  </ul>

                  <input type="submit" value="Save Details" />
                </form>
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

export default EditInfo;
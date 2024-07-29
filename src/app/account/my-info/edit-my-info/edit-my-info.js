"use client";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import styles from "../../../../styles/myInfo.module.css";
import { useState } from "react";

const EditInfo = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
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
                <form>
                  <ul>
                    <ul className={styles.nameGrid}>
                      <li>
                        <label>First Name*</label>
                        <input type="text" placeholder="First Name" required />
                      </li>

                      <li>
                        <label>Last Name*</label>
                        <input type="text" placeholder="Last Name" required />
                      </li>
                    </ul>

                    <li>
                      <label>Email*</label>
                      <input type="text" placeholder="email" required />
                    </li>

                    <li>
                      <label>phone number*</label>
                      <input type="text" placeholder="Phone Number" required />
                    </li>
                  </ul>

                  <input type="submit" value="Save Details" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInfo;

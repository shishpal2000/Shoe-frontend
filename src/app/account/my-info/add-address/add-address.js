import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import style from "../../../../styles/myAccount.module.css";
import styles from "../../../../styles/myInfo.module.css";
const AddAddress = () => {
  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="Add Address" />
        <div className="container">
          <div className={style.myAccountInnerItems}>
            <div className={style.left}>
              <MyAccountSideBar />
            </div>
            <div className={style.right}>
              <div className={styles.myInfoContainer}>
                <h3>My Info</h3>
                <div className={styles.topBar}>
                  <p>Add Address</p>
                  <p></p>
                </div>
              </div>

              <div className={styles.editMyInfoForm}>
                <form>
                  <ul className={styles.nameGrid}>
                    <li>
                      <label>First Name*</label>
                      <input type="text" placeholder="First Name" required />
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

                    <li>
                      <label>City*</label>
                      <input type="text" placeholder="Town / City" required />
                    </li>

                    <li>
                      <label>State*</label>
                      <input type="text" placeholder="State" required />
                    </li>

                    <li>
                      <label>Phone*</label>
                      <input type="text" placeholder="Phone" required />
                    </li>

                    <li>
                      <label>Postal Code*</label>
                      <input type="text" placeholder="Postal Code" required />
                    </li>
                  </ul>
                  <ul className={styles.textarea}>
                    <li>
                      <label>Delivery Instruction</label>
                      <textarea type="" rows="8" placeholder="Postal Code" />
                    </li>
                  </ul>

                  <ul className={styles.defaultOpt}>
                    <li>
                      <input type="checkbox" />
                      <p>Set as default shipping address</p>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <p>Set as default billing address</p>
                    </li>
                  </ul>

                  <input type="submit" value="Add Address" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;

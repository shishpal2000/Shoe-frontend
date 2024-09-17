"use client";
import { useState } from "react";
import axios from "axios";
import style from "../../../../styles/myAccount.module.css";
import styles from "../../../../styles/myInfo.module.css";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import { useRouter } from 'next/navigation';
import CustomAlert from "@/components/CustomAlert/CustomAlert";

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    aptSuiteUnit: "",
    city: "",
    state: "",
    phone: "",
    postalCode: "",
    deliveryInstruction: "",
    isDefault: false,
    type: "", 
    status: "Active" 
  });

  const [alert, setAlert] = useState(null); 
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/address/add-addresses", address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        setAlert({ message: "Address added successfully!", type: "success" });
        setTimeout(() => {
          router.push('/account/my-info');
        }, 3000);
      } else {
        throw new Error('Failed to add address');
      }
    } catch (error) {
      setAlert({ message: "Failed to add address. Please try again.", type: "error" });
    }
  };

  return (
    <div className={style.myAccountMainContainer}>
      <MyAccoutPageLinkBar currentPage="Add Address" />
      <div className="container">
        <div className={style.myAccountInnerItems}>
          <div className={style.phoneFilterButton} onClick={() => setIsActive(!isActive)}>
            <figure>
              <img src="/user.svg" alt="User" />
            </figure>
          </div>
          <div className={isActive ? style.activeFliter : style.left}>
            <MyAccountSideBar />
          </div>
          <div className={style.right}>
            <div className={styles.myInfoContainer}>
              <h3>My Info</h3>
              <div className={styles.topBar}>
                <p>Add Address</p>
              </div>
            </div>
            <div className={styles.editMyInfoForm}>
              <form onSubmit={handleSubmit}>
                <ul className={styles.nameGrid}>
                  {["firstName", "lastName", "country", "streetAddress", "aptSuiteUnit", "city", "state", "phone", "postalCode"].map((field) => (
                    <li key={field}>
                      <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}*</label>
                      <input
                        type="text"
                        name={field}
                        placeholder={field.replace(/([A-Z])/g, ' $1')}
                        value={address[field]}
                        onChange={handleChange}
                        required
                      />
                    </li>
                  ))}
                </ul>
                <ul className={styles.textarea}>
                  <li>
                    <label>Delivery Instruction</label>
                    <textarea
                      name="deliveryInstruction"
                      rows="8"
                      placeholder="Delivery Instruction"
                      value={address.deliveryInstruction}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
                <ul className={styles.defaultOpt}>
                  <li>
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={address.isDefault}
                      onChange={handleChange}
                    />
                    <p>Set as default address</p>
                  </li>
                </ul>
                <ul className={styles.selectType}>
                  <li>
                    <label>Address Type*</label>
                    <select name="type" value={address.type} onChange={handleChange} required>
                      <option value="Shipping">Shipping</option>
                      <option value="Billing">Billing</option>
                    </select>
                  </li>
                  <li>
                    <label>Address Status*</label>
                    <select name="status" value={address.status} onChange={handleChange} required>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </li>
                </ul>
                <input type="submit" value="Add Address" />
              </form>
              {alert && (
                <CustomAlert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;

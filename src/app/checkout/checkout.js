"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import style from "../../styles/checkout.module.css";
import styles from "../../styles/myInfo.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Checkout = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState("");
  const [selectedBillingAddress, setSelectedBillingAddress] = useState("");
  const [useSameAddressForBilling, setUseSameAddressForBilling] = useState(true);
  const [newShippingAddress, setNewShippingAddress] = useState({});
  const [newBillingAddress, setNewBillingAddress] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSummary, setOrderSummary] = useState({ itemTotal: 0, shipping: 0, tax: 0 });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          throw new Error("No authentication token or user ID found");
        }

        const [userResponse, cartResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-user-cart/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userResponse.data);
        setAddresses(userResponse.data.addresses);

        if (userResponse.data.addresses.length > 0) {
          setSelectedShippingAddress(userResponse.data.addresses[0]._id);
          setSelectedBillingAddress(userResponse.data.addresses[0]._id);
        }

        if (cartResponse.data.success && cartResponse.data.data) {
          const items = cartResponse.data.data.cart.items;
          setCartItems(items);
          calculateOrderSummary(items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateOrderSummary = (items) => {
    const itemTotal = items.reduce((total, item) => total + item.variant.price * item.quantity, 0);
    setOrderSummary((prevSummary) => ({
      ...prevSummary,
      itemTotal,
    }));
  };

  const handleNewAddressSubmit = async (address, type) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/add-addresses`,
        address,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        if (type === 'shipping') {
          setSelectedShippingAddress(response.data.address._id);
        } else if (type === 'billing') {
          setSelectedBillingAddress(response.data.address._id);
        }
        setAddresses((prev) => [...prev, response.data.address]);
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewShippingAddressSubmit = (e) => {
    e.preventDefault();
    handleNewAddressSubmit(newShippingAddress, 'shipping');
  };

  const handleNewBillingAddressSubmit = (e) => {
    e.preventDefault();
    handleNewAddressSubmit(newBillingAddress, 'billing');
  };

  const handleAddressChange = (event, type) => {
    const selectedValue = event.target.value;
    if (type === "shipping") {
      setSelectedShippingAddress(selectedValue === "new" ? "" : selectedValue);
    } else {
      setSelectedBillingAddress(selectedValue === "new" ? "" : selectedValue);
    }
  };

  const handleNewAddressChange = (event, type) => {
    const { name, value } = event.target;
    if (type === "shipping") {
      setNewShippingAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewBillingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUseSameAddressForBilling = () => {
    setUseSameAddressForBilling(!useSameAddressForBilling);
    if (!useSameAddressForBilling) {
      setSelectedBillingAddress(selectedShippingAddress);
    }
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        throw new Error("No authentication token or user ID found");
      }

      const shippingAddress = selectedShippingAddress
        ? addresses.find((address) => address._id === selectedShippingAddress)
        : newShippingAddress;

      const billingAddress = useSameAddressForBilling
        ? shippingAddress
        : selectedBillingAddress
          ? addresses.find((address) => address._id === selectedBillingAddress)
          : newBillingAddress;

      const orderData = {
        userId,
        shippingAddress,
        billingAddress,
        cartItems: cartItems.map(item => ({
          product: item.product._id,
          variant: item.variant._id,
          quantity: item.quantity,
        })),
        totalAmount: orderSummary.itemTotal + orderSummary.shipping + orderSummary.tax,
      };

      const orderResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/create-order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (orderResponse.status === 201) {
        const { orderId } = orderResponse.data;
        const paymentResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-payment-order`, {
          orderId,
          userId,
          amount: orderSummary.itemTotal + orderSummary.shipping + orderSummary.tax,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (paymentResponse.status === 201) {
          const { razorpayOrder } = paymentResponse.data;
          router.push(`/payment?orderId=${orderId}&paymentId=${razorpayOrder.id}`);
        } else {
          setError("Failed to create payment.");
        }
      } else {
        setError("Failed to submit order.");
      }
    } catch (error) {
      setError("Failed to complete order.");
      console.error("Error submitting order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageLinkBar currentPage="Checkout" />

      <div className={style.checkoutMainContaier}>
        <div className="container">
          <div className={style.checkoutInnerItems}>
            <div className={style.left}>
              <div className={style.checkoutLeft}>
                <form onSubmit={handleSubmitOrder}>
                  <h2>Contact Details</h2>
                  <p>We will use these details to keep you informed about your delivery.</p>
                  <ul>
                    <li>
                      <label>Email*</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={user?.email || ""}
                        readOnly
                      />
                    </li>
                  </ul>

                  {/* Shipping Address Form */}
                  <div className={styles.infoAddress}>
                    <div className={style.shippingAddress}>
                      <h3>Shipping Address</h3>
                      <p>Select the address that matches your card or payment method.</p>
                      <ul className={style.addressDropdown}>
                        {addresses.map((address) => (
                          <li key={address._id}>
                            <input
                              type="radio"
                              id={`shipping-${address._id}`}
                              name="ShippingAddress"
                              value={address._id}
                              checked={selectedShippingAddress === address._id}
                              onChange={(event) => handleAddressChange(event, "shipping")}
                            />
                            <label htmlFor={`shipping-${address._id}`}>
                              {address.firstName} - {address.streetAddress}, {address.city}, {address.state}, {address.postalCode}
                            </label>
                          </li>
                        ))}
                        <li>
                          <input
                            type="radio"
                            id="new-shipping-address"
                            name="ShippingAddress"
                            value="new"
                            checked={selectedShippingAddress === ""}
                            onChange={(event) => handleAddressChange(event, "shipping")}
                          />
                          <label htmlFor="new-shipping-address">Add New Shipping Address</label>
                        </li>
                      </ul>
                      {selectedShippingAddress === "" && (
                        <div className={style.newAddressForm}>
                          <form onSubmit={handleNewShippingAddressSubmit}>
                            <br />
                            <h3>New Shipping Address</h3>
                            <ul>
                              <li><label>First Name*</label><input type="text" name="firstName" placeholder="First Name" value={newShippingAddress.firstName} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                              <li><label>Last Name*</label><input type="text" name="lastName" placeholder="Last Name" value={newShippingAddress.lastName} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                              <li><label>Country / Region*</label><input type="text" name="country" placeholder="Country / Region" value={newShippingAddress.country} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                              <li><label>Street Address*</label><input type="text" name="streetAddress" placeholder="Street Address" value={newShippingAddress.streetAddress} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                              <ul className={style.addressForm}>
                                <li><label>City*</label><input type="text" name="city" placeholder="City" value={newShippingAddress.city} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                                <li><label>State*</label><input type="text" name="state" placeholder="State" value={newShippingAddress.state} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                                <li><label>Postal Code*</label><input type="text" name="postalCode" placeholder="Postal Code" value={newShippingAddress.postalCode} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                              </ul>
                              <li><label>Phone*</label><input type="text" name="phone" placeholder="Phone" value={newShippingAddress.phone} onChange={(e) => handleNewAddressChange(e, "shipping")} required /></li>
                            </ul>
                            <input type="submit" value="Add Address" />
                          </form>
                        </div>
                      )}
                    </div>

                    <div className={style.billingAddress}>
                      <div className={style.billingDetail}>
                        <h3>Billing Address</h3>
                        <ul className={style.safeInfor}>
                          <li>
                            <input
                              type="checkbox"
                              checked={useSameAddressForBilling}
                              onChange={handleUseSameAddressForBilling}
                            />
                            <label>Use the same address for billing</label>
                          </li>
                        </ul>
                      </div>
                      {!useSameAddressForBilling && (
                        <>
                          <ul className={style.addressDropdown}>
                            {addresses.map((address) => (
                              <li key={address._id}>
                                <input
                                  type="radio"
                                  id={`billing-${address._id}`}
                                  name="BillingAddress"
                                  value={address._id}
                                  checked={selectedBillingAddress === address._id}
                                  onChange={(event) => handleAddressChange(event, "billing")}
                                />
                                <label htmlFor={`billing-${address._id}`}>
                                  {address.firstName} - {address.streetAddress}, {address.city}, {address.state}, {address.postalCode}
                                </label>
                              </li>
                            ))}
                            <li>
                              <input
                                type="radio"
                                id="new-billing-address"
                                name="BillingAddress"
                                value="new"
                                checked={selectedBillingAddress === ""}
                                onChange={(event) => handleAddressChange(event, "billing")}
                              />
                              <label htmlFor="new-billing-address">Add New Billing Address</label>
                            </li>
                          </ul>
                          {selectedBillingAddress === "" && (
                            <div className={style.newAddressForm}>
                               <form onSubmit={handleNewBillingAddressSubmit}>
                                <br />
                                <h3>New Billing Address</h3>
                                <br />
                                <ul>
                                  <li><label>First Name*</label><input type="text" name="firstName" placeholder="First Name" value={newShippingAddress.firstName} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                  <li><label>Last Name*</label><input type="text" name="lastName" placeholder="Last Name" value={newShippingAddress.lastName} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                  <li><label>Country / Region*</label><input type="text" name="country" placeholder="Country / Region" value={newShippingAddress.country} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                  <li><label>Street Address*</label><input type="text" name="streetAddress" placeholder="Street Address" value={newShippingAddress.streetAddress} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                  <ul className={style.addressForm}>
                                    <li><label>City*</label><input type="text" name="city" placeholder="City" value={newShippingAddress.city} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                    <li><label>State*</label><input type="text" name="state" placeholder="State" value={newShippingAddress.state} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                    <li><label>Postal Code*</label><input type="text" name="postalCode" placeholder="Postal Code" value={newShippingAddress.postalCode} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                  </ul>
                                  <li><label>Phone*</label><input type="text" name="phone" placeholder="Phone" value={newShippingAddress.phone} onChange={(e) => handleNewAddressChange(e, "billing")} required /></li>
                                </ul>
                                <input type="submit" value="Add Address" />
                              </form>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className={style.shippingMethod}>
                    <h3>Shipping Method</h3>
                    <ul className={style.methodDetail}>
                      <li>
                        <p>Arrives by Monday, June 7</p>
                      </li>
                      <li>
                        <p>
                          Delivery Charges
                          <span>Additional fees may apply</span>
                        </p>
                        <p>$5.00</p>
                      </li>
                    </ul>
                  </div>

                  <li className={style.submitBtn}>
                    <input type="submit" value="Complete Order" />
                  </li>
                </form>
              </div>
            </div>

            <div className={style.right}>
              <div className={style.orderSummary}>
                <h3>Order Summary</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <ul>
                    <li>
                      <p>Item Total</p>
                      <p>${orderSummary.itemTotal.toFixed(2)}</p>
                    </li>
                    <li>
                      <p>Shipping</p>
                      <p>${orderSummary.shipping.toFixed(2)}</p>
                    </li>
                    <li>
                      <p>Tax</p>
                      <p>${orderSummary.tax.toFixed(2)}</p>
                    </li>
                    <li>
                      <h3>Total</h3>
                      <p>${(orderSummary.itemTotal + orderSummary.shipping + orderSummary.tax).toFixed(2)}</p>
                    </li>
                  </ul>
                )}
              </div>
              <div className={style.orderDetails}>
                <h3>Order Details</h3>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div className={style.orderDetailItems} key={item._id}>
                      <div className={style.proImg}>
                        <figure>
                          <img
                            src={item.product?.images?.[0]?.url || '/images/default-image.jpg'}
                            alt={item.product?.product_name || 'Product Image'}
                          />
                        </figure>
                      </div>
                      <div className={style.proDetail}>
                        <h4>{item.product?.product_name}</h4>
                        <ul className={style.quantity}>
                          <li>Size {item.variant.size}</li>
                          <li>Quantity {item.quantity || 0}</li>
                        </ul>
                        <h3>${item.variant.price.toFixed(2)}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Your cart is empty</div>
                )}
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default Checkout;

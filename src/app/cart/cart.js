"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import style from "../../styles/cart.module.css";
import Link from "next/link";

const Cart = () => {
  const [cartData, setCartData] = useState({
    items: [],
    discountedTotal: 0,
    subtotal: 0,
    couponCode: "",
    discountAmount: 0,
    totalItems: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-user-cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success && response.data.data.cart) {
          const updatedCart = response.data.data.cart;
          setCartData({
            ...updatedCart,
            totalItems: updatedCart.items.length,
          });
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);


  const updateQuantity = async (productId, variantId, newQuantity) => {
    if (newQuantity < 1) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log("User ID:", userId);
    console.log("Product ID:", productId);
    console.log("Variant ID:", variantId);

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/update-item-quantity`, {
        userId,
        productId,
        variantId,
        quantity: newQuantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Updated Cart Response:', response.data);

      if (response.data.success && response.data.cart) {
        const updatedCart = response.data.cart;
        setCartData({
          ...updatedCart,
          totalItems: updatedCart.items.reduce((acc, item) => acc + item.quantity, 0),
        });
      }
      else {
        console.error("Cart update failed, resetting cart data");
        setCartData({ items: [] });
      }
    } catch (error) {
      console.error("Error updating quantity:", error.response ? error.response.data : error.message);
    }
  };

  const removeFromCart = async (productId, variantId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!userId || !token) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove-cart/${userId}/${productId}/${variantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.cart) {
        const updatedCart = response.data.cart;

        // Update the cart state
        setCartData((prevCart) => ({
          ...prevCart,
          items: updatedCart.items, // Update with remaining items
          totalItems: updatedCart.items.reduce((acc, item) => acc + item.quantity, 0),
        }));
      } else {
        console.error("Cart update failed, resetting cart data");
        setCartData({ items: [] }); // You might want to handle this differently
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };


  const moveToWishlist = async (productId, variantId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/add-wishlist`,
        {
          userId,
          productId,
          variantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      removeFromCart(productId, variantId);
    } catch (error) {
      console.error("Error moving item to wishlist:", error);
    }
  };

  const applyCoupon = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!userId || !token) {
        console.error("User not authenticated.");
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/apply-coupon`, {
        couponCode,
        userId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCartData((prevCart) => ({
          ...prevCart,
          discountedTotal: response.data.finalAmount,
          discountAmount: response.data.discount,
          couponCode: response.data.couponCode || "",
          totalItems: prevCart.items.reduce((acc, item) => acc + item.quantity, 0),
        }));
      } else {
        console.error("Failed to apply coupon:", response.data.message);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  const calculateSubtotal = (items = []) => {
    return items.reduce((total, item) => {
      const itemPrice = item?.variant?.price || 0;
      const itemQuantity = item?.quantity || 0;
      return total + itemPrice * itemQuantity;
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal(cartData.items)) || 0;
    const delivery = 6.99;
    return (cartData.discountedTotal > 0 ? cartData.discountedTotal : subtotal + delivery).toFixed(2);
  };

  if (!cartData.items || cartData.items.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  console.log("Cart Data Items:", cartData.items);

  return (
    <>
      <PageLinkBar currentPage="Cart" />
      <div className={style.cartMainContainer}>
        <div className="container">
          <div className={style.cartItemsContainer}>
            <div className={style.left}>
              <div className={style.cartDetail}>
                <h3>Your Cart</h3>
                <p className={style.cardLine}>
                  Items in your bag not reserved - check out now to make them yours.
                </p>
                {cartData.items?.length > 0 ? (
                  cartData.items.map((item) => (
                    <div key={item.variant._id} className={style.shortProDescrip}>
                      <div className={style.ProImg}>
                        <figure>
                          <img
                            src={item.product?.images?.[0]?.url || '/images/default-image.jpg'}
                            alt={item.product?.product_name || 'Product Image'}
                          />
                        </figure>
                      </div>
                      <div className={style.descrip}>
                        <div className={style.descripItems}>
                          <h3>{item.product?.product_name || 'Product Name'}</h3>
                          <p>{item.product?.description || 'Product Description'}</p>
                          <ul className={style.selectOpt}>
                            <li>
                              <div className={style.sizeDropdown}>
                                SIZE {item.variant?.size || 'N/A'}
                                <ul className={style.sizeOptions}>
                                  {item.product.variants && Array.isArray(item.product.variants) && item.product.variants.length > 0 ? (
                                    item.product.variants.map((variant) => (
                                      <li key={variant._id} onClick={() => updateQuantity(item.product._id, variant._id, item.quantity)}>
                                        {variant.size}
                                      </li>
                                    ))
                                  ) : (
                                    <li>No variants available</li>
                                  )}
                                </ul>
                                <figure>
                                  <img src="/down.svg" alt="" />
                                </figure>
                              </div>
                            </li>
                            <li>
                              <div className={style.quantityDropdown}>
                                <button onClick={() => updateQuantity(item.product._id, item.variant._id, item.quantity - 1)}>-</button>
                                Quantity {item.quantity || 0}
                                <button onClick={() => updateQuantity(item.product._id, item.variant._id, item.quantity + 1)}>+</button>
                              </div>
                            </li>
                          </ul>
                          <ul className={style.actionOpt}>
                            <li onClick={() => moveToWishlist(item.product._id, item.variant._id)}>
                              <Link href="">
                                <figure>
                                  <img src="/wishlist.svg" alt="Move to Wishlist" />
                                </figure>
                              </Link>
                            </li>
                            <li onClick={() => removeFromCart(item.product._id, item.variant._id)}>
                              <Link href="">
                                <figure>
                                  <img src="/Bin.svg" alt="Remove from Cart" />
                                </figure>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <h3>₹{(item.variant?.price * item.quantity || 0).toFixed(2)}</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Your cart is empty</div>
                )}

              </div>
            </div>
            <div className={style.right}>
              <h3>Order Summary</h3>
              <ul>
                <li>
                  <div className={style.type}>
                    {Array.isArray(cartData.items) ? cartData.items.length : 0} ITEM(S)
                  </div>
                  <div className={style.val}>
                    ₹{calculateSubtotal(cartData.items).toFixed(2)}
                  </div>
                </li>
                <li>
                  <div className={style.type}>Delivery</div>
                  <div className={style.val}>₹6.99</div>
                </li>
                {cartData.discountAmount > 0 && (
                  <li>
                    <div className={style.type}>Discount</div>
                    <div className={style.val}><span>₹{cartData.discountAmount.toFixed(2) || '0.00'}</span></div>
                  </li>
                )}
                <li>
                  <h3>Total</h3>
                  <h3><span>₹{calculateTotal()}</span></h3>
                </li>
              </ul>
              <div className={style.checkoutBtn}>
                <Link href="/checkout">
                  <button>Checkout</button>
                </Link>
              </div>
              <div className={style.coupon}>
                <h4>Apply Coupon</h4>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button onClick={applyCoupon}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
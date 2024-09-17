"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import Collection from "@/components/homePage/ShoeCollection/Collection";
import style from "../../styles/cart.module.css";
import Link from "next/link";

const Cart = () => {
  const [cartData, setCartData] = useState({ items: [], discountedTotal: null });
  const [isActive, setIsActive] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("No authentication token or user ID found");
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-user-cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success && response.data.data && response.data.data.cart) {
          setCartData(response.data.data.cart);
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
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/update-item-quantity`,
        {
          userId,
          productId,
          variantId,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.cart) {
        setCartData(response.data.cart);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
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
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove-cart/${userId}/${productId}/${variantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartData((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter(
            (item) =>
              !(item.product._id === productId && item.variant._id === variantId)
          ),
        }));
      } else {
        console.error("Failed to remove item from cart:", response);
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

      removeFromCart(productId, variantId); // After adding to wishlist, remove from cart
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
        cartItems: cartData.items,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("Discounted Total:", cartData.discountedTotal);  // Add this line for debugging
        setCouponDiscount(response.data.discount);
        setCartData((prevCart) => ({
          ...prevCart,
          discountedTotal: response.data.finalAmount
        }));
      } else {
        console.error("Failed to apply coupon:", response.data.message);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  const calculateSubtotal = () => {
    const subtotal = cartData.items.reduce((total, item) => total + (item.variant.price || 0) * (item.quantity || 0), 0);
    console.log("Subtotal:", subtotal);  // Add this line for debugging
    return subtotal.toFixed(2);
  };



  const calculateTotal = () => {
    // Ensure subtotal is a valid number
    const subtotal = parseFloat(calculateSubtotal()) || 0;

    // Delivery cost
    const delivery = 6.99;

    // Total before discount
    const totalBeforeDiscount = subtotal + delivery;

    // Total with discount
    const totalWithDiscount = typeof cartData.discountedTotal === 'number' ? cartData.discountedTotal : totalBeforeDiscount;

    // Return formatted total
    return totalWithDiscount.toFixed(2);
  };

  if (!cartData || !cartData.items) {
    return <div>Loading...</div>;
  }

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
                {cartData.items && cartData.items.length > 0 ? (
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
                              <div className={`${style.sizeDropdown} ${isActive ? style.active : ""}`} onClick={toggleClass}>
                                SIZE {item.variant?.size || 'N/A'}
                                <ul className={style.sizeOptions}>
                                  {item.product.variants.map((variant) => (
                                    <li key={variant._id} onClick={() => updateQuantity(item.product._id, variant._id, item.quantity)}>
                                      {variant.size}
                                    </li>
                                  ))}
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
                        <h3>${(item.variant?.price * item.quantity || 0).toFixed(2)}</h3>
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
                    {cartData.items.length} ITEM(S)
                  </div>
                  <div className={style.val}>
                  ₹{cartData.items.reduce((total, item) => total + item.variant.price * item.quantity, 0).toFixed(2)}
                  </div>
                </li>
                <li>
                  <div className={style.type}>Subtotal</div>
                  <div className={style.val}><span>₹{calculateSubtotal()}</span></div>
                </li>
                <li>
                  <div className={style.type}>Delivery</div>
                  <div className={style.val}>₹6.99</div>
                </li>
                {couponDiscount > 0 && (
                  <li>
                    <div className={style.type}>Discount</div>
                    <div className={style.val}><span>₹{couponDiscount.toFixed(2) || '0.00'}</span></div>
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
              <div className={style.promo}>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button onClick={applyCoupon}>Apply Coupon</button>
              </div>
            </div>
          </div>
          <div className={style.relatedProduct}>
            <h2>Related Products</h2>
            <Collection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
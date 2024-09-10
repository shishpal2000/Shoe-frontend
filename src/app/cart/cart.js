"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import Collection from "@/components/homePage/ShoeCollection/Collection";
import style from "../../styles/cart.module.css";
import Link from "next/link";

const Cart = () => {
  const [cartData, setCartData] = useState({ items: [] }); // Initialize with an empty array for items
  const [isActive, setIsActive] = useState(false);

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

        console.log("Fetched cart data:", response.data);

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
        const updatedCart = {
          ...response.data.cart,
          items: response.data.cart.items.map((updatedItem) => {
            const existingItem = cartData.items.find(
              (item) =>
                item.product._id === updatedItem.product &&
                item.variant._id === updatedItem.variant
            );

            return {
              ...updatedItem,
              product: existingItem.product,
              variant: existingItem.variant,
            };
          }),
        };

        setCartData(updatedCart);
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

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove-cart/${userId}/${productId}/${variantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
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
                        <h3>${(item.variant?.price * item.quantity).toFixed(2) || '0.00'}</h3>
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
                    ${cartData.items.reduce((total, item) => total + item.variant.price * item.quantity, 0).toFixed(2)}
                  </div>
                </li>
                <li>
                  <div className={style.type}>Delivery</div>
                  <div className={style.val}>$6.99</div>
                </li>
                <li>
                  <div className={style.type}>Sales Tax</div>
                  <div className={style.val}>-</div>
                </li>
                <li>
                  <h3>Total</h3>
                  <h3>${(cartData.items.reduce((total, item) => total + item.variant.price * item.quantity, 0) + 6.99).toFixed(2)}</h3>
                </li>
              </ul>
              <div className={style.checkoutBtn}>
                <Link href="/checkout">
                  <button>Checkout</button>
                </Link>
              </div>
              <p className={style.promo}>
                <Link href="">Use a promo code</Link>
              </p>
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
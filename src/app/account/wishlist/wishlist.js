"use client";
import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import styles from "../../../styles/wishlist.module.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Wishlist = () => {
  const [isActive, setIsActive] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [selectedVariant, setSelectedVariant] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);

      const wishlistResponse = await axios.get('http://localhost:8000/api/wishlist/get-wishlist', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!wishlistResponse.data || !Array.isArray(wishlistResponse.data.data)) {
        throw new Error('Invalid data format');
      }

      const wishlistWithProductDetails = await Promise.all(wishlistResponse.data.data.map(async (item) => {
        try {
          const variantsResponse = await axios.get(`http://localhost:8000/api/product/products/${item._id}/variants`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (variantsResponse.data.success) {
            const variants = variantsResponse.data.data;
            const firstVariant = variants.length > 0 ? variants[0] : {};
            return {
              ...item,
              brand: firstVariant.brand || 'Unknown Brand',
              price: firstVariant.price || 0
            };
          } else {
            console.error('Failed to fetch variants:', variantsResponse.data.message);
            return item;
          }
        } catch (error) {
          console.error('Error fetching variants:', error.message);
          return item;
        }
      }));

      setWishlistData(wishlistWithProductDetails);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };



  const handleAddToCart = async () => {
    const { productId } = modalContent;

    if (!selectedVariant) {
      alert("Please select a variant before adding to cart.");
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      console.error("No authentication token or user ID found");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/cart/add-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId, productId, variantId: selectedVariant, quantity: 1 }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Item added to cart", result);
      } else {
        console.error("Failed to add to cart:", result.message);
      }

      await handleRemoveFromWishlist(productId);
      window.location.href = "/cart";
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }

    handleCloseModal();
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.delete(`http://localhost:8000/api/wishlist/remove-wishlist/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      fetchWishlist();
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    }
  };

  const handleOpenModal = async (action, productId) => {
    if (action === 'add') {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await axios.get(`http://localhost:8000/api/product/products/${productId}/variants`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setModalContent({ action, productId, variants: response.data.data });
          setSelectedVariant('');
          setOpenModal(true);
        } else {
          console.error('Failed to fetch variants:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching variants:', error.message);
      }
    } else {
      setModalContent({ action, productId });
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent({});
  };

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const modalBody = (
    <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {modalContent.action === 'add' ? 'Select a variant and add item to cart' : 'Remove item from wishlist?'}
      </Typography>

      {modalContent.action === 'add' && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="variant-select-label">Select Variant</InputLabel>
          <Select
            labelId="variant-select-label"
            value={selectedVariant}
            label="Select Variant"
            onChange={handleVariantChange}
          >
            {modalContent.variants.map((variant) => (
              <MenuItem key={variant._id} value={variant._id}>
                {variant.size} - {variant.color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={modalContent.action === 'add' ? handleAddToCart : () => handleRemoveFromWishlist(modalContent.productId)}>
          Confirm
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ m: 2 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );

  if (!isAuthenticated) {
    return (
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="Wishlist" />
        <div className="container">
          <div className={style.myAccountInnerItems}>
            <div className={style.right}>
              <div className={styles.wishlistContainer}>
                <h3>Wishlist</h3>
                <p>Please log in to view your wishlist.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="Wishlist" />
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
              <div className={styles.wishlistContainer}>
                <h3>Wishlist</h3>
                <ul className={styles.wishlistList}>
                  {wishlistData.map(({ _id, product_name, brand, price = 0, images }) => {
                    const formattedPrice = Number(price).toFixed(2);
                    return (
                      <li key={_id}>
                        <div className={styles.left}>
                          <figure>
                            <img src={images[0]?.url} alt={product_name} />
                          </figure>
                          <div className={styles.proInfo}>
                            <h4>{product_name}</h4>
                            <p>Brand: {brand}</p>
                            <p>Price: ₹{formattedPrice}</p>
                          </div>
                        </div>
                        <div className={styles.right}>
                          <button
                            className={styles.cartBtn}
                            onClick={() => handleOpenModal('add', _id)}
                          >
                            Add to Cart
                          </button>
                          <i className={styles.delBtn} onClick={() => handleOpenModal('remove', _id)}>
                            <img src="/Bin.svg" alt="" />
                          </i>
                        </div>
                      </li>
                    );
                  })}
                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          width: 300,
        }}>
          {modalBody}
        </Box>
      </Modal>
    </>
  );
};

export default Wishlist;

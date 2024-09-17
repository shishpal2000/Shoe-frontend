"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import style from "../../styles/productDetail.module.css";
import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import ProductGallery from "./productGallery";
import axios from "axios";

const ProductDetails = ({ slug }) => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedSize, setSelectedSize] = useState(1);

  useEffect(() => {
    if (slug) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-products`, {
          params: { product_slug: slug }
        })
        .then((response) => {
          const { data } = response;
          if (data.success) {
            const allSizes = data.data.variants.map(variant => variant.size);
            const uniqueSizes = [...new Set(allSizes)];

            setProduct({ ...data.data, uniqueSizes });
          }
        })
        .catch((err) => {
          console.error("Error fetching product data: ", err);
        });
    }
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    const variant = product.variants[selectedColor];
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      console.error("No authentication token or user ID found");
      return;
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add-cart`, {

        userId: userId,
        productId: product._id,
        variantId: variant._id,
        quantity: 1
      },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      if (response.data.success) {
        console.log("Added to cart successfully");
      } else {
        console.error("Failed to add to cart:", response.data.message);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const moveToWishlist = async () => {
    if (!product) return;

    const variant = product.variants[selectedColor];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.error("No authentication token or user ID found");
      return;
    }

    try {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/add-wishlist`, {
        userId,
        productId: product._id,
        variantId: variant._id,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("Moved to wishlist successfully");
      }
      else {
        console.error("Failed to move to wishlist:", response.data.message);
      }
    } catch (error) {
      console.error("Error moving item to wishlist:", error);
    }
  };

  const handleColorClick = (id) => {
    setSelectedColor(id);
  };

  const handleSizeClick = (id) => {
    setSelectedSize(id);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageLinkBar currentPage={product.product_name} />

      <div className={style.productDetailMainContainer}>
        <div className="container">
          <div className={style.productDetailInnerItems}>
            <div className={style.left}>
              <div className={style.proImgGall}>
                {/* Product Gallery */}
                <ProductGallery images={product.images.map(img => img.url)} />
              </div>

              <div className={style.productDescrip}>
                <h3>Product Description</h3>
                <p className={style.proDesc}>{product.description}</p>

                <ul>
                  <li>
                    <p>Brand</p>
                    <h4>{product.variants[0].brand}</h4>
                  </li>
                  <li>
                    <p>SKU</p>
                    <h4>{product.sku}</h4>
                  </li>
                  <li>
                    <p>Type</p>
                    <h4>{product.variants[0].type}</h4>
                  </li>
                  <li>
                    <p>Sole Material</p>
                    <h4>{product.variants[0].sole_material}</h4>
                  </li>
                  <li>
                    <p>Toe Shape</p>
                    <h4>{product.variants[0].toe_shape}</h4>
                  </li>
                  <li>
                    <p>Fastening</p>
                    <h4>{product.variants[0].fastening}</h4>
                  </li>
                </ul>
              </div>
            </div>

            <div className={style.right}>
              <div className={style.productDetail}>
                {product.isNewArrival && <p className={style.tag}>New Release</p>}
                <h2>{product.product_name}</h2>
                <h3>₹{product.variants[0].price}</h3>

                <div className={style.colorOpt}>
                  <h4>Color</h4>
                  <ul>
                    {product.variants.map((variant, index) => (
                      <li
                        key={variant._id}
                        onClick={() => handleColorClick(index)}
                        className={selectedColor === index ? `${style.active}` : ""}
                      >
                        <i style={{ backgroundColor: variant.color }}></i>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size options */}
                <div className={style.sizeOpt}>
                  <div className={style.bar}>
                    <h4>Size</h4>
                  </div>

                  <ul>
                    {product.uniqueSizes.map((size, index) => (
                      <li
                        key={index}
                        onClick={() => handleSizeClick(index)}
                        className={selectedSize === index ? `${style.selectSize}` : ""}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={style.buyOpt}>
                  <button className={style.cartBtn} onClick={handleAddToCart}>
                    Add to cart
                  </button>
                  <ul className={style.actionOpt}>
                    <li onClick={moveToWishlist}>
                      <Link href="">
                        <img src="/wishlist.svg" alt="Move to Wishlist" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

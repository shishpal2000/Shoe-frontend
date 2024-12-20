"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import style from "../../styles/productDetail.module.css";
import PageLinkBar from "@/components/PageLinkBar/PageLinkBar";
import ProductGallery from "./productGallery";
import axios from "axios";
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = ({ slug }) => {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedSize, setSelectedSize] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isRatingActive, setRatingIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ratings, setRatings] = useState([]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
          className={i <= rating ? style.filled : style.empty}
        />
      );
    }
    return stars;
  };

  const fetchProductData = useCallback(async () => {
    if (slug) {
      try {
        const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-products`, {
          params: { product_slug: slug }
        });

        const { data: productData } = productResponse;
        if (productData.success) {
          const allSizes = productData.data.variants.map(variant => variant.size);
          const uniqueSizes = [...new Set(allSizes)];

          setProduct({ ...productData.data, uniqueSizes });

          const ratingsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/rating/ratings/${productData.data._id}`);
          if (ratingsResponse.data.success) {
            setRatings(ratingsResponse.data.ratings);
          }
        }
      } catch (err) {
        console.error("Error fetching product data: ", err);
      }
    }
  }, [slug]);


  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

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

  const handleColorClick = (index) => setSelectedColor(index);
  const handleSizeClick = (index) => setSelectedSize(index);
  const toggleClass = () => setIsActive(!isActive);
  const ratingToggleClass = () => setRatingIsActive(!isRatingActive);
  const handlePlay = () => setIsPlaying(true);
  const handleEnded = () => setIsPlaying(false);

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
              <div className={style.userComments}>
                <div className={style.commentBar}>
                  <h4>User Comments</h4>
                  <div className={style.dropdown} onClick={ratingToggleClass}>
                    5 Star Rating <img src="/down.svg" alt="" />
                    <ul
                      className={
                        isRatingActive ? style.activeRating : style.ratingDrop
                      }
                    >
                      <li>5 Star Rating</li>
                      <li>4 Star Rating</li>
                    </ul>
                  </div>
                </div>
                <ul>
                  {ratings.length > 0 ? (
                    ratings.map(rating => (
                      <li key={rating._id}>
                        <div className={style.commRight}>
                          <div className={style.userReview}>
                            <div className={style.userDetailBar}>
                              <h4>{rating.user.firstName}</h4>
                              <p>{new Date(rating.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className={style.userRating}> {renderStars(rating.rating)}</div>
                            <p className={style.descrip}>{rating.comment}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No ratings yet.</p>
                  )}
                </ul>
                <div className={style.loadmoreCon}>
                  <Link href="" className={style.loadmore}>
                    Load More
                  </Link>
                </div>
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
                    <p onClick={toggleClass}>Size chart</p>
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
              <div className={style.vedioSectionMain}>
                {!isPlaying ? (
                  <div className="video-overlay" onClick={handlePlay}>
                    <img src="/vid_img.png" alt="Video Thumbnail" />
                    <button className="play-button">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="32" cy="32" r="32" fill="white" />
                        <path d="M25 20L45 32L25 44V20Z" fill="black" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="iframe-container">
                    <ReactPlayer
                      url={product.video_url}
                      playing={isPlaying}
                      controls
                      width="100%"
                      height="316px"
                      className={style.reactPlayer}
                      onEnded={handleEnded}
                    />
                  </div>
                )}
                <style jsx>{`
        .video-overlay {
          position: relative;
          cursor: pointer;
          height: 100%;
        }
        .video-overlay img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensures the image covers the area without distortion */
        }
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: none;
          border: none;
          cursor: pointer;
          animation: scaleUpDown 1.5s infinite ease-in-out;
        }
        .play-button svg {
          width: 64px;
          height: 64px;
        }
        @keyframes scaleUpDown {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        .iframe-container {
          width: 100%;
          position: relative;
          overflow: hidden;
        }
      `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={isActive ? style.activeFliter : style.sizeChartContainer}>
        <div
          className={style.crossBtn}
          style={{ color: "#fff" }}
          onClick={toggleClass}
        >
          ❌
        </div>
        <div className={style.sizeChartInner}>
          <div className={style.sizeProduct}>
            <div className={style.ProImg}>
              <figure>
                <img src="/cart.png" alt="" />
              </figure>
            </div>
            <div className={style.proDesc}>
              <h3>U.S. Polo Assn.</h3>
              <p>U.S. Polo Assn. Men Textured Sneakers</p>

              <div className={style.price}>
                {/* <h5>₹ 2699</h5> */}
                <h4>₹ 2699</h4>
              </div>
            </div>
          </div>

          <div className={style.sizeChartList}>
            <div className={style.sizeOpt}>
              <div className={style.opt}>
                <input type="checkbox" />
                <p>US</p>
              </div>

              <div className={style.opt}>
                <input type="checkbox" />
                <p>EURO</p>
              </div>
            </div>

            <table>
              <tr key="">
                <th>Select</th>
                <th>UK</th>
                <th>US</th>
                <th>EURO</th>
                <th>To Fit Foot Length (cm)</th>
              </tr>
              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>
              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>

              <tr key="">
                <td>
                  <input name="size" type="radio" />
                </td>
                <td>3</td>
                <td>4</td>
                <td>36</td>
                <td>23.9</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

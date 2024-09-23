"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import Link from "next/link"; // Import Link for navigation
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import style from "../../../styles/popularProduct.module.css";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-products`
        );

        const productsArray = response.data.data.products;

        // Filter products with rating >= 4
        const filteredProducts = productsArray.filter(
          (product) => product.ratingsAverage >= 4
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 388,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className={`${style.popular_product_main} popular_propduct_slider`}>
        <div className="container">
          <div className={`${style.popular_product_items}`}>
            <div className={`${style.left}`}>
              <div className={style.content}>
                <p className={style.tag}>
                  <span className={style.line}></span>
                  Our Trending Shoe
                </p>
                <h3>
                  Most Popular <br />
                  Products
                </h3>
                <p className={style.descrip}>
                  Lorem ipsum dolor sit amet, consectetur <br />
                  adipiscing elit,
                </p>
                <SecondaryBtn btnText="Explore" />
              </div>
            </div>

            <div className={`${style.right}`}>
              <Slider {...settings}>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Link
                      data-aos="fade-up"
                      data-aos-anchor-placement="top-bottom"
                      href={`/product-details/${product.product_slug}`} // Use the slug for dynamic routing
                      key={product._id}
                      className={style.productCard} // Ensure card styling
                    >
                      <div className={style.shoeSlideCard}>
                        <figure>
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0].url}
                              alt={product.product_name}
                            />
                          ) : (
                            <img
                              src="/placeholder-image.png"
                              alt="Placeholder Image"
                            />
                          )}
                        </figure>
                        <h4>{product.product_name}</h4>
                        <div className={style.bar}>
                          {product.variants && product.variants.length > 0 ? (
                            <p className={style.price}>
                              ₹ {product.variants[0].price}
                            </p>
                          ) : (
                            <p className={style.price}>Price not available</p>
                          )}
                          <div className={style.learnMore}>
                            <img src="/learnMore.svg" alt="Learn More" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No popular products found</p>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProducts;

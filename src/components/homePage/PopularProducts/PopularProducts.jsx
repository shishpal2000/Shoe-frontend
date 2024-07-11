"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import style from "../../../styles/popularProduct.module.css";

const PopularProducts = () => {
  const ShoesData = [
    {
      id: 1,
      name: "Running sport shoe",
      price: "₹ 3999.00",
      img: "shoe-2.png",
    },
    {
      id: 2,
      name: "Running sport shoe",
      price: "₹ 3999.00",
      img: "shoe-2.png",
    },
    {
      id: 3,
      name: "Running sport shoe",
      price: "₹ 3999.00",
      img: "shoe-2.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3, // Default number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Settings for screens <= 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Settings for screens <= 600px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 388, // Settings for screens <= 480px
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
                  <div className={style.line}></div>
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
                {ShoesData.map((data) => (
                  <div className={style.shoeSlideCard} key={data.id}>
                    <figure>
                      <img src={data.img} alt="shoeImg" />
                    </figure>
                    <h4>{data.name}</h4>
                    <div className={style.bar}>
                      <p className={style.price}>{data.price}</p>
                      <div className={style.learnMore}>
                        <img src="learnMore.svg" alt="" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularProducts;

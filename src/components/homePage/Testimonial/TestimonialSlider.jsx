"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import style from "../../../styles/testimonial.module.css";

const TestimonialSlider = () => {
  const TestimonialSliderData = [
    {
      id: 1,
      userImg: "user-1.png",
      comment: "Good Quality",
      descrip: "I highly recommend shopping from kicks",
      rating: "⭐⭐⭐",
      ratingVal: "5.0",
      proImg: "testi_1.png",
    },

    {
      id: 2,
      userImg: "user-2.png",
      comment: "Good Quality",
      descrip: "I highly recommend shopping from kicks",
      rating: "⭐⭐⭐⭐⭐",
      ratingVal: "5.0",
      proImg: "testi-2.png",
    },

    {
      id: 3,
      userImg: "user-3.png",
      comment: "Good Quality",
      descrip: "I highly recommend shopping from kicks",
      rating: "⭐⭐⭐⭐",
      ratingVal: "5.0",
      proImg: "testi-3.png",
    },

    {
      id: 4,
      userImg: "user-1.png",
      comment: "Good Quality",
      descrip: "I highly recommend shopping from kicks",
      rating: "⭐⭐⭐",
      ratingVal: "5.0",
      proImg: "testi-2.png",
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480, // Settings for screens <= 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div
        className={`${style.sider_card_container} testimonialSliderContainer`}
      >
        <Slider {...settings}>
          {TestimonialSliderData.map(
            ({ id, userImg, comment, descrip, rating, ratingVal, proImg }) => {
              return (
                <>
                  <div key={id} className={style.testi_slider_card}>
                    <div className={style.testi_detail}>
                      <div className={style.left}>
                        <h3>{comment}</h3>
                        <p className={style.descrip}>{descrip}</p>
                        <p className={style.rating}>
                          {rating}
                          {ratingVal}
                        </p>
                      </div>
                      <div className={style.right}>
                        <figure>
                          <img src={userImg} alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className={style.proImg}>
                      <figure>
                        <img src={proImg} alt="" />
                      </figure>
                    </div>
                  </div>
                </>
              );
            }
          )}
        </Slider>
      </div>
    </>
  );
};

export default TestimonialSlider;

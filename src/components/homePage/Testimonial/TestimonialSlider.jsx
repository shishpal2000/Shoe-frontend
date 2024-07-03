"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const TestimonialSlider = () => {
  const TestimonialSliderData = [
    {
      id: 1,
      userImg: "",
      comment: "Good Quality",
      descrip: "I highly recommend shopping from kicks",
      rating: `&#9733; &#9733; &#9733; &#9733; &#9733;`,
      ratingVal: "5.0",
      proImg: "testi_1.png",
    },

    {
      id: 2,
      userImg: "",
      comment: "Good Quality",
      descrip: "I highly recommend shopping from kicks",
      rating: `&#9733; &#9733; &#9733; &#9733; &#9733;`,
      ratingVal: "5.0",
      proImg: "testi_2.png",
    },

    {
      id: 3,
      userImg: "",
      comment: "Good Quality",
      descrip: "I highly recommend shopping from kicks",
      rating: `&#9733; &#9733; &#9733; &#9733; &#9733;`,
      ratingVal: "5.0",
      proImg: "testi_1.png",
    },
  ];

  const settings = {
    dots: true,
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
      <div className="sider_card_container">
        <Slider {...settings}>
          {TestimonialSliderData.map(() => {
            return (
              <>
                <div className="testi_slider_card">
                  <div className="testi_detail"></div>
                  <div className="proImg">
                    <img src="testi_1.png" alt="" />
                  </div>
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default TestimonialSlider;

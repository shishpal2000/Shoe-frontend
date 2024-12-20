"use client";
import style from "../../../styles/testimonial.module.css";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <>
      <div className={style.testimonial_main_container}>
        <div className="container" /* style={{ backgroundColor: "red" }} */>
          <h2>Testimonials</h2>
          <div className={style.testimonial_slider}>
            <TestimonialSlider />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;

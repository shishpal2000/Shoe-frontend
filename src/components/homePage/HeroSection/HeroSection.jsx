"use client";
import style from "../../../styles/heroSection.module.css";

const HeroSection = () => {
  return (
    <>
      <div
        className={style.heroSection_main}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="container">
          <div className={style.heroSection_items}>
            <figure>
              <img src="background.png" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

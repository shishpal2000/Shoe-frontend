import style from "../../../styles/heroSection.module.css";

const HeroSection = () => {
  return (
    <>
      <div className={style.heroSection_main}>
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

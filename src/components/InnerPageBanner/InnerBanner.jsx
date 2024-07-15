import style from "../../styles/innerBanner.module.css";

const InnerBanner = () => {
  return (
    <>
      <div className={style.innerBannerMain}>
        <div className="container">
          <div className={style.InnerBannerItems}>
            <div className={style.content}>
              <p className={style.tag}>Shoes</p>
              <h2>Shoes</h2>
              <p className={style.descrip}>
                Shoes made with your comfort in mind so you can put all of your
                focus into your next session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerBanner;

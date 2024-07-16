import style from "../../styles/innerBanner.module.css";

const InnerBanner = ({ tag, heading, descrip, bgImg }) => {
  return (
    <>
      <div className={style.innerBannerMain}>
        <div className="container">
          <div className={style.InnerBannerItems}>
            <figure>
              <img src={bgImg} alt="" />
            </figure>
            <div className={style.content}>
              <p className={style.tag}>{tag}</p>
              <h2>{heading}</h2>
              <p className={style.descrip}>{descrip}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerBanner;

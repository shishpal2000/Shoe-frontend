"use client";
import Image from "next/image";
import style from "../../../styles/homeGallery.module.css";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";

const HomeGallery = () => {
  return (
    <>
      <div className={style.homeGallery_main}>
        <div className="container">
          <div className={style.gallery_items}>
            <div
              className={style.left}
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <figure
                style={{ position: "relative", width: "100%", height: "792px" }}
              >
                <Image
                  src="/gallery-1.png"
                  alt="Description"
                  layout="fill"
                  // objectFit="contain"
                  objectPosition="top"
                  fill={true}
                />
              </figure>

              <div className={style.content}>
                <h3>
                  Men’s <br />
                  and <br />
                  style
                </h3>
              </div>
            </div>
            <div
              className={style.right}
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <figure
                style={{ position: "relative", width: "100%", height: "505px" }}
              >
                <Image
                  src="/gallery-2.png"
                  alt="Description"
                  layout="fill"
                  // objectFit="contain"
                  objectPosition="top"
                />
              </figure>

              <div className={style.content}>
                <h3>
                  flat up to 50% <br />
                  off for men’s
                </h3>

                <PrimaryBtn btnText="buy now" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeGallery;

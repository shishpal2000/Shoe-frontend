import InnerBanner from "@/components/InnerPageBanner/InnerBanner";
import style from "../../styles/aboutus.module.css";
import { WeOffer } from "@/components/homePage/WeOffer/WeOffer";
import Testimonial from "@/components/homePage/Testimonial/Testimonial";

const AboutUs = () => {
  return (
    <>
      <InnerBanner
        tag="About us"
        heading="Unique & Stylist Fashion"
        bgImg="/about-bg.png"
        descrip={`I am a highly organised and motivated professional Fashion Designer`}
      />

      <div className={style.abouSectionContainer}>
        <div className="container">
          <div className={style.aboutItems}>
            <div className={style.left}>
              <figure>
                <img src="/aboutImg.png" alt="" />
              </figure>
            </div>
            <div className={style.right}>
              <div>
                <h2>Unique & Stylist Fashion We Are An Awesome Agency.</h2>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur.{" "}
                </p>
                <p>
                  Maecenas egestas arcu quis ligula mattis placerat. Quisque id
                  mi. Sed a libero. Vestibulum ullamcorper mauris at ligula.
                  Aenean posuere, tortor sed cursus feugiat, nunc augue blandit
                  nunc, eu sollicitudin urna dolor sagittis lacus. Suspendisse
                  non nisl sit amet velit hendrerit rutrum. Nulla porta dolor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WeOffer />
      <Testimonial />
    </>
  );
};

export default AboutUs;

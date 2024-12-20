"use client";

import { useEffect } from "react";
import style from "../../../styles/sectionTittle.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const SectionTittle = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  return (
    <>
      <div
        className={style.sectionTittle}
        /* data-aos="fade-up"
        data-aos-anchor-placement="top-center" */
      >
        <div className="container">
          <div className={style.tittle}>
            <h2>{props.secTittle}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionTittle;

"use client";

import { useEffect } from "react";
import style from "../../../styles/categoriesCard.module.css";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";

import AOS from "aos";
import "aos/dist/aos.css";
const CategoriesCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  const CARD_DATA = [
    {
      id: 1,
      title: "Classic Formal\nShoes",
      img: "cate-1.png",
      tag: "Skate",
    },
    {
      id: 2,
      title: "occasion \n boots",
      img: "cate-2.png",
      tag: "Retro",
    },
    {
      id: 3,
      title: "Slippers & \n Sandals",
      img: "cate-3.png",
      tag: "Sporty",
    },
  ];

  return (
    <>
      {CARD_DATA.map((data) => (
        <div
          key={data.id}
          className={`${style.categoriesCard}`}
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className={style.tag}>{data.tag}</div>
          <h4 className={style.tittle}>{data.title}</h4>

          <div className={style.proImg}>
            <figure>
              <img src={data.img} alt="" />
            </figure>
          </div>
          <div className={style.cardBtn_container}>
            <PrimaryBtn btnText="buy now" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoriesCard;

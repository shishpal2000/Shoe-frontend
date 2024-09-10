"use client";
import Image from "next/image";
import style from "../../../styles/weOffer.module.css";

const OfferCardData = [
  {
    id: 1,
    icon: "offer_Icon_1.svg",
    offerName: "Free world delivery",
    descrip: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut magna aliqua.`,
  },

  {
    id: 2,
    icon: "offer_Icon_2.svg",
    offerName: "money back gaurantee",
    descrip: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut magna aliqua.`,
  },

  {
    id: 3,
    icon: "offer_Icon_3.svg",
    offerName: "Free world delivery",
    descrip: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut magna aliqua.`,
  },

  {
    id: 4,
    icon: "offer_Icon_4.svg",
    offerName: "Free world delivery",
    descrip: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut magna aliqua.`,
  },
];

export const WeOffer = () => {
  return (
    <>
      <div className={style.weOffer_main}>
        <div className="container">
          <h2>
            The value that we offer <br />
            our customers
          </h2>
          <div className={style.weOffer_items}>
            <div className={style.offerCardContainer}>
              <OfferCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const OfferCard = () => {
  return (
    <>
      {OfferCardData.map(({ id, icon, offerName, descrip }) => {
        return (
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            key={id}
            className={style.offerCard}
          >
            <div className="icon">
              <figure>
                <Image src={icon} width={30} height={30} alt="" />
              </figure>
            </div>
            <h4 className="tittle">{offerName}</h4>
            <p>{descrip}</p>
          </div>
        );
      })}
    </>
  );
};

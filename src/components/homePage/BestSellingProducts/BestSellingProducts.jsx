"use client";

import { useState } from "react";
import styles from "../../../styles/bestSellingProduct.module.css";
import SectionTittle from "../SectionTittle/SectionTittle";
import Collection from "../ShoeCollection/Collection";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";

const BestSellingProducts = () => {
  const [activeTab, setActiveTab] = useState("Men");

  const TabOptionData = [
    {
      id: 1,
      tabName: "Men",
    },
    {
      id: 2,
      tabName: "Women",
    },
    {
      id: 3,
      tabName: "Boy",
    },
    {
      id: 4,
      tabName: "Child",
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className={styles.tab_main_container}>
        <div className={styles.tabContainer}>
          <SectionTittle secTittle="Best Selling" />
          <div className="container">
            <div className={styles.tab_btn_container}>
              {TabOptionData.map((data) => {
                return (
                  <>
                    <div
                      className={`${styles.tab} ${
                        activeTab === `${data.tabName}` ? styles.active : ""
                      }`}
                      onClick={() => handleTabClick(`${data.tabName}`)}
                    >
                      {data.tabName}
                    </div>
                  </>
                );
              })}
            </div>
            <div className={styles.content}>
              {TabOptionData.map((data) => {
                return (
                  <>
                    {activeTab === `${data.tabName}` && (
                      <div>
                        <Collection />
                        <div
                          style={{ textAlign: "center", marginTop: "56.29px" }}
                        >
                          <SecondaryBtn btnText="explore more" />
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellingProducts;

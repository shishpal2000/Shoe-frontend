"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/bestSellingProduct.module.css";
import SectionTittle from "../SectionTittle/SectionTittle";
import Collection from "../ShoeCollection/Collection";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import Link from "next/link";

const BestSellingProducts = () => {
  const [activeTab, setActiveTab] = useState("Men");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const TabOptionData = [
    { id: 1, tabName: "Men" },
    { id: 2, tabName: "Women" },
    { id: 3, tabName: "Boy" },
    { id: 4, tabName: "Child" },
  ];

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-products?isNewArrival=true`);
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeTab);
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={styles.tab_main_container}>
        <div className={styles.tabContainer}>
          <SectionTittle secTittle="New Arrivals" />
          <div className="container">
            <div className={styles.tab_btn_container}>
              {TabOptionData.map((data) => (
                <div
                  key={data.id}
                  className={`${styles.tab} ${activeTab === data.tabName ? styles.active : ""}`}
                  onClick={() => handleTabClick(data.tabName)}
                >
                  {data.tabName}
                </div>
              ))}
            </div>
            <div className={styles.content}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <Collection products={products} /> 
                  <div style={{ textAlign: "center", marginTop: "56.29px" }}>
                    <Link href="/product-listing">
                      <SecondaryBtn btnText="explore more" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellingProducts;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/bestSellingProduct.module.css";
import SectionTittle from "../SectionTittle/SectionTittle";
import Collection from "../ShoeCollection/Collection";
import SecondaryBtn from "../SecondaryBtn/SecondaryBtn";
import Link from "next/link";

const BestSellingProducts = () => {
  const [activeTab, setActiveTab] = useState(null); 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true); 

  const fetchCategories = async () => {
    setCategoryLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/get-all-categories`, {
        params: { includeParents: true } 
      });
      const fetchedCategories = response.data.data;

      if (fetchedCategories.length > 0) {
        setCategories(fetchedCategories);
        setActiveTab(fetchedCategories[0].slug); 
      } else {
        console.error("No parent categories found");
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-products`, {
        params: { category: category.toLowerCase(), isNewArrival: true },
      });
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeTab) {
      fetchProducts(activeTab);
    }
  }, [activeTab]);

  const handleTabClick = (tabSlug) => {
    setActiveTab(tabSlug);
  };

  return (
    <div className={styles.tab_main_container}>
      <div className={styles.tabContainer}>
        <SectionTittle secTittle="New Arrivals" />
        <div className="container">
          {categoryLoading ? (
            <p>Loading Categories...</p>
          ) : (
            <>
              <div className={styles.tab_btn_container}>
                {categories.map((category) => (
                  <div
                    key={category.slug} 
                    className={`${styles.tab} ${activeTab === category.slug ? styles.active : ""}`}
                    onClick={() => handleTabClick(category.slug)} 
                  >
                    {category.name} 
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
                        <SecondaryBtn btnText="Explore More" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;

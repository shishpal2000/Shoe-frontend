"use client";

import { useState, useEffect } from "react";
import style from "../../../styles/categoriesCard.module.css";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const CategoriesCard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/get-all-categories?showOnFrontend=true`);
        if (response.status === 200) {
          setCategories(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <div
          key={category._id}
          className={style.categoriesCard}
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className={style.tag}>{category.badgeName || category.name}</div>
          <h4 className={style.tittle}>{category.name}</h4>
          <div className={style.proImg}>
            <figure>
              <img src={category.image} alt={category.name} />
            </figure>
          </div>
          <div className={style.cardBtn_container}>
            <Link href={`/products?category=${category._id}`}>
              <PrimaryBtn btnText="Buy Now" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoriesCard;
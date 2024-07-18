"use client";
import { useState } from "react";
import style from "../../styles/productDetail.module.css";
import Link from "next/link";

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState(1);

  const handleClick = (id) => {
    setSelectedColor(id);
  };

  const colors = [
    {
      id: 1,
      color: "#614842",
    },
    {
      id: 2,
      color: "#707E6E",
    },
    {
      id: 3,
      color: "#FB9D52",
    },
    {
      id: 4,
      color: "#925513",
    },
  ];

  const size = [
    {
      id: 1,
      size: 40,
      stock: "#0A0B0B",
    },
    {
      id: 2,
      size: 40,
      stock: "#D2D1D3",
    },
    {
      id: 3,
      size: 40,
      stock: "#D2D1D3",
    },
    {
      id: 4,
      size: 40,
      stock: "",
    },
    {
      id: 5,
      size: 40,
      stock: "",
    },
    {
      id: 6,
      size: 40,
      stock: "",
    },
    {
      id: 7,
      size: 40,
      stock: "",
    },
  ];

  return (
    <>
      <div className={style.productDetailMainContainer}>
        <div className="container">
          <div className={style.productDetailInnerItems}>
            <div className={style.left}>
              <ul className={style.proImgGall}>
                <li>
                  <figure>
                    <img src="/pro-1-1.png" alt="" />
                  </figure>
                </li>
                <li>
                  <figure>
                    <img src="/pro-1-2.png" alt="" />
                  </figure>
                </li>
                <li>
                  <figure>
                    <img src="/pro-1-3.png" alt="" />
                  </figure>
                </li>
                <li>
                  <figure>
                    <img src="/pro-1-4.png" alt="" />
                  </figure>
                </li>
              </ul>
            </div>
            <div className={style.right}>
              <div className={style.productDetail}>
                <p className={style.tag}>New Release</p>
                <h2>ADIDAS 4DFWD X PARLEY RUNNING SHOES</h2>
                <h3>$125.00</h3>

                <div className={style.colorOpt}>
                  <h4>color</h4>
                  <ul>
                    {colors.map(({ id, color }) => {
                      return (
                        <li
                          onClick={() => handleClick(id)}
                          className={
                            selectedColor === id ? `${style.active}` : ""
                          }
                          key={id}
                        >
                          <i style={{ backgroundColor: `${color}` }}></i>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={style.sizeOpt}>
                  <div className={style.bar}>
                    <h4>Size</h4>
                    <Link href="/">Size chart</Link>
                  </div>

                  <ul>
                    {size.map(({ id, size, stock }) => {
                      return (
                        <li style={{ backgroundColor: `${stock}` }} key={id}>
                          {size}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

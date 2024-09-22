"use client";

import style from "../../styles/productList.module.css";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ProductList = ({ products }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const handleProductClick = (products) => {
    console.log("Product clicked: ", products.product_name);
  };
  return (
    <div className="productListMain">
      <div className={style.productListItems}>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map(product => {
            const { _id, product_name, images, product_slug, isNewArrival, variants } = product;

            const productUrl = product_slug ? `/product-details/${product_slug}` : "#";

            const mainImage = images[0]?.url || "/default-image.png";
            const secondImage = images[1]?.url || mainImage;
            const mainVariant = variants && variants.length > 0 ? variants[0] : null;
            const price = mainVariant ? mainVariant.price : null;

            return (
              <Link
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                href={productUrl}
                className={style.card}
                key={_id}
                onClick={() => handleProductClick(product)}
              >
                <div className={style.tag}>{isNewArrival ? 'New' : ''}</div>
                <div className={style.proImg}>
                  <figure>
                    <img className={style.img1} src={mainImage} alt={product_name} />
                    <img className={style.img2} src={secondImage} alt={product_name} />
                  </figure>
                </div>
                <div className={style.proDetail}>
                  <p className={style.proName}>{product_name}</p>
                  <div className={style.bar}>
                    <div className={style.price}>
                      {price && (
                        <p className={style.productPrice}>
                           ₹{price.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className={style.learnMore}>
                      <img src="learnMore.svg" alt="Learn More" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductList;

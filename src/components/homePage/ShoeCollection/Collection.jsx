import Link from "next/link";
import style from "../../../styles/collection.module.css";

const Collection = ({ products }) => {
  return (
    <>
      <div className={style.collection_container}>
        {products?.map((product) => {
          const firstImage = product.images[0]?.url || "/placeholder-image.png";
          const secondImage = product.images[1]?.url || firstImage;

          return (
            <Link
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              href={`/product-details/${product.product_slug}`}
              key={product._id}
              className={style.productCard}
            >
              <div className={style.tag}>New</div>
              <div className={style.wishlist}>
                <img src="/wishlist.svg" alt="Add to Wishlist" />
              </div>
              <figure>
                <img src={firstImage} alt={product.product_name} />
                <img src={secondImage} alt={product.product_name} />
              </figure>
              <div className={style.proDetail}>
                <p className={style.proName}>{product.product_name}</p>

                <div className={style.bar}>
                  <div className={style.price}>
                    {product.variants[0] && (
                      <>
                        <p className={style.realPrice}>
                          <del>₹{product.variants[0].price + 2000}</del>
                        </p>
                        <p className={style.offerPrice}>
                          ₹{product.variants[0].price}
                        </p>
                      </>
                    )}
                  </div>
                  <div className={style.learnMore}>
                    <img src="/learnMore.svg" alt="Learn More" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Collection;

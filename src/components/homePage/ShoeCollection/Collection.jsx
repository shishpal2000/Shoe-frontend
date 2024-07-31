import Link from "next/link";
import style from "../../../styles/collection.module.css";

const Collection = () => {
  const MenShoeData = [
    {
      id: 1,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "/pro-1.png",
      proImg2: "/pro-2.png",
    },
    {
      id: 2,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "/pro-1.png",
      proImg2: "/pro-2.png",
    },
    {
      id: 3,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "/pro-1.png",
      proImg2: "/pro-2.png",
    },
    {
      id: 4,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "/pro-1.png",
      proImg2: "/pro-2.png",
    },
    {
      id: 5,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "/pro-1.png",
      proImg2: "/pro-2.png",
    },
    {
      id: 6,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "/pro-1.png",
      proImg2: "/pro-2.png",
    },
  ];
  return (
    <>
      <div className={style.collection_container}>
        {MenShoeData.map((data) => {
          return (
            <Link
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              href="/product-details"
              key={data.id}
              className={style.productCard}
            >
              <div className={style.tag}>{data.tag}</div>
              <div className={style.wishlist}>
                <img src="wishlist.svg" alt="" />
              </div>
              <figure>
                <img src={data.proImg} alt="" />
                <img src={data.proImg2} alt="" />
              </figure>
              <div className={style.proDetail}>
                <p className={style.proName}>{data.proName}</p>

                <div className={style.bar}>
                  <div className={style.price}>
                    <p className={style.realPrice}>
                      <del>{data.realprice}</del>
                    </p>
                    <p className={style.offerPrice}>{data.offerPrice}</p>
                  </div>
                  <div className={style.learnMore}>
                    <img src="learnMore.svg" alt="" />
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

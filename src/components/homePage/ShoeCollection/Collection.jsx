import style from "../../../styles/collection.module.css";

const Collection = () => {
  const MenShoeData = [
    {
      id: 1,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "shoe-1.svg",
    },
    {
      id: 2,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "shoe-1.svg",
    },
    {
      id: 3,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "shoe-1.svg",
    },
    {
      id: 4,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "shoe-1.svg",
    },
    {
      id: 5,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "shoe-1.svg",
    },
    {
      id: 6,
      proName: "Slick formal sneaker shoe",
      realprice: "₹ 4999.00",
      offerPrice: "₹ 2999.00",
      tag: "new",
      proImg: "shoe-1.svg",
    },
  ];
  return (
    <>
      <div className={style.collection_container}>
        {MenShoeData.map((data) => {
          return (
            <div key={data.id} className={style.productCard}>
              <div className={style.tag}>{data.tag}</div>
              <div className={style.wishlist}>
                <img src="wishlist.svg" alt="" />
              </div>
              <figure>
                <img src={data.proImg} alt="" />
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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Collection;

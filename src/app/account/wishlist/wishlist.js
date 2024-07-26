import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";
import styles from "../../../styles/wishlist.module.css";
import Link from "next/link";

const Wishlist = () => {
  const WishListData = [
    {
      id: 1,
      proImg: "/pro-1-1.png",
      proName: "DROPSET TRAINER SHOES",
      proType: "Men’s Road Running Shoes",
      proSpe: "Enamel Blue/ University White",
      proPrice: "$125.00",
    },

    {
      id: 2,
      proImg: "/pro-1-1.png",
      proName: "TRAINER SHOES",
      proType: "Men’s Road Running Shoes",
      proSpe: "University White",
      proPrice: "$15.00",
    },
    {
      id: 3,
      proImg: "/pro-1-1.png",
      proName: "DROPSET TRAINER SHOES",
      proType: "Men’s Road Running Shoes",
      proSpe: "Enamel Blue/ University White",
      proPrice: "$125.00",
    },

    {
      id: 4,
      proImg: "/pro-1-1.png",
      proName: "TRAINER SHOES",
      proType: "Men’s Road Running Shoes",
      proSpe: "University White",
      proPrice: "$15.00",
    },
  ];

  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="Wishlist" />
        <div className="container">
          <div className={style.myAccountInnerItems}>
            <div className={style.left}>
              <MyAccountSideBar />
            </div>
            <div className={style.right}>
              <div className={styles.wishlistContainer}>
                <h3>Wishlist</h3>

                <ul className={styles.wishlistList}>
                  {WishListData.map(
                    ({ id, proImg, proName, proType, proSpe, proPrice }) => {
                      return (
                        <>
                          <li key={id}>
                            <div className={styles.left}>
                              <figure>
                                <img src={proImg} alt="" />
                              </figure>
                              <div className={styles.proInfo}>
                                <h4>{proName}</h4>
                                <p>{proType}</p>
                                <p>{proSpe}</p>
                                <h4 className={styles.price}>{proPrice}</h4>
                              </div>
                            </div>
                            <div className={styles.right}>
                              <Link className={styles.cartBtn} href="/cart">
                                add to cart
                              </Link>

                              <i className={styles.delBtn} href="">
                                <img src="/Bin.svg" alt="" />
                              </i>
                            </div>
                          </li>
                        </>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;

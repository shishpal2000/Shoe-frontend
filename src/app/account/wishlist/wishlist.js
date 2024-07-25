import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";

const Wishlist = () => {
  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="Wishlist" />
        <div className="container">
          <div className={style.myAccountInnerItems}>
            <div className={style.left}>
              <MyAccountSideBar />
            </div>
            <div className={style.right}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;

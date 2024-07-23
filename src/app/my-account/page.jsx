import MyAccountSideBar from "@/components/MyAccountSideBar/MyAccountSideBar";
import style from "../../styles/myAccount.module.css";
import { MyAccoutPageLinkBar } from "@/components/PageLinkBar/PageLinkBar";

export const metadata = {
  title: "Shoe | My Account",
  description: "",
  alternates: {
    canonical: "abc",
    languages: {
      "en-US": "English",
    },
  },
};

const MyAccount = () => {
  return (
    <>
      <div className={style.myAccountMainContainer}>
        <MyAccoutPageLinkBar currentPage="My Orders" />
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

export default MyAccount;

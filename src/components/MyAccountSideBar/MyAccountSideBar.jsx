import Link from "next/link";
import style from "../../styles/MyAccountSideBar.module.css";

const MyAccountSideBar = () => {
  return (
    <>
      <div className={style.sideBarMainContainer}>
        <div className={style.sideBarItems}>
          <div className={style.tittle}>
            <h3>Hey, Ujjwal</h3>
            <p>Welcome to your Account</p>
          </div>

          <ul className={style.sideBarNav}>
            <li>
              <Link className={style.navActive} href="/account/my-orders">
                <figure>
                  <img src="/myOrder.svg" alt="" />
                </figure>
                My orders
              </Link>
            </li>

            <li>
              <Link href="/account/wishlist">
                <figure>
                  <img src="/wishlist1.svg" alt="" />
                </figure>
                Wishlist
              </Link>
            </li>

            <li>
              <Link href="/account/my-info">
                <figure>
                  <img src="/user1.svg" alt="" />
                </figure>
                My info
              </Link>
            </li>

            <li>
              <Link href="/credential/log-in">
                <figure>
                  <img src="/signOut.svg" alt="" />
                </figure>
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyAccountSideBar;

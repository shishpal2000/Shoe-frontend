import Link from "next/link";
import style from "../../styles/MyAccountSideBar.module.css";

const MyAccountSideBar = () => {
  return (
    <>
      <div className={style.sideBarMainContainer}>
        <div className={style.sideBarItems}>
          <div className={style.tittle}>
            <h3>Hello Jhanvi</h3>
            <p>Welcome to your Account</p>
          </div>

          <ul className={style.sideBarNav}>
            <li>
              <Link className={style.navActive} href="">
                <figure>
                  <img src="/myOrder.svg" alt="" />
                </figure>
                My orders
              </Link>
            </li>

            <li>
              <Link href="">
                <figure>
                  <img src="/wishlist1.svg" alt="" />
                </figure>
                Wishlist
              </Link>
            </li>

            <li>
              <Link href="">
                <figure>
                  <img src="/user1.svg" alt="" />
                </figure>
                My info
              </Link>
            </li>

            <li>
              <Link href="">
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

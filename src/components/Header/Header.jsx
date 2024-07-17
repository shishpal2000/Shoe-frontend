import Link from "next/link";
import style from "../../styles/header.module.css";

const Header = () => {
  return (
    <>
      <div className={style.header_main}>
        <div className="container">
          <div className={style.header_items}>
            <div className={style.logo}>
              <h2>
                <Link href="/">Shoes</Link>
              </h2>
            </div>
            <div className={style.search}>
              <input
                type="text"
                placeholder="Search Product"
                alt="search icon"
              />
              <div className={style.icon}>
                <figure>
                  <img src="/search.svg" alt="" />
                </figure>
              </div>
            </div>
            <div className={style.contact}>
              <div className={style.icon}>
                <figure>
                  <img src="/WhatsApp_black.svg" alt="call icon" />
                </figure>
              </div>
              <div className={style.detail}>
                <Link href="tel:821730182123">
                  <span>Call US :</span> (+62) 821730182123
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.menuBar_main}>
        <div className="container">
          <div className={style.menuBar_items}>
            <ul className={style.menuLink}>
              <li>
                <Link href="/">
                  <b>Home</b>
                </Link>
              </li>
              <li>
                <Link href="/product-listing">
                  shoes <img src="/arrow-down.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals">new Arrivals</Link>
              </li>
              <li>
                <Link href="">About Us</Link>
              </li>
            </ul>

            <ul className={style.menuOpt}>
              <li>
                <Link href="/credential/log-in">
                  <figure>
                    <img src="/user.svg" alt="" />
                  </figure>
                </Link>
              </li>
              <li>
                <Link href="">
                  <figure>
                    <img src="/cart.svg" alt="" />
                  </figure>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

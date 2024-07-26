import Link from "next/link";
import style from "../../styles/footer.module.css";

const Footer = () => {
  return (
    <>
      <div className={style.footerMainContainer}>
        <div className="container">
          <p className={style.footerLogo}>
            <Link href="/">Shoes</Link>
          </p>
          <div className={style.footerInnerItems}>
            <div className={style.footerListing}>
              <ul className={style.social_icon}>
                <li>
                  <Link href="">
                    <img src="/fbIcon.svg" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/instaIcon.svg" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <img src="/linkedIcon.svg" alt="" />
                  </Link>
                </li>
                <li>
                  <Link href="">
                    {/* <img src="dribbleIcon.svg" alt="" /> */}
                  </Link>
                </li>
                <li>
                  <Link href="">
                    {/* <img src="twitterIcon.svg" alt="" /> */}
                  </Link>
                </li>
              </ul>

              <div className={style.address}>
                <h4>Address</h4>
                <Link href="tel:654987877">+123 654 987 877</Link>
                <p>
                  The Bronx, NY <br />
                  14568, USA
                </p>
              </div>
            </div>
            <div className={style.footerListing}>
              <p className={style.tag}>my account</p>
              <ul className={style.footerLinks}>
                <li>
                  <Link href="/credential/log-in">Sign in</Link>
                </li>
                <li>
                  <Link href="/credential/sign-up">Register</Link>
                </li>
                <li>
                  <Link href="">Order status</Link>
                </li>
              </ul>
            </div>
            <div className={style.footerListing}>
              <p className={style.tag}>Help</p>
              <ul className={style.footerLinks}>
                <li>
                  <Link href="/help/shipping">Shipping</Link>
                </li>
                <li>
                  <Link href="/help/return">Returns</Link>
                </li>
                <li>
                  <Link href="/help/cancellation">Cancellation</Link>
                </li>
              </ul>
            </div>
            <div className={style.footerListing}>
              <p className={style.tag}>Shop</p>
              <ul className={style.footerLinks}>
                <li>
                  <Link href="">All Products</Link>
                </li>
                <li>
                  <Link href="">Bedroom</Link>
                </li>
                <li>
                  <Link href="">Dinning Room</Link>
                </li>
              </ul>
            </div>
            <div className={style.footerListing}>
              <p className={style.tag}>Legal Stuff</p>
              <ul className={style.footerLinks}>
                <li>
                  <Link href="/term-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy & Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <p className={style.copyRight}>
            Copyright ©2024 Shoes. All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

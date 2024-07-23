import Link from "next/link";
import style from "../../styles/pageLink.module.css";

const PageLinkBar = (props) => {
  return (
    <>
      <div className={style.pageLinkBarMain}>
        <div className="container">
          <ul>
            <li>
              <Link href="/product-listing">Shoes</Link>
              <img src="/rightArrow.svg" alt="" />
            </li>
            <li>
              <Link href="/product-listing">Sneakers</Link>
              <img src="/rightArrow.svg" alt="" />
            </li>
            <li>
              <Link href="/product-listing">Men’s Sneakers</Link>
              <img src="/rightArrow.svg" alt="" />
            </li>
            <li>
              <Link href="/product-listing">{props.currentPage}</Link>
              <img src="/rightArrow.svg" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export const MyAccoutPageLinkBar = (props) => {
  return (
    <>
      <div className={style.pageLinkBarMain}>
        <div className="container">
          <ul>
            <li>
              <Link href="/">Home</Link>
              <img src="/rightArrow.svg" alt="" />
            </li>
            <li>
              <Link href="/">My account</Link>
              <img src="/rightArrow.svg" alt="" />
            </li>
            <li>
              <Link href="/product-listing">{props.currentPage}</Link>
              <img src="/rightArrow.svg" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PageLinkBar;

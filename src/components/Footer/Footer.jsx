"use client"
import Link from "next/link";
import style from "../../styles/footer.module.css";
import { useState, useEffect } from "react";
const Footer = () => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contactinfo/get-contact-info`);
        const data = await response.json();
        if (data.success && data.data) {
          setPhoneNumber(data.data.phone);
          setAddress(data.data.address);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

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
                <Link href={`tel:${phoneNumber}`}>
                  <span>Call Us :</span> {phoneNumber}
                </Link>
                <br />
                <br />
                <span>Address:</span> {address}
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
                  <Link href="/account/my-orders">Order status</Link>
                </li>
              </ul>
            </div>
            <div className={style.footerListing}>
              <p className={style.tag}>Help</p>
              <ul className={style.footerLinks}>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
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
                  <Link href="/account/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link href="/product-listing">All Products</Link>
                </li>
                <li>
                  <Link href="/new-arrivals">New Arrivals</Link>
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

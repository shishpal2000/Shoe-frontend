"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import style from "../../styles/header.module.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (searchTerm) {
      // Redirect to the search results page
      window.location.href = `/search?name=${encodeURIComponent(searchTerm)}`;
    }
  };

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contactinfo/get-contact-info`);
        const data = await response.json();
        if (data.success && data.data) {
          setPhoneNumber(data.data.phone);
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

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
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search Product"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  alt="search icon"
                />
                <button type="submit" className={style.icon}>
                  <figure>
                    <img src="/search.svg" alt="search icon" />
                  </figure>
                </button>
              </form>
            </div>
            <div className={style.contact}>
              <div className={style.icon}>
                <figure>
                  <img src="/WhatsApp_black.svg" alt="call icon" />
                </figure>
              </div>
              <div className={style.detail}>
                <Link href={`tel:${phoneNumber}`}>
                  <span>Call Us :</span> {phoneNumber}
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
                  shoes {/* <img src="/arrow-down.svg" alt="" /> */}
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals">new Arrivals</Link>
              </li>
            </ul>

            <ul className={style.menuOpt}>
              <li>
                <Link href="/account/my-orders">
                  <figure>
                    <img src="/user.svg" alt="" />
                  </figure>
                </Link>
              </li>
              <li>
                <Link href="/cart">
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

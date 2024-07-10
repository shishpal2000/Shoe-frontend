// components/Navbar.js
"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/mobileMenu.module.css";
import Link from "next/link";

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    shoes: false,
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (dropdown) => {
    setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });
  };

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = document.getElementById("targetElement");
      if (window.scrollY > 50) {
        targetElement.classList.add(styles.scrollClass);
      } else {
        targetElement.classList.remove(styles.scrollClass);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="targetElement"
      className={`${styles.navbar} ${styles.defaultClass}`}
    >
      <div className={styles.smNavItems}>
        <div className={styles.sm_logo}>
          <Link href="/" className={styles.SmLogo}>
            {/* <figure>
              <img src="logo.svg" alt="" />
            </figure> */}
            <Link href="/">Shoes</Link>
          </Link>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search Product" alt="search icon" />
          <div className={styles.icon}>
            <figure>
              <img src="search.svg" alt="" />
            </figure>
          </div>
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </div>
      </div>
      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <Link href="/" onClick={toggleMenu}>
          Home
        </Link>

        <div className={styles.dropdown}>
          <button onClick={() => toggleDropdown("shoes")}>
            Shoes <img src="dropDownArrow.svg" alt="" />
          </button>
          <div
            className={`${styles.dropdownContent} ${
              dropdowns.shoes ? styles.open : ""
            }`}
          >
            <Link onClick={toggleMenu} href="/">
              Shoes 1
            </Link>

            <Link onClick={toggleMenu} href="/">
              Shoes 2
            </Link>
          </div>
        </div>

        <Link onClick={toggleMenu} href="/">
          New Arrivals
        </Link>

        <Link onClick={toggleMenu} href="/">
          About Us
        </Link>

        <Link onClick={toggleMenu} href="/">
          <figure>
            <img src="user.svg" alt="" />
            Users
          </figure>
        </Link>

        <Link onClick={toggleMenu} href="/">
          <figure>
            <img src="cart.svg" alt="" />
            Cart
          </figure>
        </Link>

        <div className={styles.detail}>
          <Link href="tel:821730182123">
            <span>Call US :</span> (+62) 821730182123
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;

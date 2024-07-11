"use client";

import CredentialHero from "@/components/CredentialHero/CredentialHero";
import style from "@/styles/credentail.module.css";
import styles from "@/styles/credentail.module.css";
import Link from "next/link";
import { useState } from "react";
const LogIn = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className={style.credentailMainContainer}>
        <div className="container">
          <div className={style.credentailInnerItems}>
            <div className={style.left}>
              <CredentialHero />
            </div>
            <div className={style.right}>
              <h3>Log In Now</h3>

              <form>
                <ul>
                  <li>
                    <label>Email Address</label>
                    <input type="emmail" placeholder="Email" required />
                  </li>
                  <li>
                    <label>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.passwordInput}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={styles.toggleButton}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </li>

                  <li>
                    <button>Sign up</button>
                    <p>
                      Already have an ccount?{" "}
                      <Link href="/credential/sign-up">Sign up</Link>
                    </p>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;

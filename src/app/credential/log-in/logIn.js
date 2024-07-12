"use client";

import CredentialHero from "@/components/CredentialHero/CredentialHero";
import OtherLoginOpts from "@/components/OtherLoginOpts/OtherLoginOpts";
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
                    <div className={style.passwordLabel}>
                      <label>Password</label>
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          padding: "0",
                          cursor: "pointer",
                          background: "transparent",
                        }}
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.toggleButton}
                      >
                        {showPassword ? (
                          <img src="/hide.svg" alt="" />
                        ) : (
                          <img src="/show.svg" alt="" />
                        )}
                      </button>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.passwordInput}
                      placeholder="password"
                    />
                  </li>

                  <li className={style.formSubOpts}>
                    <input type="submit" value="Sign up" />
                    <p>
                      Already have an ccount?{" "}
                      <Link href="/credential/sign-up">Sign up</Link>
                    </p>
                  </li>
                </ul>
              </form>

              <OtherLoginOpts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;

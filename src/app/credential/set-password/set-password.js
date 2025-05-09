"use client";

import CredentialHero from "@/components/CredentialHero/CredentialHero";
import style from "@/styles/credentail.module.css";
import styles from "@/styles/credentail.module.css";
import Link from "next/link";
import { useState } from "react";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [repassword, setrePassword] = useState("");
  const [showrePassword, setShowrePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglerePasswordVisibility = () => {
    setShowrePassword(!showrePassword);
  };
  return (
    <>
      <div className={style.credentailMainContainer}>
        <div className="container">
          <div className={style.credentailInnerItems}>
            <div className={style.left}>
              <CredentialHero
                bg="/signUpBg.png"
                tag="A WISE QUOTE"
                heading={`Get Everything \n You Want`}
                descrip={`You can get everything you want if you work hard, trust the \n process, and stick to the plan.`}
              />
            </div>
            <div className={style.right}>
              <h3>Set A Password</h3>

              <form>
                <ul>
                  <li>
                    <div className={style.passwordLabel}>
                      <label>Create Password</label>
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
                          <img src="/show.svg" alt="" />
                        ) : (
                          <img src="/hide.svg" alt="" />
                        )}
                      </button>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.passwordInput}
                      placeholder="Create Password"
                    />
                  </li>

                  <li>
                    <div className={style.passwordLabel}>
                      <label>Re-enter Password</label>
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          padding: "0",
                          cursor: "pointer",
                          background: "transparent",
                        }}
                        type="button"
                        onClick={togglerePasswordVisibility}
                        className={styles.toggleButton}
                      >
                        {showrePassword ? (
                          <img src="/show.svg" alt="" />
                        ) : (
                          <img src="/hide.svg" alt="" />
                        )}
                      </button>
                    </div>
                    <input
                      type={showrePassword ? "text" : "password"}
                      value={repassword}
                      required
                      onChange={(e) => setrePassword(e.target.value)}
                      className={styles.passwordInput}
                      placeholder="Re-enter Passwords"
                    />
                  </li>

                  <li className={style.formSubOpts}>
                    <input type="submit" value="Set Password" />
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

export default SetPassword;

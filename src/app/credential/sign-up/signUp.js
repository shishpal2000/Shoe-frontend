"use client";

import CredentialHero from "@/components/CredentialHero/CredentialHero";
import OtherLoginOpts from "@/components/OtherLoginOpts/OtherLoginOpts";
import style from "@/styles/credentail.module.css";
import styles from "@/styles/credentail.module.css";
import Link from "next/link";
import { useState } from "react";

import PhoneInput from "react-phone-input-2";
// import "flag-icon-css/css/flag-icon.min.css";
import "react-phone-input-2/lib/style.css";

const SignUp = () => {
  const [phone, setPhone] = useState("");

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
              <CredentialHero
                bg="/signUpBg.png"
                tag="A WISE QUOTE"
                heading={`Get Everything \n You Want`}
                descrip={`You can get everything you want if you work hard, trust the \n process, and stick to the plan.`}
              />
            </div>
            <div className={style.right}>
              <h3>Sign up now</h3>

              <form>
                <ul>
                  <ul className={style.userName}>
                    <li>
                      <label>First name</label>
                      <input type="text" placeholder="First name" required />
                    </li>
                    <li>
                      <label>Last name</label>
                      <input type="text" placeholder="Last name" required />
                    </li>
                  </ul>
                  <li>
                    <label>Email Address</label>
                    <input type="email" placeholder="Email" required />
                  </li>

                  <li>
                    <label>Phone number</label>
                    <PhoneInput
                      className={style.phoneInput}
                      country={"us"}
                      value={phone}
                      placeholder="Enter phone number"
                      onChange={setPhone}
                      enableSearch={true}
                      disableSearchIcon={false}
                    />
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
                      placeholder="password"
                    />
                    <span style={{ fontSize: "14px" }}>
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols
                    </span>

                    <div className={style.checkboxContainer}>
                      <input type="checkbox" required />
                      <p>
                        By creating an account, I agree to our Terms of use and
                        Privacy Policy{" "}
                      </p>
                    </div>
                  </li>

                  <li className={style.formSubOpts}>
                    <input type="submit" value="Sign up" />
                    <p>
                      Already have an ccount?{" "}
                      <Link href="/credential/log-in">Log in</Link>
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

export default SignUp;

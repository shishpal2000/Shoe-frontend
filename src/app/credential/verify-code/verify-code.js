"use client";

import CredentialHero from "@/components/CredentialHero/CredentialHero";
import OtherLoginOpts from "@/components/OtherLoginOpts/OtherLoginOpts";
import style from "@/styles/credentail.module.css";
import Link from "next/link";

const VerifyCode = () => {
  return (
    <>
      <div className={style.credentailMainContainer}>
        <div className="container">
          <div className={style.credentailInnerItems}>
            <div className={style.left}>
              <CredentialHero
                bg="/forgot-bg.png"
                tag="A WISE QUOTE"
                heading={`Get Everything \n You Want`}
                descrip={`You can get everything you want if you work hard, trust the \n process, and stick to the plan.`}
              />
            </div>
            <div className={style.right}>
              <h3>Verify Code</h3>

              <form>
                <ul>
                  <li>
                    <label>Verify Code</label>
                    <input type="text" placeholder="Code" required />
                    <p>
                      Didn’t receive a code?{" "}
                      <span
                        style={{
                          color: "#FF8682",
                          fontWeight: "500",
                          cursor: "pointer",
                        }}
                      >
                        Resend
                      </span>
                    </p>
                  </li>

                  <li className={style.formSubOpts}>
                    <input type="submit" value="Sign up" />
                    <p>
                      Back to? <Link href="/credential/log-in">Log in</Link>
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

export default VerifyCode;

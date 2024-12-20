"use client";

import { useState } from "react";
import CredentialHero from "@/components/CredentialHero/CredentialHero";
import OtherLoginOpts from "@/components/OtherLoginOpts/OtherLoginOpts";
import style from "@/styles/credentail.module.css";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset email sent successfully.");
      } else {
        setError(data.message || "Failed to send password reset email.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <h3>Forgot Your Password?</h3>

              <form onSubmit={handleSubmit}>
                <ul>
                  <li>
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </li>

                  <li className={style.formSubOpts}>
                    <input type="submit" value={loading ? "Sending..." : "Send Password Reset Email"} disabled={loading} />
                    <p>
                      Back to? <Link href="/credential/log-in">Log in</Link>
                    </p>
                  </li>
                </ul>
              </form>

              {message && <p className={style.successMessage}>{message}</p>}
              {error && <p className={style.errorMessage}>{error}</p>}

              <OtherLoginOpts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

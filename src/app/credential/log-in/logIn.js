"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import CredentialHero from "@/components/CredentialHero/CredentialHero";
import OtherLoginOpts from "@/components/OtherLoginOpts/OtherLoginOpts";
import style from "@/styles/credentail.module.css";
import styles from "@/styles/credentail.module.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result._id);
        router.push("/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
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
                bg="/logInHero.png"
                tag="A WISE QUOTE"
                heading={`Get Everything \n You Want`}
                descrip={`You can get everything you want if you work hard, trust the \n process, and stick to the plan.`}
              />
            </div>
            <div className={style.right}>
              <h3>Log In Now</h3>

              {error && <p style={{ color: "red" }}>{error}</p>}

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
                          <img src="/hide.svg" alt="Hide" />
                        ) : (
                          <img src="/show.svg" alt="Show" />
                        )}
                      </button>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.passwordInput}
                      placeholder="Password"
                    />
                  </li>

                  <li className={style.formSubOpts}>
                    <input type="submit" value="Log In" disabled={loading} />
                    <p>
                      Don't have an account?{" "}
                      <Link href="/credential/sign-up">Sign up</Link>
                      &nbsp;
                      <Link href="/credential/forgot-password">
                        Forgot Password
                      </Link>
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

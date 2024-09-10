"use client";

import CredentialHero from "@/components/CredentialHero/CredentialHero";
import OtherLoginOpts from "@/components/OtherLoginOpts/OtherLoginOpts";
import style from "@/styles/credentail.module.css";
import styles from "@/styles/credentail.module.css";
import Link from "next/link";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });

      const result = await response.json();
       if (response.ok) {
        router.push(`/credential/verify-code?email=${encodeURIComponent(email)}`);
      } else {
        setError(result.message || "Registration failed");
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
                bg="/signUpBg.png"
                tag="A WISE QUOTE"
                heading={`Get Everything \n You Want`}
                descrip={`You can get everything you want if you work hard, trust the \n process, and stick to the plan.`}
              />
            </div>
            <div className={style.right}>
              <h3>Sign up now</h3>

              <form onSubmit={handleSubmit}>
                <ul>
                  <ul className={style.userName}>
                    <li>
                      <label>First name</label>
                      <input
                        type="text"
                        placeholder="First name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </li>
                    <li>
                      <label>Last name</label>
                      <input
                        type="text"
                        placeholder="Last name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </li>
                  </ul>
                  <li>
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                          <img src="/show.svg" alt="Show Password" />
                        ) : (
                          <img src="/hide.svg" alt="Hide Password" />
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
                    <span style={{ fontSize: "14px" }}>
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </span>

                    <div className={style.checkboxContainer}>
                      <input type="checkbox" required />
                      <p>
                        By creating an account, I agree to our Terms of use and Privacy Policy{" "}
                      </p>
                    </div>
                  </li>

                  <li className={style.formSubOpts}>
                    <input
                      type="submit"
                      value={loading ? "Signing up..." : "Sign up"}
                      disabled={loading}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <p>
                      Already have an account?{" "}
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

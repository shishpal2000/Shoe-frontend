"use client";

import CredentialHero from "@/components/CredentialHero/CredentialHero";
import OtherLoginOpts from "@/components/OtherLoginOpts/OtherLoginOpts";
import style from "@/styles/credentail.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyCode = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/verify-otp/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.user._id);

        alert("Verification successful!");
        router.push("/credential/login");
      } else {
        setError(result.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

            <form onSubmit={handleVerify}>
              <ul>
                <li>
                  <label>Verify Code</label>
                  <input
                    type="text"
                    placeholder="Code"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <p>
                    Didn’t receive a code?{" "}
                    <span
                      style={{
                        color: "#FF8682",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        alert("Resend OTP functionality coming soon!");
                      }}
                    >
                      Resend
                    </span>
                  </p>
                </li>

                <li className={style.formSubOpts}>
                  <input
                    type="submit"
                    value={loading ? "Verifying..." : "Verify"}
                    disabled={loading}
                  />
                  {error && <p className={style.error}>{error}</p>}
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
  );
};

export default VerifyCode;

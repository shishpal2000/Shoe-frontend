import style from "../../styles/otherLoginOpts.module.css";
import { auth, provider, signInWithPopup } from "../../config/firebase";
import { useState } from "react";
import axios from "axios"; 

const OtherLoginOpts = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    setLoading(true); 
    setError(""); 
    setSuccess(""); 

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract user info
      const { displayName, email, photoURL, uid } = user;

      // Call the backend API
      // const backendResponse = await axios.post("https://your-backend-api.com/auth/google", {
      //   displayName,
      //   email,
      //   photoURL,
      //   uid,
      // });

      const token = "demo-token";

      localStorage.setItem("token", token);
      console.log('token set ');
      localStorage.removeItem("token", token);

      setUser({ displayName, email, photoURL });
      setSuccess("Logged in successfully!");
    } catch (error) {
      console.error("Error during Google Login:", error.message);

      if (error.code === "auth/popup-closed-by-user") {
        setError("The login popup was closed before completing the sign-in.");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error occurred. Please check your connection.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.socialLoginOpts}>
      <label>OR Continue with</label>
      <ul>
        <li>
          <button>
            <i>
              <img src="/fb.svg" alt="Facebook" />
            </i>
            Facebook
          </button>
        </li>
        <li>
          <button onClick={handleGoogleLogin} disabled={loading}>
            <i>
              <img src="/google.svg" alt="Google" />
            </i>
            {loading ? "Loading..." : "Google"}
          </button>
        </li>
        {/* <li>
          <button>
            <i>
              <img src="/apple.svg" alt="Apple" />
            </i>
            Apple
          </button>
        </li> */}
      </ul>

      {/* Display Success or Error Message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display User Info */}
      {user && (
        <div style={{ marginTop: "20px" }}>
          <p>Welcome, {user.displayName}!</p>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="User" style={{ width: "50px", borderRadius: "50%" }} />
        </div>
      )}
    </div>
  );
};

export default OtherLoginOpts;
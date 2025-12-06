import React, { useState, useContext } from "react";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ⬅️ Added

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser({ email, password });
      if (data.token) {
        login(data.token);
        toast.success("Logged in successfully "); 
        navigate("/");
      } else {
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed "); 
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Login failed "); 
    }
  };

  return (
    <div style={styles.outer}>
      <div style={styles.box}>
        {/* LEFT PART */}
        <div style={styles.left}>
          <h2 style={{ color: "white", marginBottom: 10 }}>Login</h2>
          <p style={{ color: "white", fontSize: 14 }}>
            Get access to your Orders, Wishlist and Recommendations
          </p>
        </div>

        {/* RIGHT PART */}
        <div style={styles.right}>
          {error && (
            <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
          )}

          <form onSubmit={submit} style={{ width: "100%" }}>
            <input
              type="email"
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              style={styles.input}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button style={styles.loginBtn} type="submit">
              Login
            </button>
          </form>

          <p style={{ fontSize: 12, color: "#878787", marginTop: 12 }}>
            By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
          </p>

          <button
            type="button"
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
          >
            New to Flipkart? Create an account
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================== STYLES ==================== */
const styles = {
  outer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f3f6",
    minHeight: "100vh",
    padding: "20px",
  },
  box: {
    width: "850px",
    display: "flex",
    borderRadius: "4px",
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: "0px 1px 6px rgba(0,0,0,0.2)",
  },
  left: {
    width: "40%",
    backgroundColor: "#2874f0",
    padding: "35px 25px",
  },
  right: {
    width: "60%",
    padding: "35px 25px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "2px",
    border: "1px solid #e0e0e0",
    marginBottom: "15px",
    fontSize: "14px",
  },
  loginBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#fb641b",
    color: "white",
    border: "none",
    fontSize: "16px",
    borderRadius: "2px",
    cursor: "pointer",
  },
  registerBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    marginTop: "16px",
    background: "white",
    color: "#2874f0",
    fontSize: "14px",
    cursor: "pointer",
    borderTop: "1px solid #e0e0e0",
  },
};

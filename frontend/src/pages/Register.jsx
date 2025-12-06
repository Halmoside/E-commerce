import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ⬅️ Added

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await registerUser({ name, email, password });
      if (data.user) {
        toast.success("Registration successful 🎉"); // ⬅️ Toast
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
        toast.error(data.message || "Registration failed ❌"); // ⬅️ Toast
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Registration failed ❌"); // ⬅️ Toast
    }
  };

  return (
    <div style={styles.outer}>
      <div style={styles.box}>
        {/* LEFT SIDE */}
        <div style={styles.left}>
          <h2 style={{ color: "white", marginBottom: 10 }}>Looks like you're new!</h2>
          <p style={{ color: "white", fontSize: 14 }}>
            Sign up to get started with your Shop
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

          <form onSubmit={submit} style={{ width: "100%" }}>
            <input
              style={styles.input}
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              style={styles.input}
              placeholder="Enter Your Email"
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

            <button type="submit" style={styles.registerBtn}>
              Register
            </button>
          </form>

          <p style={{ fontSize: 12, color: "#878787", marginTop: 12 }}>
            By continuing, you agree to the Terms of Use and Privacy Policy.
          </p>

          <button
            type="button"
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Existing User? Log in
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
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
  registerBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#fb641b",
    color: "white",
    border: "none",
    fontSize: "16px",
    borderRadius: "2px",
    cursor: "pointer",
  },
  loginBtn: {
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

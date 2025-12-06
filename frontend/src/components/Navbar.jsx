import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast"; 

import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully ✅"); // ⬅️ Toast
    navigate("/");
  };

  const handleCartClick = () => {
    if (!user) {
      toast.error("Please login to view your cart 🛒"); 
      return navigate("/login");
    }
    navigate("/cart");
  };

  return (
    <nav style={styles.nav}>
      {/* LEFT: Logo */}
      <div style={styles.logoSec}>
        <Link to="/" style={styles.logo}>
          Flipkart
        </Link>
        <span style={styles.plusText}>
          Explore <span style={styles.plusGold}>Plus ✨</span>
        </span>
      </div>

      {/* SEARCH BOX */}
      <div style={styles.searchBox}>
        <MagnifyingGlassIcon style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          style={styles.searchInput}
        />
      </div>

      {/* RIGHT SIDE OPTIONS */}
      <div style={styles.right}>
        {!user ? (
          <div style={styles.option}>
            <UserIcon style={styles.icon} />
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </div>
        ) : (
          <div style={styles.option}>
            <UserIcon style={styles.icon} />
            <span style={styles.link}>Hello, {user.name}</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <div style={styles.option}>
          <ShoppingCartIcon style={styles.icon} />
          <span
            onClick={handleCartClick}
            style={{ ...styles.link, cursor: "pointer" }}
          >
            Cart ({cart.length})
          </span>
        </div>

        <div style={styles.option}>
          <Bars3Icon style={styles.icon} />
        </div>
      </div>
    </nav>
  );
}

/* ==================== STYLES ==================== */

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "12px 25px",
    borderBottom: "1px solid #ddd",
  },

  logoSec: {
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    textDecoration: "none",
    color: "#2874f0",
    fontStyle: "italic",
  },

  plusText: {
    fontSize: "11px",
    color: "#939393",
    marginTop: "-3px",
  },

  plusGold: {
    color: "#fcba03",
    fontWeight: "600",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "45%",
    backgroundColor: "#f1f5ff",
    borderRadius: "8px",
    padding: "10px 12px",
  },

  searchIcon: {
    width: "20px",
    marginRight: "7px",
    color: "#7a7a7a",
  },

  searchInput: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "15px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  option: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  icon: {
    width: "20px",
    color: "black",
  },

  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "15px",
  },

  logoutBtn: {
    marginLeft: "6px",
    padding: "2px 8px",
    backgroundColor: "#ffe500",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
};

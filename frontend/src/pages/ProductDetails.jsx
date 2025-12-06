import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast"; 

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data.product ? data.product : data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="text-center mt-16">Loading...</div>;
  if (!product) return <div className="text-center mt-16">Product not found</div>;

  const token = localStorage.getItem("token");

  const handleAdd = () => {
    if (!token) {
      toast.error("Please login to add products 🛒"); 
      return navigate("/login");
    }
    addToCart(product);
    toast.success(`${product.name || product.title} added to cart 🛒`); 
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-16 p-6">

      {/* LEFT IMAGE CARD */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white shadow-md p-5 rounded-md flex flex-col items-center"
      >
        {/* IMAGE BOX */}
        <div className="w-full flex justify-center bg-white p-4 rounded-md">
          <img
            src={product.img || product.image}
            alt={product.title || product.name}
            className="w-80 h-80 object-cover rounded-md"
          />
        </div>

        {/* BUTTON BOX */}
        <div className="w-full mt-6 bg-white p-4 rounded-md shadow flex gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-md font-semibold"
          >
            🛒 Go to Cart
          </button>

          <button
            onClick={handleAdd}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
          >
            ⚡ Buy Now
          </button>
        </div>
      </motion.div>

      {/* RIGHT DETAILS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {product.title || product.name}
        </h2>

        <p className="text-green-600 text-3xl font-extrabold mb-4">
          ₹{product.price}
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          {product.description}
        </p>

        <div>
          <h3 className="font-semibold text-lg mb-2">💰 Available Offers</h3>
          <ul className="text-gray-700 text-sm space-y-1 pl-3">
            <li>✔ Bank Offer: 5% cashback</li>
            <li>✔ Special Price: Extra ₹2500 off</li>
            <li>✔ No Cost EMI Available</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

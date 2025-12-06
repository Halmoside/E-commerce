import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add products 🛒");
      return navigate("/login");
    }
    addToCart(product);
    toast.success(`${product.name || product.title} added to cart 🛒`);
  };

  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-md shadow p-4 hover:shadow-lg cursor-pointer"
    >
      <img
        src={product.img || product.image} // ✅ fixed
        alt={product.title || product.name} // ✅ fixed
        className="w-full h-56 object-cover rounded-md"
        onClick={goToDetails}
      />

      <h2 className="text-lg font-semibold mt-3">{product.title || product.name}</h2>

      <p className="text-green-600 font-bold mt-1">₹{product.price}</p>

      <div className="flex gap-3 mt-3">
        <button
          onClick={handleAddCart}
          className="flex-1 bg-orange-500 text-white py-2 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={goToDetails}
          className="flex-1 border border-orange-500 text-orange-500 py-2 rounded"
        >
          Buy Now
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

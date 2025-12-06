import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  const sliderImages = [
    "/image1.webp",
    "/image2.webp",
    "/image3.webp",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products || data);
      } catch (e) {
        setError(e.message);
        toast.error("Failed to load products ❌");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading products...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500 text-lg">Error: {error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Slider Section */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg mb-10">
        {sliderImages.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </div>

      {/* Products Section */}
      <section className="px-4 md:px-10 mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <p>No products yet.</p>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p._id || p.id}
                product={p}
                onAdd={() => handleAddToCart(products)} 
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

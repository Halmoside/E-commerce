import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast"; 

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();

  const subtotal = cart.reduce((acc, p) => acc + p.price * p.qty, 0);

  if (cart.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <h1 className="text-3xl font-semibold text-gray-600">🛒 Your Cart is Empty</h1>
      </motion.div>
    );

  const handleUpdateQty = (id, val) => {
    updateQty(id, val);
    toast.success(val === 1 ? "Quantity Increased" : "Quantity Decreased");
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.error("Removed from Cart");
  };

  const handlePlaceOrder = () => {
    toast.success("Order Placed Successfully 🎉");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 p-4 md:p-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              layout
              className="bg-white rounded-md shadow p-4"
            >
              <div className="flex gap-4">
                <img src={item.image} className="w-28 h-28 rounded-md" />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-green-600 font-semibold">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex justify-between items-center mt-4">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpdateQty(item._id, -1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.qty}</span>
                  <button
                    onClick={() => handleUpdateQty(item._id, 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 font-medium"
                >
                  REMOVE
                </button>
              </div>
            </motion.div>
          ))}

          <motion.div layout className="bg-white shadow rounded-md p-8">
            <button onClick={handlePlaceOrder} className="cart-btn">
              PLACE ORDER
            </button>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-md shadow p-5 h-fit"
        >
          <h2 className="font-semibold text-gray-600 mb-3">PRICE DETAILS</h2>
          <hr />

          <div className="flex justify-between py-2">
            <span>Price ({cart.length} items)</span>
            <span>₹{subtotal}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>₹{subtotal}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;

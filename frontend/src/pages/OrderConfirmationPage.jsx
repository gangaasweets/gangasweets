import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { checkout, loading } = useSelector((state) => state.checkout);

  // Clear cart only after valid checkout exists
  useEffect(() => {
    if (checkout?._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    }
  }, [checkout, dispatch]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  // Optional loading state (recommended if using async checkout)
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold">Loading order...</h2>
      </div>
    );
  }

  // If no order found
  if (!checkout || !checkout._id) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">No order found</h2>
        <button
          onClick={() => navigate("/my-orders")}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:cursor-pointer"
        >
          Go to My Orders
        </button>
      </div>
    );
  }

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      <div className="p-4 sm:p-6 rounded-lg border border-gray-200 shadow-lg">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-lg sm:text-xl font-semibold break-all">
              Order ID: {checkout._id}
            </h2>
            <p className="text-gray-500">
              Order Date:{" "}
              {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-emerald-700 text-sm font-medium">
              Estimated Delivery:{" "}
              {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mb-10">
          {checkout.checkoutItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center mb-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mr-4"
              />

              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-md font-semibold truncate">{item.name}</h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  {item.color} | {item.size}
                </p>
              </div>

              <div className="ml-4 text-right">
                <p className="text-sm sm:text-md font-semibold">
                  ${item.price}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment & Delivery Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Payment */}
          <div>
            <h4 className="text-lg font-semibold mb-2">
              Payment
            </h4>
            <p className="text-gray-600 text-sm sm:text-base">
              {checkout.paymentMethod || "PayPal"}
            </p>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="text-lg font-semibold mb-2">
              Delivery
            </h4>
            <div className="text-gray-600 text-sm sm:text-base">
                <p>{checkout.shippingAddress?.address}</p>
                <p>
                {checkout.shippingAddress?.city},{" "}
                {checkout.shippingAddress?.country}
                </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmationPage;
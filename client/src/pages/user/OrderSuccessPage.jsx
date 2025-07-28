import React from "react";
import Lottie from "lottie-react";
import successOrder from "../../assets/successOrder.json";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white px-4 text-center">
      <Lottie
        animationData={successOrder}
        loop={false}
        style={{ width: 250, height: 250 }}
      />

      <h1 className="text-3xl font-bold text-green-600 mt-6">Thank You!</h1>
      <h2 className="text-xl text-gray-800 mt-2 font-semibold">
        Your order is confirmed
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        We’ve received your order and will begin processing it soon. You’ll
        receive a shipping confirmation once it's on the way.
      </p>
   <Link to="/">
      <button className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
        Continue Shopping
      </button>
      </Link>
    </div>
  );
};

export default OrderSuccessPage;

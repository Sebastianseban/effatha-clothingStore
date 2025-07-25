import React from "react";

const dummyOrders = [
  {
    _id: "order1",
    createdAt: "2025-07-24T10:33:54.709Z",
    totalAmount: 1198,
    paymentMethod: "razorpay",
    paymentStatus: "paid",
    orderStatus: "processing",
    estimatedDelivery: "2025-07-28",
    items: [
      {
        _id: "item1",
        image:
          "http://res.cloudinary.com/dgestxvna/image/upload/v1750068407/odurg3mlnmatogfck3wn.jpg",
        title: "Pattern Shirt",
        brand: "Red Jeans",
        quantity: 1,
        size: "S",
        color: "White",
        price: 599,
      },
    ],
  },
  {
    _id: "order2",
    createdAt: "2025-07-23T12:15:22.709Z",
    totalAmount: 799,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "shipped",
    estimatedDelivery: "2025-07-27",
    items: [
      {
        _id: "item2",
        image:
          "http://res.cloudinary.com/dgestxvna/image/upload/v1750054311/o8x73qg9tey4z15lcigc.webp",
        title: "Brain Dead Pullover",
        brand: "Adidas",
        quantity: 1,
        size: "M",
        color: "Black",
        price: 799,
      },
    ],
  },
];

const OrderHistoryPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">Order History</h1>

      <div className="space-y-14">
        {dummyOrders.map((order) => {
          const statusSteps = ["processing", "shipped", "delivered"];
          const currentStep = statusSteps.indexOf(order.orderStatus);

          return (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    Payment: {order.paymentMethod.toUpperCase()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex justify-between items-center mb-8 px-2 relative">
                {statusSteps.map((step, index) => {
                  const isDone = index <= currentStep;
                  return (
                    <div key={step} className="flex flex-col items-center w-full relative">
                      <div
                        className={`w-4 h-4 rounded-full z-10 ${
                          isDone ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                      <p
                        className={`mt-2 text-xs text-center ${
                          isDone ? "text-blue-700 font-medium" : "text-gray-500"
                        }`}
                      >
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </p>
                      {index < statusSteps.length - 1 && (
                        <div className="absolute top-2 left-1/2 w-full h-1 -z-10">
                          <div
                            className={`h-full ${
                              currentStep > index ? "bg-blue-500" : "bg-gray-200"
                            }`}
                            style={{
                              width: "100%",
                              transform: "translateX(50%)",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Items */}
              <div className="grid gap-4 sm:grid-cols-2">
                {order.items.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center border p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.brand} • Size: {item.size} • Color: {item.color}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Info */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Estimated Delivery:{" "}
                  <span className="font-medium text-gray-800">
                    {new Date(order.estimatedDelivery).toDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <p className="text-sm text-gray-800 font-semibold">
                    Total: ₹{order.totalAmount}
                  </p>
                  <button className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                    View Invoice
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryPage;

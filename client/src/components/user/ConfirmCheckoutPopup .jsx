
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { PiMapPinLineLight } from "react-icons/pi";

import AddressCard from "../../components/user/AddressCard";
import AddAddressPopup from "../../components/user/AddAddressPopup";
import useUserStore from "../../store/userStore";
import { useGetAddress } from "../../hooks/user/useGetAddress";

const ConfirmCheckoutPopup = ({ onClose, cartItems = [], subtotal = 0 }) => {
  const navigate = useNavigate();

  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { user } = useUserStore();
  const { data: addresses = [], isPending, isError } = useGetAddress();

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowAddAddress(true);
  };

  const handleClosePopup = () => {
    setShowAddAddress(false);
    setSelectedAddress(null);
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  const handleProceedToCheckout = () => {
    const selected = addresses.find((addr) => addr._id === selectedAddressId) || addresses[0];
    if (!selected) return;

    navigate("/checkout", {
      state: {
        cartItems,
        subtotal,
        addressId: selected._id,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] flex flex-col animate-fade-in-down">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b">
          <button onClick={onClose}>
            <IoMdArrowBack size={22} className="text-gray-800 hover:text-black transition" />
          </button>
          <h1 className="font-semibold tracking-widest text-sm text-gray-800">SUPERKICKS</h1>
          <div className="w-5 h-5 rounded-full bg-gray-300" />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          
          {/* Order Summary Accordion */}
          <div
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="bg-gray-50 rounded-xl px-5 py-4 flex items-center justify-between border border-gray-200 hover:shadow-sm cursor-pointer transition"
          >
            <div>
              <p className="font-medium text-gray-800">🛍️ Order Summary</p>
              <p className="text-xs text-gray-500">{cartItems.length} items (₹{subtotal})</p>
            </div>
            {showOrderSummary ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
          </div>

          {/* Order Summary Content */}
          {showOrderSummary && (
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 space-y-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.title} × {item.quantity}</span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          )}

          {/* Address Section */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <PiMapPinLineLight className="text-2xl" />
                Deliver To
              </div>
              <button
                onClick={() => setShowAddAddress(true)}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                + Add Address
              </button>
            </div>

            {isPending && <p className="text-gray-500">Loading addresses...</p>}
            {isError && <p className="text-red-500">Failed to load addresses.</p>}
            
            {!isPending && !isError && addresses.length > 0 && (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`rounded-lg p-3 transition border-2 cursor-pointer ${
                      selectedAddressId === address._id ? "border-black shadow-md" : "border-gray-200"
                    }`}
                    onClick={() => handleSelectAddress(address._id)}
                  >
                    <AddressCard address={address} onEdit={handleEditAddress}  userName={`${user.firstName}`}
  phoneNumber={user.mobileNumber} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t p-5">
          <button
            onClick={handleProceedToCheckout}
            className="w-full bg-black text-white py-3 rounded-md font-semibold text-sm hover:bg-gray-900 transition"
          >
            Proceed To Payment
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">
            🔒 Secure and Powered by GoKwik
          </p>
        </div>

        {/* Add/Edit Address Popup */}
        {showAddAddress && (
          <AddAddressPopup onClose={handleClosePopup} initialData={selectedAddress} />
        )}
      </div>
    </div>
  );
};

export default ConfirmCheckoutPopup;

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAddAddress } from "../../hooks/user/useAddAddress";
import { toast } from "react-hot-toast";
import useUserStore from "../../store/userStore";
import { MdLocationOn } from "react-icons/md";


const AddAddressPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    label: "",
    isDefault: false,
  });
  const { user } = useUserStore();
  const { mutate: addAddress, isPending } = useAddAddress();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user?.addresses?.length >= 2) {
      toast.error("You can only add up to 2 addresses.");
      return;
    }

    addAddress(formData, {
      onSuccess: () => {
        toast.success("Address added!");
        setFormData({
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          label: "",
          isDefault: false,
        });
        onClose();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          <IoClose />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <MdLocationOn className="text-black" />
          Add New Address
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
        >
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="col-span-2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />

          {/* Label Dropdown */}
          <select
            name="label"
            value={formData.label}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          >
            <option value="">Select Label</option>
            <option value="home"> Home</option>
            <option value="work"> Work</option>
            <option value="other"> Other</option>
          </select>

          {/* Checkbox (full width) */}
          <div className="col-span-2 flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="accent-black"
            />
            <span className="text-gray-700">Make this my default address</span>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition"
            >
              {isPending ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressPopup;

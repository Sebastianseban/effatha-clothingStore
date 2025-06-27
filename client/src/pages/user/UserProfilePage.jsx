import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import AddAddressPopup from "../../components/user/AddAddressPopup";
import useUserStore from "../../store/userStore";
import AddressCard from "../../components/user/AddressCard";
import { useGetAddress } from "../../hooks/user/useGetAddress";

const UserProfilePage = () => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { data: addressResponse, isPending, isError } = useGetAddress();

  const { user } = useUserStore();

  const handleAddNewAddress = () => {
    setSelectedAddress(null);
    setShowAddAddress(true);
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowAddAddress(true);
  };

  const handleClosePopup = () => {
    setShowAddAddress(false);
    setSelectedAddress(null);
  };

  if (!user) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }
  return (
    <div className="max-w-3xl h-[600px] mx-auto px-4 py-10">
      {/* Profile Header */}
      <div className="flex items-center gap-5 mb-10">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl text-gray-600">
          <FaRegUser />
        </div>
        <div>
          <h2 className="text-2xl font-semibold capitalize">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>
          <p className="text-sm text-gray-600">+91 {user.mobileNumber}</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Saved Addresses</h3>
          <button
            onClick={handleAddNewAddress}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm"
          >
            + Add Address
          </button>
        </div>

        {/* Add Address Popup */}
        {showAddAddress && (
          <AddAddressPopup
            onClose={handleClosePopup}
            initialData={selectedAddress} 
          />
        )}
        {/* Address Card (Static Example) */}
        <div className="grid grid-cols-2 gap-4 rounded-lg p-4 bg-gray-200 mb-4 shadow-sm">
          {isPending && <p>Loading...</p>}
          {isError && <p>Failed to load addresses.</p>}
          {!isPending &&
            !isError &&
            addressResponse.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleEditAddress}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

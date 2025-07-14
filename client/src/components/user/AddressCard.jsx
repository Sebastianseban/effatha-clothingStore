
// import React from "react";
// import { PiMapPinLineLight } from "react-icons/pi";
// import { FiEdit, FiTrash2, FiStar } from "react-icons/fi";
// import { useSetDefaultAddress } from "../../hooks/user/useSetDefaultAddress";
// import { useDeleteAddress } from "../../hooks/user/useDeleteAddress";

// const AddressCard = ({ address, onEdit, userName, phoneNumber }) => {
//   const { mutate: setDefault } = useSetDefaultAddress();
//   const { mutate: deleteAddress } = useDeleteAddress();

//   return (
//     <div className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
//       {/* Top Row: Label + Default Tag */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2 text-gray-700">
//           <PiMapPinLineLight className="text-xl" />
//           <span className="font-semibold text-sm capitalize">
//             {address.label} Address
//           </span>
//         </div>
//         {address.isDefault && (
//           <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
//             Default
//           </span>
//         )}
//       </div>

//       {/* User Info */}
//       <div className="text-sm text-gray-700 font-medium mb-2">
//         {userName && <p className="leading-5">{userName}</p>}
//       </div>

//       {/* Address Details */}
//       <div className="text-sm text-gray-600 leading-6 pl-1">
//         <p>{address.street}</p>
//         <p>
//           {address.city}, {address.state}
//         </p>
//         <p>
//           {address.postalCode}, {address.country}
//         </p>
//         {phoneNumber && (
//           <p className="text-gray-500 text-xs mt-0.5">📞 +91 {phoneNumber}</p>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-4 mt-5 text-sm text-gray-500">
//         {!address.isDefault && (
//           <button
//             onClick={() => setDefault(address._id)}
//             className="flex items-center gap-1 hover:text-blue-600 transition"
//           >
//             <FiStar className="text-base" />
//             <span className="hidden sm:inline">Set Default</span>
//           </button>
//         )}
//         <button
//           onClick={() => onEdit(address)}
//           className="flex items-center gap-1 hover:text-yellow-500 transition"
//         >
//           <FiEdit className="text-base" />
//           <span className="hidden sm:inline">Edit</span>
//         </button>
//         <button
//           onClick={() => deleteAddress(address._id)}
//           className="flex items-center gap-1 hover:text-red-500 transition"
//         >
//           <FiTrash2 className="text-base" />
//           <span className="hidden sm:inline">Delete</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddressCard;
import React from "react";
import { PiMapPinLineLight } from "react-icons/pi";
import { FiEdit, FiTrash2, FiStar } from "react-icons/fi";
import { useSetDefaultAddress } from "../../hooks/user/useSetDefaultAddress";
import { useDeleteAddress } from "../../hooks/user/useDeleteAddress";

const AddressCard = ({ address, onEdit, userName, phoneNumber }) => {
  const { mutate: setDefault } = useSetDefaultAddress();
  const { mutate: deleteAddress } = useDeleteAddress();

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <PiMapPinLineLight className="text-xl" />
          <span className="font-semibold text-sm capitalize">
            {address.label} Address
          </span>
        </div>

        {address.isDefault && (
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
            Default
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="mb-2">
        {userName && (
          <p className="text-sm font-semibold text-gray-800">{userName}</p>
        )}
       
      </div>

      {/* Address Details */}
      <div className="text-sm text-gray-600 leading-6 pl-1">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>
          {address.postalCode}, {address.country}
        </p>
         {phoneNumber && (
          <p className="text-xs text-gray-500">📞 +91 {phoneNumber}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-5 text-sm text-gray-500">
        {!address.isDefault && (
          <button
            onClick={() => setDefault(address._id)}
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <FiStar className="text-base" />
            <span className="hidden sm:inline">Set Default</span>
          </button>
        )}

        <button
          onClick={() => onEdit(address)}
          className="flex items-center gap-1 hover:text-yellow-500 transition"
        >
          <FiEdit className="text-base" />
          <span className="hidden sm:inline">Edit</span>
        </button>

        <button
          onClick={() => deleteAddress(address._id)}
          className="flex items-center gap-1 hover:text-red-500 transition"
        >
          <FiTrash2 className="text-base" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default AddressCard;

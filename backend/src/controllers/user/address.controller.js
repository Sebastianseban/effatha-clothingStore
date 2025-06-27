import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { street, city, state, postalCode, country, label, isDefault } =
    req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  if (user.addresses.length >= 2) {
    throw new ApiError(400, "You can only save up to 2 addresses.");
  }

  if (isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }

  user.addresses.push({
    street,
    city,
    state,
    postalCode,
    country,
    label,
    isDefault,
  });

  await user.save();
  return res
    .status(201)
    .json(new ApiResponse(201, user.addresses, "Address added successfully"));
});

export const getAllAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const addresses = user.addresses;

  return res
    .status(200)
    .json(
      new ApiResponse(200, addresses, "All addresses fetched successfully")
    );
});

export const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;
  const { street, city, state, postalCode, country, label, isDefault } =
    req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const address = user.addresses.id(addressId);
  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  address.street = street || address.street;
  address.city = city || address.city;
  address.state = state || address.state;
  address.postalCode = postalCode || address.postalCode;
  address.country = country || address.country;
  address.label = label || address.label;

  if (isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
    address.isDefault = true;
  }

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user.addresses, "Address updated successfully"));
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { addressId } = req.params;

  // Step 1: Confirm user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Step 2: Check if address with addressId exists
  const addressExists = user.addresses.some(
    (addr) => addr._id.toString() === addressId
  );
  if (!addressExists) {
    throw new ApiError(404, "Address not found");
  }

  // Step 3: Remove the address using $pull
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        addresses: { _id: addressId },
      },
    },
    { new: true } // returns the updated document
  );

  // Step 4: Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      updatedUser.addresses,
      "Address deleted successfully"
    )
  );
});

export const setDefaultAddress = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const userId = req.user._id;
  const { addressId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const address = user.addresses.id(addressId);
  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  user.addresses.forEach((addr) => (addr.isDefault = false));

  address.isDefault = true;

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.addresses,
        "Default address updated successfully"
      )
    );
});

export const getDefaultAddress = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const defaultAddress = user.addresses.find((addr) => addr.isDefault);

  if (!defaultAddress) {
    throw new ApiError(404, "Default address not set");
  }

  return res.status(200).json(
    new ApiResponse(200, defaultAddress, "Default address fetched successfully")
  );
});

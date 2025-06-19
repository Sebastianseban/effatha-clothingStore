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

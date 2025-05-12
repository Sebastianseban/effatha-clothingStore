
import { OAuth2Client } from "google-auth-library";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.model.js";
import { generateAccessAndRefreshToken } from "./user.controller.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage" 
);

export const googleAuthHandler = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) {
    throw new ApiError(400, "Authorization code is required");
  }


  const { tokens } = await client.getToken(code);
  const idToken = tokens.id_token;

  if (!idToken) {
    throw new ApiError(400, "Invalid ID Token");
  }


  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub: googleId, email, given_name, family_name } = payload;


  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      firstName: given_name,
      lastName: family_name || "",
      email,
      provider: "google",
      googleId,
    });
  }


  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const safeUser = await User.findById(user._id).select("-password -refreshToken");


  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: safeUser,
          accessToken,
        },
        "Google login successful"
      )
    );
});


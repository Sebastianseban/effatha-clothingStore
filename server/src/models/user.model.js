import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
    },
    mobileNumber: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      unique: true,
      trim: true,
      match: [
        /^\+?(\d{1,3})?(\d{10})$/,
        "Please provide a valid mobile number",
      ],
    },
    refreshToken: {
      type: String,
    },
    googleId: {
      type: String,
    },
    provider: {
      type: String,
      default: "local",
      enum: ["local", "google"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, default: "India" },
        label: {
          type: String,
          enum: ["home", "work", "other"],
          default: "home",
        },
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1hr",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    }
  );
};

export const User = mongoose.model("User", userSchema);

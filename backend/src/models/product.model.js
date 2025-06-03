import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    sizes: [
      {
        type: String,
        enum: ["S", "M", "L", "XL", "XXL"],
      },
    ],
    images: {
      type: [String],
      required: true,
      validate: [(array) => array.length > 0, "At least one image is required"],
    },
    highLightTypes: {
      type: String,
      enum: ["new_arrival", "best_seller", "popular"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["t-shirt", "jeans", "hoodie", "jacket", "shorts", "accessories"],
      lowercase: true,
      trim: true,
    },
    stockNumber: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);

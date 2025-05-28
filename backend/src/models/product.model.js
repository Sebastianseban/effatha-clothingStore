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
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],

    },
    images: {
      type: [String], // Array of image URLs
      required: true,
    },
    category: {
      type: String,
      enum: ["new_arrival", "best_seller", "popular"],
     
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);


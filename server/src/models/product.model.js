import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    price: { type: Number, required: true, min: 0 },

    variants: [
      {
        color: { type: String, required: true, trim: true },
        images: {
          type: [String],
          required: true,
          validate: {
            validator: (array) => array.length > 0,
            message: "At least one image is required",
          },
        },
        sizes: [
          {
            size: {
              type: String,
              enum: ["S", "M", "L", "XL", "XXL"],
            },
            quantity: {
              type: Number,
              default: 0,
              min: 0,
            },
          },
        ],
      },
    ],

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
    gender: {
      type: String,
      enum: ["men", "women", "unisex"],
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


productSchema.index({
  title: "text",
  brand: "text",
  description: "text",
});



export const Product = mongoose.model("Product", productSchema);

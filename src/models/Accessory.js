import mongoose from "mongoose";
import { ACCESSORY_CATEGORY_VALUES } from "@/lib/accessory-categories";

const accessoryImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const accessorySchema = new mongoose.Schema(
  {
    stockNumber: {
      type: String,
      trim: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
      maxlength: 160,
    },
    category: {
      type: String,
      required: true,
      enum: ACCESSORY_CATEGORY_VALUES,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 5000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    currency: {
      type: String,
      default: "SAR",
      uppercase: true,
      trim: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: {
      type: [accessoryImageSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["Available", "Out of stock", "Discontinued"],
      default: "Available",
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

accessorySchema.index({ status: 1, category: 1, createdAt: -1 });

const Accessory =
  mongoose.models.Accessory ||
  mongoose.model("Accessory", accessorySchema);

export default Accessory;

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Accessory from "@/models/Accessory";
import { isAccessoryCategory } from "@/lib/accessory-categories";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const pageValue = Number(searchParams.get("page") || 1);
    const limitValue = Number(searchParams.get("limit") || 12);
    const page =
      Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const limit =
      Number.isInteger(limitValue) && limitValue > 0
        ? Math.min(limitValue, 50)
        : 12;
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const minPrice = parseOptionalNumber(searchParams.get("minPrice"));
    const maxPrice = parseOptionalNumber(searchParams.get("maxPrice"));
    const sort = searchParams.get("sort") || "newest";

    if (category && !isAccessoryCategory(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid accessory category" },
        { status: 400 },
      );
    }
    if (
      (searchParams.has("minPrice") && minPrice === null) ||
      (searchParams.has("maxPrice") && maxPrice === null)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid price filter" },
        { status: 400 },
      );
    }
    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
      return NextResponse.json(
        { success: false, message: "Minimum price cannot exceed maximum price" },
        { status: 400 },
      );
    }

    const filter = {
      status: "Available",
      stockQuantity: { $gt: 0 },
    };
    if (category) filter.category = category;
    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      filter.$or = [
        { name: regex },
        { stockNumber: regex },
        { description: regex },
      ];
    }
    if (minPrice !== null || maxPrice !== null) {
      filter.price = {};
      if (minPrice !== null) filter.price.$gte = minPrice;
      if (maxPrice !== null) filter.price.$lte = maxPrice;
    }

    const sortOptions = {
      newest: { createdAt: -1, _id: -1 },
      "price-low": { price: 1, _id: 1 },
      "price-high": { price: -1, _id: -1 },
      name: { name: 1, _id: 1 },
    };
    const skip = (page - 1) * limit;
    const [accessories, total] = await Promise.all([
      Accessory.find(filter)
        .select("name category description price currency stockNumber stockQuantity images status isFeatured createdAt")
        .sort(sortOptions[sort] || sortOptions.newest)
        .skip(skip)
        .limit(limit)
        .lean(),
      Accessory.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    return NextResponse.json({
      success: true,
      data: {
        accessories,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Accessories GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load accessories" },
      { status: 500 },
    );
  }
}

function parseOptionalNumber(value) {
  if (value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

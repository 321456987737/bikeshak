import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Accessory from "@/models/Accessory";
import { isAccessoryCategory } from "@/lib/accessory-categories";
import { normalizeAccessoryInput } from "@/lib/accessory-input";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();

    const { searchParams } = new URL(request.url);
    const pageValue = Number(searchParams.get("page") || 1);
    const limitValue = Number(searchParams.get("limit") || 15);
    const page =
      Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const limit =
      Number.isInteger(limitValue) && limitValue > 0
        ? Math.min(limitValue, 50)
        : 15;
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";

    if (category && !isAccessoryCategory(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid accessory category" },
        { status: 400 },
      );
    }

    const filter = {};
    if (category) filter.category = category;
    if (status && status !== "all") filter.status = status;
    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      filter.$or = [{ name: regex }, { stockNumber: regex }];
    }

    const skip = (page - 1) * limit;
    const [accessories, total] = await Promise.all([
      Accessory.find(filter)
        .sort({ createdAt: -1, _id: -1 })
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
    console.error("Admin accessories GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load accessories" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const body = await request.json();
    const { data, error } = normalizeAccessoryInput(body);
    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 400 },
      );
    }

    const accessory = await Accessory.create(data);
    return NextResponse.json(
      {
        success: true,
        message: "Accessory created successfully",
        data: { accessory },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Admin accessories POST error:", error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, message: "That stock number already exists" },
        { status: 409 },
      );
    }
    if (error?.name === "ValidationError" || error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create accessory" },
      { status: 500 },
    );
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

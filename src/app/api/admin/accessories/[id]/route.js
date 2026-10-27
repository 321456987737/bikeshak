import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Accessory from "@/models/Accessory";
import cloudinary from "@/lib/cloudinary";
import { normalizeAccessoryInput } from "@/lib/accessory-input";
import { getAdminSession } from "@/lib/auth";

export async function GET(_request, { params }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid accessory ID" },
        { status: 400 },
      );
    }
    const accessory = await Accessory.findById(id).lean();
    if (!accessory) {
      return NextResponse.json(
        { success: false, message: "Accessory not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: { accessory } });
  } catch (error) {
    console.error("Admin accessory GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load accessory" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid accessory ID" },
        { status: 400 },
      );
    }
    const accessory = await Accessory.findById(id);
    if (!accessory) {
      return NextResponse.json(
        { success: false, message: "Accessory not found" },
        { status: 404 },
      );
    }

    const { data, error } = normalizeAccessoryInput(await request.json(), {
      partial: true,
    });
    if (error) {
      return NextResponse.json(
        { success: false, message: error },
        { status: 400 },
      );
    }
    Object.assign(accessory, data);
    await accessory.save();
    return NextResponse.json({
      success: true,
      message: "Accessory updated successfully",
      data: { accessory },
    });
  } catch (error) {
    console.error("Admin accessory PATCH error:", error);
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
      { success: false, message: "Failed to update accessory" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    if (!(await getAdminSession())) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid accessory ID" },
        { status: 400 },
      );
    }
    const accessory = await Accessory.findById(id);
    if (!accessory) {
      return NextResponse.json(
        { success: false, message: "Accessory not found" },
        { status: 404 },
      );
    }
    const publicIds = accessory.images.map((image) => image.publicId).filter(Boolean);
    await Accessory.deleteOne({ _id: accessory._id });

    let warning = "";
    if (publicIds.length > 0) {
      try {
        for (const publicId of publicIds) {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
            type: "upload",
            invalidate: true,
          });
        }
      } catch (error) {
        console.error("Accessory image cleanup error:", error);
        warning = " The accessory was deleted, but some images could not be removed.";
      }
    }

    return NextResponse.json({
      success: true,
      message: `Accessory deleted successfully.${warning}`,
    });
  } catch (error) {
    console.error("Admin accessory DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete accessory" },
      { status: 500 },
    );
  }
}

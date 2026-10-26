import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Motorcycle from "@/models/Motorcycle";
import cloudinary from "@/lib/cloudinary";
export async function GET(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid motorcycle ID",
        },
        { status: 400 }
      );
    }

    const motorcycle = await Motorcycle.findById(id).lean();

    if (!motorcycle) {
      return NextResponse.json(
        {
          success: false,
          message: "Motorcycle not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        motorcycle,
      },
    });
  } catch (error) {
    console.error(
      "Admin motorcycle GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load motorcycle",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid motorcycle ID",
        },
        { status: 400 }
      );
    }

    const existingMotorcycle = await Motorcycle.findById(id);

    if (!existingMotorcycle) {
      return NextResponse.json(
        {
          success: false,
          message: "Motorcycle not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const allowedFields = [
      "stockNumber",
      "make",
      "model",
      "year",
      "price",
      "currency",
      "mileage",
      "mileageUnit",
      "transmission",
      "fuelType",
      "engineCapacity",
      "engineType",
      "coolingSystem",
      "bikeType",
      "condition",
      "exteriorColor",
      "engineNumber",
      "chassisNumber",
      "startingSystem",
      "brakeType",
      "abs",
      "description",
      "features",
      "images",
      "status",
      "isFeatured",
    ];

    for (const field of allowedFields) {
      if (body[field] === undefined) {
        continue;
      }

      if (
        [
          "make",
          "model",
          "currency",
          "exteriorColor",
          "engineType",
          "engineNumber",
          "chassisNumber",
          "description",
        ].includes(field)
      ) {
        existingMotorcycle[field] =
          String(body[field]).trim();

        continue;
      }

      if (field === "stockNumber") {
        existingMotorcycle.stockNumber =
          body[field]
            ? String(body[field]).trim()
            : undefined;

        continue;
      }

      if (
        ["year", "price", "mileage", "engineCapacity"].includes(
          field
        )
      ) {
        if (field === "engineCapacity" && body[field] === null) {
          existingMotorcycle.engineCapacity = null;
          continue;
        }

        const value = Number(body[field]);

        if (!Number.isFinite(value)) {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid ${field}`,
            },
            { status: 400 }
          );
        }

        existingMotorcycle[field] = value;
        continue;
      }

      if (field === "features") {
        if (!Array.isArray(body[field])) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Features must be an array",
            },
            { status: 400 }
          );
        }

        existingMotorcycle.features = body[field]
          .filter(
            (item) =>
              typeof item === "string"
          )
          .map((item) => item.trim())
          .filter(Boolean);

        continue;
      }

      if (field === "images") {
        if (!Array.isArray(body[field])) {
          return NextResponse.json(
            {
              success: false,
              message: "Images must be an array",
            },
            { status: 400 }
          );
        }

        existingMotorcycle.images = body[field];

        continue;
      }

      existingMotorcycle[field] = body[field];
    }

    await existingMotorcycle.save();

    return NextResponse.json({
      success: true,
      message: "Motorcycle updated successfully",
      data: {
        motorcycle: existingMotorcycle,
      },
    });
  } catch (error) {
    console.error(
      "Admin motorcycle PATCH error:",
      error
    );

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "That stock number already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update motorcycle",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid motorcycle ID",
        },
        { status: 400 }
      );
    }

    const motorcycle = await Motorcycle.findById(id);

    if (!motorcycle) {
      return NextResponse.json(
        {
          success: false,
          message: "Motorcycle not found",
        },
        { status: 404 }
      );
    }

    const publicIds =
      Array.isArray(motorcycle.images)
        ? motorcycle.images
            .map(
              (image) =>
                image.publicId
            )
            .filter(Boolean)
        : [];

    await Motorcycle.deleteOne({
      _id: motorcycle._id,
    });

    /*
     * Delete the corresponding Cloudinary
     * assets after removing the motorcycle.
     */
    let imageCleanupWarning = "";

    if (publicIds.length > 0) {
      try {
        for (const publicId of publicIds) {
          await cloudinary.uploader.destroy(
            publicId,
            {
              resource_type:
                "image",

              type: "upload",

              invalidate: true,
            }
          );
        }
      } catch (cleanupError) {
        console.error(
          "Motorcycle image cleanup error:",
          cleanupError
        );

        imageCleanupWarning =
          " Motorcycle deleted, but some Cloudinary images could not be removed.";
      }
    }

    return NextResponse.json({
      success: true,

      message: `Motorcycle deleted successfully.${imageCleanupWarning}`,
    });
  } catch (error) {
    console.error(
      "Admin motorcycle DELETE error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete motorcycle",
      },
      { status: 500 }
    );
  }
}

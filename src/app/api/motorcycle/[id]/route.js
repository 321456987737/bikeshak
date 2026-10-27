import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Motorcycle from "@/models/Motorcycle";
// import Business from "@/models/Business";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid motorcycle ID",
        },
        {
          status: 400,
        }
      );
    }

    const motorcycle = await Motorcycle.findById(id)
      .select(
        "stockNumber make model year price currency mileage mileageUnit engineCapacity engineType coolingSystem transmission fuelType bikeType condition exteriorColor engineNumber chassisNumber startingSystem brakeType abs description features images status isFeatured createdAt"
      )
      .lean();

    if (!motorcycle) {
      return NextResponse.json(
        {
          success: false,
          message: "Motorcycle not found",
        },
        {
          status: 404,
        }
      );
    }

    // const business = await Business.findOne({
    //   isActive: true,
    // })
    //   .select(
    //     "name logo phone whatsapp email address city country postalCode location openingHours socialLinks"
    //   )
    //   .lean();

    // if (!business) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Dealership not found",
    //     },
    //     {
    //       status: 404,
    //     }
    //   );
    // }

    const relatedMotorcycles = await Motorcycle.find({
      _id: {
        $ne: motorcycle._id,
      },
      status: "Available",
      $or: [
        { make: motorcycle.make },
        { bikeType: motorcycle.bikeType },
      ],
    })
      .select(
        "make model year price currency mileage mileageUnit transmission fuelType bikeType images status isFeatured"
      )
      .sort({
        createdAt: -1,
      })
      .limit(4)
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        motorcycle,
        // business,
        relatedMotorcycles,
      },
    });
  } catch (error) {
    console.error("Motorcycle details API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load motorcycle",
      },
      {
        status: 500,
      }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Motorcycle from "@/models/Motorcycle";

export async function GET() {
  try {
    await connectDB();

    const latestMotorcycles = await Motorcycle.find({
      status: "Available",
    })
      .select(
        "stockNumber make model year price currency mileage mileageUnit transmission fuelType bikeType condition exteriorColor engineCapacity engineType images status isFeatured createdAt"
      )
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .limit(8)
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: latestMotorcycles,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Latest motorcycles API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load latest motorcycles",
      },
      {
        status: 500,
      }
    );
  }
}
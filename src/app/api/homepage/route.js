import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Motorcycle from "@/models/Motorcycle";

export async function GET() {
  try {
    await connectDB();

    const [featuredMotorcycles, latestMotorcycles] = await Promise.all([
      Motorcycle.find({
        status: "Available",
        isFeatured: true,
      })
        .select(
          "make model year price currency mileage mileageUnit transmission fuelType bikeType condition exteriorColor engineCapacity images status isFeatured"
        )
        .sort({
          createdAt: -1,
        })
        .limit(8)
        .lean(),

      Motorcycle.find({
        status: "Available",
      })
        .select(
          "make model year price currency mileage mileageUnit transmission fuelType bikeType condition exteriorColor engineCapacity images status isFeatured"
        )
        .sort({
          createdAt: -1,
        })
        .limit(8)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        featuredMotorcycles,
        latestMotorcycles,
      },
    });
  } catch (error) {
    console.error("Homepage API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load homepage data",
      },
      {
        status: 500,
      }
    );
  }
}
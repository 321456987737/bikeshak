
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Motorcycle from "@/models/Motorcycle";

export async function GET() {
  try {
    console.log(1)
    await connectDB();

    const motorcycles = await Motorcycle.find({
      isFeatured: true,
      status: "Available",
    })
      .sort({ createdAt: -1 })
      .limit(8)
      .select(
        "make model year price currency mileage mileageUnit transmission fuelType bikeType condition images"
      )
      .lean();
    console.log(1)

    return NextResponse.json(
      {
        success: true,
        data: motorcycles,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Featured motorcycles API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load featured motorcycles.",
      },
      {
        status: 500,
      }
    );
  }
}

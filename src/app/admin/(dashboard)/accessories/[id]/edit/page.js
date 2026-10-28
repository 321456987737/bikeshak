import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Accessory from "@/models/Accessory";
import AccessoryForm from "@/components/admin/AccessoryForm";

async function getAccessory(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await connectDB();
  const accessory = await Accessory.findById(id).lean();
  return accessory
    ? { ...accessory, _id: accessory._id.toString() }
    : null;
}

export default async function EditAccessoryPage({ params }) {
  const { id } = await params;
  const accessory = await getAccessory(id);
  if (!accessory) notFound();

  return (
    <div className="mx-auto max-w-5xl pb-20 md:pb-0">
      <div className="mb-8">
        <Link href="/admin/accessories" className="text-sm text-black/45 underline underline-offset-4 hover:text-black">
          ← العودة إلى الإكسسوارات
        </Link>
        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">المخزون</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">تعديل الإكسسوار</h1>
          <p className="mt-2 text-sm leading-6 text-black/45">{accessory.name}</p>
        </div>
      </div>
      <AccessoryForm initialData={accessory} />
    </div>
  );
}

import Link from "next/link";
import AccessoryForm from "@/components/admin/AccessoryForm";

export default function NewAccessoryPage() {
  return (
    <div className="mx-auto max-w-5xl pb-20 md:pb-0">
      <div className="mb-8">
        <Link href="/admin/accessories" className="text-sm text-black/45 underline underline-offset-4 hover:text-black">
          ← Back to accessories
        </Link>
        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">Inventory</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Add an accessory</h1>
          <p className="mt-2 text-sm leading-6 text-black/45">Add a product to your accessories catalog.</p>
        </div>
      </div>
      <AccessoryForm />
    </div>
  );
}

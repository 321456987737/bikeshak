import Link from "next/link";
import { translateLabel } from "@/lib/localization";

export default function MotorcycleCard({ motorcycle }) {
  const image = motorcycle.images?.[0];

  const formattedPrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(motorcycle.price);

  const formattedMileage = new Intl.NumberFormat("en-US").format(
    motorcycle.mileage || 0
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white">
      <Link href={`/motorcycle/${motorcycle._id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          {image?.url ? (
            <img
              src={image.url}
              alt={image.alt || `${motorcycle.make} ${motorcycle.model}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-black/40">
              لا توجد صورة
            </div>
          )}

          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-sm">
            {translateLabel(motorcycle.condition)}
          </div>

          {motorcycle.isFeatured && (
            <div className="absolute right-4 top-4 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white">
              Featured
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <Link href={`/motorcycle/${motorcycle._id}`}>
              <h3 className="text-lg font-semibold tracking-tight text-black transition group-hover:text-black/60">
                {motorcycle.make} {motorcycle.model}
              </h3>
            </Link>

            <p className="mt-1 text-sm text-black/50">
              {motorcycle.year} · {formattedMileage} {motorcycle.mileageUnit}
            </p>
          </div>

          <p className="shrink-0 text-base font-semibold text-black">
            {motorcycle.currency} {formattedPrice}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-black/10 pt-4 text-xs text-black/55">
          <span>{translateLabel(motorcycle.transmission)}</span>
          <span>{translateLabel(motorcycle.fuelType)}</span>
          <span>{translateLabel(motorcycle.bikeType)}</span>
        </div>
      </div>
    </article>
  );
}
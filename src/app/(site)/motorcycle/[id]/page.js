
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/animations/Reveal";
import { BUSINESS_NAME, SHOWROOM_LOCATION } from "@/lib/business";

async function getMotorcycle(id) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/motorcycle/${id}`,
      { cache: "no-store" }
    );

    if (response.status === 404) return null;

    if (!response.ok) {
      throw new Error("Failed to load motorcycle");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message || "Failed to load motorcycle"
      );
    }

    return result.data;
  } catch (error) {
    console.error("Motorcycle details fetch error:", error);
    return null;
  }
}

async function getLatestMotorcycles(currentMotorcycleId) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/motorcycle/latest`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to load latest motorcycles");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(
        result.message || "Failed to load latest motorcycles"
      );
    }

    return (Array.isArray(result.data) ? result.data : [])
      .filter(
        (motorcycle) =>
          String(motorcycle._id) !== String(currentMotorcycleId)
      )
      .slice(0, 8);
  } catch (error) {
    console.error("Latest motorcycles fetch error:", error);
    return [];
  }
}

export default async function Page({ params }) {
  const { id } = await params;

  const data = await getMotorcycle(id);

  if (!data) notFound();

  const { motorcycle } = data;

  const latestMotorcycles = await getLatestMotorcycles(
    motorcycle._id
  );

  const images = motorcycle.images || [];

  const formattedPrice = formatPrice(
    motorcycle.price,
    motorcycle.currency
  );

  const formattedMileage = new Intl.NumberFormat("en-US").format(
    motorcycle.mileage || 0
  );

  return (
    <main className="min-h-screen bg-white text-black">
      {/* BREADCRUMB */}

      <div className="h-18 w-full bg-[#181818]" />

      <div className="border-b border-black/10">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
          <div className="flex items-center gap-2 font-montserrat text-[10px] uppercase tracking-[0.17em] text-black/35 md:text-[11px]">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-black"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/motorcycle"
              className="transition-colors duration-300 hover:text-black"
            >
              Motorcycles
            </Link>

            <span>/</span>

            <span className="max-w-[180px] truncate text-black/55 md:max-w-none">
              {motorcycle.make} {motorcycle.model}
            </span>
          </div>

          <Link
            href="/motorcycle"
            className="group hidden items-center gap-2 font-montserrat text-[9px] font-medium uppercase tracking-[0.18em] text-black/45 transition-colors duration-300 hover:text-black sm:flex md:text-[10px]"
          >
            Back to motorcycles
            <ArrowUpRight
              size={14}
              strokeWidth={1.2}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* MAIN MOTORCYCLE */}

      <section>
        <div className="mx-auto max-w-[1800px] px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 xl:grid-cols-[1.4fr_0.6fr]">
            {/* IMAGE GALLERY */}

            <Reveal y={30}>
              <div>
                {images.length > 0 ? (
                  <div className="space-y-3">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#f1f1ef]">
                      <img
                        src={images[0].url}
                        alt={
                          images[0].alt ||
                          `${motorcycle.make} ${motorcycle.model}`
                        }
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
                      />

                      <div className="absolute left-4 top-4">
                        <span className="bg-white px-3 py-2 font-montserrat text-[9px] font-medium uppercase tracking-[0.16em] text-black md:text-[10px]">
                          {motorcycle.condition}
                        </span>
                      </div>
                    </div>

                    {images.length > 1 && (
                      <div className="grid grid-cols-2 gap-3">
                        {images.slice(1).map((image, index) => (
                          <div
                            key={`${image.publicId}-${index + 1}`}
                            className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ef]"
                          >
                            <img
                              src={image.url}
                              alt={
                                image.alt ||
                                `${motorcycle.make} ${motorcycle.model} image ${index + 2}`
                              }
                              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center bg-[#f1f1ef]">
                    <span className="font-montserrat text-[10px] uppercase tracking-[0.22em] text-black/25 md:text-[11px]">
                      No images available
                    </span>
                  </div>
                )}
              </div>
            </Reveal>

            {/* MOTORCYCLE INFORMATION */}

            <Reveal delay={0.12} y={24}>
              <div className="lg:sticky lg:top-8 lg:h-fit">
                <div className="border-t border-black/10 pt-6">
                  <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.28em] text-black/35 md:text-[11px]">
                    {motorcycle.bikeType} · {motorcycle.condition}
                  </p>

                  <p className="mt-7 font-montserrat text-[11px] font-medium uppercase tracking-[0.28em] text-black/40 md:text-xs">
                    {motorcycle.make}
                  </p>

                  <h1 className="mt-2 font-bebas text-[clamp(4rem,7vw,7rem)] leading-[0.8] tracking-[-0.045em]">
                    {motorcycle.model}
                  </h1>

                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-montserrat text-[10px] uppercase tracking-[0.16em] text-black/40 md:text-[11px]">
                    <span>{motorcycle.year}</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-black/20" />
                    <span>
                      {formattedMileage} {motorcycle.mileageUnit}
                    </span>
                    <span className="h-[3px] w-[3px] rounded-full bg-black/20" />
                    <span>{motorcycle.transmission}</span>
                  </div>

                  <div className="mt-8 border-y border-black/10 py-6">
                    <p className="font-montserrat text-[9px] uppercase tracking-[0.22em] text-black/30 md:text-[10px]">
                      Asking price
                    </p>

                    <p className="mt-2 font-montserrat text-2xl font-medium tracking-[-0.02em] md:text-3xl lg:text-4xl">
                      {formattedPrice}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-col gap-3">
                    <Link
                      href={`/contact?motorcycle=${motorcycle._id}`}
                      className="group flex items-center justify-center gap-3 bg-black px-6 py-4 font-montserrat text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-black/80 md:text-[11px]"
                    >
                      Enquire about this motorcycle
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.3}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>

                    <Link
                      href={`/test-drive?motorcycle=${motorcycle._id}`}
                      className="group flex items-center justify-center gap-3 border border-black/15 px-6 py-4 font-montserrat text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:border-black hover:bg-black hover:text-white md:text-[11px]"
                    >
                      Book a test ride
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.3}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  </div>

                  <div className="mt-6 flex items-center justify-between font-montserrat text-[9px] uppercase tracking-[0.18em] text-black/30 md:text-[10px]">
                    <span>
                      Stock {motorcycle.stockNumber || "Available"}
                    </span>
                    <span>{motorcycle.status}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DESCRIPTION AND SPECIFICATIONS */}

      <section className="border-t border-black/10">
        <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <Reveal>
              <div>
                <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/30 md:text-[11px]">
                  The motorcycle
                </p>

                <h2 className="mt-3 font-bebas text-5xl leading-[0.85] tracking-[-0.035em] md:text-6xl">
                  About this
                  <br />
                  motorcycle
                </h2>

                <p className="mt-7 max-w-xl whitespace-pre-line font-montserrat text-[11px] leading-[1.9] tracking-[0.035em] text-black/45 md:text-[13px] md:leading-[1.85]">
                  {motorcycle.description ||
                    "Contact our dealership for more information about this motorcycle."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="border-t border-black/10">
                <SpecRow label="Make" value={motorcycle.make} />
                <SpecRow label="Model" value={motorcycle.model} />
                <SpecRow label="Year" value={motorcycle.year} />

                <SpecRow
                  label="Mileage"
                  value={`${formattedMileage} ${motorcycle.mileageUnit}`}
                />

                <SpecRow
                  label="Transmission"
                  value={motorcycle.transmission}
                />

                <SpecRow label="Fuel type" value={motorcycle.fuelType} />

                <SpecRow
                  label="Motorcycle type"
                  value={motorcycle.bikeType}
                />

                <SpecRow
                  label="Exterior"
                  value={motorcycle.exteriorColor || "—"}
                />

                <SpecRow
                  label="Engine capacity"
                  value={
                    motorcycle.engineCapacity != null
                      ? `${motorcycle.engineCapacity} cc`
                      : "—"
                  }
                />

                <SpecRow
                  label="Engine type"
                  value={motorcycle.engineType || "—"}
                />

                <SpecRow
                  label="Cooling system"
                  value={motorcycle.coolingSystem || "—"}
                />

                <SpecRow
                  label="Starting system"
                  value={motorcycle.startingSystem || "—"}
                />

                <SpecRow
                  label="Brake type"
                  value={motorcycle.brakeType || "—"}
                />

                <SpecRow
                  label="ABS"
                  value={motorcycle.abs ? "Yes" : "No"}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      {motorcycle.features?.length > 0 && (
        <section className="border-t border-black/10">
          <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
            <Reveal>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/30 md:text-[11px]">
                    Equipment
                  </p>

                  <h2 className="mt-3 font-bebas text-5xl leading-none tracking-[-0.03em] md:text-6xl">
                    Features
                  </h2>
                </div>

                <span className="hidden font-montserrat text-[9px] uppercase tracking-[0.2em] text-black/25 sm:block md:text-[10px]">
                  {motorcycle.features.length} items
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
                {(motorcycle.features || []).map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-4 border-b border-black/10 px-1 py-5 sm:border-r sm:px-4 lg:px-5"
                  >
                    <span className="font-montserrat text-[9px] tracking-[0.15em] text-black/20 md:text-[10px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="font-montserrat text-[11px] tracking-[0.02em] text-black/65 md:text-[12px]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* DEALERSHIP */}

      <section className="bg-[#181818] text-white">
        <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <Reveal>
              <div>
                <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/30 md:text-[11px]">
                  The dealership
                </p>

                <h2 className="mt-4 max-w-4xl font-bebas text-[clamp(4rem,8vw,8rem)] leading-[0.8] tracking-[-0.045em]">
                  Come see it
                  <br />
                  in person.
                </h2>

                <p className="mt-7 max-w-xl font-montserrat text-[11px] leading-[1.9] tracking-[0.035em] text-white/35 md:text-[13px] md:leading-[1.85]">
                  Visit our showroom to experience the motorcycle in
                  person and speak with our team about ownership,
                  financing, trade-ins, and test drives.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border-t border-white/10 pt-7">
                <p className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/25 md:text-[11px]">
                  {BUSINESS_NAME} · {SHOWROOM_LOCATION}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-white px-5 py-3.5 font-montserrat text-[9px] font-medium uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white/85 md:text-[10px]"
                  >
                    Contact {BUSINESS_NAME}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.2}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LATEST ARRIVALS */}

      {latestMotorcycles.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
            <Reveal>
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/30 md:text-[11px]">
                    Fresh to the collection
                  </p>

                  <h2 className="mt-3 font-bebas text-5xl leading-[0.85] tracking-[-0.035em] sm:text-6xl md:text-7xl">
                    Latest Arrivals
                  </h2>
                </div>

                <Link
                  href="/motorcycle"
                  className="group hidden items-center gap-2 border-b border-black/20 pb-2 font-montserrat text-[9px] font-medium uppercase tracking-[0.18em] text-black/50 transition-colors duration-300 hover:border-black hover:text-black sm:flex md:text-[10px]"
                >
                  View all motorcycles
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.2}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {latestMotorcycles.map((latestMotorcycle, index) => (
                <Reveal
                  key={latestMotorcycle._id}
                  delay={index * 0.08}
                  y={24}
                >
                  <LatestMotorcycleCard
                    motorcycle={latestMotorcycle}
                    index={index}
                  />
                </Reveal>
              ))}
            </div>

            <div className="mt-10 flex justify-center sm:hidden">
              <Link
                href="/motorcycle"
                className="group inline-flex items-center gap-3 bg-black px-6 py-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-white"
              >
                View all motorcycles
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/* SPECIFICATION ROW */

function SpecRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-8 border-b border-black/10 py-4">
      <span className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/30 md:text-[10px]">
        {label}
      </span>

      <span className="text-right font-montserrat text-[11px] tracking-[0.02em] text-black/65 md:text-[12px]">
        {value}
      </span>
    </div>
  );
}

/* LATEST MOTORCYCLE CARD */

function LatestMotorcycleCard({ motorcycle, index }) {
  const image = motorcycle.images?.[0];

  const price = formatPrice(
    motorcycle.price,
    motorcycle.currency
  );

  const mileage = new Intl.NumberFormat("en-US").format(
    motorcycle.mileage || 0
  );

  return (
    <Link
      href={`/motorcycle/${motorcycle._id}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ef]">
        {image?.url ? (
          <img
            src={image.url}
            alt={
              image.alt ||
              `${motorcycle.make} ${motorcycle.model}`
            }
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-montserrat text-[10px] uppercase tracking-[0.2em] text-black/25">
            No image
          </div>
        )}

        <div className="absolute left-3 top-3">
          <span className="bg-white px-3 py-2 font-montserrat text-[8px] font-medium uppercase tracking-[0.15em] text-black md:text-[9px]">
            {motorcycle.condition}
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="font-montserrat text-[9px] tracking-[0.2em] text-white/70 md:text-[10px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white text-black transition-all duration-300 group-hover:bg-black group-hover:text-white md:h-10 md:w-10">
          <ArrowUpRight
            size={15}
            strokeWidth={1.2}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>

      <div className="border-b border-black/10 py-5">
        <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.25em] text-black/35 md:text-[10px]">
          {motorcycle.make}
        </p>

        <div className="mt-2 flex items-start justify-between gap-4">
          <h3 className="font-bebas text-3xl leading-[0.9] tracking-[-0.025em] transition-opacity duration-300 group-hover:opacity-55 md:text-4xl">
            {motorcycle.model}
          </h3>

          <p className="shrink-0 pt-1 font-montserrat text-[11px] font-medium md:text-xs">
            {price}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-montserrat text-[9px] uppercase tracking-[0.16em] text-black/35 md:text-[10px]">
          <span>{motorcycle.year}</span>

          <span className="h-[3px] w-[3px] rounded-full bg-black/20" />

          <span>
            {mileage} {motorcycle.mileageUnit}
          </span>

          <span className="h-[3px] w-[3px] rounded-full bg-black/20" />

          <span>{motorcycle.bikeType}</span>
        </div>
      </div>
    </Link>
  );
}

/* PRICE FORMATTER */

function formatPrice(price, currency) {
  if (typeof price !== "number") return "";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency || "USD"} ${price.toLocaleString()}`;
  }
}


// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { ArrowUpRight } from "lucide-react";

// async function getMotorcycle(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//   try {
//     const response = await fetch(`${baseUrl}/api/motorcycle/${id}`, {
//       cache: "no-store",
//     });

//     if (response.status === 404) {
//       return null;
//     }

//     if (!response.ok) {
//       throw new Error("Failed to load motorcycle");
//     }

//     const result = await response.json();

//     if (!result.success) {
//       throw new Error(result.message || "Failed to load motorcycle");
//     }

//     return result.data;
//   } catch (error) {
//     console.error("Motorcycle details fetch error:", error);

//     return null;
//   }
// }

// /* ============================================================
//    LATEST MOTORCYCLES
// ============================================================ */

// async function getLatestMotorcycles(currentMotorcycleId) {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//   try {
//     const response = await fetch(`${baseUrl}/api/motorcycle/latest`, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       throw new Error("Failed to load latest motorcycles");
//     }

//     const result = await response.json();

//     if (!result.success) {
//       throw new Error(result.message || "Failed to load latest motorcycles");
//     }

//     const latestMotorcycles = Array.isArray(result.data) ? result.data : [];

//     return latestMotorcycles
//       .filter(
//         (motorcycle) => String(motorcycle._id) !== String(currentMotorcycleId),
//       )
//       .slice(0, 8);
//   } catch (error) {
//     console.error("Latest motorcycles fetch error:", error);

//     return [];
//   }
// }

// /* ============================================================
//    PAGE
// ============================================================ */

// export default async function Page({ params }) {
//   const { id } = await params;

//   const data = await getMotorcycle(id);

//   if (!data) {
//     notFound();
//   }

//   const { motorcycle } = data;

//   const latestMotorcycles = await getLatestMotorcycles(motorcycle._id);

//   const images = motorcycle.images || [];

//   const formattedPrice = formatPrice(motorcycle.price, motorcycle.currency);

//   const formattedMileage = new Intl.NumberFormat("en-US").format(
//     motorcycle.mileage || 0,
//   );

//   return (
//     <main className="min-h-screen bg-white text-black ">
//       {/* ======================================================
//           01 — BREADCRUMB
//       ====================================================== */}
//       <div className="bg-[#181818] h-18 w-full" />
//       <div className="border-b border-black/10">
//         <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
//           <div className="flex items-center gap-2 font-montserrat text-[10px] uppercase tracking-[0.17em] text-black/35 md:text-[11px]">
//             <Link
//               href="/"
//               className="transition-colors duration-300 hover:text-black"
//             >
//               Home
//             </Link>

//             <span>/</span>

//             <Link
//               href="/motorcycle"
//               className="transition-colors duration-300 hover:text-black"
//             >
//               Motorcycles
//             </Link>

//             <span>/</span>

//             <span className="max-w-[180px] truncate text-black/55 md:max-w-none">
//               {motorcycle.make} {motorcycle.model}
//             </span>
//           </div>

//           <Link
//             href="/motorcycle"
//             className="group hidden items-center gap-2 font-montserrat text-[9px] font-medium uppercase tracking-[0.18em] text-black/45 transition-colors duration-300 hover:text-black sm:flex md:text-[10px]"
//           >
//             Back to motorcycles
//             <ArrowUpRight
//               size={14}
//               strokeWidth={1.2}
//               className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
//             />
//           </Link>
//         </div>
//       </div>

//       {/* ======================================================
//           02 — MAIN VEHICLE
//       ====================================================== */}

//       <section>
//         <div className="mx-auto max-w-[1800px] px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
//           <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 xl:grid-cols-[1.4fr_0.6fr]">
//             {/* ==================================================
//                 IMAGE GALLERY
//             ================================================== */}
//             {/* ==================================================
//     IMAGE GALLERY
// ================================================== */}

//             <div>
//               {images.length > 0 ? (
//                 <div className="space-y-3">
//                   {/* MAIN IMAGE */}
//                   <div className="relative aspect-[16/9] overflow-hidden bg-[#f1f1ef]">
//                     <img
//                       src={images[0].url}
//                       alt={
//                         images[0].alt ||
//                         `${motorcycle.make} ${motorcycle.model}`
//                       }
//                       className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
//                     />

//                     {/* CONDITION */}
//                     <div className="absolute left-4 top-4">
//                       <span className="bg-white px-3 py-2 font-montserrat text-[9px] font-medium uppercase tracking-[0.16em] text-black md:text-[10px]">
//                         {motorcycle.condition}
//                       </span>
//                     </div>

//                     {/* IMAGE COUNT */}
//                     {/* {images.length > 1 && (
//           <div className="absolute bottom-4 right-4">
//             <span className="bg-black/70 px-3 py-2 font-montserrat text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm md:text-[10px]">
//               01 / {String(images.length).padStart(2, "0")}
//             </span>
//           </div>
//         )} */}
//                   </div>

//                   {/* SMALL IMAGES */}
//                   {images.length > 1 && (
//                     <div className="grid grid-cols-2 gap-3">
//                       {images.slice(1).map((image, index) => (
//                         <div
//                           key={`${image.publicId}-${index + 1}`}
//                           className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ef]"
//                         >
//                           <img
//                             src={image.url}
//                             alt={
//                               image.alt ||
//                               `${motorcycle.make} ${motorcycle.model} image ${index + 2}`
//                             }
//                             className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
//                           />

//                           {/* IMAGE NUMBER */}
//                           {/* <div className="absolute bottom-3 left-3">
//                 <span className="bg-black/60 px-2.5 py-1.5 font-montserrat text-[8px] tracking-[0.18em] text-white backdrop-blur-sm md:text-[9px]">
//                   {String(index + 2).padStart(2, "0")}
//                 </span>
//               </div> */}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex aspect-[16/9] items-center justify-center bg-[#f1f1ef]">
//                   <span className="font-montserrat text-[10px] uppercase tracking-[0.22em] text-black/25 md:text-[11px]">
//                     No images available
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* ==================================================
//                 MOTORCYCLE INFORMATION
//             ================================================== */}

//             <div className="lg:sticky lg:top-8 lg:h-fit">
//               <div className="border-t border-black/10 pt-6">
//                 {/* CATEGORY */}

//                 <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.28em] text-black/35 md:text-[11px]">
//                   {motorcycle.bikeType} · {motorcycle.condition}
//                 </p>

//                 {/* BRAND */}

//                 <p className="mt-7 font-montserrat text-[11px] font-medium uppercase tracking-[0.28em] text-black/40 md:text-xs">
//                   {motorcycle.make}
//                 </p>

//                 {/* MODEL */}

//                 <h1 className="mt-2 font-bebas text-[clamp(4rem,7vw,7rem)] leading-[0.8] tracking-[-0.045em]">
//                   {motorcycle.model}
//                 </h1>

//                 {/* DETAILS */}

//                 <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-montserrat text-[10px] uppercase tracking-[0.16em] text-black/40 md:text-[11px]">
//                   <span>{motorcycle.year}</span>

//                   <span className="h-[3px] w-[3px] rounded-full bg-black/20" />

//                   <span>
//                     {formattedMileage} {motorcycle.mileageUnit}
//                   </span>

//                   <span className="h-[3px] w-[3px] rounded-full bg-black/20" />

//                   <span>{motorcycle.transmission}</span>
//                 </div>

//                 {/* PRICE */}

//                 <div className="mt-8 border-y border-black/10 py-6">
//                   <p className="font-montserrat text-[9px] uppercase tracking-[0.22em] text-black/30 md:text-[10px]">
//                     Asking price
//                   </p>

//                   <p className="mt-2 font-montserrat text-2xl font-medium tracking-[-0.02em] md:text-3xl lg:text-4xl">
//                     {formattedPrice}
//                   </p>
//                 </div>

//                 {/* ACTIONS */}

//                 {/* ACTIONS */}

//                 <div className="mt-7 flex flex-col gap-3">
//                   {/* ENQUIRE */}

//                   <Link
//                     href={`/contact?motorcycle=${motorcycle._id}`}
//                     className="group flex items-center justify-center gap-3 bg-black px-6 py-4 font-montserrat text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-black/80 md:text-[11px]"
//                   >
//                     Enquire about this motorcycle
//                     <ArrowUpRight
//                       size={15}
//                       strokeWidth={1.3}
//                       className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                     />
//                   </Link>

//                   {/* TEST DRIVE */}

//                   <Link
//                     href={`/test-drive?motorcycle=${motorcycle._id}`}
//                     className="group flex items-center justify-center gap-3 border border-black/15 px-6 py-4 font-montserrat text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:border-black hover:bg-black hover:text-white md:text-[11px]"
//                   >
//                     Book a test ride
//                     <ArrowUpRight
//                       size={15}
//                       strokeWidth={1.3}
//                       className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                     />
//                   </Link>
//                 </div>

//                 {/* STOCK */}

//                 <div className="mt-6 flex items-center justify-between font-montserrat text-[9px] uppercase tracking-[0.18em] text-black/30 md:text-[10px]">
//                   <span>Stock {motorcycle.stockNumber || "Available"}</span>

//                   <span>{motorcycle.status}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ======================================================
//           03 — DESCRIPTION + SPECS
//       ====================================================== */}

//       <section className="border-t border-black/10">
//         <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
//           <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
//             {/* DESCRIPTION */}

//             <div>
//               <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/30 md:text-[11px]">
//                 The motorcycle
//               </p>

//               <h2 className="mt-3 font-bebas text-5xl leading-[0.85] tracking-[-0.035em] md:text-6xl">
//                 About this
//                 <br />
//                 motorcycle
//               </h2>

//               <p className="mt-7 max-w-xl whitespace-pre-line font-montserrat text-[11px] leading-[1.9] tracking-[0.035em] text-black/45 md:text-[13px] md:leading-[1.85]">
//                 {motorcycle.description ||
//                   "Contact our dealership for more information about this motorcycle."}
//               </p>
//             </div>

//             {/* SPECIFICATIONS */}

//             <div className="border-t border-black/10">
//               <SpecRow label="Make" value={motorcycle.make} />

//               <SpecRow label="Model" value={motorcycle.model} />

//               <SpecRow label="Year" value={motorcycle.year} />

//               <SpecRow
//                 label="Mileage"
//                 value={`${formattedMileage} ${motorcycle.mileageUnit}`}
//               />

//               <SpecRow label="Transmission" value={motorcycle.transmission} />

//               <SpecRow label="Fuel type" value={motorcycle.fuelType} />

//               <SpecRow label="Motorcycle type" value={motorcycle.bikeType} />

//               <SpecRow
//                 label="Exterior"
//                 value={motorcycle.exteriorColor || "—"}
//               />

//               <SpecRow
//                 label="Engine capacity"
//                 value={
//                   motorcycle.engineCapacity != null
//                     ? `${motorcycle.engineCapacity} cc`
//                     : "—"
//                 }
//               />

//               <SpecRow
//                 label="Engine type"
//                 value={motorcycle.engineType || "—"}
//               />

//               <SpecRow
//                 label="Cooling system"
//                 value={motorcycle.coolingSystem || "—"}
//               />

//               <SpecRow
//                 label="Starting system"
//                 value={motorcycle.startingSystem || "—"}
//               />

//               <SpecRow label="Brake type" value={motorcycle.brakeType || "—"} />

//               <SpecRow label="ABS" value={motorcycle.abs ? "Yes" : "No"} />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ======================================================
//           04 — FEATURES
//       ====================================================== */}

//       {motorcycle.features?.length > 0 && (
//         <section className="border-t border-black/10">
//           <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
//             <div className="mb-10 flex items-end justify-between">
//               <div>
//                 <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/30 md:text-[11px]">
//                   Equipment
//                 </p>

//                 <h2 className="mt-3 font-bebas text-5xl leading-none tracking-[-0.03em] md:text-6xl">
//                   Features
//                 </h2>
//               </div>

//               <span className="hidden font-montserrat text-[9px] uppercase tracking-[0.2em] text-black/25 sm:block md:text-[10px]">
//                 {motorcycle.features.length} items
//               </span>
//             </div>

//             <div className="grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
//               {motorcycle.features.map((feature, index) => (
//                 <div
//                   key={feature}
//                   className="flex items-center gap-4 border-b border-black/10 px-1 py-5 sm:border-r sm:px-4 lg:px-5"
//                 >
//                   <span className="font-montserrat text-[9px] tracking-[0.15em] text-black/20 md:text-[10px]">
//                     {String(index + 1).padStart(2, "0")}
//                   </span>

//                   <span className="font-montserrat text-[11px] tracking-[0.02em] text-black/65 md:text-[12px]">
//                     {feature}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ======================================================
//           05 — DEALERSHIP
//       ====================================================== */}

//       <section className="bg-[#181818] text-white">
//         <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
//           <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:items-end">
//             <div>
//               <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-white/30 md:text-[11px]">
//                 The dealership
//               </p>

//               <h2 className="mt-4 max-w-4xl font-bebas text-[clamp(4rem,8vw,8rem)] leading-[0.8] tracking-[-0.045em]">
//                 Come see it
//                 <br />
//                 in person.
//               </h2>

//               <p className="mt-7 max-w-xl font-montserrat text-[11px] leading-[1.9] tracking-[0.035em] text-white/35 md:text-[13px] md:leading-[1.85]">
//                 Visit our showroom to experience the motorcycle in person and
//                 speak with our team about ownership, financing, trade-ins, and
//                 test drives.
//               </p>
//             </div>

//             <div className="border-t border-white/10 pt-7">
//               <p className="font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/25 md:text-[11px]">
//                 Demo Auto · Demo showroom
//               </p>
//               <div className="mt-7 flex flex-wrap gap-3">
//                 <Link
//                   href="/contact"
//                   className="group inline-flex items-center gap-3 bg-white px-5 py-3.5 font-montserrat text-[9px] font-medium uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-white/85 md:text-[10px]"
//                 >
//                   Contact demo team
//                   <ArrowUpRight
//                     size={14}
//                     strokeWidth={1.2}
//                     className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                   />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ======================================================
//           06 — LATEST ARRIVALS
//       ====================================================== */}

//       {latestMotorcycles.length > 0 && (
//         <section className="bg-white">
//           <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
//             {/* HEADER */}

//             <div className="mb-10 flex items-end justify-between gap-6">
//               <div>
//                 <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.3em] text-black/30 md:text-[11px]">
//                   Fresh to the collection
//                 </p>

//                 <h2 className="mt-3 font-bebas text-5xl leading-[0.85] tracking-[-0.035em] sm:text-6xl md:text-7xl">
//                   Latest Arrivals
//                 </h2>
//               </div>

//               <Link
//                 href="/motorcycle"
//                 className="group hidden items-center gap-2 border-b border-black/20 pb-2 font-montserrat text-[9px] font-medium uppercase tracking-[0.18em] text-black/50 transition-colors duration-300 hover:border-black hover:text-black sm:flex md:text-[10px]"
//               >
//                 View all motorcycles
//                 <ArrowUpRight
//                   size={14}
//                   strokeWidth={1.2}
//                   className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                 />
//               </Link>
//             </div>

//             {/* LATEST MOTORCYCLES */}

//             <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
//               {latestMotorcycles.map((latestMotorcycle, index) => (
//                 <LatestMotorcycleCard
//                   key={latestMotorcycle._id}
//                   motorcycle={latestMotorcycle}
//                   index={index}
//                 />
//               ))}
//             </div>

//             {/* MOBILE VIEW ALL */}

//             <div className="mt-10 flex justify-center sm:hidden">
//               <Link
//                 href="/motorcycle"
//                 className="group inline-flex items-center gap-3 bg-black px-6 py-4 font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-white"
//               >
//                 View all motorcycles
//                 <ArrowUpRight
//                   size={14}
//                   strokeWidth={1.2}
//                   className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                 />
//               </Link>
//             </div>
//           </div>
//         </section>
//       )}
//     </main>
//   );
// }

// /* ============================================================
//    SPEC ROW
// ============================================================ */

// function SpecRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-8 border-b border-black/10 py-4">
//       <span className="font-montserrat text-[9px] font-medium uppercase tracking-[0.2em] text-black/30 md:text-[10px]">
//         {label}
//       </span>

//       <span className="text-right font-montserrat text-[11px] tracking-[0.02em] text-black/65 md:text-[12px]">
//         {value}
//       </span>
//     </div>
//   );
// }

// /* ============================================================
//    LATEST MOTORCYCLE CARD
// ============================================================ */

// function LatestMotorcycleCard({ motorcycle, index }) {
//   const image = motorcycle.images?.[0];

//   const price = formatPrice(motorcycle.price, motorcycle.currency);

//   const mileage = new Intl.NumberFormat("en-US").format(
//     motorcycle.mileage || 0,
//   );

//   return (
//     <Link href={`/motorcycle/${motorcycle._id}`} className="group block">
//       {/* IMAGE */}

//       <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ef]">
//         {image?.url ? (
//           <img
//             src={image.url}
//             alt={image.alt || `${motorcycle.make} ${motorcycle.model}`}
//             className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center font-montserrat text-[10px] uppercase tracking-[0.2em] text-black/25">
//             No image
//           </div>
//         )}

//         {/* CONDITION */}

//         <div className="absolute left-3 top-3">
//           <span className="bg-white px-3 py-2 font-montserrat text-[8px] font-medium uppercase tracking-[0.15em] text-black md:text-[9px]">
//             {motorcycle.condition}
//           </span>
//         </div>

//         {/* NUMBER */}

//         <div className="absolute bottom-3 left-3">
//           <span className="font-montserrat text-[9px] tracking-[0.2em] text-white/70 md:text-[10px]">
//             {String(index + 1).padStart(2, "0")}
//           </span>
//         </div>

//         {/* ARROW */}

//         <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white text-black transition-all duration-300 group-hover:bg-black group-hover:text-white md:h-10 md:w-10">
//           <ArrowUpRight
//             size={15}
//             strokeWidth={1.2}
//             className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
//           />
//         </div>
//       </div>

//       {/* INFO */}

//       <div className="border-b border-black/10 py-5">
//         <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.25em] text-black/35 md:text-[10px]">
//           {motorcycle.make}
//         </p>

//         <div className="mt-2 flex items-start justify-between gap-4">
//           <h3 className="font-bebas text-3xl leading-[0.9] tracking-[-0.025em] transition-opacity duration-300 group-hover:opacity-55 md:text-4xl">
//             {motorcycle.model}
//           </h3>

//           <p className="shrink-0 pt-1 font-montserrat text-[11px] font-medium md:text-xs">
//             {price}
//           </p>
//         </div>

//         <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-montserrat text-[9px] uppercase tracking-[0.16em] text-black/35 md:text-[10px]">
//           <span>{motorcycle.year}</span>

//           <span className="h-[3px] w-[3px] rounded-full bg-black/20" />

//           <span>
//             {mileage} {motorcycle.mileageUnit}
//           </span>

//           <span className="h-[3px] w-[3px] rounded-full bg-black/20" />

//           <span>{motorcycle.bikeType}</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// /* ============================================================
//    PRICE FORMATTER
// ============================================================ */

// function formatPrice(price, currency) {
//   if (typeof price !== "number") {
//     return "";
//   }

//   try {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: currency || "USD",
//       maximumFractionDigits: 0,
//     }).format(price);
//   } catch {
//     return `${currency || "USD"} ${price.toLocaleString()}`;
//   }
// }

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ACCESSORY_CATEGORIES } from "@/lib/accessory-categories";
import { translateLabel } from "@/lib/localization";
import { motion } from "framer-motion";
const PAGE_SIZE = 12;

function formatPrice(price, currency) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "SAR",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency || "SAR"} ${Number(price).toLocaleString("en-US")}`;
  }
}

export default function AccessoryBrowser({
  category = "",
  onCategoryChange,
  inventorySelector,
}) {
  const [accessories, setAccessories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
      sort,
    });
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    async function loadAccessories() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/accessories?${params}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "تعذّر تحميل الإكسسوارات.");
        }
        setAccessories(result.data.accessories);
        setPagination(result.data.pagination);
      } catch (loadError) {
        if (loadError.name === "AbortError") return;
        console.error("Accessories page load error:", loadError);
        setError("تعذّر تحميل الإكسسوارات. حاول مرة أخرى.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadAccessories();
    return () => controller.abort();
  }, [category, page, search, sort]);

  function applySearch(event) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function updateCategory(value) {
    onCategoryChange(value);
    setPage(1);
  }

  return (
    <>
       <section className="relative h-[40vh] min-h-[320px] overflow-hidden bg-[#e8e8e5] md:min-h-[420px]">
        <div className="absolute inset-0">
          <Image
            src={"/images/accessories/BikeAccessories.webp"}
            alt="دراجة نارية مميزة"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1800px] px-6 pb-10 md:px-10 md:pb-14 lg:px-14 lg:pb-16">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl"
            >
              <p className="mb-3 font-montserrat text-[9px] font-medium uppercase tracking-[0.35em] text-white/60 md:text-[10px]">
                   كل ما تحتاجه لرحلتك
              </p>

              <h1 className="font-bebas text-[clamp(4rem,8vw,8rem)] leading-[0.8] tracking-[-0.045em] text-white">
                الإكسسوارات
              </h1>

              <p className="mt-5 max-w-xl font-montserrat text-[10px] leading-[1.8] tracking-[0.05em] text-white/60 md:text-[11px]">
                  تصفّح الإكسسوارات ومستلزمات القيادة وقطع الغيار المتوفرة في المعرض.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <section className="relative overflow-hidden bg-[#181818] text-white">
        <div className="mx-auto max-w-[1800px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
          <p className="font-montserrat text-[9px] font-medium uppercase tracking-[0.3em] text-white/45">
            Everything for the ride
          </p>
          <h1 className="mt-4 font-bebas text-[clamp(4rem,8vw,8rem)] leading-[0.82] tracking-[-0.04em]">
            Accessories
          </h1>
          <p className="mt-5 max-w-xl font-montserrat text-[11px] leading-6 text-white/55">
            Browse our accessories, riding gear and parts available in store.
          </p>
        </div>
      </section> */}

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-5 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => updateCategory("")}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${!category ? "border-black bg-black text-white" : "border-black/15 hover:border-black"}`}
            >
              جميع الإكسسوارات
            </button>
            {ACCESSORY_CATEGORIES.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={category === item.value}
                onClick={() => updateCategory(item.value)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${category === item.value ? "border-black bg-black text-white" : "border-black/15 hover:border-black"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <form
              onSubmit={applySearch}
              className="flex h-10 border-b border-black/20"
            >
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="ابحث عن الإكسسوارات"
                className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-black/35"
              />
              <button
                type="submit"
                className="px-3 text-xs font-semibold uppercase tracking-wide"
              >
                بحث
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="min-h-[40vh] bg-white">
        <div className="mx-auto max-w-[1800px] px-6 py-10 md:px-10 lg:px-14">
          <div className="mb-7 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-4 border-b border-black/10 pb-5 md:grid-cols-[1fr_auto_1fr]">
            <div className="col-span-2 flex justify-center md:col-span-1 md:col-start-2 md:row-start-1">
              {inventorySelector}
            </div>
            <div className="min-w-0 md:col-start-1 md:row-start-1">
              <p className="font-montserrat text-[9px] uppercase tracking-[0.25em] text-black/35">
                متوفر
              </p>
              <h2 className="mt-2 font-bebas text-3xl leading-none sm:text-4xl">
                {pagination.total} منتج
              </h2>
            </div>
            <div className="flex justify-end md:col-start-3 md:row-start-1">
              <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                {loading && accessories.length > 0 && (
                  <span className="text-xs text-black/40">جارٍ التحديث...</span>
                )}
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                    setPage(1);
                  }}
                  aria-label="ترتيب الإكسسوارات"
                  className="h-10 max-w-full rounded-lg border border-black/15 bg-white px-2 text-[10px] uppercase tracking-wide sm:px-3 sm:text-xs"
                >
                  <option value="newest">الأحدث أولًا</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                  <option value="name">الاسم</option>
                </select>
              </div>
            </div>
          </div>

          {error ? (
            <p
              role="alert"
              className="border border-red-200 bg-red-50 p-5 text-sm text-red-700"
            >
              {error}
            </p>
          ) : loading && accessories.length === 0 ? (
            <p className="py-16 text-center text-sm text-black/45">
              جارٍ تحميل الإكسسوارات...
            </p>
          ) : accessories.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-medium">ما لقينا إكسسوارات</p>
              <p className="mt-2 text-sm text-black/45">
                جرّب فئة ثانية أو غيّر كلمات البحث.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {accessories.map((item) => {
                const image = item.images?.[0];
                const label =
                  ACCESSORY_CATEGORIES.find(
                    (entry) => entry.value === item.category,
                  )?.label || item.category;
                return (
                  <article key={item._id} className="group min-w-0">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f1ef]">
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.alt || item.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-black/30">
                          لا توجد صورة
                        </div>
                      )}
                      <span className="absolute left-3 top-3 bg-white px-3 py-2 text-[9px] font-medium uppercase tracking-wider">
                        {label}
                      </span>
                    </div>
                    <div className="border-b border-black/10 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bebas text-2xl leading-none sm:text-3xl">
                          {item.name}
                        </h3>
                        <p className="shrink-0 text-xs font-medium">
                          {formatPrice(item.price, item.currency)}
                        </p>
                      </div>
                      {item.description && (
                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-black/50">
                          {item.description}
                        </p>
                      )}
                      <p className="mt-3 text-[9px] uppercase tracking-wider text-black/35">
                        {item.stockQuantity} متوفر
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
              <button
                type="button"
                disabled={!pagination.hasPreviousPage || loading}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-full border border-black/15 px-4 py-2 text-sm disabled:opacity-40"
              >
                السابق
              </button>
              <span className="text-xs text-black/45">
                الصفحة {pagination.page} من {pagination.totalPages}
              </span>
              <button
                type="button"
                disabled={!pagination.hasNextPage || loading}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-full border border-black/15 px-4 py-2 text-sm disabled:opacity-40"
              >
                التالي
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

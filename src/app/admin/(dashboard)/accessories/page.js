"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ACCESSORY_CATEGORIES } from "@/lib/accessory-categories";

const EMPTY_PAGINATION = {
  page: 1,
  limit: 15,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export default function AdminAccessoriesPage() {
  const [accessories, setAccessories] = useState([]);
  const [pagination, setPagination] = useState(EMPTY_PAGINATION);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState("");

  const loadAccessories = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
      });
      if (search.trim()) params.set("search", search.trim());
      if (category) params.set("category", category);
      if (status) params.set("status", status);

      const response = await fetch(`/api/admin/accessories?${params}`, {
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "تعذّر تحميل الإكسسوارات.");
      }
      setAccessories(result.data.accessories);
      setPagination({ ...EMPTY_PAGINATION, ...result.data.pagination });
    } catch (loadError) {
      console.error("Admin accessories load error:", loadError);
      setError(loadError.message || "تعذّر تحميل الإكسسوارات.");
    } finally {
      setLoading(false);
    }
  }, [category, search, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => loadAccessories(1), 250);
    return () => window.clearTimeout(timer);
  }, [loadAccessories]);

  async function updateAccessory(id, changes) {
    setActionId(id);
    setError("");
    try {
      const response = await fetch(`/api/admin/accessories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "تعذّر تحديث الإكسسوار.");
      }
      setAccessories((current) =>
        current.map((item) => item._id === id ? result.data.accessory : item),
      );
    } catch (updateError) {
      console.error("Accessory update error:", updateError);
      setError(updateError.message || "تعذّر تحديث الإكسسوار.");
    } finally {
      setActionId("");
    }
  }

  async function deleteAccessory(accessory) {
    if (!window.confirm(`هل تريد حذف "${accessory.name}"؟ لا يمكن التراجع عن هذا الإجراء.`)) {
      return;
    }
    setActionId(accessory._id);
    setError("");
    try {
      const response = await fetch(`/api/admin/accessories/${accessory._id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "تعذّر حذف الإكسسوار.");
      }
      setAccessories((current) =>
        current.filter((item) => item._id !== accessory._id),
      );
      setPagination((current) => ({
        ...current,
        total: Math.max(current.total - 1, 0),
      }));
      if (result.message.includes("could not be removed")) {
        setError(result.message);
      }
    } catch (deleteError) {
      console.error("Accessory delete error:", deleteError);
      setError(deleteError.message || "تعذّر حذف الإكسسوار.");
    } finally {
      setActionId("");
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 pb-20 md:pb-0">
      <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/35">المخزون</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">الإكسسوارات</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">أدر منتجات الإكسسوارات بشكل مستقل عن مخزون الدراجات النارية.</p>
        </div>
        <Link href="/admin/accessories/new" className="inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white hover:bg-black/80">
          + إضافة إكسسوار
        </Link>
      </header>

      {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          loadAccessories(1);
        }}
        className="grid gap-3 rounded-2xl border border-black/10 bg-white p-3 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(220px,1fr)_200px_180px_auto]"
      >
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن الاسم أو رقم المخزون" className="h-11 min-w-0 rounded-xl border border-black/15 px-4 text-sm outline-none focus:border-black" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 rounded-xl border border-black/15 bg-white px-3 text-sm outline-none focus:border-black">
          <option value="">جميع الفئات</option>
          {ACCESSORY_CATEGORIES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-xl border border-black/15 bg-white px-3 text-sm outline-none focus:border-black">
          <option value="">جميع الحالات</option>
          <option value="Available">متوفر</option>
          <option value="Out of stock">نفد من المخزون</option>
          <option value="Discontinued">متوقف</option>
        </select>
        <button type="submit" className="h-11 rounded-xl bg-black px-5 text-sm font-semibold text-white">بحث</button>
      </form>

      <section className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white">
        <div className="border-b border-black/10 px-4 py-4 sm:px-6">
          <h2 className="font-semibold">مخزون المنتجات</h2>
          <p className="mt-1 text-xs text-black/40">إجمالي الإكسسوارات: {pagination.total}</p>
        </div>
        {loading ? (
          <p className="p-8 text-sm text-black/45">جارٍ تحميل الإكسسوارات...</p>
        ) : accessories.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium">لم يتم العثور على إكسسوارات</p>
            <p className="mt-2 text-sm text-black/45">أضف منتجًا أو غيّر عوامل التصفية.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/10">
            {accessories.map((accessory) => {
              const busy = actionId === accessory._id;
              const image = accessory.images?.[0]?.url;
              return (
                <article key={accessory._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:px-6">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-black/5">
                    {image && <Image src={image} alt={accessory.images[0].alt || accessory.name} fill sizes="80px" className="object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{accessory.name}</p>
                    <p className="mt-1 text-xs text-black/45">
                      {ACCESSORY_CATEGORIES.find((item) => item.value === accessory.category)?.label || accessory.category}
                      {accessory.stockNumber ? ` · ${accessory.stockNumber}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-black/45">
                      {accessory.currency} {Number(accessory.price).toLocaleString()} · الكمية: {accessory.stockQuantity}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label={`حالة ${accessory.name}`}
                      value={accessory.status}
                      disabled={busy}
                      onChange={(event) => updateAccessory(accessory._id, { status: event.target.value })}
                      className="h-9 rounded-lg border border-black/15 bg-white px-2 text-xs"
                    >
                      <option value="Available">متوفر</option>
                      <option value="Out of stock">نفد من المخزون</option>
                      <option value="Discontinued">متوقف</option>
                    </select>
                    <button type="button" disabled={busy} onClick={() => updateAccessory(accessory._id, { isFeatured: !accessory.isFeatured })} className="h-9 rounded-lg border border-black/15 px-3 text-xs disabled:opacity-50">
                      {accessory.isFeatured ? "مميز" : "تمييز"}
                    </button>
                    <Link href={`/admin/accessories/${accessory._id}/edit`} className="h-9 rounded-lg border border-black/15 px-3 py-2 text-xs">تعديل</Link>
                    <button type="button" disabled={busy} onClick={() => deleteAccessory(accessory)} className="h-9 rounded-lg border border-red-200 px-3 text-xs text-red-700 disabled:opacity-50">حذف</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-black/10 px-4 py-4 text-sm sm:px-6">
            <button type="button" disabled={!pagination.hasPreviousPage || loading} onClick={() => loadAccessories(pagination.page - 1)} className="rounded-lg border border-black/15 px-4 py-2 disabled:opacity-40">السابق</button>
            <span className="text-xs text-black/45">الصفحة {pagination.page} من {pagination.totalPages}</span>
            <button type="button" disabled={!pagination.hasNextPage || loading} onClick={() => loadAccessories(pagination.page + 1)} className="rounded-lg border border-black/15 px-4 py-2 disabled:opacity-40">التالي</button>
          </div>
        )}
      </section>
    </div>
  );
}

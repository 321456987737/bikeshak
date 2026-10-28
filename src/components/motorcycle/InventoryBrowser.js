"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccessoryBrowser from "@/components/motorcycle/AccessoryBrowser";
import MotorcycleBrowser from "@/components/motorcycle/MotorcycleBrowser";

export default function InventoryBrowser({
  initialInventory = "motorcycles",
  initialCategory = "",
  initialMotorcycles,
  initialPagination,
  initialFilters,
}) {
  const router = useRouter();
  const [inventory, setInventory] = useState(
    initialInventory === "accessories" ? "accessories" : "motorcycles",
  );
  const [category, setCategory] = useState(initialCategory);

  const inventorySelector = (
    <div
      role="group"
      aria-label="اختر نوع المعروضات"
      className="inline-flex items-center rounded-full border border-black/10 bg-[#f7f7f5] p-1"
    >
      {[
        { value: "motorcycles", label: "الدراجات النارية" },
        { value: "accessories", label: "الإكسسوارات" },
      ].map((item) => (
        <button
          key={item.value}
          type="button"
          aria-pressed={inventory === item.value}
          onClick={() => selectInventory(item.value)}
          className={`rounded-full px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] transition sm:px-5 ${
            inventory === item.value
              ? "bg-black text-white shadow-sm"
              : "text-black/50 hover:text-black"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  function selectInventory(nextInventory) {
    setInventory(nextInventory);
    if (nextInventory === "accessories") {
      const params = new URLSearchParams({ inventory: "accessories" });
      if (category) params.set("category", category);
      router.replace(`/motorcycle?${params.toString()}`, { scroll: false });
    } else {
      router.replace("/motorcycle", { scroll: false });
    }
  }

  function selectCategory(nextCategory) {
    setCategory(nextCategory);
    const params = new URLSearchParams({ inventory: "accessories" });
    if (nextCategory) params.set("category", nextCategory);
    router.replace(`/motorcycle?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      {/* <div className="h-[72px] md:h-20" aria-hidden="true" /> */}
      {inventory === "motorcycles" ? (
        <MotorcycleBrowser
          inventorySelector={inventorySelector}
          initialMotorcycles={initialMotorcycles}
          initialPagination={initialPagination}
          initialFilters={initialFilters}
        />
      ) : (
        <AccessoryBrowser
          category={category}
          onCategoryChange={selectCategory}
          inventorySelector={inventorySelector}
        />
      )}
    </>
  );
}

import InventoryBrowser from "@/components/motorcycle/InventoryBrowser";

async function getMotorcycles(searchParams) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const queryString = new URLSearchParams();

  const allowedParams = [
    "search",
    "make",
    "model",
    "bikeType",
    "fuelType",
    "transmission",
    "condition",
    "minPrice",
    "maxPrice",
    "minYear",
    "maxYear",
    "sort",
    "page",
    "limit",
  ];

  for (const key of allowedParams) {
    const value = searchParams?.[key];

    if (
      typeof value === "string" &&
      value.trim()
    ) {
      queryString.set(key, value);
    }
  }

  if (!queryString.has("page")) {
    queryString.set("page", "1");
  }

  if (!queryString.has("limit")) {
    queryString.set("limit", "12");
  }

  const response = await fetch(
    `${baseUrl}/api/motorcycle?${queryString.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("تعذّر تحميل الدراجات النارية.");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "تعذّر تحميل الدراجات النارية."
    );
  }

  return result.data;
}

export default async function MotorcyclePage({
  searchParams,
}) {
  const params = await searchParams;

  let data = {
    motorcycles: [],

    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  if (params?.inventory !== "accessories") {
    try {
      data = await getMotorcycles(params);
    } catch (error) {
      console.error("Motorcycle page error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <InventoryBrowser
        initialInventory={params?.inventory}
        initialCategory={params?.category}
        initialMotorcycles={data.motorcycles}
        initialPagination={data.pagination}
        initialFilters={params}
      />
    </main>
  );
}

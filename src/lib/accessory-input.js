import { isAccessoryCategory } from "@/lib/accessory-categories";

const ACCESSORY_STATUSES = [
  "Available",
  "Out of stock",
  "Discontinued",
];

export function normalizeAccessoryInput(body, { partial = false } = {}) {
  const data = {};
  const fields = [
    "name",
    "stockNumber",
    "category",
    "description",
    "price",
    "currency",
    "stockQuantity",
    "images",
    "status",
    "isFeatured",
  ];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Accessory data must be an object" };
  }

  for (const field of fields) {
    if (partial && body[field] === undefined) {
      continue;
    }

    switch (field) {
      case "name": {
        const name = typeof body.name === "string" ? body.name.trim() : "";
        if (!name && !partial) return { error: "Name is required" };
        if (name.length > 160) return { error: "Name is too long" };
        if (name) data.name = name;
        break;
      }
      case "stockNumber": {
        if (body.stockNumber !== undefined) {
          if (typeof body.stockNumber !== "string") {
            return { error: "Stock number must be text" };
          }
          data.stockNumber = body.stockNumber.trim() || undefined;
        }
        break;
      }
      case "category": {
        if (body.category !== undefined || !partial) {
          if (!isAccessoryCategory(body.category)) {
            return { error: "Select a valid accessory category" };
          }
          data.category = body.category;
        }
        break;
      }
      case "description": {
        if (body.description !== undefined || !partial) {
          if (typeof body.description !== "string") {
            return { error: "Description must be text" };
          }
          const description = body.description.trim();
          if (description.length > 5000) {
            return { error: "Description is too long" };
          }
          data.description = description;
        }
        break;
      }
      case "price":
      case "stockQuantity": {
        if (body[field] !== undefined || !partial) {
          const value = Number(body[field]);
          const valid =
            Number.isFinite(value) &&
            value >= 0 &&
            (field !== "stockQuantity" || Number.isInteger(value));
          if (!valid) return { error: `Enter a valid ${field}` };
          data[field] = value;
        }
        break;
      }
      case "currency": {
        if (body.currency !== undefined || !partial) {
          const currency =
            typeof body.currency === "string" ? body.currency.trim().toUpperCase() : "";
          if (!/^[A-Z]{3}$/.test(currency || "SAR")) {
            return { error: "Enter a valid 3-letter currency code" };
          }
          data.currency = currency || "SAR";
        }
        break;
      }
      case "images": {
        if (body.images !== undefined || !partial) {
          if (!Array.isArray(body.images) || body.images.length > 15) {
            return { error: "Images must be an array of up to 15 items" };
          }
          const images = [];
          for (const image of body.images) {
            if (
              !image ||
              typeof image.url !== "string" ||
              !image.url.trim() ||
              typeof image.publicId !== "string" ||
              !image.publicId.trim()
            ) {
              return { error: "Each image must include a URL and public ID" };
            }
            images.push({
              url: image.url.trim(),
              publicId: image.publicId.trim(),
              alt: typeof image.alt === "string" ? image.alt.trim() : "",
            });
          }
          data.images = images;
        }
        break;
      }
      case "status": {
        if (body.status !== undefined || !partial) {
          const status = body.status || "Available";
          if (!ACCESSORY_STATUSES.includes(status)) {
            return { error: "Select a valid accessory status" };
          }
          data.status = status;
        }
        break;
      }
      case "isFeatured": {
        if (body.isFeatured !== undefined || !partial) {
          if (body.isFeatured !== undefined && typeof body.isFeatured !== "boolean") {
            return { error: "Featured must be true or false" };
          }
          data.isFeatured = Boolean(body.isFeatured);
        }
        break;
      }
    }
  }

  return { data };
}
